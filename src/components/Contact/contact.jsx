import React, { useState } from "react";
import { MapPin, Send } from "lucide-react";
import emailjs from '@emailjs/browser';

import { Toast } from "../Toasts/Toast";
import styles from "./Contact.module.css";


// Load from environment variables
const EMAILJS_CONFIG = {
    SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID,
    TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    AUTO_REPLY_TEMPLATE_ID: import.meta.env.VITE_EMAILJS_AUTO_REPLY_ID,
    PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY
};

const TOAST_MESSAGES = {
    SUCCESS: {
        type: "success",
        title: "Message Sent! 🎉",
        message: "Thank you for reaching out. Check your email for confirmation!"
    },
    ERROR: {
        type: "error",
        title: "Failed to Send",
        message: "Something went wrong. Please try again or email me directly."
    }
};

export const Contact = () => {
    const [showToast, setShowToast] = useState(false);
    const [toastConfig, setToastConfig] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const formData = new FormData(e.target);

            // Prepare data for auto-reply
            const userName = formData.get('name')
            const userEmail = formData.get('email')
            const userSubject = formData.get('subject')
            const userMessage = formData.get('message')

            // Send both emails in parallel - ADD AWAIT and Promise.all()
            await Promise.all([
                // Email to you (main notification)
                emailjs.sendForm(
                    EMAILJS_CONFIG.SERVICE_ID,
                    EMAILJS_CONFIG.TEMPLATE_ID,
                    e.target,
                    EMAILJS_CONFIG.PUBLIC_KEY
                ),
                // Auto-reply to user
                emailjs.send(
                    EMAILJS_CONFIG.SERVICE_ID,
                    EMAILJS_CONFIG.AUTO_REPLY_TEMPLATE_ID,
                    {
                        to_email: userEmail,
                        name: userName,
                        email: userEmail,
                        subject: userSubject,
                        message: userMessage,
                        reply_to: 'sweekar.786b@gmail.com'
                    },
                    EMAILJS_CONFIG.PUBLIC_KEY
                )
            ]);

            // Success
            setToastConfig(TOAST_MESSAGES.SUCCESS);
            setShowToast(true);
            e.target.reset();

        } catch (error) {
            console.error('Email send failed:', error);
            setToastConfig(TOAST_MESSAGES.ERROR);
            setShowToast(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className={styles.container}>
            <Toast
                show={showToast}
                type={toastConfig.type}
                title={toastConfig.title}
                message={toastConfig.message}
                onClose={() => setShowToast(false)}
                duration={5000}
            />

            <div className={styles.content}>
                {/* Left column */}
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
                <form className={styles.formColumn} onSubmit={handleSubmit}>
                    <h3 className={styles.formTitle}>Send a Message</h3>
                    <p className={styles.formSubtitle}>
                        Fill in your details and I'll get back to you within 24-48 hours.
                    </p>

                    <div className={styles.row}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            className={styles.input}
                            required
                            disabled={isSubmitting}
                            autoComplete="name"
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            className={styles.input}
                            required
                            disabled={isSubmitting}
                            autoComplete="email"
                        />
                    </div>

                    <input
                        type="text"
                        name="subject"
                        placeholder="Subject"
                        className={styles.input}
                        required
                        disabled={isSubmitting}
                    />

                    <textarea
                        name="message"
                        placeholder="Your Message"
                        className={styles.textarea}
                        rows={5}
                        required
                        disabled={isSubmitting}
                    />

                    <button
                        type="submit"
                        className={styles.submitButton}
                        disabled={isSubmitting}
                        aria-label={isSubmitting ? 'Sending message' : 'Send message'}
                    >
                        <span>{isSubmitting ? 'Sending... ' : 'Send Message'}</span>
                        <Send className={styles.sendIcon} size={16} />
                    </button>
                </form>
            </div>
        </section>
    );
};
