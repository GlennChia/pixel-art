# Pixel-art app

# 1. Helper scripts for installing on EC2

For the backend I use Amazon Linux 2 AMI

```bash
#! /bin/bash

sudo su
yum update -y
yum install git -y
git clone -b develop https://github.com/GlennChia/pixel-art.git
cd pixel-art
cd backend
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
. ~/.nvm/nvm.sh
nvm install node
npm i
echo "environment=development" >> .env
echo "PORT_LOCAL=80" >> .env
echo "PORT_DEV=80" >> .env
echo "PORT_PROD=80" >> .env
npm i pm2 -g
pm2 start app.js
```

For the frontend I use Ubuntu 18.04 AMI

- Note: If we want to specify it to run on port 80, run the following

  ```bash
  sed -i "s/\"start\": \"react-scripts start\",/\"start\": \"PORT=80 react-scripts start\",/" package.json
  ```

- To run it in the background

  ```bash
  npm install pm2 -g
  pm2 --name PixelArt start npm -- start
  ```

- Otherwise, if we want to stick to the default package.json but still run it on port 80

  ```bash
  PORT=80 npm run start
  ```

  

```bash
#! /bin/bash

sudo su
apt update -y
apt-get install curl -y
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo npm install npm@latest -g
npm install -g create-react-app
apt install git -y
git clone -b develop https://github.com/GlennChia/pixel-art.git
cd pixel-art
cd frontend
cd pixel-art
npm i silent
echo "REACT_APP_ENVIRONMENT=PROD" >> .env
echo "REACT_APP_BACKEND_DEV=localhost:80" >> .env
echo "REACT_APP_BACKEND_PROD=<BACKEND_IP>" >> .env
echo "REACT_APP_BACKEND_DOCKER=localhost:80" >> .env
sed -i "s/\"start\": \"react-scripts start\",/\"start\": \"PORT=80 react-scripts start\",/" package.json
npm install pm2 -g
pm2 --name PixelArt start npm -- start
```

Useful pm2 commands

- `pm2 ps`: List all the running pm2 processes
- `pm2 delete 0`: Stopping a pm2 process