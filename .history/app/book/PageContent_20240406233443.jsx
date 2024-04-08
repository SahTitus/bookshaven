import React from 'react'
import Image from 'next/image'

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
                    className={`${flex ? 'w-[45%] h-[150px]' : 'w-full h-[250px] md:h-[370px]'} shadow relative rounded-lg overflow-hidden`}
                    placeholder="blur"
                    blurDataURL={book?.image}
                />
            </div>

        </div>
    )
}
