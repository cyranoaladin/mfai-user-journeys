const { watch } = require('fs');
const { exec } = require('child_process');
const path = require('path');
const logger = require('../utils/logger').default;

const tsConfigPath = path.join(__dirname, '..', 'tsconfig.json');

logger.log('🔍 Surveillance du serveur TypeScript démarrée...');

watch(tsConfigPath, eventType => {
  if (eventType === 'change') {
    logger.log('🔄 Redémarrage du serveur TypeScript...');
    exec('npm run restart-ts', (error, stdout, stderr) => {
      if (error) {
        logger.error('❌ Erreur:', error);
        return;
      }
      logger.log('✅ Serveur TypeScript redémarré avec succès');
    });
  }
});
