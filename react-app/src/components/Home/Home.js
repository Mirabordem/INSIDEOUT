import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import SinglePost from "./SinglePost";
import { getAllPostsThunk } from "../../store/post";
import { AllCollectionsThunk } from "../../store/collection";
import { NavLink } from "react-router-dom";
import Masonry from "react-masonry-css";
import "./Home.css";

export default function Home() {
  const dispatch = useDispatch();
  const postsObj = useSelector((state) => state.posts.allPosts);
  const posts = postsObj ? Object.values(postsObj) : [];
  const collectionsObj = useSelector((state) => state.collections.allCollections);
  const collections = collectionsObj ? Object.values(collectionsObj) : [];
  const user = useSelector(state => state.session.user);
  // const user_collections = collections.filter(collections => collections.user_id === user.id);
  const user_collections = user && user.id ? collections.filter(collection => collection.user_id === user.id) : [];
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMenu, setShowMenu] = useState()

  //
  const menuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);

//


  useEffect(() => {
    dispatch(getAllPostsThunk());
    dispatch(AllCollectionsThunk())
  }, [dispatch]);


  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const hideMenuOnClick = () => {
    setShowMenu(false)
  }

  return (
    <div className="main-home-container">
      <div className="nav-links1">

          <div className="dropdown10">
            <button
              onClick={toggleDropdown}
              // onButtonClick={hideMenuOnClick}
              className="home-button-your-collections"
            >
              <span className='duza-kropka'> ● </span>
              YOUR COLLECTIONS
            </button>
            <div className="dropdown5">
            {showDropdown && (
              <div ref={menuRef}>
              <ul className="collection-list1">

            {user_collections.map((collection) => (
  <li key={collection?.id}>
    {collection && (
      <NavLink to={`/collections/${collection.id}`}>{collection.name}</NavLink>
    )}
  </li>

            ))}

              </ul>
              </div>
            )}
            </div>
          </div>

      </div>
      <div className="image-grid">
        <Masonry
          breakpointCols={{ default: 4, 1100: 3, 800: 2, 500: 1 }}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {posts.map((post) => (
            <SinglePost key={post.id} post={post} />
          ))}
        </Masonry>
      </div>
    </div>
  );
}
