// import React from "react";
// import { useState } from "react";
// import { useHistory, NavLink } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import ProfileButton from "./ProfileButton";
// import CreateButton from "./CreateButton";
// import { searchPostsThunk, clearSearchResults } from "../../store/post"
// import "./Navigation.css";


// export default function Navigation({ isLoaded }) {
//   const dispatch = useDispatch()
//   const { push } = useHistory()
//   const sessionUser = useSelector((state) => state.session.user);
//   const user = useSelector((state) => state.session.user);
//   const post = useSelector((state) => state.posts.singlePost);
//   const [search, setSearch] = useState("")
//   const [errors, setErrors] = useState('')


//   const handleSubmit = async (e) => {
//     e.preventDefault()



//     dispatch(clearSearchResults());
//     const data = await dispatch(searchPostsThunk(search))
//     if (!data.errors) {
//         setSearch('')
//         return push('/search')
//     } else {
//         setErrors(data.errors)
//     }
// }


//   return (
//     <div className="nav-container">
//       {sessionUser ? (
//         <NavLink exact to="/posts">
//           <img
//             className="INSIDEOUT-logo"
//             alt="Logo"
//             src="https://image.jimcdn.com/app/cms/image/transf/none/path/sd0536822daf447dd/image/ic9d478a0b2938cfd/version/1699021732/image.png"
//           ></img>
//         </NavLink>
//       ) : (
//         <NavLink exact to="/">
//           <img
//             className="INSIDEOUT-logo"
//             alt="Logo"
//             src="https://image.jimcdn.com/app/cms/image/transf/none/path/sd0536822daf447dd/image/ic9d478a0b2938cfd/version/1699021732/image.png"
//           ></img>
//         </NavLink>
//       )}

//       <div className="search-bar-container">
//             <form className="search-form" onSubmit={handleSubmit}>
//                 <input
//                 value={search}
//                 onChange={e => setSearch(e.target.value)}
//                 className="search-window1"
//                 id="searchBar"
//                 type="search"
//                 placeholder="Search for a Post by Title..." />
//                 <button className="search-button" type="submit"><i class="fa fa-search" aria-hidden="true"></i></button>
//             </form>
//             <p>{errors}</p>
//         </div>


//       {isLoaded && (
//         <div className="nav-profile">

//           {sessionUser ? (
//             post ? (
//               <CreateButton user={user} postId={post.id} />
//           ) : null
//         ) : null}
//           <ProfileButton user={sessionUser} />
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom'; // Add this line
import ProfileButton from './ProfileButton';
import CreateButton from './CreateButton';
import { searchPostsThunk, clearSearchResults } from '../../store/post';
import './Navigation.css';


export default function Navigation({ isLoaded }) {
  const dispatch = useDispatch();
  const { push } = useHistory();
  const location = useLocation();
  const sessionUser = useSelector((state) => state.session.user);
  const user = useSelector((state) => state.session.user);
  const post = useSelector((state) => state.posts.singlePost);
  const [search, setSearch] = useState('');
  const [errors, setErrors] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(clearSearchResults());
    const data = await dispatch(searchPostsThunk(search));

    if (!data.errors) {
      setSearch('');
      return push('/search');
    } else {
      setErrors(data.errors);
    }
  };

  return (
    <div className="nav-container">
      {sessionUser ? (
        <NavLink exact to="/posts">
          <img
            className="INSIDEOUT-logo"
            alt="Logo"
            src="https://image.jimcdn.com/app/cms/image/transf/none/path/sd0536822daf447dd/image/ic9d478a0b2938cfd/version/1699021732/image.png"
          ></img>
        </NavLink>
      ) : (
        <NavLink exact to="/">
          <img
            className="INSIDEOUT-logo"
            alt="Logo"
            src="https://image.jimcdn.com/app/cms/image/transf/none/path/sd0536822daf447dd/image/ic9d478a0b2938cfd/version/1699021732/image.png"
          ></img>
        </NavLink>
      )}

      {/* Conditionally render the search bar based on the route */}
      {isLoaded && location.pathname !== '/' && (
        <div className="search-bar-container">
          <form className="search-form" onSubmit={handleSubmit}>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-window1"
              id="searchBar"
              type="search"
              placeholder="Search for a Post by Title..."
            />
            <button className="search-button" type="submit">
              <i className="fa fa-search" aria-hidden="true"></i>
            </button>
          </form>
          <p>{errors}</p>
        </div>
      )}

{isLoaded && (
  <div className="nav-profile">
    {sessionUser ? (
      post ? (
        <CreateButton user={user} postId={post.id} />
      ) : null
    ) : null}
    <ProfileButton user={sessionUser} />
  </div>
)}

      {/* {isLoaded && (
        <div className="nav-profile">
          {sessionUser ? (
            post ? (
              <CreateButton user={user} postId={post.id} />
            ) : (
              <ProfileButton user={sessionUser} />
            )
          ) : null}
        </div>
      )} */}
    </div>
  );
}
