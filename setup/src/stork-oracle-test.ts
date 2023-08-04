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
    ADMIN_ADDRESS,
    ADMIN_CAP,
    ADMIN_SECRET_KEY,
    PACKAGE_ADDRESS,
    PRICE_LIST_OBJECT_TABLE, PRICE_LIST_VEC_MAP,
    SUI_NETWORK
} from "./config";
import { getCoinsOfAddress } from "./examples/getCoinsOfAddress";

console.log("Connecting to SUI network: ", SUI_NETWORK);

console.log("Package =: ", PACKAGE_ADDRESS);


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
        target: `${PACKAGE_ADDRESS}::stork_price_demo::update_price_object_table`,
        arguments: [
            tx.object(ADMIN_CAP),
            tx.object(PRICE_LIST_OBJECT_TABLE),
            tx.pure("SUIUSD"),
            tx.pure("6666666666"), //new Price
            tx.object(SUI_CLOCK_OBJECT_ID),
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
