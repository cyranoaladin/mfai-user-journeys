/**
 * Zyno AI Logic
 *
 * This file contains functions for Zyno AI prompts, suggestions,
 * and context-aware responses based on user journey progress.
 */

// Types
export interface ZynoContext {
  persona?: string;
  phase?: string;
  mission?: string;
  userXP?: number;
  walletConnected?: boolean;
  nftsOwned?: string[];
}

export interface ZynoSuggestion {
  text: string;
  action?: string;
}

/**
 * Get contextual suggestions from Zyno based on user's current state
 *
 * @param context User's current context
 * @returns Array of suggestions
 */
export const getZynoSuggestions = (context: ZynoContext): ZynoSuggestion[] => {
  const suggestions: ZynoSuggestion[] = [];

  // Add wallet connection suggestion if not connected
  if (!context.walletConnected) {
    suggestions.push({
      text: 'Connect your wallet to unlock all features',
      action: 'connectWallet',
    });
  }

  // Phase-specific suggestions
  if (context.phase) {
    switch (context.phase) {
      case 'Learn':
        suggestions.push({
          text: 'How do I start my learning journey?',
          action: 'startLearning',
        });
        suggestions.push({
          text: 'What skills will I gain in this phase?',
          action: 'explainSkills',
        });
        break;
      case 'Build':
        suggestions.push({
          text: 'What tools do I need for this project?',
          action: 'explainTools',
        });
        suggestions.push({
          text: 'Can you guide me through the build process?',
          action: 'guideBuild',
        });
        break;
      case 'Prove':
        suggestions.push({
          text: 'How do I prepare for the skill assessment?',
          action: 'prepareAssessment',
        });
        suggestions.push({
          text: 'What NFT will I earn after completion?',
          action: 'explainNFT',
        });
        break;
      case 'Activate':
        suggestions.push({
          text: 'How do I participate in DAO governance?',
          action: 'explainGovernance',
        });
        suggestions.push({
          text: 'What are Neuro-Dividends™?',
          action: 'explainDividends',
        });
        break;
      case 'Scale':
        suggestions.push({
          text: 'How can I maximize my earnings?',
          action: 'maximizeEarnings',
        });
        suggestions.push({
          text: 'What advanced opportunities are available?',
          action: 'advancedOpportunities',
        });
        break;
    }
  }

  // Persona-specific suggestions
  if (context.persona) {
    switch (context.persona) {
      case 'student':
        suggestions.push({
          text: 'What learning paths are best for beginners?',
          action: 'beginnerPaths',
        });
        break;
      case 'entrepreneur':
        suggestions.push({
          text: 'How can Web3 enhance my business model?',
          action: 'enhanceBusinessModel',
        });
        break;
      case 'investor':
        suggestions.push({
          text: 'What are the best staking strategies?',
          action: 'stakingStrategies',
        });
        break;
      case 'builder':
        suggestions.push({
          text: 'What developer tools should I learn first?',
          action: 'developerTools',
        });
        break;
    }
  }

  // Add general suggestions if we have few specific ones
  if (suggestions.length < 3) {
    suggestions.push({
      text: 'Tell me more about Money Factory AI',
      action: 'aboutMFAI',
    });
    suggestions.push({
      text: 'What benefits do NFT Pass holders get?',
      action: 'passHolderBenefits',
    });
  }

  // Return at most 4 suggestions
  return suggestions.slice(0, 4);
};

/**
 * Generate a contextual response from Zyno based on user input and context
 *
 * @param userPrompt User's question or prompt
 * @param context User's current context
 * @returns Zyno's response
 */
export const getZynoResponse = (userPrompt: string, context: ZynoContext): string => {
  // In a real implementation, this would call an AI API like OpenAI or use LangChain
  // For now, we'll use a simple pattern matching system

  const prompt = userPrompt.toLowerCase();

  // Handle wallet connection questions
  if (prompt.includes('wallet') || prompt.includes('connect')) {
    return `To connect your wallet, click the "Connect Wallet" button in the top right corner. We support MetaMask, WalletConnect, and Phantom wallets.
    
Once connected, you'll be able to:
- Access gated content
- Earn and claim NFTs
- Track your progress on-chain
- Participate in governance

Need help with a specific wallet? Let me know which one you're using.`;
  }

  // Handle NFT questions
  if (prompt.includes('nft') || prompt.includes('proof-of-skill')) {
    return `Proof-of-Skill™ NFTs are on-chain credentials that verify your knowledge and achievements in the Money Factory AI ecosystem.

These NFTs:
- Serve as your Web3 résumé
- Unlock access to advanced phases
- Can be displayed in your wallet or social profiles
- May provide special benefits in partner protocols

Complete phase missions to earn these valuable digital assets!`;
  }

  // Handle phase-specific questions
  if (context.phase && prompt.includes(context.phase.toLowerCase())) {
    switch (context.phase) {
      case 'Learn':
        return `The Learn phase is where your journey begins! Here, you'll:

1. Understand the fundamentals of Web3 and blockchain
2. Complete interactive lessons and quizzes
3. Earn your first XP points
4. Prepare for hands-on building in the next phase

I recommend starting with the "Web3 Basics" module and taking notes as you go. The quiz at the end will test your knowledge and unlock your first achievement.`;

      case 'Build':
        return `In the Build phase, you'll apply what you've learned by creating something tangible. This could be:

1. Setting up your first Web3 wallet
2. Creating a simple dApp or token
3. Designing a tokenized business model
4. Implementing a smart contract

I'm here to guide you through each step of the process. What specific project are you interested in building?`;

      case 'Prove':
        return `The Prove phase is where you demonstrate your skills and knowledge. You'll:

1. Complete a comprehensive assessment
2. Submit your project for review (if applicable)
3. Earn your Proof-of-Skill™ NFT upon successful completion
4. Gain access to the Activate phase

This is an important milestone in your journey! Take your time to prepare thoroughly before attempting the assessment.`;

      default:
        return `The ${context.phase} phase is an exciting part of your journey! Complete the current mission to advance and unlock new rewards and opportunities.`;
    }
  }

  // Handle XP questions
  if (prompt.includes('xp') || prompt.includes('points') || prompt.includes('level')) {
    return `XP (Experience Points) track your progress in the Money Factory AI ecosystem.

You currently have ${context.userXP || 0} XP points.

Ways to earn more XP:
- Complete phase missions (+50-250 XP)
- Participate in community events (+25-100 XP)
- Refer friends (+50 XP per referral)
- Hold an NFT Pass for 2x XP multiplier

Reach higher levels to unlock special rewards and recognition!`;
  }

  // Default response based on context
  return `I'm Zyno, your AI Co-Founder™ and guide through the Money Factory AI ecosystem.
  
I notice you're currently exploring the ${context.phase || 'journey selection'} ${context.persona ? `for the ${context.persona} persona` : ''}.

How can I assist you today? Whether you need help with the current mission, want to learn more about NFTs and rewards, or have questions about Web3 concepts, I'm here to help!`;
};

/**
 * Generate a proactive suggestion from Zyno based on user context
 *
 * @param context User's current context
 * @returns Zyno's proactive suggestion
 */
export const getZynoProactiveSuggestion = (context: ZynoContext): string => {
  // If wallet not connected, suggest connecting
  if (!context.walletConnected) {
    return "I notice you haven't connected your wallet yet. Connect to unlock all features and track your progress on-chain!";
  }

  // If in a specific phase, give phase-specific suggestion
  if (context.phase) {
    switch (context.phase) {
      case 'Learn':
        return 'Pro tip: Take notes during the learning modules. The quiz questions are directly related to the key concepts covered!';
      case 'Build':
        return 'Remember to test your project thoroughly before submission. I can help review your code or design if you need feedback!';
      case 'Prove':
        return "Before taking the assessment, review your notes from the Learn phase. You've got this!";
      case 'Activate':
        return 'When participating in governance, consider the long-term impact of proposals on the ecosystem.';
      case 'Scale':
        return "Have you considered creating content to share your journey? It's a great way to earn additional rewards!";
    }
  }

  // Persona-specific suggestions
  if (context.persona) {
    switch (context.persona) {
      case 'student':
        return 'Did you know? Completing all phases of your student journey qualifies you for the Education Grant program!';
      case 'entrepreneur':
        return 'Consider how your business model can incorporate both NFTs and fungible tokens for maximum engagement.';
      case 'investor':
        return 'Diversifying your staking strategy across multiple protocols can optimize your yield while managing risk.';
      case 'builder':
        return 'The MFAI developer community hosts weekly coding sessions. Great for networking and solving challenges together!';
    }
  }

  // Default suggestion
  return 'Zyno suggests: Explore all persona journeys to find the one that best matches your goals and interests!';
};

/**
 * Check if Zyno should proactively appear based on user context and actions
 *
 * @param context User's current context
 * @param lastInteraction Timestamp of last Zyno interaction
 * @returns Boolean indicating if Zyno should appear
 */
export const shouldZynoAppear = (context: ZynoContext, lastInteraction: number): boolean => {
  const now = Date.now();
  const timeSinceLastInteraction = now - lastInteraction;

  // Don't appear if interaction was recent (within 2 minutes)
  if (timeSinceLastInteraction < 2 * 60 * 1000) {
    return false;
  }

  // Always appear for new users (no persona selected)
  if (!context.persona) {
    return true;
  }

  // Appear when user is stuck on a phase for too long
  // This would require tracking time spent on each phase, simplified here
  if (context.phase && timeSinceLastInteraction > 5 * 60 * 1000) {
    return true;
  }

  // Random appearance with low probability (5%)
  return Math.random() < 0.05;
};
