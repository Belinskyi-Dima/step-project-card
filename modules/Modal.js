// import Element from "./Elements.js";


// import CONSTANTS from "./constants.js";

// const { ROOT } = CONSTANTS;

export default class Modal{
    constructor(title, html){
		let modalHTML = `
		<div class="js-modal card-modal modal fade show visit-modal">
			<div class="modal-dialog modal-dialog-centered">
					<div class="modal-content card-modal-content">
						<div class="modal-header">
							<span class="js-modal-title modal-header-text"></span>
							<a class="js-close modal-header-btn">
								<img src="./img/Delete-80_icon-icons.com_57340.png" alt="">
							</a>
						</div>
						<div class="js-modal-body modal-body"></div>
					</div>
			</div>
		</div>`;

		this.container = document.querySelector(".js-modal-container");
		this.container.innerHTML = "";
		this.container.innerHTML = modalHTML.trim();
		this.modalElement = this.container.firstChild;

		this.titleElement = this.modalElement.querySelector('.js-modal-title');
		this.titleElement.textContent = title;

		this.bodyElement = this.modalElement.querySelector('.js-modal-body');
		this.bodyElement.appendChild(html);

		let closeBtn = this.modalElement.querySelector('.js-close');
		closeBtn.addEventListener('click', (e)=>{
			e.preventDefault();
			this.close();
			this.destroy();
		});

		return this;
   }

	setTitle(title){
		this.titleElement.textContent = title;
	}

	setBody(html){
		this.bodyElement.innerHTML = html;
	}

	open(){
		this.modalElement.classList.add('modal-active');
	}

	close(){
		this.modalElement.classList.remove('modal-active');
	}

	destroy(){
		this.modalElement.remove();
	}
   
}


// const selectDoctorContainer = document.querySelector('.select-doctor-container');
// 	const modelwindow = document.querySelector(".modal")
// 	const modelwindowClose = document.querySelector(".modal-header-btn")
// 	modelwindowClose.addEventListener('click', () => {
// 		modelwindow.classList.remove("modal-active")
// 	})