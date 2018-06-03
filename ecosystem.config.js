module.exports = {
  apps: [{
    name: 'tpay',
    script: 'npm'
    args: 'start'
    env: { COMMON_VARIABLE: true },
  }],
  deploy: {
    production: {
      user: 'ubuntu',
      host: 'ec2-13-125-213-8.ap-northeast-2.compute.amazonaws.com',
      key: '~/.ssh/demian.pem',
      ref: 'origin/master',
      repo: 'git@github.com:impressor615/company-quiz.git',
      path: '/home/ubuntu/company-quiz',
      'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
    }
  }
}
