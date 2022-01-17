
import {Carroussel} from "./carrousel.js";
import {Details} from "./details.js"




const car1 = new Carroussel("container1", "Drama");
const car2 = new Carroussel("container2", "Biography");
const car3 = new Carroussel("container3", "Romance");
const car4 = new Carroussel("container4", "Crime");


car1.next();
car2.next();
car3.next();
car4.next();

Details.addEventCloseDetails();



