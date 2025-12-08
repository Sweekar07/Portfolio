import React, { useState } from 'react';

import styles from './About.module.css';
import MeTab from './tabs/MeTab/MeTab';
import EducationTab from './tabs/EducationTab/EducationTab';
import SkillsTab from './tabs/SkillsTab/SkillsTab';
import HobbiesTab from './tabs/HobbiesTab/HobbiesTab';

export const About = () => {
    const [activeTab, setActiveTab] = useState('me');

    const tabs = [
        {
            id: 'me',
            label: 'Me',
            title: 'My story'
        },
        {
            id: 'education',
            label: 'Education',
            title: 'Where I\'ve learned & grown'
        },
        {
            id: 'skills',
            label: 'Skills',
            title: 'What I bring to the table'
        },
        {
            id: 'hobbies',
            label: 'Hobbies',
            title: 'What I do for fun'
        }
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

    // Get current tab title
    const getCurrentTitle = () => {
        const currentTab = tabs.find(tab => tab.id === activeTab);
        return currentTab?.title || 'A little about me';
    };

    return (
        <section className={styles.container} id="about">
            <header className={styles.header}>
                <h2 className={styles.title}>{getCurrentTitle()}</h2>
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
