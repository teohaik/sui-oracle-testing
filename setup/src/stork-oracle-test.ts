import {
    bcs,
    Connection,
    Ed25519Keypair,
    fromB64,
    JsonRpcProvider,
    RawSigner,
    SUI_CLOCK_OBJECT_ID,
    TransactionBlock
} from "@mysten/sui.js";
import {
    ADMIN_CAP,
    ADMIN_SECRET_KEY,
    PACKAGE_ADDRESS,
    PRICE_LIST_STORE,
    SUI_NETWORK
} from "./config";

console.log("Connecting to SUI network: ", SUI_NETWORK);

console.log("Package =: ", PACKAGE_ADDRESS);


//ADMIN_SECRET_KEY is the private key (Base 64 encoded) of the admin account that is used to sign the transaction
//You can copy one from the ~.sui/sui_config/sui.keystore file and  define it as Environment Variable
let privateKeyArray = Uint8Array.from(Array.from(fromB64(ADMIN_SECRET_KEY!)));
const keypair = Ed25519Keypair.fromSecretKey(privateKeyArray.slice(1));


const run = async () => {
    const connection = new Connection({
        fullnode: SUI_NETWORK,
    });
    const provider = new JsonRpcProvider(connection);

    const signer = new RawSigner(keypair, provider);

    const tx = new TransactionBlock();

    tx.moveCall({
        target: `${PACKAGE_ADDRESS}::stork_price_demo::update_price`,
        arguments: [
            tx.object(ADMIN_CAP),  // Admin Cap Object Id
            tx.object(PRICE_LIST_STORE), // PriceListStore Object Id
            tx.pure("SUIUSD"),  //assetPairName
            tx.pure("123"), //new Price
            tx.object(SUI_CLOCK_OBJECT_ID), //Clock Object Id
        ]
    });

    tx.setGasBudget(1000000000);

    let res = await signer.signAndExecuteTransactionBlock({
        transactionBlock: tx,
        requestType: "WaitForLocalExecution",
        options: {
            showEvents: true,
            showEffects: true,
            showObjectChanges: true,
            showBalanceChanges: true,
            showInput: true
        }
    });
    console.log(res);
};

run();
