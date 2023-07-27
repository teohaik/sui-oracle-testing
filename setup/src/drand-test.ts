import {
    fetchBeacon,
    fetchBeaconByTime,
    HttpChainClient,
    watch,
    HttpCachingChain,
    FastestNodeClient,
    MultiBeaconNode
} from 'drand-client'
import {verifyBeacon} from "drand-client/beacon-verification";

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

    let verified = await verifyBeacon(chaininfo, theBeaconRightNow);

    console.log("Beacon Verified ", verified);

    //hex random bytes
    const hexRand = theBeaconRightNow.randomness;

    console.log("hexRand: ", hexRand);

    //int random bytes
    const intRand = parseInt(hexRand, 16    );

    console.log("intRand: ", intRand);

};

run();
