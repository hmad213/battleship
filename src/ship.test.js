import { Ship } from "./ship";

describe("Ship class", () => {
    test("hit function", () => {
        let ship = new Ship(3);
        ship.hit();
        ship.hit();
        expect(ship.timesHit).toBe(2);
    })

    test("sunk function", () => {
        let ship = new Ship(3);
        expect(ship.isSunk()).toBe(false);
        ship.timesHit = 3;
        expect(ship.isSunk()).toBe(true);
    })
})