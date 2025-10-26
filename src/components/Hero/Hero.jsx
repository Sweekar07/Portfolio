import React from "react";
import styles from "./Hero.module.css"
import { getImageUrl } from "../../utils";

export const Hero = () => {
    return <section className={styles.container}>
        <div className={styles.content}>
            <h2 className={styles.greeting}>Hi, my name is</h2>
            <h1 className={styles.title}>Sweekar Bangera.</h1>
            <p className={styles.description}>I'm a backend developer with 1 years of experience using Python, Flask, and FastAPI. 
                Reach out if you'd like to learn more!
            </p>
            <a className={styles.contactBtn} href="mailto:sweekar.786b@gmail.com">Contact Me</a>
        </div>
        <img src={getImageUrl("hero/heroImage.png")} alt="Hero Image of me" className={styles.heroImg} />
        <div className={styles.topBlur} />
        <div className={styles.bottomBlur} />
    </section>;
}