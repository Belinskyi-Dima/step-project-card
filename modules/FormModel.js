import formConfig from "./formConfig.js";
import Request from "./requestApi.js";
import createResponseCard from "./VisitCard.js"

let cardsContainer = document.getElementById('cart-visit');

export {FormField, Form} ;
 class FormField {
	constructor(fieldObject, formClass) {
	
		this.id = fieldObject.id;
		this.class = fieldObject.class || `${formClass}__${fieldObject.id}`;
		this.label = fieldObject.label;
		this.type = fieldObject.type;
		this.name = fieldObject.name;
		this.options = fieldObject.options;
		this.value = fieldObject.value || '';
	}

	get(){
		let element;
		if(this.type == 'textArea'){
			element = this._getTextArea();
		}

		if(this.type == 'select'){
			element = this._getDropDown();
		}

		if(!element){
			element = this._getInputField();
		}

		let label = this._getLabel();

		let div = document.createElement('div');
		div.classList.add("form-div-item")
		if(label){
			div.appendChild(label);
		}
		div.appendChild(element);
		this.fieldElement = element;
		return div;
	}

	_getLabel(){
		let label;

		if (this.label){
			label = document.createElement('label');
			label.innerText = `${this.label}: `
		}

		return label
	}

	_getInputField(){
		let inputField = document.createElement('input');
		inputField.setAttribute('id', this.id);
		inputField.setAttribute('class', this.class);
		inputField.setAttribute('type', this.type);
		inputField.setAttribute('name', this.name);
		if(this.value){
			inputField.setAttribute('value', this.value);
		}

		return inputField;
	}

	_getTextArea(){
		let textArea = document.createElement('textarea');
		textArea.setAttribute('id', this.id);
		textArea.setAttribute('class', this.class);
		textArea.setAttribute('name', this.name);
		if(this.value){
			textArea.innerText = this.value;
		}

		return textArea;
	}

	_getDropDown(){
		let dropDown = document.createElement('select');
		dropDown.setAttribute('id', this.id);
		dropDown.setAttribute('class', this.class);
		dropDown.setAttribute('name', this.name);

		for (let i = 0; i < this.options.length; i++){
			let option = this.options[i];
			let optionElement = document.createElement("option");
			optionElement.value = option.value;
			optionElement.text = option.text;
			dropDown.appendChild(optionElement);
		}

		if(this.value){
			dropDown.value = this.value;
		}

		return dropDown;
	}
}


class Form {
	constructor(formType, values) {
		let formObject = formConfig[formType];
		
		this.id = formObject.id;
		this.class = formObject.class;
		this.fields = formObject.fields;
		this.values = values;
	}

	get(action, visitID, doctor){
		let fieldsHTML = '';
		let fields = this.fields;
		let form = document.createElement('form');
		form.setAttribute('id', this.id);
		form.setAttribute('class', this.class);

		for (let i = 0; i < fields.length; i++){
			let fieldObject = fields[i];
			if(this.values){
				fieldObject.value = this.values[fieldObject.name] || "";
			}
			let field = new FormField(fieldObject, this.class);
			let fieldElement = field.get();
			form.appendChild(fieldElement);
		}

		let saveBtn = document.createElement('input');
		saveBtn.setAttribute('id', 'save');
		saveBtn.setAttribute('name', 'save');
		saveBtn.setAttribute('value', 'save');
		saveBtn.setAttribute('type', 'submit');
		saveBtn.classList.add('btn');
		form.appendChild(saveBtn);

		let divBtnFormClose = document.createElement('div');
		// let closeBtn = document.createElement('a');

		divBtnFormClose.classList.add('form-div-btn-close');

		divBtnFormClose.setAttribute('id', 'close');
		// divBtnFormClose.classList.add('form-btn-close');
		// divBtnFormClose.textContent = '';
		// divBtnFormClose.appendChild(closeBtn);
		form.insertAdjacentElement("afterbegin", divBtnFormClose);

		form.addEventListener('submit', (e) => {
			e.preventDefault();
			let formData = Object.values(e.target).reduce((obj,field) => {
				if(field.name != 'save'){
					obj[field.name] = field.value;
				}
				return obj 
			}, {});

			const request = new Request();
			if(action == 'create'){
				formData.doctor = document.getElementById('doctor').value;
				request.creatPost(formData).then((response)=>{
					let responseBox = createResponseCard(response);
					cardsContainer.append (responseBox);
					this.close(form);
				});
			} else if ('edit'){
				formData.doctor = doctor;
				request.editCard(visitID, formData).then((response)=>{
					let newResponseBox = createResponseCard(response);
					let oldResponseBox = document.getElementById(visitID);
					oldResponseBox.replaceWith(newResponseBox);
					// createResponseCard([response]);
					this.close(form);
				});
			}
		});

		divBtnFormClose.addEventListener('click', (e) => {
			e.preventDefault();
			this.close(form);
		});

		return form;
	}

	close(form){
		let selectDoctorContainer = document.querySelector('.select-doctor-container');
		selectDoctorContainer.innerHTML = '';
		form.remove();
	}
}