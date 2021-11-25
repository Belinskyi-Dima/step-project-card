import { getCookie } from './Cookies.js';

const BASE_URL ="https://ajax.test-danit.com/api/v2";
// const token = "3635d84e-1128-4a99-9651-3bd5bb74f626"; // '3635d84e-1128-4a99-9651-3bd5bb74f626'; // a3a8260f-7ba5-4cb2-9c25-c4e532982d51
export default class Request {
	constructor (url,id) {
		this.url = url;
		this.id = id;
	}

	creatPost(post) {
		let token = getCookie('token');
		return fetch( BASE_URL + "/cards", {
				method: 'POST',
				headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
				},
				body: JSON.stringify(post)
			})
			.then(response => response.json())
			.then((data) => {
				this.id = data.id;
				return data;
			});
	}

	getPosts() {
		let token = getCookie('token');
		return axios({
			method: "get",
			url:"https://ajax.test-danit.com/api/v2/cards",
			headers: {
				 "Content-Type": "application/json",
				 'Authorization': `Bearer ${token}`
			}
	  })
	  .then(({data}) => {
			return data
	  })
	}

	getPost(id) {
		let token = getCookie('token');
		return axios({
			method: "GET",
			url: BASE_URL + '/cards/' + id,
			headers: {
				"Content-Type": "application/json",
				'Authorization': `Bearer ${token}`
			}
		}).then(({data}) => {
			return data
		});

	}

	deletePost(id) {
		let token = getCookie('token');
		return axios(BASE_URL + '/cards/' + id, {
			method: 'DELETE',
			headers: {
					'Authorization': `Bearer ${token}`
			},
		}).catch(e=>{});
	}


	editCard(id, data) {
		let token = getCookie('token');
		return axios(BASE_URL + '/cards/' + id, {
			method: 'PUT',
			headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`
			},
			data: JSON.stringify(data)
		}).then(({data}) => {
			return data;
		});
	}

	login(email, password) {
		return axios(BASE_URL + "/cards/login", {
			method: 'POST',
			headers: {
			  'Content-Type': 'application/json'
			},
			data: { email: email, password: password }
		 })
			.then((response) => {
				let responseObj = {
					status: response.status,
					data: response.data
				}

				return responseObj;
			}).catch((error) => {
				let responseObj = {
					error: true,
					status: error.response.status,
					data: error.response.data
				}

				return responseObj;
			 });
	}
}