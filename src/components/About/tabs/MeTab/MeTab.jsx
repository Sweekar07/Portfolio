import React from 'react';

import { useTypingEffect } from '../../hooks/useTypingEffect';
import styles from './MeTab.module.css';


const roles = [
    "Python Developer.",
    "Backend Developer.",
    "Aspiring Full-Stack Developer.",
];

const MeTab = () => {
    const currentRole = useTypingEffect(roles);

    return (
        <div className={styles.meSection}>
            <div className={styles.intro}>
                <p className={styles.greeting}>Hello, I'm</p>
                <h3 className={styles.name}>Sweekar Bangera</h3>
                <p className={styles.roleWrapper}>
                    A passionate
                    <span className={styles.dynamicRole}>
                        {currentRole}
                        <span className={styles.cursor}></span>
                    </span>
                </p>
            </div>

            <div className={styles.story}>
                <p>
                    I enjoy designing <span className={styles.highlight}>scalable backend systems</span> and
                    crafting smooth, responsive interfaces. My focus is on connecting backend logic with
                    intuitive UIs to build seamless, end-to-end experiences.
                </p>
                <p>
                    I’m constantly learning and exploring new technologies — from{" "}
                    <span className={styles.highlight}>APIs</span> and{" "}
                    <span className={styles.highlight}>automation</span> to modern web frameworks. I love
                    turning ideas into clean, reliable, and efficient software that makes life easier.
                </p>
            </div>

            <div className={styles.techStack}>
                <h4>Here are a few technologies I've been working with recently:</h4>
                <div className={styles.techGrid}>
                    <ul>
                        <li>Python</li>
                        <li>Django & DRF</li>
                    </ul>
                    <ul>
                        <li>PostgreSQL</li>
                        <li>Redis</li>
                    </ul>
                    <ul>
                        <li>Docker</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default MeTab;
