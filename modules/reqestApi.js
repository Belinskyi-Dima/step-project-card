const BASE_URL ="https://ajax.test-danit.com/api/v2/";
const token = 'a3a8260f-7ba5-4cb2-9c25-c4e532982d51';
import createResponseCard from "./main.js";

export default class Request {
	constructor (url,id) {
		this.url = url;
		this.id = id;
	}

	creatPost(post) {
		return	fetch( BASE_URL + "/", {
				method: 'POST',
				headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
				},
				body: JSON.stringify({post})
			})
			.then(response => response.json())
			.then(response =>{
				console.log(response);
				const responseId = response.id;
				this.getPost(responseId);
				console.log(responseId);
			})
	}

	getPost1() {

		// let token = 'a3a8260f-7ba5-4cb2-9c25-c4e532982d51';
		return  axios({
			method: "get",
			url:"https://ajax.test-danit.com/api/v2/cards/",
			headers: {
				 "Content-Type": "application/json",
				 'Authorization': `Bearer ${token}`
			}
	  })
	  .then(({
			data
			
	  }) => {
			
		
			console.log(data);
			
			createResponseCard(data);
	  })
	}

	getPost(id) {
		// let token = 'a3a8260f-7ba5-4cb2-9c25-c4e532982d51';
		return axios({
			method: "GET",
			url: BASE_URL + "/" + id,
			headers: {
				 "Content-Type": "application/json",
				 'Authorization': `Bearer ${token}`
			}
	  })
	  .then(({
			data
	  }) => {
			console.log(data);
			createResponseCard(data);
	  })
	 
	}

	deletePost(id) {
		return  fetch(BASE_URL + '/cards/' + this.id, {
			method: 'DELETE',
			headers: {
				 'Authorization': `Bearer ${token}`
			},
	  }).catch(e=>{
	console.log(e.message);
})
	}
}
const request = new Request();



