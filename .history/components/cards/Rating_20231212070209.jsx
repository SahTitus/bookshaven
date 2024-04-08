import styles from "../../styles/Product.module.css";
import React from 'react'

const Rating = ({ orders, ratings }) => {
    return (
        <div>
            {orders > 0 && (
                <>
                    <span>
                        {orders} order{orders > 1 ? "s" : ""}
                    </span>{" "}
                    |{" "}
                </>
            )}
            <span className={styles.ratingContainer}>
                {ratings?.map((rating, index) => {
                    const fillPercentage = rating * 100;

                    return (
                        <span
                            key={index}
                            onClick={() => handleRating(index)}
                            className={styles.star}
                        >
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