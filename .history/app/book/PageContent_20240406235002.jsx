import React from 'react'
import Image from 'next/image'
import styles from '../../styles/BookCard.module.css'

export const PageContent = ({ book }) => {
    return (
        <div>
            <div className=''>
                <div className={`${styles.image__wrapper} `}
                >
                    <Image
                        src={book?.image}
                        width={180}
                        height={150}
                        alt="carousel"
                        style={{ backgroundColor: `#eeeded` }}
                        className={`${'w-full h-[250px] md:h-[370px]'} shadow relative rounded-lg overflow-hidden`}
                        placeholder="blur"
                        blurDataURL={book?.image}
                    />
                </div>

                <div>
                    <h1>{book?.title}</h1>
                    <p>
                      By  {book?.author_firstName} {" "} {book?.author_lastName}
                    </p>
                </div>
            </div>

        </div>
    )
}
