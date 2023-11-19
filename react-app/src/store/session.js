// constants
export const SET_USER = "session/SET_USER";
export const REMOVE_USER = "session/REMOVE_USER";
export const ADD_LIKED_POST = "session/createLike";
export const REMOVE_LIKED_POST = "session/deleteLike";



const setUser = (user) => ({
	type: SET_USER,
	payload: user,
});

const removeUser = () => ({
	type: REMOVE_USER,
});



// export const createLike = (user) => {
// 	return {
// 	  type: ADD_LIKE,
// 	  user,
// 	};
//   };

//   export const deleteLike = (user) => {
// 	return {
// 	  type: DELETE_LIKE,
// 	  user,
// 	};
//   };


export const createLike = (user, postId) => {
	return {
	  type: ADD_LIKED_POST,
	  user,
	  postId,
	};
  };

  export const deleteLike = (user, postId) => {
	return {
	  type: REMOVE_LIKED_POST,
	  user,
	  postId,
	};
  };



  //___________________________________________________


const initialState = { user: null,  likes: {}, };

//___________________________________________________

export const authenticate = () => async (dispatch) => {
	const response = await fetch("/api/auth/", {
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}

		dispatch(setUser(data));
	}
};

export const login = (email, password) => async (dispatch) => {
	const response = await fetch("/api/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email,
			password,
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const logout = () => async (dispatch) => {
	const response = await fetch("/api/auth/logout", {
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
		dispatch(removeUser());
	}
};

export const signUp = (username, email, password) => async (dispatch) => {
	const response = await fetch("/api/auth/signup", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			username,
			email,
			password
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};



// export const ThunkAddLike = (id) => async (dispatch) => {
// 	try {
// 	  const response = await fetch(`/api/songs/${id}/like`);
// 	  if (response.ok) {
// 		const user = await response.json();
// 		await dispatch(createLike(user));
// 		return user;
// 	  }
// 	} catch (err) {
// 	  const errors = await err.json();
// 	  return errors;
// 	}
//   };

//   export const ThunkDeleteLike = (id) => async (dispatch) => {
// 	try {
// 	  const response = await fetch(`/api/songs/${id}/unlike`);
// 	  if (response.ok) {
// 		const user = await response.json();
// 		await dispatch(deleteLike(user));
// 		return user;
// 	  }
// 	} catch (err) {
// 	  const errors = await err.json();
// 	  return errors;
// 	}
//   };

export const ThunkAddLike = (postId) => async (dispatch) => {
	try {
	  const response = await fetch(`/api/posts/${postId}/like`);
	  if (response.ok) {
		const user = await response.json();
		await dispatch(createLike(user, postId));
		return user;
	  }
	} catch (err) {
	  const errors = await err.json();
	  return errors;
	}
  };

  export const ThunkDeleteLike = (postId) => async (dispatch) => {
	try {
	  const response = await fetch(`/api/posts/${postId}/unlike`);
	  if (response.ok) {
		const user = await response.json();
		await dispatch(deleteLike(user, postId));
		return user;
	  }
	} catch (err) {
	  const errors = await err.json();
	  return errors;
	}
  };



  //___________________________________________________




export default function reducer(state = initialState, action) {
	switch (action.type) {
		case SET_USER:
			return { user: action.payload };
		case REMOVE_USER:
			return { user: null };
		// case ADD_LIKE:
        //     return { user: action.user };
        // case DELETE_LIKE:
        //     return { user: action.user };

		case ADD_LIKED_POST:
      return { ...state, likedPosts: [...state.likedPosts, action.postId] };
    case REMOVE_LIKED_POST:
      return {
        ...state,
        likedPosts: state.likedPosts.filter((postId) => postId !== action.postId),
      };



		default:
			return state;
	}
}
