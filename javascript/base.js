export class Base{
	/* Regroups common variables and methods for carousel and details */

	_urlServer;
	_container;

	constructor(idContener){
		this._urlServer = 'http://localhost:8000/api/v1/titles/';
		this._container = document.getElementById(idContener);
	}

// −− FETCH −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−
	/* Fetchs one page and convert in json
	 * Returns the json table */
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
}
