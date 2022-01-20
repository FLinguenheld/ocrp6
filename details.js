import {Base} from "./base.js";
import {Dom} from "./dom.js";


export class Details extends Base{
	/* Allows to show a modal div. It is based on a <div id='detailContainer'>
	 * and the attribute 'display'
	 *
	 * You have to use the two statics methods to add event on a cover
	 * And on the web page to add event */

	#idMovie;
	#containerHead;
	#containerMain;
	#containerFoot;
	#urlIMDB;

	constructor(idMovie, urlIMDB){

		super("detailContainer");
		
		this.#idMovie = idMovie;
		this.#urlIMDB = urlIMDB;
		this.#containerHead = document.getElementById('detailHeader');
		this.#containerMain = document.getElementById('detailMain');
		this.#containerFoot = document.getElementById('detailFoot');
	}
	
// −− STATIC − EVENTS MANAGEMENT −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−
	/* Adds an event to leave the modal div 'detailContainer'
	 * Use this method one time in the main */
	static addEventCloseDetails(){

		const win = document.getElementById("detailContainer");

		window.addEventListener('click', (event) => {
			if (event.target == win) {
				win.style.display = "none";
		  }
		});
	}

	/* Adds event clic to open the modal div and show details
	 * idMovie and urlIMDB are used to build the details
	 * Uses this method for each cover */
	static addEventOpenModal(element, idMovie, urlIMDB){
		element.addEventListener('click', () => {

			const myDetails = new Details(idMovie, urlIMDB);
			myDetails.showDetails();
			});
	}

// −− SHOW / BUILD −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−
	/* This method builds and show the modal div deatails
	 * It clears the containers, fetchs the movie page, turn the div attribute display to block
	 * Then, builds the page with datas */
	async showDetails(){

		// Clears and shows the modal div (see html)
		Dom.clearContainer(this.#containerHead);
		Dom.clearContainer(this.#containerMain);
		Dom.clearContainer(this.#containerFoot);
		this._container.style.display = "block";

		// Fetch
		const tab = await super._fetchOnePage(this._urlServer + this.#idMovie);

		// Creates then fills new div 
		const containerCover = Dom.addElem('div', this.#containerMain, 'detailsBox');
		const containerFirst = Dom.addElem('div', this.#containerMain, 'detailsBox');
		const subContainer = Dom.addElem('div', containerFirst, 'detailsBox2');
		const containerSecond = Dom.addElem('div', this.#containerMain, 'detailsBox');

		// Title <a><h1>--
		const link = Dom.addLink(this.#urlIMDB, this.#containerHead, 'detailsBoxTitle');
		Dom.addElemWithText('h1', tab.title, link);

		// Add cover (img in a div for the flexbox)
		Dom.addImage(tab.image_url, tab.title, tab.title, containerCover);

		// Map to build tables
		let myMap = new Map();

		// Rank--
		myMap.set('Box office', tab.worldwide_gross_income);
		myMap.set('Score IMDB', tab.imdb_score);
		myMap.set('Classement', tab.rated);
		Dom.addTable(myMap, subContainer, null, null, null, 'tdLeft', 'tdRight');

		// Infos --
		myMap.clear();
		myMap.set('Genre', tab.genres);
		myMap.set('Date de sortie', tab.date_published);
		myMap.set('Durée', tab.duration);
		myMap.set("Pays d'origine", tab.countries);
		Dom.addTable(myMap, containerFirst, null, null, null, 'tdLeft', 'tdRight');

		// Workers --
		myMap.clear();
		myMap.set('Réalisateurs', tab.directors);
		myMap.set('Auteurs', tab.writers);
		myMap.set('Acteurs', tab.actors);
		Dom.addTable(myMap, containerSecond, null, null, null, 'tdLeft', 'tdRight');



		// Abstract -- 
		Dom.addElemWithText('p', tab.long_description, this.#containerFoot);
	}
}
