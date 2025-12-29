import React, { useState, useEffect } from "react";
import styles from "./Footer.module.css";
import { Flame, Eye } from "lucide-react";

export const Footer = () => {
    const year = new Date().getFullYear();
    const [visitorCount, setVisitorCount] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch visitor count from your Supabase function
        fetchVisitorCount();
    }, []);

    const fetchVisitorCount = async () => {
        try {
            // Replace with your actual Supabase call
            // const { data } = await supabase.rpc('get_visitor_count');
            // setVisitorCount(data);

            // Temporary mock data for testing
            setVisitorCount(1);
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
                    <span className={styles.label}>visitors</span>
                </span>
            </p>
        </footer>
    );
};
