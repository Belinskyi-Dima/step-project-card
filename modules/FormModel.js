export{FormField, Form} ;
 class FormField {
	constructor(fieldObject, formClass) {
		this.id = fieldObject.id;
		this.class = fieldObject.class || `${this.class}__${fieldObject.id}`;
		this.label = fieldObject.label;
		this.type = fieldObject.type;
		this.name = fieldObject.name;
		this.options = fieldObject.options;
		this.value = fieldObject.value || '';
	}

	getHTML(){
		let html = '';
		if(this.type == 'textArea'){
			html = this._getTextArea();
		}

		if(this.type == 'select'){
			html = this._getDropDown();
		}

		if(!html){
			html = this._getInputField();
		}

		let label = this._getLabel();

		return `${label} ${html}`;
	}

	_getValue(){
		let value = '';
		if (this.value){
			value = `value="${this.value}"`
		}
		return value;
	}

	_getLabel(){
		let label = '';
		if (this.label){
			label = `<label for="${this.id}">${this.label}: </label>`
		}
		return label
	}

	_getInputField(){
		return `<input id="${this.id}" class="${this.class}" type="${this.type}" name="${this.name}" ${this._getValue()} />`;
	}

	_getTextArea(){
		return `<textarea id="${this.id}" class="${this.class}" name="${this.name}">${this.value}</textarea>`;
	}

	_getDropDown(){
		return `<select id="${this.id}" class="${this.class}" name="${this.name}">${this._getOptions()}</select>`;
	}

	_getOptions(){
		let html = '';
		for (let i = 0; i < this.options.length; i++){
			let option = this.options[i];
			html += `<option value="${option.value}" ${option.value == this._getValue() ? "selected" : ""}>${option.text}</option>`;
		}
		return html;
	}
}


class Form {
	constructor(formObject) {
		this.id = formObject.id;
		this.class = formObject.class;
		this.fields = formObject.fields;
	}

	getHTML(){
		let fieldsHTML = '';
		let fields = this.fields;

		for (let i = 0; i < fields.length; i++){
			let fieldObject = fields[i];
			let field = new FormField(fieldObject, this.class);
			let fieldHTML = field.getHTML();
			fieldsHTML += `<div>${fieldHTML}</div>`;
		}

		let formHTML = `<form id="${this.id}" class="${this.class}">${fieldsHTML}</form>`;

		return formHTML;
	}
}

// export default Form;