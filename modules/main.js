import {Form, FormField}from "./FormModel.js"; 
import formConfig from "./formConfig.js";
// import LocalStorage from "./localStorage.js";
 
// const localStorageCreate = new LocalStorage()


import Request from "./requestApi.js";
// import {createRequest, CreateRequest}from "./reqestApi.js";
// import {cardVisit } from "./cartVisit.js";
// export default {createResponseCard}

const request = new Request();
request.getPosts()
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
	"label": "create Visit",
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
		console.log( e.target.value);
		if (value){
			let form = new Form(formConfig[value]);
			let $formHTML = $(form.getHTML());
			$formHTML.on('submit', (e) => { //получаем c формы value
				e.preventDefault();
				
				let formData = $(e.target).serializeArray();

				let visitObject = formDataObject(formData);
				console.log(visitObject);
				let docVel ={
					"doctor":`${value}`
				};
				
				let newClient = {...docVel, ...visitObject};

				request.creatPost(newClient).then((response)=>{
					$doctorDropDawn.val('');
					$formHTML.remove();
					console.log(newClient);
				});

			});

			$formHTML.find('.close').on('click', function(e){
				e.preventDefault();
				$doctorDropDawn.val('');
				$formHTML.remove();
			});
			
			$doctorFormContainer.html($formHTML);
		} else {
			$doctorFormContainer.html("");
		}
	});

	$selectDoctorContainer.html($doctorDropDawn)

});

const cardVisit = document.getElementById ('cart-visit');

export default function createResponseCard(data) {
	for (let i = 0; i < data.length; i++) {
		let dataKey = data[i];

		const showMore =  "Show more";
		const showLess =  "Show less";
		
		const responseBox = document.createElement('ul'); 
		const cardbtnShowMore = document.createElement('button');
		const cardbtnEdit = document.createElement('button');
		const cardImg = document.createElement('img');
		const cardBtnClose = document.createElement("a");
		const cardOpenDone = document.createElement('select');
		const cardOpen = document.createElement('option');
		const cardDone = document.createElement('option');
		const expandedClass = "expanded";
		cardOpenDone.setAttribute('name', 'open-done');
		cardOpen.setAttribute('name', 'open');
		cardOpen.setAttribute('value', 'open');
		cardDone.setAttribute('name', 'done');
		cardDone.setAttribute('value', 'done');

		const imagePath = '/img/';
		const src = imagePath + dataKey.doctor + '.jpeg';

		cardImg.setAttribute('src',src);

		cardbtnShowMore.classList.add("btn" , "card-btn-show-more");
		cardbtnEdit.classList.add("btn")
		cardOpenDone.classList.add("card-btn-open-done");
		cardImg.classList.add("card-img");
		cardBtnClose.classList.add("card-btn-close");

		cardbtnShowMore.textContent = showMore;
		cardbtnEdit.textContent = "Edit";

		cardOpen.textContent = "Open";
		cardDone.textContent = "Done";

		cardOpenDone.append(cardOpen, cardDone)
		responseBox.append(cardBtnClose, cardOpenDone, cardImg)
		responseBox.classList.add("response-box")
		
		let j = 1;
		for (let key in dataKey) {
			if(key == 'id'){
				continue;
			}


			let expanClass = j > 2 ? "expan" : "";
			let v =  `<li class="response-item${' ' + expanClass}"><span class="response-item-text">${key} :</span> ${dataKey[key]}</li>`;
			responseBox.insertAdjacentHTML('beforeend', v);
			j++;
		}

		responseBox.append( cardbtnShowMore, cardbtnEdit, dataKey.id);
		cardVisit.append (responseBox);

		cardBtnClose.addEventListener("click",	(e)=> {
			let confirmation = confirm('dddd');
			console.log("confirmation: ", confirmation);
			if(confirmation){
				request.deletePost(dataKey.id);
				e.target.closest('.response-box').remove();
			}
		});

		cardbtnShowMore.addEventListener("click", ()=> {
			if (responseBox.className.indexOf(expandedClass) > -1){
				responseBox.classList.remove(expandedClass);
				cardbtnShowMore.textContent = showMore;
				cardbtnShowMore.classList.remove('show-less')
			} else {
				responseBox.classList.add(expandedClass);
				cardbtnShowMore.textContent = showLess;
				cardbtnShowMore.classList.add('show-less')
			}
		})

		cardbtnEdit.addEventListener("click", async () =>{
			// console.log(dataKey.id, dataKey);
			let datareqest = await request.getPost(dataKey.id);
			// console.log(datareqest);
			for(let key in datareqest) {
				if(key == 'id'){
					continue;
				}
				console.log(datareqest[key]);
				// console.log(key);
				let li = `<label for="${key}"></label><input id="${key}" value="${datareqest[key]}"/>`
				responseBox.insertAdjacentHTML('beforeend',li);
			}
			
			// request.editCard(dataKey.id, dataKey);
			// console.log("edit")
			// let input = '<input> </input>'
		})
	}
};
	
function clearInputSearch(e, b) {
	$("form")[0].reset();
	b[2].value = "";
}
// /delete reqest
// deleteReqestBtn( 33612)
function deleteReqestBtn(id) {
	return  fetch(BASE_URL + '/' + id, {
		method: 'DELETE',
		headers: {
			'Authorization': `Bearer ${token}`
		},
	}).catch(e=>{})
}