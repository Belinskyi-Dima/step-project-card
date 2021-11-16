const BASE_URL ="https://ajax.test-danit.com/api/v2";
const token = 'a3a8260f-7ba5-4cb2-9c25-c4e532982d51';
export default class Request {
	constructor (url,id) {
		this.url = url;
		this.id = id;
	}

	creatPost(post) {
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
		return axios(BASE_URL + '/cards/' + id, {
			method: 'DELETE',
			headers: {
					'Authorization': `Bearer ${token}`
			},
		}).catch(e=>{});
	}


	editCard(id, data) {
		return axios(BASE_URL + '/cards/' + id, {
			method: 'PUT',
			headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`
			},
			data: JSON.stringify(data)
		}).then(({data}) => {
			console.log(data);
			return data;
		});
	}

}