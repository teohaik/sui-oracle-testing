# Sui Oracle invocation examples

This repo is a template POC, that will be used for initializing future POCs easier.

- Inspired by: [POC Template](https://github.com/MystenLabs/poc-template)

### Directories structure

- move:

  - Contains the Move code of the smart contracts
  - Contains a sample package named `poc` where the developer can add a move module and start building

- app

  - Contains a Typescript NextJS App, with ready-to-use:
    - // TODO: three different user roles
    - // TODO: routing based on the permissions of the current user
    - `api` directory, to utilize vercel serverless functions upon deployment
    - integration with [Vercel KV](https://vercel.com/docs/storage/vercel-kv/quickstart) for having a persistent storage without managing the deployment of a database
    - `Sui TS SDK` integration
    - `Sui Wallet` connection
    - `environment variables` file reading

- setup
  - A Typescript project, with ready-to-use:
    - environment variable (.env) file reading
    - Sui SDK integration
    - publish shell script

### Local development with Vercel KV

- To be able to connect with the vercel KV storage in the local development environment, please follow the steps:
  - install vercel cli
  - run `vercel link` in the root directory of the project
  - select `Mysten Labs`
  - link to existing project
  - run `vercel env pull app/.env.development.local`
    - the created `app/.env.development.local` file should have the same format with the `app/.env.development.local.example` directory
  - start the dev server with:
    - `pnpm run dev` inside the app directory
    - or `vercel dev` in the project's root directory
  - visit the url: `http://localhost:3000/api/visits` in your browser, and observe the `pageVisits` counter being incremented with each visit
