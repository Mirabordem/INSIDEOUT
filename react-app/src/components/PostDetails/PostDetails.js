import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import PostUpdateButton from "./PostUpdateButton";
import { getSinglePostThunk, checkPreviousPost, checkNextPost } from "../../store/post";
import AddPostToCollection from "../AddPostToCollection/AddPostToCollection";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import { useModal } from "../../context/Modal";
import "./PostDetails.css";

import AddComment from "../Comments/AddComment";
import CommentDelete from "../Comments/CommentDelete";
import EditComment from "../Comments/EditComment";
import { getComments } from "../../store/comments";

export default function PostDetails() {
  const dispatch = useDispatch();
  const { postId } = useParams();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const userId = user?.id;
  const post = useSelector((state) => state.posts.singlePost);
  const objComments = useSelector((state) => state.comments.comments);

  const [likeStatus, setLikeStatus] = useState({});
  const [likeCount, setLikeCount] = useState(0);
  const [hasPrevious, setHasPrevious] = useState(true);
  const [hasNext, setHasNext] = useState(true);
  const [nextId, setNextId] = useState(null);
  const [prevId, setPrevId] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(null);
  const [showMenu, setShowMenu] = useState(false);

  const allPosts = useSelector((state) => state.posts);
  const currPostArr = Object.values(allPosts).filter((post) => post.id == postId);
  const currPost = currPostArr[0];

  const allComments = useSelector((state) => state.comments);
  const currPostComments = Object.values(allComments).filter((comment) => comment.postId == postId);
  const commentArr = [...currPostComments];

  const userComments = commentArr.filter((comment) => comment.userId == userId);
  const { closeModal } = useModal();

  useEffect(() => {
    dispatch(getSinglePostThunk(postId));
    dispatch(getComments());

    async function fetchData() {
      try {
        const prevPost = await dispatch(checkPreviousPost(Number(postId)));
        setPrevId(prevPost);
        setHasPrevious(true);
      } catch (error) {
        setHasPrevious(false);
      }

      try {
        const nextPost = await dispatch(checkNextPost(Number(postId)));
        setNextId(nextPost);
        setHasNext(true);
      } catch (error) {
        setHasNext(false);
      }
    }
    fetchData();

    async function fetchPhotoUrl() {
      try {
        const response = await fetch(`/api/posts/${postId}/photo`);
        if (response.ok) {
          const data = await response.json();
          setPhotoUrl(data.photoUrl);
        }
      } catch (error) {
        console.error("Error fetching photoUrl: ", error);
      }
    }
    fetchPhotoUrl();

    const likedStatus = JSON.parse(localStorage.getItem("likedStatus")) || {};
    setLikeStatus(likedStatus);

    const likedCount = likedStatus[postId] || 0;
    setLikeCount(likedCount);
  }, [dispatch, postId]);

  useEffect(() => {
    localStorage.setItem("likedStatus", JSON.stringify(likeStatus));
  }, [likeStatus]);

  const goToPreviousPost = () => {
    if (prevId) {
      closeModal();
      history.push(`/posts/${prevId}`);
    }
  };

  const goToNextPost = () => {
    if (nextId) {
      closeModal();
      history.push(`/posts/${nextId}`);
    }
  };

  if (!post) {
    return <p>Loading...</p>;
  }

  // const isLiked = likeStatus[postId] || false;

  // const handleLikeClick = async () => {
  //   try {
  //     setLikeStatus((prevLikeStatus) => ({
  //       ...prevLikeStatus,
  //       [postId]: !prevLikeStatus[postId],
  //     }));
  //     setLikeCount((prevLikeCount) => (isLiked ? prevLikeCount - 1 : prevLikeCount + 1));
  //   } catch (error) {
  //     console.error("Error updating like status:", error);
  //   }
  // };

  return (
    <div className="single-post-main">
      <div className="post-photo-container">
        {hasPrevious && (
          <img
            src={`${process.env.PUBLIC_URL}/left.png`}
            alt="Previous Post"
            className="arrow-icon-left"
            onClick={goToPreviousPost}
          />
        )}
        <img className="current-post-image" src={photoUrl} alt="Post Image" />
        {hasNext && (
          <img
            src={`${process.env.PUBLIC_URL}/right.png`}
            alt="Next Post"
            className="arrow-icon-right"
            onClick={goToNextPost}
          />
        )}
      </div>

      <div className="post-info-main">
        <div className="left-container"></div>

        <div className="post-info-container">
          <h1 className="post-title">{post.title}</h1>

          <div className="text-area">
            <div className="owner-info">
              <img
                className="post-owner-icon"
                src="https://image.jimcdn.com/app/cms/image/transf/none/path/sd0536822daf447dd/image/i9a305a7efa48dc70/version/1695953827/image.png"
                alt="Owner Icon"
              />
            </div>

            <div id="post-text-container">
              <p className="post-owner">{post.User?.username}</p>
              <p id="post-text">{post.text}</p>
            </div>

            <div className="like-post-container-main">
              <div className="like-post-container">
                <div className="three-dots-button">
                  <PostUpdateButton user={user} postId={post.id} />
                </div>
                {/* <i
                  className={isLiked ? "fas fa-heart" : "far fa-heart empty-heart1"}
                  style={isLiked ? { color: "aqua" } : null}
                  onClick={handleLikeClick}
                ></i>
                <p>{likeCount} {likeCount === 1 ? "like" : "likes"}</p> */}
              </div>
            </div>
          </div>
          <div className="horizontal-line"></div>
          <div className="leave-the-comment">
            <div className={!userComments.length && userId && userId !== currPost?.userId ? "centerMe" : "hidden"}>
              <h3 className="comments-title">{commentArr.length ? "" : "Be The First To Comment!"}</h3>
              <OpenModalButton
                className='leave-comment'
                buttonText="Leave Your Comment"
                modalComponent={<AddComment postId={post.id} />}
              />
            </div>
          </div>
          <div className="comments-main">
            {commentArr?.slice()
              .reverse()
              .map((comment) => (
                <div className="single-comment" key={comment.id}>
                  <div className="comment-header">
                    <img
                      className="profile-icon"
                      src="https://image.jimcdn.com/app/cms/image/transf/none/path/sd0536822daf447dd/image/i9a305a7efa48dc70/version/1695953827/image.png"
                      alt=""
                    />
                    <div className="name-date">
                      <h3>{comment?.user?.username}</h3>
                      <p className="comment-date">
                        {new Date(comment.updatedAt).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "long",
                        })}
                      </p>
                    </div>
                  </div>
                  <p className="comment-text">{comment.text}</p>
                  <div className={comment?.userId !== userId ? "hidden" : "notHidden"}>
                    <OpenModalButton
                      className='edit-comment-button'
                      buttonText="Update"
                      modalComponent={<EditComment commentId={comment.id} postId={post.id} />}
                    />
                    <OpenModalButton
                      className='delete-comment-button'
                      buttonText="Remove"
                      modalComponent={<CommentDelete commentId={comment.id} />}
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu(!showMenu);
            }}
            className="post-button-your-collections"
          >
            <span className='duza-kropka'> ● </span> ADD POST TO COLLECTION
          </button>
          {showMenu && (
            <AddPostToCollection
              post_id={post.id}
              onSelectCollection={(selectedCollection) => {
                console.log(selectedCollection);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}



// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams, useHistory } from "react-router-dom";
// import PostUpdateButton from "./PostUpdateButton";
// import { getSinglePostThunk, checkPreviousPost, checkNextPost } from "../../store/post";
// import AddPostToCollection from "../AddPostToCollection/AddPostToCollection";
// import OpenModalButton from "../OpenModalButton/OpenModalButton";
// import { useModal } from "../../context/Modal";
// import { ThunkAddLike, ThunkDeleteLike } from "../../store/session";
// import { ADD_LIKED_POST, REMOVE_LIKED_POST } from "../../store/session";
// import "./PostDetails.css";

// import AddComment from "../Comments/AddComment";
// import CommentDelete from "../Comments/CommentDelete";
// import EditComment from "../Comments/EditComment";
// import { getComments } from "../../store/comments";

// export default function PostDetails() {
//   const dispatch = useDispatch();
//   const { postId } = useParams();
//   const history = useHistory();
//   const user = useSelector((state) => state.session.user);
//   const userId = user?.id;
//   const post = useSelector((state) => state.posts.singlePost);
//   const objComments = useSelector((state) => state.comments.comments);

//   const [likeStatus, setLikeStatus] = useState({});
//   const [likeCount, setLikeCount] = useState(0);
//   const [hasPrevious, setHasPrevious] = useState(true);
//   const [hasNext, setHasNext] = useState(true);
//   const [nextId, setNextId] = useState(null);
//   const [prevId, setPrevId] = useState(null);
//   const [photoUrl, setPhotoUrl] = useState(null);
//   const [showMenu, setShowMenu] = useState(false);

//   const allPosts = useSelector((state) => state.posts);
//   const currPostArr = Object.values(allPosts).filter((post) => post.id == postId);
//   const currPost = currPostArr[0];

//   const allComments = useSelector((state) => state.comments);
//   const currPostComments = Object.values(allComments).filter((comment) => comment.postId == postId);
//   const commentArr = [...currPostComments];

//   const userComments = commentArr.filter((comment) => comment.userId == userId);
//   const { closeModal } = useModal();

//   useEffect(() => {
//     dispatch(getSinglePostThunk(postId));
//     dispatch(getComments());

//     async function fetchData() {
//       try {
//         const prevPost = await dispatch(checkPreviousPost(Number(postId)));
//         setPrevId(prevPost);
//         setHasPrevious(true);
//       } catch (error) {
//         setHasPrevious(false);
//       }

//       try {
//         const nextPost = await dispatch(checkNextPost(Number(postId)));
//         setNextId(nextPost);
//         setHasNext(true);
//       } catch (error) {
//         setHasNext(false);
//       }
//     }
//     fetchData();

//     async function fetchPhotoUrl() {
//       try {
//         const response = await fetch(`/api/posts/${postId}/photo`);
//         if (response.ok) {
//           const data = await response.json();
//           setPhotoUrl(data.photoUrl);
//         }
//       } catch (error) {
//         console.error("Error fetching photoUrl: ", error);
//       }
//     }
//     fetchPhotoUrl();

//     // Load liked status and count from localStorage
//     const likedStatus = JSON.parse(localStorage.getItem("likedStatus")) || {};
//     setLikeStatus(likedStatus);

//     // Update the like count based on the liked status of the current post
//     const likedCount = likedStatus[postId] || 0;
//     setLikeCount(likedCount);
//   }, [dispatch, postId]);

//   useEffect(() => {
//     // Save liked status and count to localStorage
//     localStorage.setItem("likedStatus", JSON.stringify(likeStatus));
//   }, [likeStatus]);

//   const goToPreviousPost = () => {
//     if (prevId) {
//       closeModal();
//       history.push(`/posts/${prevId}`);
//     }
//   };

//   const goToNextPost = () => {
//     if (nextId) {
//       closeModal();
//       history.push(`/posts/${nextId}`);
//     }
//   };

//   if (!post) {
//     return <p>Loading...</p>;
//   }

//   const isLiked = likeStatus[postId] || false;

//   const handleLikeClick = async () => {
//     try {
//       // Toggle the liked status for the current post
//       setLikeStatus((prevLikeStatus) => ({
//         ...prevLikeStatus,
//         [postId]: !prevLikeStatus[postId],
//       }));

//       // If you want to update the like count on the server, make an API call here
//       // Example: await fetch(`/api/posts/${postId}/like`, { method: 'POST' });

//       // Update the like count locally
//       setLikeCount((prevLikeCount) => (isLiked ? prevLikeCount - 1 : prevLikeCount + 1));
//     } catch (error) {
//       console.error("Error updating like status:", error);
//     }
//   };

//   return (
//     <div className="single-post-main">
//       <div className="post-photo-container">
//         {hasPrevious && (
//           <img
//             src={`${process.env.PUBLIC_URL}/left.png`}
//             alt="Previous Post"
//             className="arrow-icon-left"
//             onClick={goToPreviousPost}
//           />
//         )}
//         <img className="current-post-image" src={photoUrl} alt="Post Image" />
//         {hasNext && (
//           <img
//             src={`${process.env.PUBLIC_URL}/right.png`}
//             alt="Next Post"
//             className="arrow-icon-right"
//             onClick={goToNextPost}
//           />
//         )}
//       </div>

//       <div className="post-info-main">
//         <div className="left-container"></div>

//         <div className="post-info-container">
//           <h1 className="post-title">{post.title}</h1>

//           <div className="text-area">
//             <div className="owner-info">
//               <img
//                 className="post-owner-icon"
//                 src="https://image.jimcdn.com/app/cms/image/transf/none/path/sd0536822daf447dd/image/i9a305a7efa48dc70/version/1695953827/image.png"
//                 alt="Owner Icon"
//               />
//             </div>

//             <div id="post-text-container">
//               <p className="post-owner">{post.User?.username}</p>
//               <p id="post-text">{post.text}</p>
//             </div>

//             <div className="like-post-container-main">
//               <div className="like-post-container">
//                 <div className="three-dots-button">
//                   <PostUpdateButton user={user} postId={post.id} />
//                 </div>
//                 <i
//                   className={isLiked ? "fas fa-heart" : "far fa-heart empty-heart1"}
//                   style={isLiked ? { color: "aqua" } : null}
//                   onClick={handleLikeClick}
//                 ></i>
//                 <p>{likeCount} {likeCount === 1 ? "like" : "likes"}</p>
//               </div>
//             </div>
//           </div>
//           <div className="horizontal-line"></div>
//           <div className="leave-the-comment">
//             <div className={!userComments.length && userId && userId !== currPost?.userId ? "centerMe" : "hidden"}>
//               <h3 className="comments-title">{commentArr.length ? "" : "Be The First To Comment!"}</h3>
//               <OpenModalButton
//                 className='leave-comment'
//                 buttonText="SHARE YOUR THOUGHTS"
//                 modalComponent={<AddComment postId={post.id} />}
//               />
//             </div>
//           </div>
//           <div className="comments-main">
//             {commentArr?.slice()
//               .reverse()
//               .map((comment) => (
//                 <div className="single-comment" key={comment.id}>
//                   <div className="comment-header">
//                     <img
//                       className="profile-icon"
//                       src="https://image.jimcdn.com/app/cms/image/transf/none/path/sd0536822daf447dd/image/i9a305a7efa48dc70/version/1695953827/image.png"
//                       alt=""
//                     />
//                     <div className="name-date">
//                       <h3>{comment?.user?.username}</h3>
//                       <p className="comment-date">
//                         {new Date(comment.updatedAt).toLocaleDateString(undefined, {
//                           year: "numeric",
//                           month: "long",
//                         })}
//                       </p>
//                     </div>
//                   </div>
//                   <p className="comment-text">{comment.text}</p>
//                   <div className={comment?.userId !== userId ? "hidden" : "notHidden"}>
//                     <OpenModalButton
//                       className='edit-comment-button'
//                       buttonText="● UPDATE"
//                       modalComponent={<EditComment commentId={comment.id} postId={post.id} />}
//                     />
//                     <OpenModalButton
//                       className='delete-comment-button'
//                       buttonText="● DELETE"
//                       modalComponent={<CommentDelete commentId={comment.id} />}
//                     />
//                   </div>
//                 </div>
//               ))}
//           </div>
//         </div>

//         <div>
//           <button
//             onClick={(e) => {
//               e.stopPropagation();
//               setShowMenu(!showMenu);
//             }}
//             className="post-button-your-collections"
//           >
//             <span className='duza-kropka'> ● </span> ADD POST TO COLLECTION
//           </button>
//           {showMenu && (
//             <AddPostToCollection
//               post_id={post.id}
//               onSelectCollection={(selectedCollection) => {
//                 console.log(selectedCollection);
//               }}
//             />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
