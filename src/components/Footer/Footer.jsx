import React, { useState, useEffect } from "react";
import { Flame, Eye } from "lucide-react";

import styles from "./Footer.module.css";
import supabase from "../../lib/supabase";

export const Footer = () => {
    const year = new Date().getFullYear();
    const [visitorCount, setVisitorCount] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchVisitorCount();
    }, []);

    const fetchVisitorCount = async () => {
        try {
            const { data, error } = await supabase.rpc("get_unique_visitor_count");
            console.log("visitior count data:", data);
            if (error) throw error;

            setVisitorCount(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching visitor count:', error);
            setLoading(false);
        }
    };

    return (
        <footer className={styles.footer}>
            <p className={styles.text}>
                © {year} Sweekar Bangera
                <span className={styles.separator}>•</span>
                Built with
                <Flame className={styles.icon} size={14} fill="currentColor" />
                using
                <span className={styles.tech}>React</span>
                <span className={styles.dot}>+</span>
                <span className={styles.tech}>Vite</span>

                <span className={styles.separator}>•</span>

                <span className={styles.visitorInline}>
                    <Eye className={styles.eyeIcon} size={14} />
                    <span className={styles.count}>
                        {loading ? '...' : visitorCount?.toLocaleString()}
                    </span>
                    <span className={styles.label}>unique visitors</span>
                </span>
            </p>
        </footer>
    );
};
