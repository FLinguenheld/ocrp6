
import {Base} from "./base.js";


export class Details extends Base{
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

	
	// Keep or replace by an ugly button ?
	/* Add an event to leave the modal div 'detailContainer' */
	static addEventCloseDetails(){

		const win = document.getElementById("detailContainer");

		window.addEventListener('click', (event) => {
			if (event.target == win) {
				win.style.display = "none";
		  }
		});
	}

	/* Adds event clic to open the modal div and show details
	 * Give the id of movie */
	static addEventOpenModal(element, idMovie, urlIMDB){
		element.addEventListener('click', () => {

			const myDetails = new Details(idMovie, urlIMDB);
			myDetails.showDetails();
			});
	}

	
	/* Builds a table with the map given
	 * Each row is build like this : <tr><td>key</td> <td>value</td></tr>
	 * If a value is an array, it will be placed in a list (see #addList)
	 * At last, adds the table in the container */
	#addTable(container, myMap){

		const table = document.createElement('table');

		for (const [key, value] of myMap){

			if (value != null){
				const row = document.createElement('tr');
				this._addElem(row, 'td', key, 'tdLeft');

				if (Array.isArray(value)){
					const td = this._addElem(row, 'td');
					this.#addList(td, value);
				} else{
				    this._addElem(row, 'td', value);
				}

				table.appendChild(row);
			}
		}
	    
		container.appendChild(table);
	}

	/* Creates a list <ul> <li> with the array given
	 * At last, adds the list in the container */
	#addList(container, myArray){

		const list = document.createElement('ul');

		for (const elem of myArray){
			this._addElem(list, 'li', elem);
		}

		container.appendChild(list);
	}


	/* Fetchs the page with the idMovie
	 * Then clears and show the div 'detailContainer'
	 * Then rebuilds everything and add in containers */
	async showDetails(){

		// Fetch
		const tab = await super._fetchOnePage(this._urlServer + this.#idMovie);

		// Clears and shows the modal div (see html)
		this._clearContainer(this.#containerHead);
		this._clearContainer(this.#containerMain);
		this._clearContainer(this.#containerFoot);
		this._container.style.display = "block";

		// Creates then fills new div 
		const containerFirst = document.createElement('div');
		containerFirst.className = "DetailsBox";
		const containerSecond = document.createElement('div');
		containerSecond.className = "DetailsBox";
		const containerThird = document.createElement('div');
		containerThird.className = "DetailsBox";

		// Title --
		const link = this._addElem(this.#containerHead, 'a');
		link.href = this.#urlIMDB;
		this._addElem(link, 'h1', tab.title);

		// Add cover (img in a div for the flexbox)
	    const cover = document.createElement('img');
		cover.src = tab.image_url;
		cover.alt = tab.title;

		const containerCover = document.createElement('div');
		containerCover.className = "DetailsBox";
		containerCover.appendChild(cover);

		// First part -- 
		let myMap = new Map();

		myMap.set('Genre', tab.genres);
		myMap.set('Date de sortie', tab.date_published);
		myMap.set('Durée', tab.duration);
		myMap.set("Pays d'origine", tab.countries);
		this.#addTable(containerFirst, myMap);

		// Second --
		myMap.clear();
		myMap.set('Réalisateurs', tab.directors);
		myMap.set('Auteurs', tab.writers);
		myMap.set('Acteurs', tab.actors);
		this.#addTable(containerSecond, myMap);

		// Third --
		myMap.clear();
		myMap.set('Box office', tab.worldwide_gross_income);
		myMap.set('Score IMDB', tab.imdb_score);
		myMap.set('Classement', tab.rated);
		this.#addTable(containerThird, myMap);

		// Abstract -- 
		this._addElem(this.#containerFoot, 'p', tab.long_description);

		// --
		this.#containerMain.appendChild(containerCover);
		this.#containerMain.appendChild(containerFirst);
		this.#containerMain.appendChild(containerSecond);
		this.#containerMain.appendChild(containerThird);
	}

}
