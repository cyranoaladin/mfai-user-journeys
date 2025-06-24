/**
 * Journey Data Configuration
 *
 * This file contains all the user journey data structured by persona.
 * Each journey follows the Cognitive Activation Protocol™: Learn → Build → Prove → Activate → Scale
 */

export interface Journey {
  persona: string;
  label: string;
  icon: string;
  tagline: string;
  description: string;
  phases: JourneyPhase[];
  requiredPass: 'Free' | 'Gold' | 'Platinum' | 'Diamond';
  zynoSays: string;
  rewards: string[];
  whyItMatters: string;
  finalRole: string;
}

export interface JourneyPhase {
  name?: string;
  title: 'Learn' | 'Build' | 'Prove' | 'Activate' | 'Scale';
  description: string;
  mission: string;
  xpReward: number;
  nftReward?: string;
  locked?: boolean;
  duration?: string;
  content?: string;
  icon?: string;
}

export const journeys: Journey[] = [
  {
    persona: 'student',
    label: 'The Curious Student',
    icon: '🎓',
    tagline: 'From Web2 knowledge seeker to Web3 passive earner',
    description:
      'Perfect for Web2-native, knowledge seekers who are time-rich and looking to gain concrete skills, passive income, and join a DAO.',
    phases: [
      {
        title: 'Learn',
        description: 'Understand the basics of Web3 and blockchain technology',
        mission: "Complete 'What is Web3?' 5-min animated intro + quiz",
        xpReward: 50,
        nftReward: 'Web3 Explorer',
        duration: '1-2 hours',
      },
      {
        title: 'Build',
        description: 'Create your first Web3 wallet and dashboard',
        mission: 'Create a Solana wallet with Zyno guidance',
        xpReward: 100,
        duration: '30-60 min',
      },
      {
        title: 'Prove',
        description: 'Demonstrate your understanding of Web3 foundations',
        mission: "Pass the 'Web3 Foundations' challenge",
        xpReward: 150,
        nftReward: 'Proof-of-Skill™ NFT',
        duration: '1-2 hours',
        locked: true,
      },
      {
        title: 'Activate',
        description: 'Participate in your first DAO governance',
        mission: 'Join your first DAO vote',
        xpReward: 200,
        duration: '1 hour',
        locked: true,
      },
      {
        title: 'Scale',
        description: 'Start earning passive income through staking',
        mission: 'Stake $MFAI + share testimonial',
        xpReward: 250,
        nftReward: 'Neuro-Dividends™',
        duration: 'Ongoing',
        locked: true,
      },
    ],
    requiredPass: 'Gold',
    zynoSays: "You're not just learning. You're mining skills into capital.",
    rewards: ['NFT Résumé', 'DAO Role', 'Passive Income Starter Pack'],
    whyItMatters:
      'This journey is important because it helps students understand Web3 and blockchain technology, which is a key part of the future of the internet.',
    finalRole: 'Web3 Educator',
  },
  {
    persona: 'entrepreneur',
    label: 'The Web2 Entrepreneur',
    icon: '👨‍💼',
    tagline: 'Transform your business with Web3 revenue models',
    description:
      'Designed for product owners and Web2 business builders looking to tokenize a business idea and create sustainable Web3 revenue.',
    phases: [
      {
        title: 'Learn',
        description: 'Discover how NFTs can transform your business model',
        mission: "Complete 'NFTs for Loyalty 101' visual case studies + self-assessment",
        xpReward: 75,
        duration: '2-3 hours',
      },
      {
        title: 'Build',
        description: 'Design your own tokenized business model',
        mission: 'Create your own gated content or NFT coupon model with MFAI templates',
        xpReward: 150,
        nftReward: 'Business Model Canvas',
        duration: '3-5 hours',
        locked: true,
      },
      {
        title: 'Prove',
        description: 'Validate your Web3 business concept',
        mission: 'Pitch your idea to Zyno + community preview',
        xpReward: 200,
        nftReward: 'Proof-of-Vision™ NFT',
        duration: '1-2 hours',
        locked: true,
      },
      {
        title: 'Activate',
        description: 'Implement your first Web3 integration',
        mission: 'Integrate your Web3 layer into an existing product + DAO feedback',
        xpReward: 250,
        duration: '5-10 hours',
        locked: true,
      },
      {
        title: 'Scale',
        description: 'Secure funding and grow your Web3 business',
        mission: 'Apply to Launchpad / raise funding from Synaptic DAO',
        xpReward: 300,
        nftReward: "Founder's Token",
        duration: 'Ongoing',
        locked: true,
      },
    ],
    requiredPass: 'Platinum',
    zynoSays: 'Turn your audience into stakeholders.',
    rewards: ['NFT Blueprint', 'Vision NFT', 'Launchpad Ticket'],
    whyItMatters:
      'This journey is important because it helps entrepreneurs understand how to tokenize their business ideas and create sustainable Web3 revenue.',
    finalRole: 'Web3 Entrepreneur',
  },
  {
    persona: 'investor',
    label: 'The Aspiring Investor',
    icon: '💰',
    tagline: 'Navigate DeFi and earn through governance',
    description:
      "For financially driven individuals curious about DeFi & passive yield who want to discover, stake, vote, and earn within MFAI's economy.",
    phases: [
      {
        title: 'Learn',
        description: 'Master the fundamentals of DeFi and DAOs',
        mission: "Complete 'Intro to DeFi, DAOs and Yield Mechanics' course + staking simulator",
        xpReward: 75,
        duration: '2-3 hours',
      },
      {
        title: 'Build',
        description: 'Create your optimal staking strategy',
        mission: 'Simulate staking scenarios and optimize portfolio with Zyno',
        xpReward: 125,
        duration: '1-2 hours',
        locked: true,
      },
      {
        title: 'Prove',
        description: 'Demonstrate your governance knowledge',
        mission: 'Complete the Governance Certification',
        xpReward: 175,
        nftReward: 'DAO Voter Badge',
        duration: '2-3 hours',
        locked: true,
      },
      {
        title: 'Activate',
        description: 'Participate in protocol governance',
        mission: 'Stake $MFAI & vote in proposal #01',
        xpReward: 225,
        nftReward: 'Governance NFT',
        duration: '1 hour',
        locked: true,
      },
      {
        title: 'Scale',
        description: 'Expand your influence and rewards',
        mission: 'Refer 2 investors + unlock Neuro-Dividends™ NFT',
        xpReward: 275,
        nftReward: 'Referral NFT',
        duration: 'Ongoing',
        locked: true,
      },
    ],
    requiredPass: 'Gold',
    zynoSays: 'Stake not only tokens, but your vision.',
    rewards: ['Governance XP', 'Staking Rewards', 'Referral NFT'],
    whyItMatters:
      'This journey is important because it helps investors understand how to navigate DeFi and earn through governance.',
    finalRole: 'Web3 Investor',
  },
  {
    persona: 'builder',
    label: 'The Web3 Builder',
    icon: '🧑‍💻',
    tagline: 'Build dApps and modules within the MFAI ecosystem',
    description:
      'For developers or technical users ready to build tools, create a dApp or module within the MFAI ecosystem.',
    phases: [
      {
        title: 'Learn',
        description: 'Master smart contract development',
        mission: "Complete 'Smart Contract Fast Track' with MFAI SDK + Zyno prompts",
        xpReward: 100,
        duration: '5-10 hours',
      },
      {
        title: 'Build',
        description: 'Create your first functional smart contract',
        mission: 'Fork & deploy vesting or staking module',
        xpReward: 200,
        duration: '10-15 hours',
        locked: true,
      },
      {
        title: 'Prove',
        description: 'Validate your code through peer review',
        mission: 'Audit by peer + Zyno',
        xpReward: 250,
        nftReward: 'Proof-of-Build™ NFT',
        duration: '2-3 hours',
        locked: true,
      },
      {
        title: 'Activate',
        description: 'Present your project to the community',
        mission: 'DAO Demo Day: present MVP to protocol community',
        xpReward: 300,
        duration: '1-2 hours',
        locked: true,
      },
      {
        title: 'Scale',
        description: 'Secure funding and grow your project',
        mission: 'Enter Builder DAO Circle + apply for protocol grant',
        xpReward: 350,
        nftReward: 'Builder Grant NFT',
        duration: 'Ongoing',
        locked: true,
      },
    ],
    requiredPass: 'Platinum',
    zynoSays: 'Your code is your identity.',
    rewards: ['Dev NFT Badge', 'Git-linked Portfolio', 'Launch Boost'],
    whyItMatters:
      'This journey is important because it helps builders understand how to build tools and modules within the MFAI ecosystem.',
    finalRole: 'Web3 Builder',
  },
  {
    persona: 'mentor',
    label: 'The Community Mentor',
    icon: '🧑‍🏫',
    tagline: 'Train, lead, and grow the ecosystem from inside',
    description:
      'For teachers, coaches, and content creators who want to train, lead, and grow the ecosystem from inside.',
    phases: [
      {
        title: 'Learn',
        description: "Master MFAI's teaching methodology",
        mission: 'Complete MFAI Pedagogy Bootcamp (Zyno + course builder)',
        xpReward: 100,
        duration: '5-8 hours',
      },
      {
        title: 'Build',
        description: 'Create your first educational content',
        mission: "Launch your first 'Zyno-Led Course' with reward modules",
        xpReward: 200,
        duration: '10-15 hours',
        locked: true,
      },
      {
        title: 'Prove',
        description: 'Get validated by the community',
        mission: 'Get community feedback score + NFT Certificate',
        xpReward: 250,
        nftReward: 'Educator NFT',
        duration: '1-2 weeks',
        locked: true,
      },
      {
        title: 'Activate',
        description: 'Take an active role in the community',
        mission: 'Join as Verified Mentor + moderate Discord DAO cohort',
        xpReward: 300,
        duration: 'Ongoing',
        locked: true,
      },
      {
        title: 'Scale',
        description: 'Monetize your educational content',
        mission: 'Monetize your learning path as NFT series',
        xpReward: 350,
        nftReward: 'Course Creator NFT',
        duration: 'Ongoing',
        locked: true,
      },
    ],
    requiredPass: 'Diamond',
    zynoSays: 'Teach to scale. Share to lead.',
    rewards: ['Educator NFT', 'Training Revenue Share', 'DAO Speaker Role'],
    whyItMatters:
      'This journey is important because it helps educators understand how to train and grow the ecosystem from inside.',
    finalRole: 'Web3 Educator',
  },
  {
    persona: 'visionary',
    label: 'The Visionary Creator',
    icon: '🎨',
    tagline: 'Validate and incubate your Web3 vision',
    description:
      'For inventors with strong ideas but no execution path who want to validate and incubate a powerful Web3 vision.',
    phases: [
      {
        title: 'Learn',
        description: 'Structure and refine your vision',
        mission: "Complete 'From Vision to Protocol': Self-assessment + Canvas with Zyno",
        xpReward: 100,
        duration: '3-5 hours',
      },
      {
        title: 'Build',
        description: 'Create a visual representation of your vision',
        mission: 'Create the Vision Board NFT and share with early supporters',
        xpReward: 200,
        nftReward: 'Vision Board NFT',
        duration: '5-8 hours',
        locked: true,
      },
      {
        title: 'Prove',
        description: 'Validate your vision with the community',
        mission: 'Mint Proof-of-Vision™ + pre-DAO voting test',
        xpReward: 250,
        nftReward: 'Proof-of-Vision™ NFT',
        duration: '1-2 weeks',
        locked: true,
      },
      {
        title: 'Activate',
        description: 'Secure resources for your vision',
        mission: 'Win access to MFAI Incubation via community traction',
        xpReward: 300,
        duration: '2-4 weeks',
        locked: true,
      },
      {
        title: 'Scale',
        description: 'Build a team and develop your MVP',
        mission: 'Assemble DAO Co-founders, co-build MVP, apply for grant',
        xpReward: 350,
        nftReward: "Founder's Vision NFT",
        duration: 'Ongoing',
        locked: true,
      },
    ],
    requiredPass: 'Diamond',
    zynoSays: "Ideas are seeds. Let's scale your forest.",
    rewards: ['Vision NFT', 'Incubation Access', 'DAO Startup Role'],
    whyItMatters:
      'This journey is important because it helps inventors validate and incubate a powerful Web3 vision.',
    finalRole: 'Web3 Visionary',
  },
  {
    persona: 'connector-protocol',
    label: 'The Connector Protocol™',
    icon: '🗝️',
    tagline: 'From Community Voice to Synaptic Strategist',
    description: 'For natural communicators, educators, or community builders who want to evolve from "enthusiasts" to governance-capable operators — recognized for their insight, influence, and capacity to mobilize collective intelligence.',
    phases: [
      {
        title: 'Learn',
        description: 'Social Signal Detected',
        mission: 'Zyno identifies relational capital and strategic clarity via AEPO™',
        xpReward: 100,
        nftReward: 'Mission Curator Badge',
        content: '<h2>Phase 0: Social Signal Detected</h2><p>Upon profile creation, Zyno identifies <strong>relational capital</strong> and <strong>strategic clarity</strong> via AEPO™.</p><p>A <strong>Skillchain</strong> is generated with emphasis on:</p><ul><li>Coordination Psychology</li><li>Protocol Narratives</li><li>Collective Decision Frameworks</li></ul><p>🎁 Access to <strong>Mission Curator Track</strong>.</p>',
      },
      {
        title: 'Build',
        description: 'Contribution Chain',
        mission: 'Complete missions by moderating conversations, translating strategic content, and synthesizing summaries',
        xpReward: 150,
        nftReward: 'Communication & Strategic Insight Badge',
        content: '<h2>Phase 1: Contribution Chain</h2><p>Completes missions by:</p><ul><li>Moderating conversations</li><li>Translating strategic content</li><li>Synthesizing summaries of ecosystem updates</li></ul><p>🎁 Earns Proof-of-Skill Tokens™ for Communication & Strategic Insight.</p>',
      },
      {
        title: 'Prove',
        description: 'Visibility Amplifier',
        mission: 'Coordinate Skillchains, host events, and review submissions',
        xpReward: 200,
        nftReward: 'Content Publisher Badge',
        content: '<h2>Phase 2: Visibility Amplifier</h2><p>Nominated by peers to <strong>coordinate Skillchains</strong>, host events, and review submissions.</p><p>Uses Zyno to auto-generate communication plans and propose new missions.</p><p>🎁 Unlocks <strong>Protocol Channel Rights</strong> (right to publish content and signal ecosystem shifts).</p>',
      },
      {
        title: 'Activate',
        description: 'Governance Intelligence',
        mission: 'Stakes $MFAI (Cognitive Lock™) to activate Mission Design privileges',
        xpReward: 250,
        nftReward: 'Governance Contributor Badge',
        content: '<h2>Phase 3: Governance Intelligence</h2><p>Stakes $MFAI (Cognitive Lock™) to:</p><ul><li>Activate <strong>Mission Design privileges</strong></li><li>Suggest new Skillchains</li><li>Moderate Proof-of-Vision™ validations</li></ul><p>🎁 Receives reputation-weighted Neuro-Dividends™ for each approved contribution.</p>',
      },
      {
        title: 'Scale',
        description: 'Final Rank: Synaptic Strategist',
        mission: 'Recognized as a protocol mind-shaper with access to protocol memory via RAG-Gov™',
        xpReward: 300,
        nftReward: 'Synaptic Strategist Badge',
        content: '<h2>Final Rank: Synaptic Strategist</h2><p>Recognized as a protocol mind-shaper.</p><p>Participates in strategic cycles with access to protocol memory via <strong>RAG-Gov™</strong>.</p><p>Can summon Zyno Pro to co-curate thematic streams for ecosystem evolution.</p><p>🎓 Considered for the <strong>Protocol Leadership Circle</strong>.</p><p><em>Coordination is not management. It\'s strategy made relational.</em></p>',
      },
    ],
    requiredPass: 'Free',
    zynoSays: 'Community voices are essential for protocol evolution. By transforming enthusiasts into governance-capable operators, we create a sustainable ecosystem where collective intelligence drives innovation.',
    rewards: [
      'Protocol Channel Rights',
      'Mission Design Privileges',
      'Protocol Leadership Circle Consideration'
    ],
    whyItMatters: 'Community voices are essential for protocol evolution. By transforming enthusiasts into governance-capable operators, we create a sustainable ecosystem where collective intelligence drives innovation.',
    finalRole: 'Synaptic Strategist',
  },
  {
    persona: 'defi-fundamentals',
    label: 'DeFi Fundamentals',
    icon: '🔄',
    tagline: 'Master DeFi protocols',
    description: 'Discover the fundamental concepts of DeFi and learn how to use decentralized protocols.',
    phases: [
      {
        title: 'Learn',
        description: 'Introduction to DeFi',
        mission: 'Understand the basics of decentralized finance',
        xpReward: 150,
        nftReward: 'Badge DeFi Explorer',
        content: '<h2>Introduction to DeFi</h2><p>Decentralized Finance (DeFi) represents a revolution in the financial world. Unlike traditional financial systems that rely on centralized intermediaries like banks, DeFi uses smart contracts on blockchains to create transparent, open, and permissionless financial services.</p><p>In this phase, you will discover the fundamental concepts of DeFi, the main protocols, and the opportunities it offers.</p>',
      },
      {
        title: 'Build',
        description: 'DeFi Protocols',
        mission: 'Explore the main DeFi protocols and how they work',
        xpReward: 200,
        nftReward: 'DeFi Apprentice Certificate',
        content: '<h2>DeFi Protocols</h2><p>DeFi protocols are at the heart of the decentralized finance ecosystem. They enable various financial operations without intermediaries.</p><p>In this phase, we will explore the most important protocols like Uniswap, Aave, Compound, and MakerDAO, and understand how they work and interact with each other.</p>',
      },
      {
        title: 'Prove',
        description: 'Advanced DeFi Strategies',
        mission: 'Learn how to create effective DeFi strategies',
        xpReward: 250,
        nftReward: 'DeFi Strategist Badge',
        content: '<h2>Advanced DeFi Strategies</h2><p>Once you master DeFi protocols, you can start developing more complex strategies to maximize your yields while managing risks.</p><p>In this phase, we will cover advanced concepts such as yield farming, staking, liquidity strategies, and risk management in the DeFi ecosystem.</p>',
      },
      {
        title: 'Activate',
        description: 'DeFi Implementation',
        mission: 'Apply DeFi strategies in real-world scenarios',
        xpReward: 300,
        nftReward: 'DeFi Practitioner Badge',
        content: '<h2>DeFi Implementation</h2><p>Now that you understand DeFi protocols and strategies, it is time to put your knowledge into practice.</p><p>In this phase, you will learn how to implement DeFi strategies in real-world scenarios, manage risks effectively, and optimize your returns across different protocols.</p>',
      },
      {
        title: 'Scale',
        description: 'DeFi Ecosystem Mastery',
        mission: 'Master the entire DeFi ecosystem and its interconnections',
        xpReward: 350,
        nftReward: 'DeFi Ecosystem Master Badge',
        content: '<h2>DeFi Ecosystem Mastery</h2><p>The final phase of your DeFi journey focuses on understanding the entire ecosystem and how different protocols interact with each other.</p><p>You will learn about cross-protocol strategies, liquidity management across multiple platforms, and advanced risk mitigation techniques to become a true DeFi expert.</p>',
      },
    ],
    requiredPass: 'Free',
    zynoSays: 'DeFi is revolutionizing traditional financial services, offering more transparency, accessibility, and opportunities for all.',
    rewards: [
      'DeFi Master Certificate',
      'Access to DeFi Community',
      'Exclusive Tutorials'
    ],
    whyItMatters: 'DeFi is radically transforming traditional financial services, offering more transparency, accessibility, and opportunities for everyone.',
    finalRole: 'DeFi Specialist',
  },
  {
    persona: 'intro-finance',
    label: 'Introduction to Finance',
    icon: '💰',
    tagline: 'Master the basics of finance',
    description: 'Learn the fundamentals of finance and develop your financial management skills.',
    phases: [
      {
        title: 'Learn',
        description: 'Fundamental Concepts',
        mission: 'Discover the key concepts of modern finance',
        xpReward: 100,
        nftReward: 'Skill Badge',
      },
      {
        title: 'Build',
        description: 'Budget Management',
        mission: 'Learn how to effectively manage your budget',
        xpReward: 150,
        nftReward: 'Skill Badge',
      },
      {
        title: 'Prove',
        description: 'Investments',
        mission: 'Understand the basics of investments',
        xpReward: 200,
        nftReward: 'Skill Badge',
      },
    ],
    requiredPass: 'Free',
    zynoSays: 'Mastering financial basics is essential for making informed decisions and building a solid financial future.',
    rewards: [
      'Certificate of financial skills',
      'Access to the learners community',
      'Mentorship opportunities'
    ],
    whyItMatters: 'Mastering financial basics is essential for making informed decisions and building a solid financial future.',
    finalRole: 'Junior Financial Analyst',
  },
  {
    persona: 'ai-finance',
    label: 'Artificial Intelligence in Finance',
    icon: '🤖',
    tagline: 'The future of finance is intelligent',
    description: 'Explore the use of AI in finance and its practical applications.',
    phases: [
      {
        title: 'Learn',
        description: 'Introduction to AI',
        mission: 'The basics of artificial intelligence',
        xpReward: 150,
        nftReward: 'AI Initiate Badge',
      },
      {
        title: 'Build',
        description: 'Machine Learning in Finance',
        mission: 'Applications of ML in finance',
        xpReward: 200,
        nftReward: 'Financial ML Certificate',
      },
      {
        title: 'Prove',
        description: 'Algorithmic Trading',
        mission: 'Automate your trading strategies',
        xpReward: 250,
        nftReward: 'Algorithmic Trader Badge',
      },
    ],
    requiredPass: 'Free',
    zynoSays: 'AI is radically transforming the financial sector, creating new opportunities for professionals who master these technologies.',
    rewards: [
      'Financial AI Expert Certificate',
      'Access to algorithmic trading tools',
      'Professional network in AI'
    ],
    whyItMatters: 'AI is radically transforming the financial sector, creating new opportunities for professionals who master these technologies.',
    finalRole: 'Financial Data Scientist',
  },
  {
    persona: 'blockchain-crypto',
    label: 'Blockchain and Crypto',
    icon: '⛓️',
    tagline: 'Tomorrow\'s finance, today',
    description: 'Dive into the world of blockchain and cryptocurrencies.',
    phases: [
      {
        title: 'Learn',
        description: 'Blockchain Fundamentals',
        mission: 'Understand blockchain technology',
        xpReward: 200,
        nftReward: 'Blockchain Badge',
      },
      {
        title: 'Build',
        description: 'Cryptocurrencies',
        mission: 'Major cryptocurrencies and how they work',
        xpReward: 250,
        nftReward: 'Crypto Expert Certificate',
      },
      {
        title: 'Prove',
        description: 'DeFi',
        mission: 'Decentralized finance and its applications',
        xpReward: 300,
        nftReward: 'DeFi Master Badge',
      },
    ],
    requiredPass: 'Free',
    zynoSays: 'Blockchain and DeFi are revolutionizing traditional finance, creating new opportunities for innovators and investors.',
    rewards: [
      'Blockchain Expert Certificate',
      'Access to DeFi platforms',
      'Community of innovators'
    ],
    whyItMatters: 'Blockchain and DeFi are revolutionizing traditional finance, creating new opportunities for innovators and investors.',
    finalRole: 'DeFi Architect',
  },
];

/**
 * Get a journey by persona identifier
 */
export const getJourneyByPersona = (persona: string): Journey | undefined => {
  return journeys.find(journey => journey.persona === persona);
};

/**
 * Get all available journeys
 */
export const getAllJourneys = (): Journey[] => {
  return journeys;
};

/**
 * Get recommended journey based on user preferences
 */
export const getRecommendedJourney = (goal: string, experience: string): Journey => {
  // Simple recommendation logic based on inputs
  // In a real app, this would be more sophisticated

  if (goal === 'learn') {
    return journeys.find(j => j.persona === 'student') || journeys[0];
  }

  if (goal === 'build') {
    return experience === 'experienced'
      ? journeys.find(j => j.persona === 'builder') || journeys[3]
      : journeys.find(j => j.persona === 'entrepreneur') || journeys[1];
  }

  if (goal === 'invest') {
    return journeys.find(j => j.persona === 'investor') || journeys[2];
  }

  if (goal === 'teach') {
    return journeys.find(j => j.persona === 'mentor') || journeys[4];
  }

  // Default fallback
  return journeys[0];
};
