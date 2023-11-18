import { useHistory } from 'react-router';
import React from 'react';
import './SinglePost.css';

export default function SinglePost({ post }) {
   const history = useHistory();

   const onClick = () => {

      history.push(`/posts/${post.id}`);
   }


   return (
      <div onClick={onClick}>
         <div className="post-container">
            <div className="photo">
               <div>
                     <img className='post-photo' src={post.photoUrl} />
               </div>
            </div>
         </div>
      </div>
   );
}
