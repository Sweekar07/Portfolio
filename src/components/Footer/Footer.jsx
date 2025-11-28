import React from "react";
import styles from "./Footer.module.css";
import { Flame  } from "lucide-react";

export const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <p className={styles.text}>
                © {year} Sweekar Bangera
                <span className={styles.separator}>•</span>
                Built with
                <Flame  className={styles.icon} size={14} fill="currentColor" />
                using
                <span className={styles.tech}>React</span>
                <span className={styles.dot}>+</span>
                <span className={styles.tech}>Vite</span>
            </p>
        </footer>
    );
};
