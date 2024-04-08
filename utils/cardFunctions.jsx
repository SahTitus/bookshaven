import { bookmarkArticle } from "@lib/actions/article.action";
import { handleError } from "@utils";

export const handleNativeSharing = async (url, article_title) => {
    const title = article_title;
    const shareDetails = { title, url };

    if (navigator.share) {
        try {
            await navigator.share(shareDetails);
        } catch (error) {
            handleError(error.message)
        }
    } else {
        handleError('Web share is not supported on this browser.')
    }
};

export const handleBookmarking = async ({
    userId,
    articleId,
    bookmarks,
    setBookmarks,
    isSaved
}) => {
    if (userId) {
        bookmarkArticle({ userId, articleId })
        if (isSaved) {
            setBookmarks(bookmarks.filter((id) => id !== userId));
        } else {
            setBookmarks([...bookmarks, userId]);
        }
    }
};
