module.exports = {
  apps: [{
    name: 'company-quiz',
    script: 'npm start',
  }],
  deploy: {
    production: {
      user: 'ubuntu',
      host: 'ec2-13-209-35-227.ap-northeast-2.compute.amazonaws.com',
      ref: 'origin/master',
      repo: 'git@github.com:impressor615/company-quiz.git',
      path: '/home/ubuntu/company-quiz',
      'post-deploy': 'npm install && pm2 startOrRestart pm2_deploy',
    },
  },
};
