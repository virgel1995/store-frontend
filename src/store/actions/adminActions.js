import { base_url } from "../../constants";

export const AUTHENTICATE_USER = 'AUTHENTICATE_ADMIN';
export const LOGOUT_USER = 'LOGOUT_ADMIN';

export const signup = (user) => {
	return async dispatch => {
		try {
			const response = await fetch(`${base_url}/admin/signup`, {
				headers: {
					'Content-Type': 'application/json',
					'Accepts': 'application/json'
				},
				method: 'POST',
				body: JSON.stringify({
					firstName: user.firstName,
					lastName: user.lastName,
					email: user.email,
					password: user.password,
					state: false
				})
			});
			const jsonResponse = await response.json();
			return jsonResponse;
		} catch (error) {
			console.log(error);
		}
	}
}

export const authenticate = (email, password) => {
	return async dispatch => {
		const response = await fetch(`${base_url}/user/login`, {
			headers: {
				'Content-Type': 'application/json',
				'Accepts': 'application/json'
			},
			method: 'POST',
			body: JSON.stringify({
				email: email,
				password: password
			})
		});

		const jsonResponse = await response.json();
		if (response.status === 200 && response.state === true) {
window.localStorage.setItem('auth', JSON.stringify(response.message));

			dispatch({
				type: AUTHENTICATE_ADMIN,
				auth: jsonResponse.message
			});
		}

		return jsonResponse.message;
	}
}

export const logout = () => {
	return dispatch => {
		const authData = window.localStorage.getItem('auth');
		if (authData) {
			window.localStorage.clear();
			dispatch({
				type: LOGOUT_ADMIN,
				payload: ''
			});
			return Promise.resolve(true);
		}
		return Promise.resolve(false);
	}
}

export const getToken = () => {
	return dispatch => {
		const authData = window.localStorage.getItem('auth');

		if (authData) {
			const auth = JSON.parse(authData);
			if (auth.hasOwnProperty('token') && auth.token != '') {
				dispatch({
					type: AUTHENTICATE_ADMIN,
					auth: auth
				});

				return Promise.resolve(true);

			}
		}

		return Promise.resolve(false);

	}
}

