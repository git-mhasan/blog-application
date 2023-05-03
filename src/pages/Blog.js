import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import RelatedPost from '../components/RelatedPost';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlog } from '../features/blog/blogSlice';
import Loading from '../components/Loading';
import { updateBlog } from '../features/blogs/blogsSlice';

const Blog = () => {

    const { blog, isLoading, isError, error } = useSelector(state => state.blog);
    const { id, title, description, image, tags, likes, isSaved, createdAt } = blog || {};

    const dispatch = useDispatch();
    const { blogId } = useParams();

    useEffect(() => {
        dispatch(fetchBlog(blogId));
    }, [dispatch, blogId]);

    const handleLike = () => {
        // event.preventDefault();
        const dataToUpdate = { likes: parseInt(likes) + 1 };
        dispatch(updateBlog({ id, dataToUpdate }));
        // likes = parseInt(likes) + 1;
        // dispatch(fetchBlog(blogId));
    }

    const handleSave = () => {
        // event.preventDefault();
        const dataToUpdate = { isSaved: !isSaved };
        dispatch(updateBlog({ id, dataToUpdate }));
        // likes = parseInt(likes) + 1;
        // dispatch(fetchBlog(blogId));
    }


    // decide what to render
    let content = null;
    if (isLoading) content = <Loading />;

    if (!isLoading && isError)
        content = <div className="col-span-12">{error}</div>;

    if (!isLoading && !isError && !blog?.id) {
        content = <div className="col-span-12">No video found!</div>;
    }
    if (!isLoading && !isError && blog?.id) {
        content = <main className="post">
            <img src={image} alt="githum" className="w-full rounded-md" id="lws-megaThumb" />
            <div>
                <h1 className="mt-6 text-2xl post-title" id="lws-singleTitle">
                    {title}
                </h1>
                <div className="tags" id="lws-singleTags">

                    {tags.map(tag => <span key={tag} >#{tag}&nbsp; &nbsp;</span>)}

                </div>
                <div className="btn-group">
                    {/* <!-- handle like on button click --> */}
                    <button className="like-btn" id="lws-singleLinks" onClick={handleLike}>
                        <i className="fas fa-regular fa-thumbs-up"></i> {likes}
                    </button>
                    {/* <!-- handle save on button click --> */}
                    <button className={`${isSaved && 'active'} save-btn`} id="lws-singleSavedBtn" onClick={handleSave}>
                        <i className="fas fa-regular fa-bookmark"></i> {`${isSaved ? 'Saved' : 'Save'}`}
                    </button>
                </div>
                <div className="mt-6">
                    <p>
                        {description}
                    </p>
                </div>
            </div>
        </main>
    }

    return (
        <div>
            {/* <!-- Go Home / Go Back --> */}
            <div className="container mt-8">
                <Link to="/" className="inline-block text-gray-600 home-btn" id="lws-goHome"><i
                    className="mr-2 fa-solid fa-house"></i>Go Home</Link>
            </div>
            <section className="post-page-container">
                {/* <!-- detailed post  --> */}
                {content}
                <RelatedPost currentBlogId={id} tags={tags} />

            </section>
        </div>
    );
};

export default Blog;