export class Base{
	_urlServer;
	_container;

	constructor(idContener){
		this._urlServer = 'http://localhost:8000/api/v1/titles/';
		this._container = document.getElementById(idContener);
	}


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

	/* Allows to add a new HTML element in the containerCover
	 * You can add text and a class name */
	_addElem(container, type, text, className=null){

		const elem = document.createElement(type);
		this.#setClassName(elem, className);

		if (text){
			const txt = document.createTextNode(text);
			elem.appendChild(txt);
		}

		container.appendChild(elem);
		return elem;
	}

	/* Adds a <img> in the container
	 * Then returns the object */
	_addImage(container, image_url, title, className=null){
		
		const image = document.createElement('img');
		this.#setClassName(image, className);
		image.src = image_url;
		image.alt = title;
		image.title = title;

		container.appendChild(image);
		return image;
	}

	/* Adds a <button> in the container
	 * Then returns the object */
	_addButton(text, className=null){

		const button = document.createElement('button');
		this.#setClassName(button, className);
		button.textContent = text;

		this._container.appendChild(button);
		return button;
	}

	/* Adds the attribute className
	 * Only if not null */
	#setClassName(elem, className=null){
		if (className != null){
			elem.className = className;
		}
	}

	/* Removes all childrens in the container
	 * If it is null, it will clear _container */
	_clearContainer(container=null){

		if (container === null){
			container = this._container;
		}

		while (container.firstChild){
			container.removeChild(container.firstChild);
		}
	}

}

