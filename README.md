<h1 align="center">Cineflix</h1>
<p align="center">
  <a href="https://cineflix-mf.netlify.app/" target="_blank">Online Preview</a>
</p>

## Preview

![image](https://i.imgur.com/TyiBc2T.jpeg)

## Setup

### Installing

```bash
# yarn
yarn install
```

## Development Server

Start the development server on http://localhost:3000

```bash
# yarn
yarn dev
```

## Run tests

```bash
yarn test
```

## Build docker

```bash
docker build -t cineflix .
```

## Run docker

```bash
docker run -p 3000:3000 cineflix:latest
```

## What's included

-   Persistent dummy auth with cookies
-   Protected routes
-   Landing page / Movie list / Movie detail / Login
-   Responsive design
-   Server/api tests
-   Dockerized
-   Deployed on Netlify
-   Typescript
