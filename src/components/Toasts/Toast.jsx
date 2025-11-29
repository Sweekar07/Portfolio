import React, { useEffect } from "react";
import { X, AlertCircle, CheckCircle, Info, Construction } from "lucide-react";

import styles from "./Toast.module.css";

export const Toast = ({ 
    message, 
    title = "Notification",
    type = "info", // 'success', 'error', 'warning', 'info', 'progress'
    onClose, 
    duration = 5000,
    show 
}) => {
    useEffect(() => {
        if (show && duration > 0) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [show, duration, onClose]);

    if (!show) return null;

    const getIcon = () => {
        switch (type) {
            case 'success':
                return <CheckCircle size={24} />;
            case 'error':
                return <AlertCircle size={24} />;
            case 'warning':
                return <AlertCircle size={24} />;
            case 'progress':
                return <Construction size={24} />;
            default:
                return <Info size={24} />;
        }
    };

    const getIconClass = () => {
        switch (type) {
            case 'success':
                return styles.iconSuccess;
            case 'error':
                return styles.iconError;
            case 'warning':
                return styles.iconWarning;
            case 'progress':
                return styles.iconProgress;
            default:
                return styles.iconInfo;
        }
    };

    return (
        <div className={styles.toast}>
            <div className={`${styles.toastContent} ${styles[type]}`}>
                <div className={`${styles.toastIcon} ${getIconClass()}`}>
                    {getIcon()}
                </div>
                <div className={styles.toastText}>
                    <h4>{title}</h4>
                    <p>{message}</p>
                </div>
                <button 
                    className={styles.toastClose}
                    onClick={onClose}
                    aria-label="Close notification"
                >
                    <X size={20} />
                </button>
            </div>
        </div>
    );
};
