
import {BestMovie} from "./bestMovie.js";
import {Caroussel} from "./carrousel.js";
import {Details} from "./details.js"



//const best = new BestMovie("bestMovie");
//best.show();



const car1 = new Caroussel("container1", "");
car1.init();
const car2 = new Caroussel("container2", "Biography");
car2.init();
const car3 = new Caroussel("container3", "Romance");
car3.init();
const car4 = new Caroussel("container4", "Crime");
car4.init();



// Allow to close details modal
Details.addEventCloseDetails();



