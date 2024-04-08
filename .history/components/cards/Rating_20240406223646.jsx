import styles from "../../styles/BookCard.module.css";
import React from 'react'

const Rating = ({  ratings }) => {
    return (
        <div>
            <span className={styles.ratingContainer}>
                {ratings?.map((rating, index) => {
                    const fillPercentage = rating * 100;

                    return (
                        <span
                            key={index}
                            onClick={() => handleRating(index)}
                            className={styles.star}
                        >
                            4.5
                            <span
                                className={styles.fill}
                                style={{ width: `${fillPercentage}%` }}
                            >
                                ★
                            </span>
                            <span className={styles.empty}>☆</span>
                        </span>
                    );
                })}
            </span>
        </div>
    )
}

export default Rating