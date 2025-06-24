const { watch } = require('fs');
const { exec } = require('child_process');
const path = require('path');

const tsConfigPath = path.join(__dirname, '..', 'tsconfig.json');

console.log('🔍 Surveillance du serveur TypeScript démarrée...');

watch(tsConfigPath, eventType => {
  if (eventType === 'change') {
    console.log('🔄 Redémarrage du serveur TypeScript...');
    exec('npm run restart-ts', (error, stdout, stderr) => {
      if (error) {
        console.error('❌ Erreur:', error);
        return;
      }
      console.log('✅ Serveur TypeScript redémarré avec succès');
    });
  }
});
