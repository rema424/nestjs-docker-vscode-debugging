# Nest.js Docker VScode Debugging

## Step 1. Create a New App

With the following commands, create the directory (`nest-js-app`) and files for the app.

```
mkdir nest-js-app && cd nest-js-app
git init
touch .gitignore Dockerfile docker-compose.yml .dockerignore
```

The app directory structure should be:

```
- nest-js-app
    - .dockerignore
    - .gitignore
    - docker-compose.yml
    - Dockerfile
```

Add the following to the `Dockerfile` file:

```
FROM node:8.10.0

RUN mkdir -p /nest
ADD . /nest
WORKDIR /nest

RUN npm i -g @nestjs/cli
```

Add the following to the `docker-compose.yml` file:

```
version: "3"

services:
  nest:
    build: .
    volumes:
      - .:/nest
    ports:
      - 3000:3000
      - 9229:9229
    tty: true
```

Add the following to the `.gitignore` file:

```
# Logs
logs
*.log
npm-debug.log*

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage

# Dependency directories
node_modules/

# dotenv environment variables file
.env
```

Add the following to the `.dockerignore` file:

```
.git
.github
.vscode
coverage
docker-compose.yml
README.md

# Node Files #
node_modules
npm-debug.log
npm-debug.log.*
```

Build docker image:

```
docker-compose build
```

Start and login to the container:

```
docker-compose up -d
docker-compose exec nest bash
```

Scaffold the base project with the `Nest CLI` and install dependencies:

```
nest new .
npm install
```

Run the app:

```
npm start
```

Open a browser and navigate to `http://localhost:3000`.
You should see the `Hello world!` message.

## Step 2. Set up the debugging environment

With the following commands, install a necessary module.

```
npm i -D concurrently
```

With the following commands, create the directory (`.vscode`) and files for debugging.

```
mkdir .vscode && touch .vscode/launch.json nodemon-docker-debug.json
```

The app directory structure should be:

```
- nest-js-app
    - /.vscode
        |- launch.json
    - /node_modules
    - /src
    - /test
    - xxxxxxxx
    - xxxxxxxx
    - nodemon-docker-debug.json
    - xxxxxxxx
    - xxxxxxxx
    - package.json
    - xxxxxxxx
    - xxxxxxxx
```

Add the following to the `launch.json` file:

```
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Docker: Attach to Node",
      "type": "node",
      "request": "attach",
      "port": 9229,
      "address": "localhost",
      "localRoot": "${workspaceFolder}",
      "remoteRoot": "/nest",
      "protocol": "inspector"
    }
  ]
}
```

Add the following to the `nodemon-docker-debug.json` file:

```
{
  "watch": ["src"],
  "ext": "ts",
  "ignore": ["src/**/*.spec.ts"],
  "exec": "node --inspect=0.0.0.0 ./dist/main.js"
}
```

Add the following line into the scripts block of the `package.json` file:

```
"scripts": {
  "debug": "concurrently \"tsc -w -p .\" \"nodemon -L --config nodemon-docker-debug.json\"",

}
```

## Step 3. Debugging

For the test operation, add some codes into the `src/app.service.ts` and set breakpoints.

Run the app in debugging mode:

```
npm run debug
```

Start the debug on the VScode.

Open a browser and navigate to `http://localhost:3000`.
You should see the program stop at the breakpoints.
