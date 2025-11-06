import React from "react";
import styles from "./SocialLinks.module.css";
import { Mail } from "lucide-react"
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

export const SocialLinks = () => {
    return (
        <div className={styles.socialContainer}>
            <ul className={styles.socialList}>
                <li>
                    <a
                        href="https://github.com/Sweekar07"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                    >
                        <FaGithub size={24} />
                    </a>
                </li>
                <li>
                    <a
                        href="https://linkedin.com/in/sweekar-bangera"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                    >
                        <FaLinkedin size={24} />
                    </a>
                </li>
                <li>
                    <a
                        href="https://leetcode.com/u/user1309BV/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Leetcode"
                    >
                        <SiLeetcode size={24} />
                    </a>
                </li>
                <li>
                    <a
                        href="mailto:sweekar.786b@gmail.com"
                        aria-label="Email"
                    >
                        <Mail size={24} />
                    </a>
                </li>
            </ul>
            <div className={styles.verticalLine}></div>
        </div>
    );
};
