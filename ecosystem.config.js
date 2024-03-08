module.exports = {
  apps: [
    {
      name: 'discord-img-bot',
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
      host : '127.0.0.1',
      ref  : 'origin/master',
      repo : 'git@gitlab.com:ares-only/discord-img-bot.git',
      path : '/var/app/discord-img-bot',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
}
