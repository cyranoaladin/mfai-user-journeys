# Files to remove or merge

This document lists the files that can be removed or merged to clean up the project structure.

## Duplicate Files

| File to remove                             | Replaced by                                         | Justification                                                |
| ------------------------------------------ | --------------------------------------------------- | ------------------------------------------------------------ |
| `/components/Journey/VerticalTimeline.tsx` | `/components/Journey/Timeline/VerticalTimeline.tsx` | Newer version with better typing in the Timeline folder      |
| `/components/Journey/JourneyCard.tsx`      | `/components/Journey/EnhancedJourneyCard.tsx`       | EnhancedJourneyCard is more complete with more features      |
| `/components/Journey/ZynoBox.tsx`          | `/components/Journey/Zyno/ZynoActions.tsx`          | Similar functionality, ZynoActions is more complete          |
| `/components/Journey/ZynoTeaser.tsx`       | `/components/Journey/Zyno/ZynoSimulator.tsx`        | Similar functionality, to be consolidated in the Zyno folder |
| `/components/Journey/NFTBadge.tsx`         | `/components/Journey/Rewards/RewardBadge.tsx`       | Renamed for clarity and moved to the Rewards folder          |
| `/components/Journey/ProofBadge.tsx`       | `/components/Journey/Rewards/RewardBadge.tsx`       | Similar functionality, to be consolidated                    |

## Files to move

| File to move                             | New destination                                 | Justification                        |
| ---------------------------------------- | ----------------------------------------------- | ------------------------------------ |
| `/components/Journey/PhaseNavigator.tsx` | `/components/Journey/Phases/PhaseNavigator.tsx` | Logical grouping of phase components |
| `/components/Journey/PhaseSection.tsx`   | `/components/Journey/Phases/PhaseSection.tsx`   | Logical grouping of phase components |
| `/components/Journey/JourneyIntro.tsx`   | `/components/Journey/Intro/JourneyIntro.tsx`    | Organization by functional domain    |

## Folders to consolidate

| Current folder                       | Action                                    | Justification                     |
| ------------------------------------ | ----------------------------------------- | --------------------------------- |
| `/components/Journey/PhaseSystem/`   | Merge into `/components/Journey/Phases/`  | Organization by functional domain |
| `/components/Journey/PhaseFeedback/` | Merge into `/components/Journey/Phases/`  | Organization by functional domain |
| `/components/Journey/ProofSection/`  | Merge into `/components/Journey/Rewards/` | Organization by functional domain |
| `/components/Journey/ZynoActions/`   | Merge into `/components/Journey/Zyno/`    | Organization by functional domain |

## Important Notes

- Before removing a file, make sure it is not referenced elsewhere in the code
- Update imports in files that use these components
- Test the application after each series of modifications
