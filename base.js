export class Base{
	_container;

	constructor(idContener){
		this._container = document.getElementById(idContener);
	}


	async _fetchOnePage(url){

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

	_clearContainer(){
		while (this._container.firstChild){
			this._container.removeChild(this._container.firstChild);
		}
	}

}

