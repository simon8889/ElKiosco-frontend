const API_ROUTE = process.env.NEXT_PUBLIC_API_ROUTE

export interface UserToken {
	token: string,
	username: string
}

export const signinUser = async (username: string, password: string) => {
	const body = {username, password}
	const response = await fetch(`${API_ROUTE}/users/register/`, {
		method: "post",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body)
	});
	return response;
}

export const loginUser = async (username: string, password: string) => {
	const body = {username, password}
	const response = await fetch(`${API_ROUTE}/users/login/`, {
		method: "post",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body)
	});
	return response;
}