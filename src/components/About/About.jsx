import React from "react";
import styles from "./About.module.css"
import { getImageUrl } from "../../utils";

export const About = () => {
    return <section className={styles.container} id="about">
        <h2 className={styles.title}>About</h2>
        <div className={styles.content}>
            <img 
                src={getImageUrl("about/aboutImage.png")} 
                alt="Me sitting with a laptop" 
                className={styles.aboutImg}
            />
            <ul className={styles.aboutItems}>
                <li className={styles.aboutItem}>
                    <img src={getImageUrl("about/cursorIcon.png")} alt="Cursor icon" />
                    <div className={styles.aboutText}>
                        <h3>Backend Developer</h3>
                        <p>I'm a backend developer with experience in building secure and optimized APIs.</p>
                    </div>
                </li>
                <li className={styles.aboutItem}>
                    <img src={getImageUrl("about/serverIcon.png")} alt="server icon" />
                    <div className={styles.aboutText}>
                        <h3>Backend Developer</h3>
                        <p>I have experience in developing fast and optimized backend systems and API</p>
                    </div>
                </li>
                <li className={styles.aboutItem}>
                    <img src={getImageUrl("about/serverIcon.png")} alt="UI icon" />
                    <div className={styles.aboutText}>
                        <h3>UI Designer</h3>
                        <p>I have designed multiple landing pages and have created design systems as well.</p>
                    </div>
                </li>
            </ul>
        </div>
    </section>
};