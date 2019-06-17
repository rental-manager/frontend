import {
	USER_CHECKED,
	USER_UPDATED,
	UPDATING_USER,
	SET_USER,
} from '../actions';

const initialState = {
	userInfo: null,
	userChecked: false,
	user: null,
	currentUser: null,
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		// example action
		case USER_CHECKED:
			return {
				...state,
				userInfo: action.payload.userInfo,
				userChecked: true,
				user: action.payload.user,
				currentUser: action.payload.user,
			};

		case UPDATING_USER:
			return {
				...state,
				userChecked: false,
			};

		case USER_UPDATED:
			return {
				...state,
				userInfo: action.payload.userInfo,
				user: action.payload.user,
				currentUser: action.payload.user,
				userChecked: true,
			};

		case SET_USER:
			return { ...state, user: action.payload };

		default:
			return state;
	}
};

export default authReducer;
