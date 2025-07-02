import "./style.css";
import { User, Computer } from "./components/player.js";
import { Renderer } from "./components/ui.js";

let r = new Renderer();
r.showStartMenu();

let u;
let c;

function createPlayers(userName) {
  u = new User(userName);
  c = new Computer("Computer");
  return [u, c];
}

export { createPlayers };
