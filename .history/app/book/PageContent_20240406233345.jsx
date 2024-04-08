import React from 'react'
import styles from

export const PageContent = ({ book }) => {
    return (
        <div>
            <div className={`${styles.image__wrapper} ${isLoading && styles.wave}`}
            >
                <Image
                    src={book?.image}
                    width={180}
                    height={150}
                    alt="carousel"
                    style={{ backgroundColor: `${isLoading ? "none" : "#eeeded"}` }}
                    className={styles.image}
                    placeholder="blur"
                    blurDataURL={book?.image}
                />
            </div>

        </div>
    )
}
