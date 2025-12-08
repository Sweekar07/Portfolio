import React from 'react';

import styles from './SkillsTab.module.css';
import { getTechIcon } from '../../../../utils';
import { skillsData } from '../../../../data/skillsData';

const SkillsTab = () => {
    return (
        <section className={styles.skillsSection}>
            {skillsData.map((category, index) => {
                const IconComponent = category.icon;
                const isRightToLeft = index % 2 === 0;

                return (
                    <div
                        key={category.id}
                        className={`${styles.categoryRow} ${isRightToLeft ? styles.rightToLeft : styles.leftToRight}`}
                        style={{
                            animationDelay: `${index * 0.1}s`
                        }}
                    >
                        {/* Category Header */}
                        <div className={styles.categoryHeader}>
                            <div className={styles.iconContainer}>
                                {IconComponent && <IconComponent size={24} />}
                            </div>
                            <h3 className={styles.categoryTitle}>{category.title}</h3>
                        </div>

                        {/* Skills Flowing in Direction */}
                        <div className={styles.skillsFlow}>
                            {category.skills.map((skill, idx) => {
                                const techIcon = getTechIcon(skill.name);

                                return (
                                    <div
                                        key={idx}
                                        className={styles.skillItem}
                                        style={{
                                            animationDelay: `${index * 0.1 + idx * 0.05}s`
                                        }}
                                    >
                                        {techIcon && (
                                            <div className={styles.skillIcon}>
                                                <img
                                                    src={techIcon}
                                                    alt={skill.name}
                                                    loading="lazy"
                                                />
                                            </div>
                                        )}
                                        <span className={styles.skillName}>{skill.name}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </section>
    );
};

export default SkillsTab;
