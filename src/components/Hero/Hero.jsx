import React from "react";

import styles from "./Hero.module.css"
import { getImageUrl } from "../../utils";

export const Hero = () => {
    return <section className={styles.container}>
        <div className={styles.content}>
            <h2 className={styles.greeting}>Hi, my name is</h2>
            <h1 className={styles.title}>Sweekar Bangera.</h1>
            <h1 className={styles.subtitle}>I build things for the web and mobile.</h1>
            <p
                className={styles.description}>I’m a software engineer passionate about designing scalable backend systems while also contributing to the frontend to deliver seamless, end-to-end user experiences.
            </p>
        </div>
        <img src={getImageUrl("hero/heroImage.png")} alt="Hero Image of me" className={styles.heroImg} />
        <div className={styles.topBlur} />
        <div className={styles.bottomBlur} />
    </section>;
}