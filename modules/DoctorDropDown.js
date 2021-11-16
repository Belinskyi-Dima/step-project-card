import {FormField, Form} from './FormModel.js'

export default class Doctor {
	constructor(value) {
		let dropDownSettings = {
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
		};

		if(value){
			dropDownSettings.value = value;
		}

		let selectDoctor = new FormField(dropDownSettings);

		let doctorFormContainer = document.querySelector('.doctor-form-container');
		let createVisit = selectDoctor.get();
	
		selectDoctor.fieldElement.addEventListener("change", (e)=>{
			e.preventDefault();
			let value = e.target.value;
			if (value){
				let form = new Form(value);
				let formElement = form.get('create');
	
				doctorFormContainer.innerHTML = '';
				doctorFormContainer.appendChild(formElement);
			} else {
				doctorFormContainer.innerHTML = '';
			}
		});

		return createVisit;
	}
}