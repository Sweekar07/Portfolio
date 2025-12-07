import React, { useState } from 'react';

import styles from './About.module.css';
import MeTab from './tabs/MeTab/MeTab';
import EducationTab from './tabs/EducationTab/EducationTab';
import SkillsTab from './tabs/SkillsTab/SkillsTab';
import HobbiesTab from './tabs/HobbiesTab/HobbiesTab';


export const About = () => {
    const [activeTab, setActiveTab] = useState('me');

    const tabs = [
        { id: 'me', label: 'Me' },
        { id: 'education', label: 'Education' },
        { id: 'skills', label: 'Skills' },
        { id: 'hobbies', label: 'Hobbies' }
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'me':
                return <MeTab />;
            case 'education':
                return <EducationTab />;
            case 'skills':
                return <SkillsTab />;
            case 'hobbies':
                return <HobbiesTab />;
            default:
                return null;
        }
    };

    return (
        <section className={styles.container} id="about">
            <header className={styles.header}>
                <h2 className={styles.title}>A little about me</h2>
                <div className={styles.titleLine} />
            </header>

            <div className={styles.contentWrapper}>
                {/* Left Side - Content */}
                <div className={styles.tabContent}>
                    {renderContent()}
                </div>

                {/* Right Side - Vertical Tabs */}
                <div className={styles.tabsVertical}>
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            className={activeTab === tab.id ? styles.activeTab : styles.tabButton}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
};
