import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../components/Loading';
import PostCard from '../components/PostCard';
import SideMenu from '../components/SideMenu';
import { fetchBlogs } from '../features/blogs/blogsSlice';


const Home = () => {
    const dispatch = useDispatch();
    const { blogs: allBlogs, filter: allFilter } = useSelector((state) => state);

    const { blogs, isLoading, isError, error } = allBlogs;
    const { sortBy, filter } = allFilter;

    // Most Liked  Newest
    useEffect(() => {
        dispatch(fetchBlogs({ sortBy, filter }));
    }, [dispatch, sortBy, filter]);

    let content;

    if (isLoading) content = <Loading />;
    if (!isLoading && isError)
        content = <div className="col-span-12">{error}</div>;

    if (!isError && !isLoading && blogs?.length === 0) {
        content = <div className="col-span-12">No videos found!</div>;
    }

    if (!isError && !isLoading && blogs?.length > 0) {
        content = blogs.map((blog) => (
            <PostCard key={blog.id} blog={blog} />
        ));
    }

    return (
        <div>
            <section className="wrapper">
                <SideMenu />

                {/* <!-- posts container  --> */}
                <main className="post-container" id="lws-postContainer">
                    {content}
                </main>

            </section>
        </div>
    );
};

export default Home;