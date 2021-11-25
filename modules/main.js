import DoctorDropDown from './DoctorDropDown.js';
import createResponseCard from "./VisitCard.js";
import Request from "./requestApi.js";
import Modal from "./Modal.js";
import { Form , getFormValues} from './FormModel.js';
import { setCookie, getCookie, deleteCookie } from './Cookies.js';

function isLoggedIn() {
	return !!getCookie('token');
}

function loadHeaderActions(){
	const headerActions = document.getElementById('header-actions');
	headerActions.innerHTML = '';

	if(isLoggedIn()){
		let logoutBtn = document.createElement('button');
		logoutBtn.textContent = 'logout';
		logoutBtn.classList.add('btn', 'btn-login');

		let createVisitBtn = document.createElement('button');
		createVisitBtn.textContent = 'Add new visit';
		createVisitBtn.classList.add('btn', 'btn-create-visit');

		headerActions.append(logoutBtn, createVisitBtn);

		logoutBtn.addEventListener('click', (e)=>{
			e.preventDefault();
			deleteCookie('token');
			loadHeaderActions();
			loadVisits();
		});

		createVisitBtn.addEventListener('click', (e)=>{
			e.preventDefault();
	
			let visitCardWrapper = document.createElement('div');
			visitCardWrapper.classList.add('visit-wrapper');
	
			let doctor = new DoctorDropDown();
			let selectDoctorContainer = document.createElement('div');
			selectDoctorContainer.classList.add('select-doctor-container');
			selectDoctorContainer.appendChild(doctor);
	
			let doctorFormContainer = document.createElement('div');
			doctorFormContainer.classList.add('doctor-form-container');
	
			visitCardWrapper.append(selectDoctorContainer, doctorFormContainer);
	
			let modal = new Modal('Create visit', visitCardWrapper);
			
			modal.open();
			modal.bodyElement.addEventListener('submit', (e)=>{
				e.preventDefault();
				let formData = getFormValues(e.target);
				const request = new Request();
				formData.doctor = document.getElementById('doctor').value;
				request.creatPost(formData).then((response)=>{
					let responseBox = createResponseCard(response);
					let cardsContainer = document.getElementById('cart-visit');
					cardsContainer.append (responseBox);
					modal.close();
				});
			});
		});
	} else {
		let loginBtn = document.createElement('button');
		loginBtn.textContent = 'login';
		loginBtn.classList.add('btn', 'btn-login');

		headerActions.append(loginBtn);

		loginBtn.addEventListener('click',(e)=> {
			e.preventDefault();
			let loginModal = document.createElement('div');
			loginModal.classList.add('visit-wrapper');
			let loginForm = new Form('login');
			let loginFormContainer = document.createElement('div');
			loginFormContainer.classList.add('login-container');
			loginFormContainer.appendChild(loginForm);
			let modal = new Modal('Please login', loginFormContainer);
			modal.open();
			loginForm.addEventListener('submit', async (e) => {
				e.preventDefault();
				let formData = getFormValues(e.target);
				const request = new Request();
				const loginRequest = new Request();
				loginRequest.login(formData.email, formData.password).then((response)=>{
					if(!response.error){
						let token = response.data;
						setCookie('token', token, 60);
						modal.close();
						loadHeaderActions();
						loadVisits();
					} else {
						let errorMessage = response.data;
						let errorElement = document.getElementById('login-error');
						if(!errorElement){
							errorElement= document.createElement('span');
							errorElement.id = 'login-error';
							errorElement.classList.add('error');
							loginFormContainer.prepend(errorElement);
						} else {
							errorElement.textContent = errorMessage;
						}
						

					}
				});
				
			});
		});
	}
}

function loadSearchPanel(){
	let searchFormContainer = document.querySelector('.box-filter');
	let searchForm = new Form("search");
	searchForm.addEventListener('submit', (e)=>{
		e.preventDefault();
		let formData = getFormValues(e.target);
		console.log(formData);
		let cards = document.querySelectorAll('.response-box');
		for (let i = 0; i < cards.length; i++){
			let found = false
			let card = cards[i];
			let attributes = card.querySelectorAll('.response-item')

			if(!formData.q && !formData.priority && !formData.status){
				card.classList.remove('hidden');
				continue;
			}

			for (let j = 0; j < attributes.length; j++){
				let attribute = attributes[j];

				if(formData.priority){
					console.log("formData.priority: ", formData.priority);
					console.log("attribute.dataset.name: ", attribute.dataset.name);
					console.log("attribute.dataset.value: ", attribute.dataset.value);
				}

				if(formData.priority && attribute.dataset.name == 'priority' && attribute.dataset.value == formData.priority){
					console.log(123);
					found = true;
					break;
				}

				// if(formData.status && attribute.dataset.name == 'status' && attribute.dataset.value == formData.status){
				// 	found = true;
				// 	break;
				// }


				if(formData.q && attribute.dataset.value.toLowerCase().indexOf(formData.q.toLowerCase().trim()) > -1){
					found = true;
					break;
				}
			}

			if(!found){
				card.classList.add('hidden');
			} else {
				card.classList.remove('hidden');
			}
		}

	});

	searchFormContainer.appendChild(searchForm);
}

function loadVisits(){
	let cardsContainer = document.getElementById('cart-visit');
	cardsContainer.innerHTML = '';

	if (isLoggedIn()){
		const request = new Request();
		request.getPosts().then((data)=>{
			for (let i = 0; i < data.length; i++){
				let dataObject = data[i];
				let responseBox = createResponseCard(dataObject);
				cardsContainer.append(responseBox);
			}
		});
	} else {
		cardsContainer.textContent = 'No visits';
	}
}

window.onload = function(){
	loadHeaderActions();
	loadSearchPanel();
	loadVisits();
}