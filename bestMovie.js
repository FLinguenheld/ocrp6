import {Base} from "./base.js";
import {Details} from "./details.js";


export class BestMovie extends Base{


	constructor(idContainer){

		super(idContainer);
	}


	async show(){


		console.log(`${this._urlSever}&sort_by=-imdb_score`);

		const tab = await super._fetchOnePage(`${this._urlSever}?sort_by=-imdb_score`);
		const movie = tab.results[0];

		// Cover
		let container = document.getElementById('bestMovie');
		//container.setAttribute('background-image', `url('${movie.image_url}')`);
		container.style.backgroundImage = `linear-gradient(to left, transparent, black),
											url('${movie.image_url}')`;

		const image = this._addImage(movie.image_url, tab.title);
		Details.addEventOpenModal(image, movie.id);

		// Title
		
		
		// Abstract

	}




}
