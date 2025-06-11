import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

// Ces imports ne seront utilisés que côté serveur
let fs: any;
let path: any;

// Vérifier si nous sommes côté serveur
if (typeof window === 'undefined') {
  fs = require('fs');
  path = require('path');
}

// Define the journey metadata structure
export interface JourneyMetadata {
  title: string;
  subtitle: string;
  tagline: string;
  target: string;
  profileType: string;
  missionType: string;
  icon?: string;
  slug: string;
}

// Define the journey content structure
export interface JourneyContent {
  metadata: JourneyMetadata;
  phases: {
    name: string;
    title: string;
    content: string;
    icon: string;
  }[];
  rewards: {
    milestone: string;
    proof: string;
    utility: string;
  }[];
  whyItMatters: string;
  finalRole: string;
  callToAction: string[];
  related?: { title: string; slug: string; icon: string }[];
}

// Parse a markdown file and extract structured content
export async function parseJourneyMarkdown(filePath: string): Promise<JourneyContent> {
  if (typeof window !== 'undefined') {
    throw new Error('parseJourneyMarkdown should only be called server-side');
  }
  
  // Read the file content
  const fileContents = fs.readFileSync(filePath, 'utf8');
  
  // Use gray-matter to parse the metadata section
  const { content } = matter(fileContents);
  
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
  const phasesRegex = /### 🌱 \*\*Phase 0:(.*?)---\n\n### 🧠 \*\*Phase 1:(.*?)---\n\n### 🔗 \*\*Phase 2:(.*?)---\n\n### 🧬 \*\*Phase 3:(.*?)---\n\n### 🚀 \*\*Phase 4:(.*?)---/;
  const phasesMatch = content.match(phasesRegex);
  
  const phases = [];
  if (phasesMatch) {
    const phaseIcons = ['🌱', '🧠', '🔗', '🧬', '🚀'];
    const phaseNames = ['Phase 0', 'Phase 1', 'Phase 2', 'Phase 3', 'Phase 4'];
    
    for (let i = 1; i <= 5; i++) {
      phases.push({
        name: phaseNames[i-1],
        title: phasesMatch[i].split('**')[0].trim(),
        content: phasesMatch[i],
        icon: phaseIcons[i-1]
      });
    }
  }
  
  // Extract rewards table
  const rewardsRegex = /\| (.*?) \| (.*?) \| (.*?) \|/g;
  const rewardsMatches = [...content.matchAll(rewardsRegex)];
  
  const rewards = [];
  // Skip the header row
  for (let i = 1; i < rewardsMatches.length; i++) {
    rewards.push({
      milestone: rewardsMatches[i][1].trim(),
      proof: rewardsMatches[i][2].trim(),
      utility: rewardsMatches[i][3].trim()
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
  const callToAction = ctaContent.split('\n').map((line: string) => line.replace(/^📎 \*|^🧠 \*|^🚀 \*/, '').replace(/\*$/, '').trim());
  
  // Determine icon based on profile type
  const iconMap: Record<string, string> = {
    'Builder': '⚒️',
    'Creator': '🎨',
    'Strategist': '🧠',
    'Investor': '💰',
    'Researcher': '🔍',
    'Operator': '⚙️',
    'Explorer': '🧭'
  };
  
  // Extract slug from filename
  const slug = path.basename(filePath, '.md');

  return {
    metadata: {
      title: titleMatch ? titleMatch[1].trim() : '',
      subtitle: subtitleMatch ? `From ${subtitleMatch[1].trim()}` : '',
      tagline: taglineMatch ? taglineMatch[1].trim() : '',
      target: targetMatch ? targetMatch[1].trim() : '',
      profileType,
      missionType,
      icon: iconMap[profileType],
      slug
    },
    phases,
    rewards,
    whyItMatters,
    finalRole,
    callToAction,
    related: []
  };
}

// Get all journey files
export function getJourneyFiles(): string[] {
  if (typeof window !== 'undefined') {
    throw new Error('getJourneyFiles should only be called server-side');
  }
  
  const journeyDir = path.join(process.cwd(), 'journeys');
  
  // Check if directory exists
  if (!fs.existsSync(journeyDir)) {
    console.warn(`Journey directory not found at ${journeyDir}. Using fallback path.`);
    // Use absolute path as fallback
    const fallbackDir = '/home/alaeddine/Documents/Moneyfactory/pages_web_parcours/mfai-user-journeys/journeys';
    if (fs.existsSync(fallbackDir)) {
      const fileNames = fs.readdirSync(fallbackDir).filter(
        (file: string) => file.startsWith('From_') && file.endsWith('.md')
      );
      return fileNames.map((fileName: string) => path.join(fallbackDir, fileName));
    } else {
      console.error('Fallback journey directory not found either!');
      return [];
    }
  }
  
  const fileNames = fs.readdirSync(journeyDir).filter(
    (file: string) => file.startsWith('From_') && file.endsWith('.md')
  );
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
      // Set the slug in the metadata - convert to lowercase and normalize
      content.metadata.slug = fileName.replace(/\.md$/, '')
        .toLowerCase()
        .replace(/_/g, '-');
      
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
  
  // Get all journeys and find the one with the matching slug
  const journeys = await getAllJourneys();
  const matchingJourney = journeys.find(journey => 
    journey.metadata.slug === normalizedSlug ||
    journey.metadata.slug.includes(normalizedSlug)
  );
  
  return matchingJourney || null;
}
