"use client";

import Link from "next/link";
import styles from "./navbar.module.css";
import { ConnectButton } from "@mysten/wallet-kit";
import { usePathname, useRouter } from "next/navigation";
import { useGetNavigations } from "@/app/hooks/useGetNavigations";

export const Navbar = () => {
  const pathname = usePathname();
  const { navigations } = useGetNavigations();
  console.log(pathname);

  return (
    <div className={styles.navbar}>
      <div className={styles.navbar_section}>
        {navigations.map(({ title, href }) => (
          <Link
            key={href}
            className={`${styles.navbar_link} ${
              pathname === href ? styles.navbar_link_active : ""
            }`}
            href={href}
          >
            {title}
          </Link>
        ))}
      </div>
      <ConnectButton />
    </div>
  );
};
