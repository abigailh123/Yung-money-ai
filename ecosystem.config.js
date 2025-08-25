module.exports = {
  apps: [
    {
      name: 'yung-money-backend',
      script: 'uvicorn',
      args: 'src.main:app --host 0.0.0.0 --port 6000 --workers 2',
      cwd: './backend',
      interpreter: 'python3',
      env: {
        NODE_ENV: 'production',
        PYTHONPATH: './src',
        // Add your environment variables here
        // DATABASE_URL: 'your_mongodb_connection_string',
        // OPENAI_API_KEY: 'your_openai_api_key',
      },
      env_production: {
        NODE_ENV: 'production',
        PYTHONPATH: './src',
      },
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      error_file: './logs/backend-error.log',
      out_file: './logs/backend-out.log',
      log_file: './logs/backend-combined.log',
      time: true,
      restart_delay: 4000,
      max_restarts: 10,
      min_uptime: '10s'
    },
    {
      name: 'yung-money-frontend',
      script: 'npm',
      args: 'start',
      cwd: './frontend',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        // Add your frontend environment variables here
        // API_KEY: 'your_google_gemini_api_key',
        // NEXT_PUBLIC_API_URL: 'http://localhost:6000',
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '512M',
      error_file: './logs/frontend-error.log',
      out_file: './logs/frontend-out.log',
      log_file: './logs/frontend-combined.log',
      time: true,
      restart_delay: 4000,
      max_restarts: 10,
      min_uptime: '10s'
    }
  ],

  deploy: {
    production: {
      user: 'your-username',
      host: 'your-vps-ip',
      ref: 'origin/main',
      repo: 'git@github.com:yourusername/yung-money-ai.git',
      path: '/var/www/yung-money-ai',
      'pre-deploy-local': '',
      'post-deploy': 'npm install --legacy-peer-deps && cd backend && pip install -r requirements.txt && cd ../frontend && npm run build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
