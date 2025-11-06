import React from "react";
import styles from "./EmailLink.module.css";

export const EmailLink = () => {
    return (
        <div className={styles.emailContainer}>
            <a 
                href="mailto:sweekar.786b@gmail.com"
                className={styles.emailLink}
            >
                sweekar.786b@gmail.com
            </a>
            <div className={styles.verticalLine}></div>
        </div>
    );
};
