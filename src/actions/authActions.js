import axios from 'axios';

export const ERROR = 'ERROR';
export const CHECKING_USER = 'CHECKING_USER';
export const USER_CHECKED = 'USER_CHECKED';
export const UPDATING_USER = 'UPDATING_USER';
export const USER_UPDATED = 'USER_UPDATED';

export const FETCHING_INVITE = 'FETCHING_INVITE';
export const INVITE_FETCHED = 'INVITE_FETCHED';

export const SET_USER = 'SET_USER';

const backendUrl = process.env.REACT_APP_BACKEND_URL || `http://localhost:5000`;

export const checkIfUserExists = role => {
	// This function passes the auth0 jwt to the backend, and validates whether an entry
	// for this user exists in the database.

	// The role selected by the user is passed upon account validation.

	const token = localStorage.getItem('jwt');

	const options = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const body = {
		role: role,
	};

	const checkUrl = axios.post(`${backendUrl}/api/users/login`, body, options);

	return dispatch => {
		dispatch({ type: CHECKING_USER });

		checkUrl
			.then(res => {
				localStorage.setItem('userInfo', res.data.userInfo);
				localStorage.setItem('currentUser', JSON.stringify(res.data.user));
				localStorage.setItem('role', JSON.stringify(res.data.user.role));

				dispatch({ type: USER_CHECKED, payload: res.data });
			})
			.catch(err => {
				console.log(err);
				dispatch({ type: ERROR });
			});
	};
};

export const inviteLogin = (role, inviteCode) => {
	const token = localStorage.getItem('jwt');

	const options = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const body = {
		role: role,
	};

	const endpoint = axios.post(
		`${backendUrl}/api/users/login/${inviteCode}`,
		body,
		options
	);

	return dispatch => {
		dispatch({ type: CHECKING_USER });

		endpoint
			.then(res => {
				console.log('invite login res', res.data);

				dispatch({ type: USER_CHECKED, payload: res.data });
			})
			.catch(err => {
				console.log(err);
				dispatch({ type: ERROR });
			});
	};
};

export const updateUserProfile = (user_id, changes) => {
	let token = localStorage.getItem('jwt');
	let userInfo = localStorage.getItem('userInfo');

	let options = {
		headers: {
			Authorization: `Bearer ${token}`,
			'user-info': userInfo,
		},
	};
	const endpoint = axios.put(
		`${backendUrl}/api/users/${user_id}`,
		changes,
		options
	);

	return dispatch => {
		dispatch({ type: UPDATING_USER });

		endpoint
			.then(res => {
				dispatch({ type: USER_UPDATED, payload: res.data });
			})
			.catch(err => {
				console.log(err);
				dispatch({ type: ERROR });
			});
	};
};

export const updateUserPicture = (user_id, changes) => {
	let token = localStorage.getItem('jwt');
	let userInfo = localStorage.getItem('userInfo');

	let options = {
		headers: {
			Authorization: `Bearer ${token}`,
			'user-info': userInfo,
		},
	};
	const endpoint = axios.put(
		`${backendUrl}/api/users/profilepic/${user_id}`,
		changes,
		options
	);

	return dispatch => {
		dispatch({ type: UPDATING_USER });

		endpoint
			.then(res => {
				dispatch({ type: USER_UPDATED, payload: res.data });
			})
			.catch(err => {
				console.log(err);
				dispatch({ type: ERROR });
			});
	};
};

export const setUser = user => {
	return dispatch => {
		dispatch({ type: SET_USER, payload: user });
	};
};

export const checkInvite = inviteCode => {
	const endpoint = axios.get(`${backendUrl}/api/invites/info/${inviteCode}`);

	return dispatch => {
		dispatch({ type: FETCHING_INVITE });

		endpoint
			.then(res => {
				console.log('invite fetch', res.data);
				dispatch({ type: INVITE_FETCHED, payload: res.data.inviteInfo });
			})
			.catch(err => {
				console.log(err);
				dispatch({ type: ERROR });
			});
	};
};

export const resetApp = () => {
	return dispatch => {
		dispatch({ type: 'RESET_APP' });
	};
};
