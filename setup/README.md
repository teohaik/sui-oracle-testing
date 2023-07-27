# Setup

## Description

A Typescript project that contains examples of interactions with Oracles, using the Typescript SDK.

```

setup
  |-- publish.sh
  |-- src
    |-- config.ts
    |-- drand-test.ts
    |-- stork-oracle.test.ts
    |-- setup.ts
    |-- socket-server
      |-- socket-client.mjs
      |-- socket-server.mjs

```


`drand-test` file contains the example usage of the drand oracle.

`stork-oracle.test` file contains the example usage of the stork oracle.

`socket-server` folder contains a simple example  of a web socket server / client interaction. 
To use it, first Run the `socket-server.mjs` file and then the `socket-client.mjs` file.


## Environment variables

- Create a `.env` file following the format of the `.env.example` file, to insert the target sui network, or any other env. variables you need
- `.env` file is not tracked by Git
- Add the corresponding export statements in the `src/config.ts` file
- Export your admin address by running: `export ADMIN_ADDRESS="your address here"`
- Export your admin Private Key by running: `export ADMIN_SECRET_KEY="your secret key here"`

Note: If you have a custom admin address, you can change the admin phrase in the publish.sh script: `ADMIN_PHRASE="loop other...."`

## Project structure

- `publish.sh`: the publish script
- `src/`:
  - `config.ts`: retrieves and exports the specified environmental variables of the .env file (and the host machine)
  - `examples.ts`: some Typescript modules exporting functions with the example usage of the TS SDK
  - `setup.ts`: the main module, which is ran by `npm run setup`

## Local Deployment

- Run the deployment script: `./publish.sh`

## Testnet Deployment

- Switch your local cli to testnet env:

```shell
sui client switch --env testnet
cd setup
./publish testnet
```
