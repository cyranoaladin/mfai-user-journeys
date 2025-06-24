import { useCallback } from 'react';

interface PhaseData {
  name: string;
  title: string;
  content: string;
  description: string;
  mission: string;
  xpReward: number;
  icon: string;
  nftReward?: string;
}

const DEFAULT_PHASES: PhaseData[] = [
  {
    name: 'Cognitive',
    title: 'Cognitive Activation Protocol™',
    content:
      'Bienvenue dans la phase Cognitive du parcours MFAI. Cette phase vous permet de développer votre compréhension des concepts fondamentaux de Money Factory AI.',
    description: 'Développez votre compréhension des concepts fondamentaux de Money Factory AI',
    mission: 'Complétez le quiz de compréhension cognitive',
    xpReward: 50,
    icon: 'brain',
    nftReward: 'cognitive-badge',
  },
  {
    name: 'Synaptic',
    title: 'Synaptic Connection Protocol™',
    content:
      "La phase Synaptique vous permet de connecter les concepts entre eux et de comprendre comment ils interagissent dans l'écosystème Money Factory.",
    description: "Connectez les concepts entre eux dans l'écosystème Money Factory",
    mission: 'Participez à une session communautaire',
    xpReward: 75,
    icon: 'zap',
    nftReward: 'synaptic-badge',
  },
  {
    name: 'Neural',
    title: 'Neural Network Protocol™',
    content:
      'La phase Neurale vous permet de construire votre réseau de connaissances et de compétences au sein de Money Factory.',
    description: 'Construisez votre réseau de connaissances et de compétences',
    mission: 'Complétez un module de formation avancé',
    xpReward: 100,
    icon: 'activity',
    nftReward: 'neural-badge',
  },
  {
    name: 'Activation',
    title: 'Activation Mechanism Protocol™',
    content:
      "La phase d'Activation vous permet de mettre en pratique vos connaissances et de commencer à générer de la valeur dans l'écosystème.",
    description: 'Mettez en pratique vos connaissances et générez de la valeur',
    mission: 'Contribuez à un projet communautaire',
    xpReward: 125,
    icon: 'power',
    nftReward: 'activation-badge',
  },
  {
    name: 'Amplification',
    title: 'Amplification Catalyst Protocol™',
    content:
      "La phase d'Amplification vous permet de maximiser votre impact et d'accélérer votre progression dans l'écosystème Money Factory.",
    description: 'Maximisez votre impact et accélérez votre progression',
    mission: "Lancez votre propre initiative dans l'écosystème",
    xpReward: 150,
    icon: 'trending-up',
    nftReward: 'amplification-badge',
  },
];

export const usePhaseData = () => {
  const getPhaseData = useCallback((phaseIndex: number): PhaseData => {
    return DEFAULT_PHASES[phaseIndex] || DEFAULT_PHASES[0];
  }, []);

  return {
    phaseData: DEFAULT_PHASES,
    getPhaseData,
  };
};
