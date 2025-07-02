import { Gameboard } from "../gameboard";

describe("gameboard class", () => {
  let gameboard;
  beforeEach(() => {
    gameboard = new Gameboard();
    gameboard.placeShip("cruiser", [
      [3, 3],
      [3, 4],
      [3, 5],
    ]);
    gameboard.placeShip("destroyer", [
      [4, 3],
      [4, 4],
    ]);
  });

  test("Adding ships", () => {
    expect(gameboard.ships.length).toBe(2);
    expect(gameboard.ships[0].name).toBe("cruiser");
    expect(gameboard.ships[0].position).toEqual([
      [3, 3],
      [3, 4],
      [3, 5],
    ]);
  });

  test("Recieving attacks", () => {
    gameboard.recieveAttack([2, 2]);
    expect(gameboard.missedAttacks[0]).toEqual([2, 2]);
    gameboard.recieveAttack([3, 3]);
    expect(gameboard.hitAttacks[0]).toEqual([3, 3]);
    expect(gameboard.ships[0].timesHit).toEqual(1);
  });

  test("Checking game over", () => {
    expect(gameboard.isGameOver()).toBe(false);

    gameboard.recieveAttack([4, 3]);
    gameboard.recieveAttack([4, 4]);

    expect(gameboard.isGameOver()).toBe(false);

    gameboard.recieveAttack([3, 3]);
    gameboard.recieveAttack([3, 4]);
    gameboard.recieveAttack([3, 5]);

    expect(gameboard.isGameOver()).toBe(true);
  });

  test("Checking if position is attacked", () => {
    gameboard.recieveAttack([4, 3]);
    gameboard.recieveAttack([2, 2]);

    expect(gameboard.isAttacked([1, 1])).toBe(false);
    expect(gameboard.isAttacked([2, 2])).toBe(true);
    expect(gameboard.isAttacked([4, 3])).toBe(true);
  });

  test("Checking if a position is occupied by a ship", () => {
    expect(gameboard.isOccupied([2, 2])).toBe(false);
    expect(gameboard.isOccupied([3, 3])).toBe(true);
  });
});
