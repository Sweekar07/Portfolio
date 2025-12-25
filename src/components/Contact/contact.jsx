import React, { useState } from "react";
import { MapPin, Send, ArrowLeftRight, Calendar, Mail, Clock, Video, ChevronLeft } from "lucide-react";
import Cal, { getCalApi } from "@calcom/embed-react";
import emailjs from '@emailjs/browser';

import { Toast } from "../Toasts/Toast";
import styles from "./Contact.module.css";

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

const MEETING_TYPES = [
    {
        duration: '15min',
        title: 'Quick Chat',
        description: 'Brief discussion about your project',
        icon: '☕',
        calLink: 'sweekar-bangera-byfpll/15min'
    },
    {
        duration: '30min',
        title: 'Project Discussion',
        description: 'Detailed conversation about requirements',
        icon: '💬',
        calLink: 'sweekar-bangera-byfpll/30min'
    },
    {
        duration: '60min',
        title: 'Deep Dive',
        description: 'Comprehensive project planning session',
        icon: '🚀',
        calLink: 'sweekar-bangera-byfpll/deep-dive'
    }
];

export const Contact = () => {
    const [showToast, setShowToast] = useState(false);
    const [toastConfig, setToastConfig] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedMeeting, setSelectedMeeting] = useState(null);

    React.useEffect(() => {
        (async function () {
            const cal = await getCalApi();
            cal("ui", {
                theme: "dark",
                styles: {
                    branding: {
                        brandColor: "#576cbc"
                    }
                },
                hideEventTypeDetails: false,
            });
        })();
    }, []);

    const handleToggle = () => {
        setShowCalendar(!showCalendar);
        setSelectedMeeting(null);
    };

    const handleMeetingSelect = (meeting) => {
        setSelectedMeeting(meeting);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const formData = new FormData(e.target);

            const userName = formData.get('name');
            const userEmail = formData.get('email');
            const userSubject = formData.get('subject');
            const userMessage = formData.get('message');

            await Promise.all([
                emailjs.sendForm(
                    EMAILJS_CONFIG.SERVICE_ID,
                    EMAILJS_CONFIG.TEMPLATE_ID,
                    e.target,
                    EMAILJS_CONFIG.PUBLIC_KEY
                ),
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
        <section id="contact" className={`${styles.container} ${selectedMeeting ? styles.fullWidthMode : ''}`}>
            <Toast
                show={showToast}
                type={toastConfig.type}
                title={toastConfig.title}
                message={toastConfig.message}
                onClose={() => setShowToast(false)}
                duration={5000}
            />

            {/* Full width calendar view */}
            {selectedMeeting ? (
                <div className={styles.fullWidthCalendar}>
                    <div className={styles.calendarHeader}>
                        <button
                            className={styles.backButtonLarge}
                            onClick={() => setSelectedMeeting(null)}
                        >
                            <ChevronLeft size={20} />
                            Back to meeting types
                        </button>
                        <h2 className={styles.calendarTitle}>
                            {selectedMeeting.icon} {selectedMeeting.title}
                        </h2>
                    </div>

                    <div className={styles.fullCalendarEmbed}>
                        <Cal
                            calLink={selectedMeeting.calLink}
                            style={{
                                width: "100%",
                                height: "100%"
                            }}
                            config={{
                                layout: "month_view",
                                theme: "dark"
                            }}
                        />
                    </div>
                </div>
            ) : (
                <div className={styles.content}>
                    {/* Left column */}
                    <div className={styles.leftColumn}>
                        <p className={styles.kicker}>Let's Connect</p>
                        <h2 className={styles.title}>Have something in mind?</h2>
                        <p className={styles.subtitle}>
                            Send me a message or book a call to discuss your project in detail.
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

                    {/* Right column */}
                    <div className={styles.formColumn}>
                        {/* Header with Toggle */}
                        <div className={styles.formHeader}>
                            <div className={styles.formHeaderLeft}>
                                {showCalendar ? (
                                    <>
                                        <Calendar size={20} className={styles.headerIcon} />
                                        <h3 className={styles.formTitle}>Book a Meeting</h3>
                                    </>
                                ) : (
                                    <>
                                        <Mail size={20} className={styles.headerIcon} />
                                        <h3 className={styles.formTitle}>Send a Message</h3>
                                    </>
                                )}
                            </div>
                            <button
                                type="button"
                                className={styles.toggleButton}
                                onClick={handleToggle}
                                aria-label={showCalendar ? "Switch to email form" : "Switch to calendar"}
                            >
                                <ArrowLeftRight size={18} />
                            </button>
                        </div>

                        {/* Email Form */}
                        {!showCalendar && (
                            <>
                                <p className={styles.formSubtitle}>
                                    Fill in your details and I'll get back to you within 24-48 hours.
                                </p>

                                <form onSubmit={handleSubmit}>
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
                                    >
                                        <span>{isSubmitting ? 'Sending... 🚀' : 'Send Message'}</span>
                                        <Send className={styles.sendIcon} size={16} />
                                    </button>
                                </form>
                            </>
                        )}

                        {/* Meeting Types */}
                        {showCalendar && (
                            <>
                                <p className={styles.formSubtitle}>
                                    Choose your preferred meeting duration
                                </p>

                                <div className={styles.meetingTypes}>
                                    {MEETING_TYPES.map((meeting) => (
                                        <div
                                            key={meeting.duration}
                                            className={styles.meetingCard}
                                            onClick={() => handleMeetingSelect(meeting)}
                                        >
                                            <div className={styles.meetingIcon}>{meeting.icon}</div>
                                            <div className={styles.meetingInfo}>
                                                <h4 className={styles.meetingTitle}>{meeting.title}</h4>
                                                <p className={styles.meetingDesc}>{meeting.description}</p>
                                                <div className={styles.meetingMeta}>
                                                    <span className={styles.metaItem}>
                                                        <Clock size={14} />
                                                        {meeting.duration}
                                                    </span>
                                                    <span className={styles.metaItem}>
                                                        <Video size={14} />
                                                        Google Meet
                                                    </span>
                                                </div>
                                            </div>
                                            <ArrowLeftRight size={18} className={styles.cardArrow} />
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </section>
    );
};
