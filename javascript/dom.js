export class Dom{
	/* This class regoups all static methods to cope with the DOM elements */

// −− CONTAINER −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−
	/* Removes all children in the container */
	static clearContainer(container){
		while (container.firstChild){
			container.removeChild(container.firstChild);
		}
	}

// −− GLOBAL −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−
	/* Allows to add a new HTML element in the container
	 * You can add text, a class name and an id
	 * Returns the object */
	static addElemWithText(type, text, container=null, className=null, id=null){

		const elem = document.createElement(type);

		if (className){
			elem.className = className;
		}

		if (id){
			elem.id = id;
		}

		if (text){
			const txt = document.createTextNode(text);
			elem.appendChild(txt);
		}

		if (container != null){
			container.appendChild(elem);
		}

		return elem;
	}

	/* Allows to add a new HTML element in the container
	 * You can add a class name and an id
	 * Returns the object */
	static addElem(type, container=null, className=null, id=null){
		return Dom.addElemWithText(type, null, container, className, id);
	}

		
// −− SPECIALIZED −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−

// −− IMAGE −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−
	/* Adds a <img> in the container (see 'addElem')
	 * Then returns the object */
	static addImage(src, alt, title, container=null, className=null, id=null){
		
		const image = Dom.addElem('img', container, className, id);
		image.src = src;
		image.alt = alt;
		image.title = title;

		return image;
	}

// −− BUTTON −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−
	/* Adds a <button> in the container (see 'addElem')
	 * Then returns the object */
	static addButton(text, container=null, className=null, id=null){

		const button = Dom.addElem('button', container, className, id);
		button.textContent = text;

		return button;
	}

// −− LINK -−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−
	/* Adds a <a> in the container (see 'addElem')
	 * Then returns the object */
	static addLink(href, container=null, className=null, id=null){

		const link = Dom.addElem('a', container, className, id);
		link.href = href;

		return link;
	}

// −− TABLE −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−
	/* Builds a table with the map given
	 * Each row is build like this : <tr><td>key</td> <td>value</td></tr>
	 * If a value is an array, it will be placed in a list (see addList)
	 * Then returns the object */
	static addTable(myMap, container=null, className=null, id=null,
						   classTR=null, classTDLeft=null, classTDRight=null){

		const table = Dom.addElem('table', container, className, id);

		for (const [key, value] of myMap){

			if (value != null){
				const row = Dom.addElem('tr', table, classTR);
				Dom.addElemWithText('td', key, row, classTDLeft);

				if (Array.isArray(value)){
					const td = Dom.addElem('td', row, classTDRight);
					Dom.addList(value, td);
				} else{
				    Dom.addElemWithText('td', value, row, classTDRight);
				}
			}
		}
		
		return table;
	}

// −− LIST -−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−
	/* Adds a list <ul><li> in the container (see 'addElem')
	 * Then returns the object
	 * Give an simple array with values */
	static addList(myArray, container=null, className=null, id=null, classLI=null){

		const list = Dom.addElem('ul', container, className, id);

		for (const elem of myArray){
			Dom.addElemWithText('li', elem, list, classLI);
		}

		return list;
	}
}
