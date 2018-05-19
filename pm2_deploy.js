module.exports = {
  apps: [{
    name: 'company-quiz',
    script: 'npm start',
    env: {
      COMMON_VARIABLE: 'true',
    },
    env_production: {
      NODE_ENV: 'production',
    },
  }],
  deploy: {
    production: {
      user: 'ubuntu',
      host: 'ec2-13-209-35-227.ap-northeast-2.compute.amazonaws.com',
      ref: 'origin/master',
      repo: 'git@github.com:impressor615/company-quiz.git',
      path: '/home/ubuntu/company-quiz',
      'post-deploy': 'npm install && pm2 startOrRestart pm2_deploy',
      env: {
        NODE_ENV: 'production',
      },
    },
  },
};
