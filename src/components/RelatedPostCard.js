import React from 'react';
import { Link } from 'react-router-dom';

const RelatedPostCard = ({ blog }) => {
    const { id, title, image, tags, createdAt } = blog;

    return (
        <div className="card">
            <Link to={`/blogs/${id}`}>
                <img src={image} className="card-image" alt="" />
            </Link>
            <div className="p-4">
                <Link to={`/blogs/${id}`} className="text-lg post-title lws-RelatedPostTitle">
                    {title}
                </Link>
                <div className="mb-0 tags">
                    {tags.map(tag => <span key={tag} > #{tag}&nbsp;</span>).slice(0, 3)}
                </div>
                <p>{createdAt}</p>
            </div>
        </div>
    );
};

export default RelatedPostCard;