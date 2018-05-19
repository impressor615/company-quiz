# pm2 deploy script
ENV="production"
pm2 deploy ecosystem.config.js "$ENV"
