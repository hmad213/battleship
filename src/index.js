import "./style.css"
import {User, Computer} from "./components/player.js"
import { Renderer } from "./components/ui.js";

let u = new User("Hammad");
let c = new Computer("Computer");
u.addShip("destroyer", [[3, 3], [4, 3], [5, 3]])
u.addShip("carrier", [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4]])
let r = new Renderer();

r.renderBoards(u, c);