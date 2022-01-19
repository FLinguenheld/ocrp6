import {Base} from "./base.js";
import {Details} from "./details.js";
import {Dom} from "./dom.js";


export class Caroussel extends Base{
	/* Allow to build a carousel : create a new object, init it
	 * It will save the first covers of the category and show it in the container.
	 * The user can clic on buttons to move the carousel (see next / previous) and 
	 * also clic on cover to show a modal with etails (see class Details) */

	#urlCategory;
	#tabImages;
	#containerCovers;

	constructor(idContainer, category){

		super(idContainer);
		this.#urlCategory = `${this._urlServer}?sort_by=-imdb_score&genre_contains=${category}`;

		this.#tabImages = [];
	}


// −− INITIALISATION −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−
	/* Here because the constructor can't be async.
	 * This method is mandatory.
	 * It fetchs the API, builds the buttons (with events) and the container for covers.
	 * It also launches a build to fill the container */
	async init(){

		// Fetchs two pages and keeps only 7 covers ;(
		await this.#fetchTwoPages();

		// Builds the carousel --
		const buttonLeft = Dom.addButton( "<", this._container, "buttonCarousel");	

		// Init the container for covers
		this.#containerCovers = Dom.addElem('div', this._container, "ContainerCovers");

		const buttonRight = Dom.addButton(">", this._container, "buttonCarousel");

		// Adds buttons events --
		buttonRight.addEventListener('click', () => {
						this.next();
						});

		buttonLeft.addEventListener('click', () => {
						this.previous();
						});

		this.#build();
	}

// −− FETCH −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−
	/* Fetches two pages by using the 'next' fields in the json retun	
	 * Concats both and spice the array of 10 movies (if there is a next page)
	 * to keep 7 movies as ask by the customer
	 * Then, it loop in the tab to create an array of object dom (image)
	 * This array will be use by 'build()', it allows avoid a new
	 * dom creation each time with events */
	async #fetchTwoPages(){

		let tab = [];
		const tab1 = await super._fetchOnePage(this.#urlCategory);

		// Second page ? (five movies per page)
		let tab2 = [];
		if (tab1.next){
			tab2 = await super._fetchOnePage(tab1.next);
		}

		tab = tab1.results.concat(tab2.results);
		tab.splice(7, 3);							// 7 -> customer request

		// Fill #tabImages with dom objects
		for (const elem of tab){

				const image = Dom.addImage(elem.image_url, `Couverture de ${elem.title}`,
										   elem.title, null, "coverCarousel");

				// Adds event to clic
				Details.addEventOpenModal(image, elem.id, elem.imdb_url);

				this.#tabImages.push(image);
		}
	}

// −− NAVIGATION −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−
	/* Moves the first element to the end of array
	 * Then, launches this.build to update the carousel */
	async next(){
		const cover = this.#tabImages.shift();
		this.#tabImages.push(cover);

		this.#build();
	}

	/* Moves the last element to the first place
	 * Then, launches this.build to update the carousel */
	async previous(){
		const cover = this.#tabImages.pop();
		this.#tabImages.unshift(cover);

		this.#build();
	}

// −− BUILDING −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−
	/* Clears the container covers, then loop in the array to 
	 * add the first four img to the container */
	async #build(){

		// Clear div
		Dom.clearContainer(this.#containerCovers);

		// Adds all pictures
		for (let i=0; i < 4; i++){
				this.#containerCovers.appendChild(this.#tabImages[i]);
			}
		}
}
