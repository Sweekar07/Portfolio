import React from 'react';

import styles from './SkillsTab.module.css';
import { getImageUrl } from '../../../../utils';


const SkillCard = ({ data, index }) => {
    const IconComponent = data.icon;

    return (
        <div
            className={styles.skillCard}
            style={{
                animationDelay: `${index * 0.08}s`
            }}
        >
            {/* Header with Icon and Title */}
            <div className={styles.categorySection}>
                <div className={styles.iconContainer}>
                    {IconComponent && <IconComponent size={28} />}
                </div>
                <h3 className={styles.categoryTitle}>{data.title}</h3>
            </div>

            {/* Skills Grid */}
            <div className={styles.skillsGrid}>
                {data.skills.map((skill, idx) => (
                    <div key={idx} className={styles.skillBadge}>
                        <div className={styles.badgeIcon}>
                            <img
                                src={getImageUrl(skill.icon)}
                                alt={skill.name}
                                loading="lazy"
                            />
                        </div>
                        <span className={styles.badgeName}>{skill.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SkillCard;
