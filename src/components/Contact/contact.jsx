import React from "react";
import { MapPin, Send } from "lucide-react";

import styles from "./Contact.module.css";


export const Contact = () => {
    return (
        <section id="contact" className={styles.container}>
            <div className={styles.content}>
                {/* Left column - Text & Info */}
                <div className={styles.leftColumn}>
                    <p className={styles.kicker}>Let's Connect</p>
                    <h2 className={styles.title}>Have something in mind?</h2>
                    <p className={styles.subtitle}>
                        Whether it's a project, job opportunity, collaboration, or just to say hi—
                        I'd love to hear from you. Drop me a message!
                    </p>

                    <div className={styles.locationBox}>
                        <div className={styles.locationIconWrapper}>
                            <MapPin className={styles.locationIcon} size={24} />
                        </div>
                        <div className={styles.locationInfo}>
                            <span className={styles.locationLabel}>Based In</span>
                            <span className={styles.locationValue}>Mumbai</span>
                        </div>
                    </div>
                </div>

                {/* Right column - Form */}
                <form
                    className={styles.formColumn}
                    onSubmit={(e) => e.preventDefault()}
                >
                    <h3 className={styles.formTitle}>Send a Message</h3>
                    <p className={styles.formSubtitle}>
                        Fill in your details and I'll get back to you as soon as possible.
                    </p>

                    <div className={styles.row}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            className={styles.input}
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            className={styles.input}
                            required
                        />
                    </div>

                    <input
                        type="text"
                        name="subject"
                        placeholder="Subject"
                        className={styles.input}
                        required
                    />

                    <textarea
                        name="message"
                        placeholder="Your Message"
                        className={styles.textarea}
                        rows={5}
                        required
                    />

                    <button type="submit" className={styles.submitButton}>
                        <span>Send Message</span>
                        <Send className={styles.sendIcon} size={16} />
                    </button>
                </form>
            </div>
        </section>
    );
};
