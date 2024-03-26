import axios from "axios";

const API_URL = "http://188.92.28.212:3000:3001/api/";
let accessToken = null;
let headers = {
	"Content-Type": "application/json",
};

if (typeof window !== "undefined") {
	accessToken = localStorage.getItem("token");
	headers = {
		Authorization: `Bearer ${accessToken}`,
		"Content-Type": "application/json",
	};
}

export const $host = axios.create({
	baseURL: API_URL,
	headers: headers,
});

$host.interceptors.response.use(
	function (response) {
		return response;
	},
	function (error) {
		if (
			error &&
			error.response &&
			error.response.status &&
			error.response.status === 401
		) {
			window.location.href = "/logout";
			return;
		}
		return Promise.reject(error);
	},
);

// user 3

const API_URL2 = "http://188.92.28.212:3001/api/user2/";

if (typeof window !== "undefined") {
	accessToken = localStorage.getItem("token");
	headers = {
		Authorization: `Bearer ${accessToken}`,
		"Content-Type": "application/json",
	};
}

export const $host2 = axios.create({
	baseURL: API_URL2,
	headers: headers,
});

$host2.interceptors.response.use(
	function (response) {
		return response;
	},
	function (error) {
		if (
			error &&
			error.response &&
			error.response.status &&
			error.response.status === 401
		) {
			window.location.href = "/logout";
			return;
		}
		return Promise.reject(error);
	},
);
