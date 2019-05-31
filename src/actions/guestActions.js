import axios from 'axios';

// getGuest
export const GETTING_GUEST = 'GETTING_GUEST';
export const GOT_GUEST = 'GOT_GUEST';
export const GET_GUEST_ERROR = 'GET_GUEST_ERROR';

// updateGuestTask
export const UPDATING_GUEST_TASK = 'UPDATING_GUEST_TASK';
export const UPDATED_GUEST_TASK = 'UPDATED_GUEST_TASK';
export const UPDATE_GUEST_TASK_ERROR = 'UPDATE_GUEST_TASK_ERROR';

const backendUrl = process.env.REACT_APP_BACKEND_URL || `http://localhost:5000`;

export const getGuest = guest_id => {
	const token = localStorage.getItem('jwt');
	const userInfo = localStorage.getItem('userInfo');

	const options = {
		headers: { Authorization: `Bearer ${token}`, 'user-info': userInfo }
	};

	return dispatch => {
		dispatch({ type: GETTING_GUEST });

		axios
			.get(`${backendUrl}/api/guests/${guest_id}`, options)
			.then(res => {
				dispatch({ type: GOT_GUEST, payload: res.data.guest });
			})
			.catch(error => {
				console.log(error);
				dispatch({ type: GET_GUEST_ERROR, payload: error });
			});
	};
};

export const updateGuestTask = (guest_id, task_id, completed) => {
	const token = localStorage.getItem('jwt');
	const userInfo = localStorage.getItem('userInfo');

	const options = {
		headers: { Authorization: `Bearer ${token}`, 'user-info': userInfo }
	};

	return dispatch => {
		dispatch({ type: UPDATING_GUEST_TASK });

		axios
			.put(
				`${backendUrl}/api/guests/${guest_id}/tasks/${task_id}`,
				{ completed },
				options
			)
			.then(res => {
				dispatch({ type: UPDATED_GUEST_TASK, payload: res.data.updatedTask });
			})
			.catch(error => {
				console.log(error);
				dispatch({ type: UPDATE_GUEST_TASK_ERROR, payload: error });
			});
	};
};