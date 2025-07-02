import { User, Computer } from "../player";

jest.mock("../gameboard", () => {
  return {
    Gameboard: jest.fn().mockImplementation(() => ({
      placeShip: jest.fn(),
      isOccupied: jest.fn().mockReturnValue(false),
      isAttacked: jest.fn().mockReturnValue(false),
      recieveAttack: jest.fn(),
    })),
  };
});

describe("Player subclasses", () => {
  test("User attacks un-attacked position and returns true", () => {
    const user = new User("Player1");
    const opponentBoard = {
      isAttacked: jest.fn().mockReturnValue(false),
      recieveAttack: jest.fn(),
    };

    const result = user.attack(opponentBoard, [1, 1]);
    expect(result).toBe(true);
    expect(opponentBoard.recieveAttack).toHaveBeenCalledWith([1, 1]);
  });

  test("User attacks attacked position and returns false", () => {
    const user = new User("Player1");
    const opponentBoard = {
      isAttacked: jest.fn().mockReturnValue(true),
      recieveAttack: jest.fn(),
    };

    const result = user.attack(opponentBoard, [1, 1]);
    expect(result).toBe(false);
    expect(opponentBoard.recieveAttack).not.toHaveBeenCalled();
  });

  test("Computer generates 5 ships on creation", () => {
    const computer = new Computer("AI");
    expect(computer.gameboard.placeShip).toHaveBeenCalledTimes(5);
  });

  test("Computer attacks a random cell", () => {
    const computer = new Computer("AI");
    const opponentBoard = {
      isAttacked: jest.fn().mockReturnValue(false),
      recieveAttack: jest.fn(),
    };

    computer.attack(opponentBoard);
    expect(opponentBoard.recieveAttack).toHaveBeenCalledTimes(1);
  });
});
