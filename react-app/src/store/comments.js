export const LOAD_COMMENTS = '/comments/LOAD_COMMENTS';
export const CREATE_COMMENT = '/comments/CREATE_COMMENT';
export const UPDATE_COMMENT = '/comments/UPDATE_COMMENT';
export const DELETE_COMMENT = '/comments/DELETE_COMMENT';


// actions:

export const loadComments = comments => {
  return {
    type: LOAD_COMMENTS,
    comments
  }
};

export const createComment = comment => {
  return {
    type: CREATE_COMMENT,
    comment
  }
};

export const updateComment = comment => {
  return {
    type: UPDATE_COMMENT,
    comment
  }
};

export const deleteComment = commentId => {
  return {
    type: DELETE_COMMENT,
    commentId
  }
};


//___________________________________________________

//thunks:


export const getComments = () => async (dispatch) => {
  const res = await fetch("/api/comments/all");
  if (res.ok) {
      const data = await res.json();
      dispatch(loadComments(data));
      return data;
  } else {
      const errors = await res.json();
      return errors;
  }
};



export const createCommentThunk = (form, postId) => async (dispatch) => {
  const res = await fetch(`/api/comments/new`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({...form, post_id: postId})
  });


  if (res.ok) {
      const data = await res.json();
      dispatch(createComment(data));
      return data;
  } else {
      const errors = await res.json();
      return errors;
  }
};



export const updateCommentThunk = (form, commentId, postId) => async (dispatch) => {
  const res = await fetch(`/api/comments/${commentId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({...form, post_id: postId})
  });
  if (res.ok) {
      const data = await res.json();
      dispatch(updateComment(data));
      return data;
  } else {
      const errors = await res.json();
      return errors;
  }
};



export const deleteCommentThunk = (commentId) => async (dispatch) => {
  const res = await fetch(`/api/comments/${commentId}/delete`, {
      method: 'DELETE'
  });
  if (res.ok) {
      const data = await res.json();
      dispatch(deleteComment(commentId));
      return data;
  } else {
      const errors = await res.json();
      return errors;
  }
};



//___________________________________________________

const initialState = {}

//___________________________________________________

// reducer:

const commentReducer = (state = initialState, action) => {
  let newState;

  switch(action.type) {

    case LOAD_COMMENTS:
      newState = {...state}
      action.comments.forEach((comment) => newState[comment.id] = comment)
      return newState


    case CREATE_COMMENT:
      newState = {...state}
      newState[action.comment.id] = action.comment
      return newState


    case UPDATE_COMMENT:
      newState = { ...state, [action.comment.id]: action.comment };
      return newState;


    case DELETE_COMMENT:
      newState = { ...state }
      delete newState[action.commentId]
      return newState

    default:
      return state
  }
};

export default commentReducer;
