import {bcs, Connection, Ed25519Keypair, fromB64, JsonRpcProvider, RawSigner, TransactionBlock} from "@mysten/sui.js";
import {ADMIN_ADDRESS, ADMIN_SECRET_KEY, PACKAGE_ADDRESS, SUI_NETWORK} from "./config";
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

  let newTaxi = tx.moveCall({
    target: `0x8907e9fc3b498804477944999e23a0519b1b95b54caa1d52a444429adbfafdf5::verify::verify_sig`,
    arguments: [
      tx.pure("0xf024a9aa110798e5cd0d698fba6523113eaa7fb2"),
      tx.pure("SUIUSD"),
      tx.pure("590472435427000000"),
      tx.pure("1691140456"),
      tx.pure("0x523465bf036be9202386c9ddc95f9e0aaf0fbe666d93a31d4c19b5681643a7290x1fd00502eb25450fbc9ee4cbf8fa15388ab23b8619423c255079602e1858f2830x1b"),
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
