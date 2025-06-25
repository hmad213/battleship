import "./style.css"
import {User, Computer} from "./components/player.js"
import { Renderer } from "./components/ui.js";

let u = new User("Hammad");
let c = new Computer("Computer");
let r = new Renderer();

r.startGame(u, c);