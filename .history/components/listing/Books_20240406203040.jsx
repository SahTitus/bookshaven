import Card from '@components/cards/Card'
import React from 'react';
import dynamic from 'next/dynamic'

const Gads = dynamic(() => import("@components/adsense/Gads"), { ssr: false });

const Articles = ({ articles, flex }) => {
    return (
        <div className='flex flex-col '>
            {articles?.map((article, index) => (
                <React.Fragment key={article?._id}>
                    <Card article={article} flex={flex} />
                    {index % 4 === 0 && <Gads key={index} />}
                </React.Fragment>
            ))}
        </div>
    )
}

export default Articles;