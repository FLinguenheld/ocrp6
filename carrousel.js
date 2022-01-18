import {Base} from "./base.js";
import {Details} from "./details.js";


export class Caroussel extends Base{
	#currentURL;
	#url;
	#tab;
	#containerCovers;

	constructor(idContainer, category){

		super(idContainer);
		this.#url = `${this._urlServer}?sort_by=-imdb_score&genre_contains=${category}`;

		this.#tab = [];
	}


	async init(){

		// Fetchs two pages and keeps only 7 covers ;(
		await this.#fetchTwoPages();
		this.#tab.splice(7, 3);

		// Builds the carousel
		const buttonLeft = this._addButton("<", "buttonCarousel");	

		// Init the container for covers
		this.#containerCovers = this._addElem(this._container, 'div', null, "ContainerCovers");

		const buttonRight = this._addButton(">", "buttonCarousel");

		// Adds buttons events --
		buttonRight.addEventListener('click', () => {
						this.next();
						});

		buttonLeft.addEventListener('click', () => {
						this.previous();
						});

		this.#build();
	}


	/* Fetches two pages by using the 'previous' and 'next' fields in the json retun	
	 * Concats both and return an array of 10 movies (if there is a next page)
	 * Saved the next and previous url */
	async #fetchTwoPages(){

		const tab1 = await super._fetchOnePage(this.#url);

		// Second page ? (five movies per page)
		let tab2 = [];
		if (tab1.next){
			tab2 = await super._fetchOnePage(tab1.next);
		}

		this.#tab = tab1.results.concat(tab2.results);
	}

	/* Update this.tab by fetching two pages on the API
	 * Then, launches this.build to update the carousel */
	async next(){
		const cover = this.#tab.shift();
		this.#tab.push(cover);

		this.#build();
	}

	/* Update this.tab by fetching two pages on the API
	 * Then, launches this.build to update the carousel */
	async previous(){
		const cover = this.#tab.pop();
		this.#tab.unshift(cover);

		this.#build();
	}

	/* Builds the carousel with 7th first movies in this.tab
	 * adds covers and buttons withs events to allow to change page or
	 * to open details */
	async #build(){

		// Clear div
		super._clearContainer(this.#containerCovers);

		// Adds all pictures
		for (let i=0; i < 4; i++){
				const image = this._addImage(this.#containerCovers, this.#tab[i].image_url,
											 this.#tab[i].title, "coverCarousel");

				// Adds event to clic
				Details.addEventOpenModal(image, this.#tab[i].id, this.#tab[i].imdb_url);
			}
		}
}


