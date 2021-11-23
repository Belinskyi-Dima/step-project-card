import DoctorDropDown from './DoctorDropDown.js';
import createResponseCard from "./VisitCard.js";
import Request from "./requestApi.js";
import Modal from "./Modal.js";
import { Form , getFormValues} from './FormModel.js';

const BASE_URL ="https://ajax.test-danit.com/api/v2/cards";
const token = 'a3a8260f-7ba5-4cb2-9c25-c4e532982d51';

window.onload = function(){
	const request = new Request();
	let cardsContainer = document.getElementById('cart-visit');
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

			console.log(attributes);
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

	request.getPosts().then((data)=>{

		for (let i = 0; i < data.length; i++){
			let dataObject = data[i];
			let responseBox = createResponseCard(dataObject);
			cardsContainer.append(responseBox);
		}

	});

	const createVisit = document.getElementById('create-visit');
	createVisit.addEventListener('click', (e)=>{
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
				cardsContainer.append (responseBox);
				modal.close();
			});
		});
	});

	// const inputSearch = document.querySelector(".search-visit");
	// const inputSearchAll = document.querySelector(".search-all-done");
	// const inputSearchPriority = document.querySelector(".serch-priority");
	// const btnSearchFilter = document.querySelector('.box-filter-btnsearch');

	// btnSearchFilter.addEventListener("click", (e) => {
	// 	e.preventDefault()
	// 	let d = inputSearch.e.target.value
	// 	console.log(d)
	// })
}