import {Base} from "./base.js";
import {Details} from "./details.js";
import {Dom} from "./dom.js"


export class BestMovie extends Base{
	#containerText;
	#containerCover;

	constructor(idContainer){

		super(idContainer);
		this.#containerText = document.getElementById('bestText');
		this.#containerCover = document.getElementById('bestCover');
	}

	async show(){

		// Fetches --
		const tab = await super._fetchOnePage(`${this._urlServer}?sort_by=-imdb_score`);
		const movie = tab.results[0];

		const movieDetails = await super._fetchOnePage(`${this._urlServer}${movie.id}`);

		// Text part --
		Dom.addElemWithText('h1', movie.title, this.#containerText);

		const button = Dom.addButton("Details", this.#containerText);
		Dom.addElemWithText('p', movieDetails.description, this.#containerText);
	
		Details.addEventOpenModal(button, movie.id, movie.imdb_url);

		// Cover --
		const image = Dom.addImage(movie.image_url, `Couverture de ${movie.title}`,
										   movie.title, this.#containerCover);
	}
}
