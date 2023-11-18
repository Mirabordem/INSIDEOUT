import React from "react";
import { useSelector } from "react-redux";
import Masonry from "react-masonry-css";
import SinglePost from '../Home/SinglePost';
import "./SearchBarPage.css"



export default function SearchBarPage() {
    const searchedPosts = useSelector((state) => state.posts)



return (
    <div className="search-page-main">
        <div className="collection-details1">
        <div className="search-page-title">Posts That Match Your Search</div>

        </div>
        <div className="main-home-container3">

        <div></div>
            <div className="image-grid3">
            <div className="no-search-result-container">
                <div id="no-search-result" className={Object.values(searchedPosts).length ? "hidden" : "bigHeader"}>
                    {Object.values(searchedPosts).length ? "" : "So sorry, there is no post to match your search. Try again..."}
                </div>
            </div>
                <Masonry
                breakpointCols={{ default: 4, 1100: 3, 800: 2, 500: 1 }}
                className="my-masonry-grid3"
                columnClassName="my-masonry-grid_column"
                >
                {Object.values(searchedPosts).map((post) => (
                    <div className="post-card-container" key={post.id}>
                        <SinglePost post={post} photoUrl={post.photoUrl} />
                    </div>
                ))}

                </Masonry>
            </div>

        </div>
    </div>
    );
}
