import React from 'react';

import { useCarousel } from '../../hooks/useCarousel';
import HobbyCard from './HobbyCard';
import { hobbiesData } from '../../../../data/hobbies';
import styles from './HobbiesTab.module.css';


const HobbiesTab = () => {
    const [currentIndex, setCurrentIndex] = useCarousel(hobbiesData, 5000, true);

    return (
        <div className={styles.carouselContainer}>
            <div className={styles.hobbiesCarousel}>
                {hobbiesData.map((hobby, index) => (
                    <HobbyCard
                        key={`${hobby.title}-${index}`}
                        hobby={hobby}
                        index={index}
                        currentIndex={currentIndex}
                        totalItems={hobbiesData.length}
                    />
                ))}
            </div>

            <div className={styles.carouselDots}>
                {hobbiesData.map((_, index) => (
                    <button
                        key={index}
                        className={`${styles.dot} ${currentIndex === index ? styles.activeDot : ''}`}
                        onClick={() => setCurrentIndex(index)}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default HobbiesTab;
