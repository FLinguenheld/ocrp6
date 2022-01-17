
import {Base} from "./base.js";


export class Details extends Base{
	#mainContainer;
	#idMovie;

	constructor(idMovie){

		super("details");
		this.#mainContainer = document.getElementById("detailsContener");

		this.#idMovie = idMovie;


	}


	// Keep or replace by a ugly button ?
	static addEventCloseDetails(){

		const win = document.getElementById("detailsContener");

		window.addEventListener('click', (event) => {
			if (event.target == win) {
				win.style.display = "none";
		  }
		});
	}



	#addElem(type, className, text){

		const elem = document.createElement(type);
		elem.className = className;

		const txt = document.createTextNode(text);
		elem.appendChild(txt);


		this._container.appendChild(elem);

	}


	showDetails(){

		super._clearContainer();

		this.#mainContainer.style.display = "block";
		

		this.#addElem('p', 'test', "Mangez vos chiens");

		this.#addElem('p', 'test', "tip top");

	}



}
