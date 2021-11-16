import Request from "./requestApi.js";
import {Form} from "./FormModel.js";

export default function createResponseCard(data) {
	const request = new Request();
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
	const src = imagePath + data.doctor + '.jpeg';

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
	responseBox.setAttribute('id', data.id);
	
	let j = 1;
	for (let key in data) {
		if(key == 'id'){
			continue;
		}

		let expanClass = j > 2 ? "expan" : "";
		let v =  `<li class="response-item${' ' + expanClass}"><span class="response-item-text">${key} :</span> ${data[key]}</li>`;
		responseBox.insertAdjacentHTML('beforeend', v);
		j++;
	}

	responseBox.append( cardbtnShowMore, cardbtnEdit);

	cardBtnClose.addEventListener("click",	(e)=> {
		let confirmation = confirm('are you sure');
		console.log("confirmation: ", confirmation);
		if(confirmation){
			request.deletePost(data.id);
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
	});

	const selectDoctorContainer = document.querySelector('.select-doctor-container');

	cardbtnEdit.addEventListener("click", async () =>{
		request.getPost(data.id).then((datarequest) =>{
			
			let form = new Form(datarequest.doctor, datarequest);
			let formElement = form.get('edit', data.id, data.doctor);

			let doctorFormContainer = document.querySelector('.doctor-form-container');
			doctorFormContainer.innerHTML = '';
			doctorFormContainer.appendChild(formElement);
		});
	});

	cardOpenDone.addEventListener("change",(e)=> {
		let value = e.target.value;
		console.log( e.target.value);
		if ( e.target.value == "done") {
			cardbtnEdit.setAttribute("disabled", "disabled");
			responseBox.classList.add('response-box-done');
			cardbtnEdit.classList.add("card-btn-edit-disabled");
			cardImg.classList.add('card-img-disabled')
			// localStorage.setItem()
		} else {
			cardbtnEdit.removeAttribute("disabled", "disabled");
			cardbtnEdit.classList.remove("card-btn-edit-disabled");
			responseBox.classList.remove('response-box-done');
			cardImg.classList.remove('card-img-disabled');
			
			
		}
	});
	

	return responseBox;
};