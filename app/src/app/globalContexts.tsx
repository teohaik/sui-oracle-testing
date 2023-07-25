"use client";

import styles from "./page.module.css";
import { WalletKitProvider } from "@mysten/wallet-kit";
import { Navbar } from "./components/navbar/Navbar";

export default function GlobalContexts({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WalletKitProvider>
      <Navbar />
      <main className={styles.main}>{children}</main>
    </WalletKitProvider>
  );
}
