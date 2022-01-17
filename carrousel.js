import {Base} from "./base.js";
import {Details} from "./details.js";


export class Carroussel extends Base{
	#previousURL;
	#currentURL;
	#nextURL;
	#tab;


	constructor(idContainer, category){

		super(idContainer);

		this.#previousURL = null;
		this.#currentURL = null;
		this.#nextURL = `http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&genre_contains=${category}`;

		this.#tab = [];
	}

	
	async #fetchTwoPages(){

		const tab1 = await super._fetchOnePage(this.#currentURL);
		this.#previousURL = tab1.previous;

		let tab2 = [];
		if (tab1.next !== null){
			tab2 = await super._fetchOnePage(tab1.next);

			this.#nextURL = tab1.next;
		} else {
		    this.#nextURL = null;
		}

		this.#tab = tab1.results.concat(tab2.results);
	}


	async next(){
		if(this.#nextURL !== null){
			this.#currentURL = this.#nextURL;

			await this.#fetchTwoPages();
			await this.#build();
		}
	}


	async previous(){
		if(this.#previousURL !== null){
			this.#currentURL = this.#previousURL;

			await this.#fetchTwoPages();
			await this.#build();
		}
	}


	async #build(){

		// Del the three last movies
		this.#tab.splice(7, 3);

		// Clear div
		super._clearContainer();

		// Button left
		const buttonLeft = this.#addButton("<", this.#previousURL === null);

		// Add all pictures
		for (const elem of this.#tab){
				this.#addImage(elem.image_url, elem.title, elem.id);
			}

		// Button right
		const buttonRight = this.#addButton(">", this.#nextURL === null);


		// Add events --
		buttonRight.addEventListener('click', () => {
						this.next();
						});

		buttonLeft.addEventListener('click', () => {
						this.previous();
						});
	}


	#addImage(image_url, title, idMovie){
		
		const elem = document.createElement('img');
		elem.className = "coverCarrousel";
		elem.src = image_url;
		elem.alt = title;
		elem.title = title;

		this._container.appendChild(elem);

		elem.addEventListener('click', () => {

						const myDetails = new Details(idMovie);
						myDetails.showDetails();
		});
	}


	#addButton(text, disabled){

		const elem = document.createElement('button');
		elem.className = "buttonCarrousel";
		elem.textContent = text;
		elem.disabled = disabled;

		this._container.appendChild(elem);
		return elem;
	}

}

