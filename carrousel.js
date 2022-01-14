
class Carroussel {
	#contener;
	#previousURL;
	#currentURL;
	#nextURL;
	#tab;


	constructor(idContener, category){
		this.#contener = document.getElementById(idContener);

		this.#previousURL = null;
		this.#currentURL = null;
		this.#nextURL = `http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&genre_contains=${category}`;

		this.#tab = [];
	}

		
	async #fetchOnePage(url){

	    try {
			const response = await fetch(url);

			if (!response.ok) {
					throw new Error(`Erreur HTTP ! statut : ${response.status}`);
			}

			const data = await response.json();
			return data;

		} catch (error)	{
			console.log(error);
			throw new Error(`Erreur fetch ! statut : ${error}`);
		}
	}


	async #fetchTwoPages(){

		const tab1 = await this.#fetchOnePage(this.#currentURL);
		this.#previousURL = tab1.previous;

		let tab2 = [];
		if (tab1.next !== null){
			tab2 = await this.#fetchOnePage(tab1.next);

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
		while (this.#contener.lastElementChild){
			this.#contener.removeChild(this.#contener.lastElementChild);
		}

		// Button left
		const buttonLeft = this.#addButton("<", this.#previousURL === null);

		// Add all pictures
		for (const elem of this.#tab){
				this.#addImage(elem.image_url, elem.title);
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


	#addImage(image_url, title){

		const elem = document.createElement('img');
		elem.className = "coverCarrousel";
		elem.src = image_url;
		elem.alt = title;
		elem.title = title;

		this.#contener.appendChild(elem);
	}


	#addButton(text, disabled){

		const elem = document.createElement('button');
		elem.className = "buttonCarrousel";
		elem.textContent = text;
		elem.disabled = disabled;

		this.#contener.appendChild(elem);
		return elem;
	}

}



