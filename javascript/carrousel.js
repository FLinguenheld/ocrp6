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
	#title;
	#numberToDisplay;
	#ignoreFirst;

	constructor(idContainer, category, title, ignoreFirst=false){

		super(idContainer);
		this.#title = title;
		this.#urlCategory = `${this._urlServer}?sort_by=-imdb_score&genre_contains=${category}`;
		this.#tabImages = [];
		this.#numberToDisplay = 0;		// Covers displayed by the carousel
		this.#ignoreFirst = ignoreFirst;
	}

// −− CAROUSEL WIDTH −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−
	/* Static, according to the screen width, sets #numberToDisplay and launches build.
	 * Use this methode with the event 'resize': to adapt the carousel */
	static updateWidth(obj){

		let previous = obj.getNumberToDisplay();

		if (window.innerWidth > 600){
			obj.setNumberToDisplay(4);
		} else if (window.innerWidth > 400){
			obj.setNumberToDisplay(3);
		} else{
			obj.setNumberToDisplay(2);
		}

		// Builds only if new value
		if (previous != obj.getNumberToDisplay){
			obj.build();
		}
	}

// −− ACCESSORS −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−
	setNumberToDisplay(val){
		this.#numberToDisplay = val;
	}
	getNumberToDisplay(){
		return this.#numberToDisplay;
	}

// −− INITIALISATION −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−
	/* Here because the constructor can't be async.
	 * This method is mandatory.
	 * It fetchs the API, builds the buttons (with events) and the container for covers.
	 * It also launches a build to fill the container */
	async init(){

		// Fetchs two pages and keeps only 7 covers ;(
		await this.#fetchTwoPages();

		// --
		const containerHeader = Dom.addElem('div', this._container, "headerCarousel");
		const containerSection = Dom.addElem('div', this._container, "sectionCarousel");

		// --
		Dom.addElemWithText('h1', this.#title, containerHeader, "titleCarousel");

		// --
		const buttonLeft = Dom.addButton( "<", containerSection, "buttonCarousel");	
		this.#containerCovers = Dom.addElem('div', containerSection, "ContainerCovers");
		const buttonRight = Dom.addButton(">", containerSection, "buttonCarousel");

		// Adds buttons events --
		buttonRight.addEventListener('click', () => {
						this.next();
						});

		buttonLeft.addEventListener('click', () => {
						this.previous();
						});

		// Adds event resize to update width
		window.addEventListener('resize', (e) => {
					Caroussel.updateWidth(this);
					e.preventDefault();
					}, false);

		// Forces first update
		Caroussel.updateWidth(this);
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

		// Removes first movie if asking
		if (this.#ignoreFirst){
			tab.shift();	
		}

		// Keeps only seven movies (customer request)
		tab.splice(7, 3);

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

		this.build();
	}

	/* Moves the last element to the first place
	 * Then, launches this.build to update the carousel */
	async previous(){
		const cover = this.#tabImages.pop();
		this.#tabImages.unshift(cover);

		this.build();
	}

// −− BUILDING −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−
	/* Clears the container covers, then loop in the array to 
	 * add the first four img to the container */
	async build(){

		// Clear div
		Dom.clearContainer(this.#containerCovers);

		// Adds all pictures
		for (let i=0; i < this.#numberToDisplay; i++){
				this.#containerCovers.appendChild(this.#tabImages[i]);
			}
		}
}
