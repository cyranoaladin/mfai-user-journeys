import matter from 'gray-matter';

// These imports will only be used server-side
let fs: any;
let path: any;

// Check if we are server-side
if (typeof window === 'undefined') {
  fs = require('fs');
  path = require('path');
}

// Import centralized types
import { JourneyContent, JourneyMetadata, JourneyPhase, JourneyReward } from '@/types';
import logger from '@/utils/logger';

// Re-export types for backward compatibility
export type { JourneyContent, JourneyMetadata, JourneyPhase, JourneyReward };

// Parse a markdown file and extract structured content
export async function parseJourneyMarkdown(filePath: string): Promise<JourneyContent> {
  if (typeof window !== 'undefined') {
    throw new Error('parseJourneyMarkdown should only be called server-side');
  }

  // Read the file content
  const fileContents = fs.readFileSync(filePath, 'utf8');

  // Use gray-matter to parse the metadata section
  const { content, data } = matter(fileContents);

  // Extract phases from frontmatter if available
  const frontmatterPhases = data.phases || [];
  logger.log('Frontmatter data:', data);
  logger.log('Frontmatter phases:', frontmatterPhases);

  // Extract title, subtitle, and tagline from the markdown
  const titleMatch = content.match(/## (.*?)\n/);
  const subtitleMatch = content.match(/\*\*\*From (.*?)\*\*\*/);
  const taglineMatch = content.match(/> \*"(.*?)"\*/);

  // Extract target audience
  const targetMatch = content.match(/You are a \*\*(.*?)\*\*/);

  // Determine profile type and mission type based on the filename or content
  const fileName = path.basename(filePath);

  // Map profile types
  let profileType = 'Explorer'; // Default
  if (fileName.includes('Web2_Hustler') || fileName.includes('Idea_Carrier')) {
    profileType = 'Builder';
  } else if (fileName.includes('Content_Maker')) {
    profileType = 'Creator';
  } else if (fileName.includes('Community_Voice')) {
    profileType = 'Strategist';
  } else if (fileName.includes('Silent_Watcher')) {
    profileType = 'Investor';
  } else if (fileName.includes('Data_Miner')) {
    profileType = 'Researcher';
  } else if (fileName.includes('Project_Manager')) {
    profileType = 'Operator';
  }

  // Map mission types
  let missionType = 'Learn'; // Default
  if (fileName.includes('Engineer') || fileName.includes('Sovereign')) {
    missionType = 'Build';
  } else if (fileName.includes('Strategist') || fileName.includes('Commander')) {
    missionType = 'Guide';
  } else if (fileName.includes('Publisher') || fileName.includes('Synthesizer')) {
    missionType = 'Prove';
  } else if (fileName.includes('Backer')) {
    missionType = 'Scale';
  }

  // Extract phases
  const phasesRegex =
    /### 🌱 \*\*Phase 0:(.*?)---\n\n### 🧠 \*\*Phase 1:(.*?)---\n\n### 🔗 \*\*Phase 2:(.*?)---\n\n### 🧬 \*\*Phase 3:(.*?)---\n\n### 🚀 \*\*Phase 4:(.*?)---/;
  const phasesMatch = content.match(phasesRegex);

  const phases: Array<{
    name: string;
    title: string;
    content: string;
    icon: string;
  }> = [];
  if (phasesMatch) {
    const phaseIcons = ['🌱', '🧠', '🔗', '🧬', '🚀'];
    const phaseNames = ['Phase 0', 'Phase 1', 'Phase 2', 'Phase 3', 'Phase 4'];

    for (let i = 1; i <= 5; i++) {
      phases.push({
        name: phaseNames[i - 1],
        title: phasesMatch[i].split('**')[0].trim(),
        content: phasesMatch[i],
        icon: phaseIcons[i - 1],
      });
    }
  }

  // Extract rewards table
  const rewardsRegex = /\| (.*?) \| (.*?) \| (.*?) \|/g;
  const rewards: Array<{
    milestone: string;
    proof: string;
    utility: string;
  }> = [];
  let match;

  // Skip the header row
  while ((match = rewardsRegex.exec(content)) !== null) {
    rewards.push({
      milestone: match[1].trim(),
      proof: match[2].trim(),
      utility: match[3].trim(),
    });
  }

  // Extract "Why it matters" section
  const whyItMattersRegex = /### 🧩 Why it matters\n\n([\s\S]*?)---/;
  const whyItMattersMatch = content.match(whyItMattersRegex);
  const whyItMatters = whyItMattersMatch ? whyItMattersMatch[1].trim() : '';

  // Extract final role from the "Why it matters" section
  const finalRoleRegex = /from (.*?) to \*\*(.*?)\*\*/;
  const finalRoleMatch = whyItMatters.match(finalRoleRegex);
  const finalRole = finalRoleMatch ? finalRoleMatch[2] : '';

  // Extract call to action
  const ctaRegex = /### 🔍 Want to step in\?\n\n([\s\S]*?)$/;
  const ctaMatch = content.match(ctaRegex);
  const ctaContent = ctaMatch ? ctaMatch[1].trim() : '';
  const callToAction = ctaContent.split('\n').map((line: string) =>
    line
      .replace(/^📎 \*|^🧠 \*|^🚀 \*/, '')
      .replace(/\*$/, '')
      .trim()
  );

  // Determine icon based on profile type
  const iconMap: Record<string, string> = {
    Builder: '⚒️',
    Creator: '🎨',
    Strategist: '🧠',
    Investor: '💰',
    Researcher: '🔍',
    Operator: '⚙️',
    Explorer: '🧭',
  };

  // Extract slug from filename
  const slug = path.basename(filePath, '.md');

  // Create a JourneyContent object compatible with our centralized interface
  const journeyContent: JourneyContent = {
    metadata: {
      // Use frontmatter data if available, otherwise fall back to regex extraction
      title: data.title || (titleMatch ? titleMatch[1].trim() : ''),
      subtitle: subtitleMatch ? `From ${subtitleMatch[1].trim()}` : '',
      tagline: taglineMatch ? taglineMatch[1].trim() : '',
      target: targetMatch ? targetMatch[1].trim() : '',
      profileType,
      missionType,
      icon: iconMap[profileType],
      slug: data.slug || slug,
      description: taglineMatch ? taglineMatch[1].trim() : 'Journey description',
    },
    // Use frontmatter phases if available, otherwise use regex-extracted phases
    phases:
      frontmatterPhases.length > 0
        ? frontmatterPhases.map((phase: any) => ({
          name: phase.phase || '',
          title: phase.title || '',
          content: '',
          icon: '🚀',
          description: phase.mission || '',
          mission: phase.mission || 'Complete this phase',
          xpReward: phase.xpReward || 100,
          nftReward: phase.nftReward || '',
        }))
        : phases.map(phase => ({
          name: phase.name,
          title: phase.title,
          description: phase.content.substring(0, 100) + '...',
          content: phase.content,
          icon: phase.icon,
          mission: 'Complete this phase',
          xpReward: 100,
        })),
    rewards,
    whyItMatters,
    finalRole,
    callToAction,
  };

  return journeyContent;
}

// Get all journey files
export function getJourneyFiles(): string[] {
  if (typeof window !== 'undefined') {
    throw new Error('getJourneyFiles should only be called server-side');
  }

  const journeyDir = process.env.JOURNEY_DIR
    ? path.resolve(process.env.JOURNEY_DIR)
    : path.join(process.cwd(), 'journeys');

  // Check if directory exists
  if (!fs.existsSync(journeyDir)) {
    logger.error(`Journey directory not found at ${journeyDir}.`);
    return [];
  }

  const fileNames = fs
    .readdirSync(journeyDir)
    .filter((file: string) => file.startsWith('From_') && file.endsWith('.md'));
  return fileNames.map((fileName: string) => path.join(journeyDir, fileName));
}

// Get all journeys with their metadata
export async function getAllJourneys(): Promise<JourneyContent[]> {
  if (typeof window !== 'undefined') {
    throw new Error('getAllJourneys should only be called server-side');
  }

  const journeyFiles = getJourneyFiles();
  const journeys = await Promise.all(
    journeyFiles.map(async (filePath: string) => {
      const content = await parseJourneyMarkdown(filePath);
      const fileName: string = path.basename(filePath);

      // Only set the slug from filename if it's not already set in frontmatter
      if (!content.metadata.slug) {
        // Set the slug in the metadata - convert to lowercase and normalize
        content.metadata.slug = fileName.replace(/\.md$/, '').toLowerCase().replace(/_/g, '-');
      }

      return content;
    })
  );

  return journeys;
}

// Get a specific journey by slug
export async function getJourneyBySlug(slug: string): Promise<JourneyContent | null> {
  if (typeof window !== 'undefined') {
    throw new Error('getJourneyBySlug should only be called server-side');
  }

  // Normalize the slug for comparison (replace underscores with hyphens)
  const normalizedSlug = slug.toLowerCase().replace(/_/g, '-');

  logger.log(`Looking for journey with slug: ${normalizedSlug}`);

  // Get all journeys and find the one with the matching slug
  const journeys = await getAllJourneys();

  // Log all available journeys and their slugs for debugging
  logger.log('Available journeys:');
  journeys.forEach(journey => {
    logger.log(`- Title: ${journey.metadata.title}, Slug: ${journey.metadata.slug}`);
  });

  // Find the matching journey with exact match first, then partial match
  const exactMatch = journeys.find(journey => journey.metadata.slug === normalizedSlug);

  if (exactMatch) {
    logger.log(`Found exact match for slug: ${normalizedSlug}`);
    return exactMatch;
  }

  // Try partial match if no exact match found
  const partialMatch = journeys.find(
    journey => journey.metadata.slug && journey.metadata.slug.includes(normalizedSlug)
  );

  if (partialMatch) {
    logger.log(`Found partial match for slug: ${normalizedSlug} -> ${partialMatch.metadata.slug}`);
    return partialMatch;
  }

  logger.log(`No journey found for slug: ${normalizedSlug}`);
  return null;
}
