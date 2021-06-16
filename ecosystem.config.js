module.exports = {
  apps: [
    {
      name: 'ares-back-boner',
      script: 'npm',
      args: 'start',
      env: {
        "NODE_ENV": "production"
      },
      autorestart: true,
      restart_delay: 1000
    }
  ],
  deploy: {
    production: {
      user : 'root',
      host : '194.163.131.134',
      ref  : 'origin/master',
      repo : 'git@gitlab.com:ares-only/back-boner-bot.git',
      path : '/var/app/ares-back-boner',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
}
