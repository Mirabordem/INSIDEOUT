// const cloneDeep = require('clone-deep');

// export const GET_SINGLE_LIKE = "likes/GET_SINGLE_VOTE";
// export const CLEAR_SINGLE_LIKE = "likes/CLEAR_SINGLE_VOTE";
// export const GET_LIKES_COUNT = "likes/GET_LIKES_COUNT"


// export const getSingleLike = (like) => ({
//   type: GET_SINGLE_LIKE,
//   payload: like
// })


// export const clearSingleLike = () => ({
//   type: CLEAR_SINGLE_LIKE,
// })


// export const updateLikesCount = (count) => ({
//     type: GET_LIKES_COUNT,
//     payload: count,
//   });

//   //___________________________________________________

// // thunks:


// export const getLikesCount = (postId) => async (dispatch) => {
//     let res = await fetch(`/api/likes/count/${postId}`);
//     if (res.ok) {
//       let data = await res.json();
//       dispatch(updateLikesCount(data.likesCount));
//       return data;
//     }
//   };




// export const getLikeThunk = (id) => async (dispatch) => {
//   let res = await fetch(`/api/likes/${id}`);
//   if(res.ok){
//     let data = await res.json();
//     dispatch(getSingleLike(data));
//     return data;
//   }
// }

// export const createLikeThunk = (req) => async (dispatch) => {
//   let res = await fetch(`/api/likes/new`, {
//     method: 'POST',
//     headers: {
// 			"Content-Type": "application/json",
// 		},
//     body: JSON.stringify(req)
//   })
//   if(res.ok){
//     let data = res.json();
//     await dispatch(getSingleLike(data));
//     return data;
//   }
// }

// export const editLikeThunk = (like, id) => async (dispatch) => {
//   let res = await fetch(`/api/likes/edit/${id}`, {
//     method: 'PUT',
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(like)
//   })
//   if(res.ok){
//     let data = await res.json();
//     await dispatch(getSingleLike(data));
//     return data;
//   }
//   else{
//     let err = await res.json();
//   }
// }



//   //___________________________________________________


// //   const initialState = null

// //   //___________________________________________________

// //   // reducer:


// // export default function likeReducer(state = initialState, action){
// //   let stateCopy = cloneDeep(state);


// //   switch (action.type){

// //     case GET_SINGLE_LIKE:
// //       stateCopy = action.payload;
// //       return stateCopy;

// //     case CLEAR_SINGLE_LIKE:
// //       stateCopy = initialState;
// //       return stateCopy;


// //     default:
// //       return state;
// //   }
// // }


// const initialState = {
//     singleLike: null,
//     likesCount: 0, // New property for the likes count
//   };

//  export default function likeReducer(state = initialState, action){
// //   let stateCopy = cloneDeep(state);

//   switch (action.type) {
//     case GET_SINGLE_LIKE:
//       return {
//         ...state,
//         singleLike: action.payload,
//       };
//     // ... other cases ...

//     default:
//       return state;
//   }
// }
