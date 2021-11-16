import DoctorDropDown from './DoctorDropDown.js';
import createResponseCard from "./VisitCard.js";
import Request from "./requestApi.js";

const BASE_URL ="https://ajax.test-danit.com/api/v2/cards";
const token = 'a3a8260f-7ba5-4cb2-9c25-c4e532982d51'

window.onload = function(){
	const request = new Request();
	let cardsContainer = document.getElementById('cart-visit');


	request.getPosts().then((data)=>{

		for (let i = 0; i < data.length; i++){
			let dataObject = data[i];
			let responseBox = createResponseCard(dataObject);
			cardsContainer.append(responseBox);
		}

	});

	const selectDoctorContainer = document.querySelector('.select-doctor-container');

	const createVisit = document.getElementById('create-visit');
	createVisit.addEventListener('click', (e)=>{
		e.preventDefault();
		let doctor = new DoctorDropDown();
		selectDoctorContainer.appendChild(doctor);
	});
}