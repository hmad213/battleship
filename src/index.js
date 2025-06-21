import "./style.css"
import {User, Computer} from "./components/player.js"
import { Renderer } from "./components/ui.js";

let u = new User("Hammad");
let c = new Computer("AI");
for(let i = 0; i < 10; i++){
    for(let j = 0; j < 10; j++){
        u.attack(c.gameboard, [i, j]);
    }
}
let r = new Renderer();

r.createBoard(c.name, c.gameboard);
r.createBoard(u.name, u.gameboard);
