export const projection = {
    _id: 1,
    title: 1,
    summary: 1,
    slug: 1,
    image: 1,
    image_id: 1,
    bookmarks: 1,
    category: 1,
    category_id: 1,
    readingTime: 1,
    publishedAt: 1,
}

export const mongoSearchPipeline = (query, skip, limit) => {
    const searchPipeline = [
        {
            $match: {
                $or: [
                    { title: { $regex: query, $options: 'i' } },
                    { summary: { $regex: query, $options: 'i' } },
                    { category: { $regex: query, $options: 'i' } },
                    { subCategory: { $regex: query, $options: 'i' } },
                ],
            },
        },
        {
            $project: projection,
        },
        {
            $skip: skip,
        },
        {
            $limit: limit,
        },
    ];

    return searchPipeline;
};