import React from 'react';

import { getImageUrl } from '../../../../utils';
import styles from './HobbiesTab.module.css';


const HobbyCard = ({ hobby, index, currentIndex, totalItems }) => {
    // Calculate the relative position
    let position = index - currentIndex;

    // Normalize position to be within -totalItems to +totalItems range
    if (position > totalItems / 2) {
        position -= totalItems;
    } else if (position < -totalItems / 2) {
        position += totalItems;
    }

    // Determine card state
    const isCenter = position === 0;
    const isLeft = position === -1;
    const isRight = position === 1;

    // Determine CSS class
    let cardClass = styles.hobbyCard;
    if (isCenter) {
        cardClass += ` ${styles.centerCard}`;
    } else if (isLeft) {
        cardClass += ` ${styles.adjacentCard} ${styles.leftCard}`;
    } else if (isRight) {
        cardClass += ` ${styles.adjacentCard} ${styles.rightCard}`;
    } else {
        cardClass += ` ${styles.hiddenCard}`;
    }

    return (
        <div className={cardClass}>
            <h4>{hobby.title}</h4>
            <img src={getImageUrl(hobby.image)} alt={hobby.title} />
            <p>{hobby.description}</p>
        </div>
    );
};

export default HobbyCard;
