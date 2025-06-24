# ✅ Structure validée - Money Factory AI

## Checklist de validation de structure

- [x] Tous les composants utilisés sont dans un dossier dédié
- [ ] Aucun doublon (`VerticalTimeline`, `ZynoBox`, etc.) - _Liste identifiée dans files_to_remove.md_
- [x] Tous les fichiers .tsx sont typés et connectés
- [ ] Tous les `*.md` ont un frontmatter cohérent
- [x] Types centralisés dans `types/journey.ts`
- [x] Aucun fichier orphelin dans `components/Journey/` - _Réorganisation effectuée_
- [x] Parser markdown vérifié et enrichi
- [x] Registre des parcours créé dans `utils/journeyRegistry.ts`
- [x] Fichiers index.ts créés pour faciliter les imports

## 📁 Arborescence cible

```plaintext
components/
├── Journey/
│   ├── Header/
│   │   └── JourneyHeader.tsx
│   ├── Intro/
│   │   └── JourneyIntro.tsx
│   ├── Sidebar/
│   │   ├── JourneySidebar.tsx
│   │   └── FinalRoleSection.tsx
│   ├── WhyItMatters/
│   │   └── WhyItMatters.tsx
│   ├── Phases/
│   │   ├── PhaseSystem.tsx
│   │   ├── PhaseNavigator.tsx
│   │   ├── PhaseSection.tsx
│   │   ├── PhaseFeedback.tsx
│   │   └── EnhancedVerticalTimeline.tsx
│   ├── Rewards/
│   │   ├── ProofSection.tsx
│   │   └── RewardBadge.tsx
│   ├── Zyno/
│   │   ├── ZynoActions.tsx
│   │   └── ZynoSimulator.tsx
│   ├── SkillchainMap.tsx
│   └── XPTracker.tsx
├── Layout/
│   └── MainLayout.tsx
├── UI/
│   ├── badge.tsx
│   ├── button.tsx
│   ├── card.tsx
│   ├── modal.tsx
│   ├── progress.tsx
│   └── toast.tsx
├── Wallet/
│   ├── WalletConnect.tsx
│   └── NFTGate.tsx
```

## 📌 Fichiers clés à maintenir

| Fichier / dossier                      | Rôle                                           |
| -------------------------------------- | ---------------------------------------------- |
| `pages/journey/[slug].tsx`             | Route principale de consultation des parcours  |
| `components/Journey/Phases/`           | Logique d'affichage par phase + animations     |
| `components/Journey/Rewards/`          | Affichage des récompenses (badge, NFT, preuve) |
| `components/Journey/Zyno/`             | Accès à Zyno AI (à intégrer avec l'API réelle) |
| `components/Journey/SkillchainMap.tsx` | Connexion logique entre les parcours           |
| `journeys/*.md`                        | Contenus source avec frontmatter cohérent      |
| `utils/markdownParser.ts`              | Parser + enrichisseur de contenu Markdown      |
| `utils/journeyRegistry.ts`             | Registre des parcours et leurs relations       |
| `types/journey.ts`                     | Types centralisés pour tout le projet          |
| `store.ts`                             | État global Zustand                            |

## 🔄 Actions de refactoring effectuées

- [x] Centralisation des types dans `types/journey.ts`
- [x] Harmonisation des interfaces entre `markdownParser.ts` et les composants
- [x] Création du registre des parcours dans `utils/journeyRegistry.ts`
- [ ] Suppression des composants dupliqués
- [ ] Réorganisation des composants selon l'arborescence cible
- [ ] Renommage des fichiers pour plus de clarté

## 📝 Notes pour les développeurs

- Tous les composants doivent être typés avec TypeScript
- Privilégier l'utilisation des types centralisés dans `types/journey.ts`
- Pour ajouter un nouveau parcours, mettre à jour `journeyRegistry.ts`
- Utiliser les hooks Zustand pour la gestion d'état global
- Respecter la structure de dossiers pour tout nouveau composant
