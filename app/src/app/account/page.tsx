"use client";

import styles from "./page.module.css";
import { useGetOwnedObjects } from "../hooks/useGetOwnedObjects";

export default function Account() {
  const { data, isLoading, isError, currentAccount } = useGetOwnedObjects();

  if (!currentAccount) {
    return <h3>Wallet not connected</h3>;
  }

  const renderContent = () => {
    if (isLoading) {
      return <h3>Loading...</h3>;
    }
    if (isError) {
      return <h3>Error</h3>;
    }
    return (
      <div style={{ whiteSpace: "pre-wrap" }}>
        {JSON.stringify(data, null, 2)}
      </div>
    );
  };

  return (
    <div className={styles.stack}>
      <h3>Your first 5 owned objects</h3>
      {renderContent()}
    </div>
  );
}
