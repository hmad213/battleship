import { Ship } from "../ship";

describe("Ship class", () => {
    test("hit function", () => {
        let ship = new Ship("destroyer", [[3, 3], [3, 4], [3, 5]]);
        ship.hit();
        ship.hit();
        expect(ship.timesHit).toBe(2);
    })

    test("sunk function", () => {
        let ship = new Ship("destroyer", [[3, 3], [3, 4], [3, 5]]);
        expect(ship.isSunk()).toBe(false);
        ship.timesHit = 3;
        expect(ship.isSunk()).toBe(true);
    })

    test("contain function", () => {
        let ship = new Ship("destroyer", [[3, 3], [3, 4], [3, 5]]);
        expect(ship.contains([5,5])).toBe(false);
        expect(ship.contains([3, 3])).toBe(true);
    })
})