import {
    fetchBeacon,
    fetchBeaconByTime,
    HttpChainClient,
    watch,
    HttpCachingChain,
    FastestNodeClient,
    MultiBeaconNode
} from 'drand-client'

const chainHash = '8990e7a9aaed2ffed73dbd7092123d6f289930540d7651336225dc172e51b2ce' // (hex encoded)
const publicKey = '868f005eb8e6e4ca0a47c8a77ceaa5309a47978a7c71bc5cce96366b5d7a569937c529eeda66c7293784a9402801af31' // (hex encoded)


const run = async () => {

    const options = {
        disableBeaconVerification: false, // `true` disables checking of signatures on beacons - faster but insecure!!!
        noCache: false, // `true` disables caching when retrieving beacons for some providers
        chainVerificationParams: {chainHash, publicKey}  // these are optional, but recommended! They are compared for parity against the `/info` output of a given node
    }


    // if you want to connect to a single chain to grab the latest beacon you can simply do the following
    const chain = new HttpCachingChain('https://api.drand.sh', options)
    const client = new HttpChainClient(chain, options)
    const theLatestBeacon = await fetchBeacon(client)
  console.log("theLatestBeacon: ", theLatestBeacon);

    const chaininfo = await chain.info();

    console.log("chaininfo: ", chaininfo);

    // alternatively you can also get the beacon for a given time
    const theBeaconRightNow = await fetchBeaconByTime(client, Date.now())

    console.log("theBeaconRightNow: ", theBeaconRightNow);



    // if you're happy to get randomness from many APIs and automatically use the fastest
    // you can construct a `FastestNodeClient` with multiple URLs
    // note: the randomness beacons are cryptographically verifiable, so as long as you fill
    // in the `chainVerificationParams` in the options, you don't need to worry about malicious
    // providers sending you fake randomness!
    const urls = [
        'https://api.drand.sh',
        'http://api2.drand.sh',
        'http://api3.drand.sh',
        'https://drand.cloudflare.com'
        // ...
    ];

  // finally you can interact with multibeacon nodes by using the `MultiBeaconNode` class
  // prior to drand 1.4, each node could only follow and contribute to a single beacon chain
  // - now nodes can contribute to many at once
  const multiBeaconNode = new MultiBeaconNode('https://api.drand.sh', options)

  // you can monitor its health
  const health = await multiBeaconNode.health()
  if (health.status === 200) {
    console.log(`Multibeacon node is healthy and has processed ${health.current} of ${health.expected} rounds`)
  }

  // get the chains it follows
  const chains = await multiBeaconNode.chains()
  for (const c of chains) {
    const info = await c.info()
    console.log(`Chain with baseUrl ${c.baseUrl} has a genesis time of ${info.genesis_time}`)
  }

  // and even create clients straight from the chains it returns
  const latestBeaconsFromAllChains =  await Promise.all(
      chains.map(chain => new HttpChainClient(chain, options))
          .map(client => fetchBeacon(client))
  )

  console.log("latestBeaconsFromAllChains: ", latestBeaconsFromAllChains);

};

run();
