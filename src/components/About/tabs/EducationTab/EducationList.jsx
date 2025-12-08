import React, { useState } from 'react';
import { GraduationCap, Calendar, MapPin, Award, ChevronRight } from 'lucide-react';

import { getImageUrl } from '../../../../utils';
import styles from './EducationTab.module.css';


const EducationList = ({ data }) => {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div className={styles.educationList}>
      {data.map((edu, index) => (
        <article
          key={index}
          className={styles.educationCard}
          onMouseEnter={() => setHoveredCard(index)}
          onMouseLeave={() => setHoveredCard(null)}
          role="article"
          aria-label={`${edu.degree} from ${edu.university}`}
        >
          <div className={styles.cardContent}>
            <div className={styles.logoSection}>
              <img
                src={getImageUrl(edu.logo)}
                alt={`${edu.university} logo`}
                className={styles.universityLogo}
                loading="lazy"
              />
              <div className={styles.logoGlow} />
            </div>

            <div className={styles.infoSection}>
              <div className={styles.headerRow}>
                <h3 className={styles.universityName}>{edu.university}</h3>
                <ChevronRight
                  className={`${styles.arrowIcon} ${hoveredCard === index ? styles.arrowActive : ''}`}
                  size={20}
                />
              </div>

              <div className={styles.degreeRow}>
                <Award className={styles.icon} size={16} />
                <span className={styles.degreeText}>{edu.degree}</span>
                <span className={styles.separator}>•</span>
                <span className={styles.courseText}>{edu.course}</span>
              </div>

              <div className={styles.detailsRow}>
                <div className={styles.detailItem}>
                  <Calendar className={styles.icon} size={14} />
                  <span>{edu.duration}</span>
                  <span className={styles.yearBadge}>{edu.year}</span>
                </div>

                <div className={styles.detailItem}>
                  <MapPin className={styles.icon} size={14} />
                  <span>{edu.location}</span>
                </div>
              </div>

              {edu.achievements && (
                <div className={styles.achievementSection}>
                  <div className={styles.achievementBadge}>
                    <GraduationCap size={12} />
                    <span>{edu.achievements}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className={`${styles.cardAccent} ${hoveredCard === index ? styles.accentActive : ''}`} />
        </article>
      ))}
    </div>
  );
};

export default EducationList;
