export const GET_ALL_POSTS = "posts/GET_ALL_POSTS";
export const GET_SINGLE_POST = "posts/GET_SINGLE_POST";
export const CREATE_SINGLE_POST = "posts/CREATE_SINGLE_POST";
export const DELETE_SINGLE_POST = "posts/DELETE_SINGLE_POST";
export const POSTS_SEARCH = "post/POSTS_SEARCH"
export const CLEAR_SEARCH_RESULTS = "post/CLEAR_SEARCH_RESULTS"

export const FETCH_PHOTO_URL_REQUEST = "posts/FETCH_PHOTO_URL_REQUEST";
export const FETCH_PHOTO_URL_SUCCESS = "posts/FETCH_PHOTO_URL_SUCCESS";
export const FETCH_PHOTO_URL_FAILURE = "posts/FETCH_PHOTO_URL_FAILURE";

// actions:

const getAllPosts = (posts) => ({
  type: GET_ALL_POSTS,
  posts,
});

const getSinglePost = (post) => ({
  type: GET_SINGLE_POST,
  post,
});

const createSinglePost = (post) => ({
  type: CREATE_SINGLE_POST,
  post,
});


const deleteSinglePost = (postId) => ({
  type: DELETE_SINGLE_POST,
  postId,
});

export const fetchPhotoUrlRequest = () => ({
  type: FETCH_PHOTO_URL_REQUEST,
});

export const fetchPhotoUrlSuccess = (photoUrl) => ({
  type: FETCH_PHOTO_URL_SUCCESS,
  photoUrl,
});

export const fetchPhotoUrlFailure = (error) => ({
  type: FETCH_PHOTO_URL_FAILURE,
  error,
});

const searchPosts = (posts) => ({
  type: POSTS_SEARCH,
  posts
})


export const clearSearchResults = () => ({
  type: CLEAR_SEARCH_RESULTS,
});



//___________________________________________________

//thunks:

export const fetchPhotoUrl = (postId) => async (dispatch) => {
  dispatch(fetchPhotoUrlRequest());
  try {
    const response = await fetch(`/api/posts/${postId}/photo`);
    if (response.ok) {
      const data = await response.json();
      dispatch(fetchPhotoUrlSuccess(data.photoUrl));
    } else {
      throw new Error("Failed to fetch photo URL");
    }
  } catch (error) {
    dispatch(fetchPhotoUrlFailure(error.message));
  }
};

export const getAllPostsThunk = () => async (dispatch) => {
  const res = await fetch("/api/posts");
  console.log("Response:", res);

  if (res.ok) {
    const posts = await res.json();

    dispatch(getAllPosts(posts));
    return posts;
  } else {
    const data = await res.json();
    return data.errors;
  }
};

export const getSinglePostThunk = (postId) => async (dispatch) => {
  const response = await fetch(`/api/posts/${postId}`);

  if (response.ok) {
    const post = await response.json();
    dispatch(getSinglePost(post));
    return post;
  } else {
    const errors = await response.json();
    return errors;
  }
};

export const createSinglePostThunk = (formData) => async (dispatch) => {
  const response = await fetch("/api/posts/new", {
    method: "POST",
    body: formData,
  });

  if (response.ok) {
    const post = await response.json();
    dispatch(createSinglePost(post));
    return response;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

export const checkPreviousPost = (postId) => async (dispatch) => {
  const response = await fetch(`/api/posts/check/${postId}/previous`);
  const data = await response.json();

  if (response.ok) {
    return data.previousPostId;
  } else {
    throw data;
  }
};

export const checkNextPost = (postId) => async (dispatch) => {
  const response = await fetch(`/api/posts/check/${postId}/next`);
  const data = await response.json();

  if (response.ok) {
    return data.nextPostId;
  } else {
    throw data;
  }
};

export const deleteSinglePostThunk = (postId) => async (dispatch) => {
  const response = await fetch(`/api/posts/${postId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(deleteSinglePost(postId));
    return response;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

export const editSinglePostThunk = (postId, formData) => async (dispatch) => {
  console.log("Dispatching editSinglePostThunk");

  const response = await fetch(`/api/posts/edit/${postId}`, {
    method: "PUT",
    body: formData,
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(createSinglePost(formData));
    return response;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};


//___________________________________________________



export const searchPostsThunk = (search) => async (dispatch) => {
  const response = await fetch(`/api/posts/search/${search}`);
  if (response.ok) {
    const data = await response.json();
    dispatch(searchPosts(data));
    return data;
  } else {
    const errors = await response.json();
    return errors;
  }
};

//___________________________________________________

const initialState = { allPosts: {}, singlePost: {}, searchedPosts: {} };

//___________________________________________________


// reducer:


export default function postsReducer(state = initialState, action) {
  let newState;

  switch (action.type) {
    case GET_ALL_POSTS:
      const allPostsArray = [...action.posts]
      const allPostsObj = {}

      allPostsArray.forEach(post => allPostsObj[post.id] = post)

      return {
        ...state,
        allPosts: allPostsObj,
      };

    case GET_SINGLE_POST:
      newState = { ...state, singlePost: action.post };
      return newState;

    case CREATE_SINGLE_POST:
      return {
        ...state,
        allPosts: {
          ...state.allPosts,
          [action.post.id]: action.post,
        },
        singlePost: action.post,
      };


    case DELETE_SINGLE_POST:
      newState = { ...state, allPosts: { ...state.allPosts } };
      delete newState.allPosts[action.postId];
      return newState;


    case FETCH_PHOTO_URL_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case FETCH_PHOTO_URL_SUCCESS:
      return {
        ...state,
        photoUrl: action.photoUrl,
        loading: false,
      };

    case FETCH_PHOTO_URL_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
      };

    case POSTS_SEARCH:
      return {
        ...state,
        searchedPosts: { ...state.searchedPosts, ...action.posts },
      };

    case CLEAR_SEARCH_RESULTS:
      return {
        ...state,
        searchedPosts: {},
      };


    default:
      return state;
  }
}
