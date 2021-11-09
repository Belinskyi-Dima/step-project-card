import {Form, FormField}from "./FormModel.js"; 
import formConfig from "./formConfig.js";
// import LocalStorage from "./localStorage.js";
 
// const localStorageCreate = new LocalStorage()


import Request from "./reqestApi.js";
// import {createRequest, CreateRequest}from "./reqestApi.js";
// import {cardVisit } from "./cartVisit.js";
// export default {createResponseCard}

const request = new Request();
request.getPost1()
// request.deletePost(28779)
// const BASE_URL = "http://localhost:3000";
const BASE_URL ="https://ajax.test-danit.com/api/v2/cards";
const token = 'a3a8260f-7ba5-4cb2-9c25-c4e532982d51'
function formDataObject(formData){
	
	let dataObject = {};
	for (let i =0; i < formData.length; i++){
		let fieldData = formData[i];
		let fieldName = fieldData.name;
		let fieldValue = fieldData.value;
		dataObject[fieldName] = fieldValue;
	}

	return dataObject;
}

let selectDoctor = new FormField({
	"type": "select",
	"id": "doctor",
	"class": "doctor-select",
	"name":"doctor",
	"label": "Doctor",
	"options": [{
		"text":"- Please select a doctor -",
		"value":""
	},
	{
		"text":"Cardiologist",
		"value":"cardiologist"
	},{
		"text":"Dentist",
		"value":"dentist"
	},
	{
		"text":"Therapist",
		"value":"therapist"
	}]
});

$(document).ready(()=>{
	let $selectDoctorContainer = $(".select-doctor-container");
	let $doctorFormContainer = $('.doctor-form-container');
	
	let $doctorDropDawn = $(selectDoctor.getHTML());
		// console.log( $doctorDropDawn);
	$doctorDropDawn.on('change', (e)=>{
		e.preventDefault();
		let value = e.target.value;
	


	
		

		if (value){
			let form = new Form(formConfig[value]);
			let $formHTML = $(form.getHTML());
console.log($formHTML);
			$formHTML.on('submit', (e) => { //получаем c формы value
				e.preventDefault();
				console.log(e.target);
				
				let formData = $(e.target).serializeArray();
				// console.log(formData);

				let visitObject = formDataObject(formData);
console.log(visitObject);
				let docVel ={
					"doctor":`${value}`
				};
				
				let newClient = {...docVel, ...visitObject};

				
				createClients(newClient);

				
				
			});
		




// create post-------------11
			function createClients (post) {
				// let token = 'a3a8260f-7ba5-4cb2-9c25-c4e532982d51'
				return	fetch("https://ajax.test-danit.com/api/v2/cards", {
				method: 'POST',
				headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
				},
				body: JSON.stringify({post})
			})
			.then(response => response.json())
			.then(response =>{
				localStorageCreate.push(response)
				console.log(response.id);
				const responseId = response.id;
				// getPost(responseId)
			})
			}
//--------------------------

//get post fetch
			// function getPost (id= 0) {
			// 	let token = 'a3a8260f-7ba5-4cb2-9c25-c4e532982d51';
			// 	return	fetch("https://ajax.test-danit.com/api/v2/" + id, {
			// 	method: 'GET',
			// 	headers: {
			// 	'Authorization': `Bearer ${token}`
			// 	},
			// })
			// // .then((response) => {
			// // 	return response.json();
			// // })
			// .then((response)=> console.log(response))
			// }




// get post axios---------------------11
			function getPost(id) {

				
				return  axios({
					method: "get",
					url:"https://ajax.test-danit.com/api/v2/cards/" + id,
					headers: {
						 "Content-Type": "application/json",
						 'Authorization': `Bearer ${token}`
					}
			  })
			  .then(({
					data
					
			  }) => {
					
				
					console.log(data);
					
					// createResponseCard(data);
			  })
			  
	}
//----------------
			
			$doctorFormContainer.html($formHTML);
		} else {
			$doctorFormContainer.html("");
		}
	});

	$selectDoctorContainer.html($doctorDropDawn)

});

const cardVisit = document.getElementById ('cart-visit');



export default function createResponseCard(data) {

		data.forEach(element => {
			const responseBox = document.createElement('ul'); 
			const cardBtnClose = document.createElement("a");
			const cardbtnShowMore = document.createElement('button');
			const cardbtnEdit = document.createElement('button');
			const cardImg = document.createElement('img');

			const cardOpenDone = document.createElement('select');
			const cardOpen = document.createElement('option');
			const cardDone = document.createElement('option');

			cardOpenDone.setAttribute('name', 'open-done');
			cardOpen.setAttribute('name', 'open');
			cardOpen.setAttribute('value', 'open');
			cardDone.setAttribute('name', 'done');
			cardDone.setAttribute('value', 'done');
			cardImg.setAttribute('src', 'https://andriikhomik.github.io/step_project_doctor-s_schedule_visits_deploy/img/therapist.f8bdaa5aca05139b9a8e.jpeg');


			cardBtnClose.classList.add("card-btn-close");
			cardbtnShowMore.classList.add("btn" , "card-btn-show-more");
			cardbtnEdit.classList.add("btn")
			cardOpenDone.classList.add("card-btn-open-done");
			cardImg.classList.add("card-img");

		

			cardbtnShowMore.textContent = "Show more";
			cardbtnEdit.textContent = "Edit";

			cardOpen.textContent = "Open";
			cardDone.textContent = "Done";

			// doctorBtnClose.textContent = "x";
			cardOpenDone.append(cardOpen, cardDone)
			responseBox.append(cardBtnClose, cardOpenDone, cardImg)


			responseBox.classList.add("response-box")


			console.log(element);
				// let v =  `<li class="response-item">${element} : ${element}</li>`;
				// responseBox.insertAdjacentHTML('beforeend', v);
			let dataPost = element.post;
			// console.log(element.post);
			// dataPost.forEach(elem => {
			// 	let v =  `<li class="response-item">${elem} : ${elem}</li>`;
			// 	responseBox.insertAdjacentHTML('beforeend', v);
			// })

			for(let key in dataPost) {
				let v =  `<li class="response-item"><span class="response-item-text">${key} :</span> ${dataPost[key]}</li>`;
				responseBox.insertAdjacentHTML('beforeend', v);
			console.log(element.id);
			// console.log(element.post);
			// console.log(element.post );
			
			
			// console.log(dataPost);			
			// dataPost.forEach(elem => {
				// let v =  `<li class="response-item">${elem} : ${elem}</li>`
				// responseBox.insertAdjacentHTML('beforeend', v);
			// } )
			// console.log(`${key} :${value} `);
			
			
		}
		responseBox.append( cardbtnShowMore, cardbtnEdit, element.id);
		cardVisit.append (responseBox);

		cardBtnClose.addEventListener("click", request.deletePost)
	});
		// cardVisit.append (responseBox);
		// deleteReqestBtn(30952)
		
	}

 function clearInputSerch(e, b) {
	$("form")[0].reset();
	console.log(b[2].value);
	b[2].value = "";
}
// /delete reqest
function deleteReqestBtn(id) {
	return  fetch(BASE_URL + '/' + id, {
		            method: 'DELETE',
		            headers: {
		                'Authorization': `Bearer ${token}`
		            },
		        }).catch(e=>{
				console.log(e.message);
	})
}

// console.log(createResponseCard);


