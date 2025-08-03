import { describe, it, expect } from 'vitest';
import {
  createEmptyBoard,
  getRandomTetromino,
  rotatePiece,
  isValidMove,
  placePiece,
  clearLines,
  calculateScore,
  calculateLevel,
  getDropSpeed,
} from '../tetris';
import { BOARD_WIDTH, BOARD_HEIGHT, TETROMINO_SHAPES } from '../../types';

describe('Tetris Utils', () => {
  describe('createEmptyBoard', () => {
    it('should create a board with correct dimensions', () => {
      const board = createEmptyBoard();
      expect(board).toHaveLength(BOARD_HEIGHT);
      expect(board[0]).toHaveLength(BOARD_WIDTH);
      expect(board.every(row => row.every(cell => cell === null))).toBe(true);
    });
  });

  describe('getRandomTetromino', () => {
    it('should return a valid tetromino', () => {
      const tetromino = getRandomTetromino();
      expect(tetromino).toHaveProperty('shape');
      expect(tetromino).toHaveProperty('color');
      expect(tetromino).toHaveProperty('position');
      expect(tetromino).toHaveProperty('id');
      expect(tetromino.position.x).toBeGreaterThanOrEqual(0);
      expect(tetromino.position.y).toBe(0);
    });

    it('should return different pieces (over multiple calls)', () => {
      const pieces = Array.from({ length: 20 }, () => getRandomTetromino().id);
      const uniquePieces = new Set(pieces);
      expect(uniquePieces.size).toBeGreaterThan(1);
    });
  });

  describe('rotatePiece', () => {
    it('should rotate I piece correctly', () => {
      const iPiece = TETROMINO_SHAPES.I.shape;
      const rotated = rotatePiece(iPiece);

      // I piece should become vertical
      expect(rotated[0][2]).toBe(1);
      expect(rotated[1][2]).toBe(1);
      expect(rotated[2][2]).toBe(1);
      expect(rotated[3][2]).toBe(1);
    });

    it('should rotate T piece correctly', () => {
      const tPiece = TETROMINO_SHAPES.T.shape;
      const rotated = rotatePiece(tPiece);
      
      // Check that rotation maintains the T shape pattern
      expect(rotated).toHaveLength(3);
      expect(rotated[0]).toHaveLength(3);
    });
  });

  describe('isValidMove', () => {
    it('should allow valid moves', () => {
      const board = createEmptyBoard();
      const tetromino = getRandomTetromino();
      tetromino.position = { x: 3, y: 5 };
      
      const isValid = isValidMove(board, tetromino, { x: 4, y: 5 });
      expect(isValid).toBe(true);
    });

    it('should prevent moves outside left boundary', () => {
      const board = createEmptyBoard();
      const tetromino = getRandomTetromino();
      
      const isValid = isValidMove(board, tetromino, { x: -1, y: 0 });
      expect(isValid).toBe(false);
    });

    it('should prevent moves outside right boundary', () => {
      const board = createEmptyBoard();
      const tetromino = getRandomTetromino();
      
      const isValid = isValidMove(board, tetromino, { x: BOARD_WIDTH, y: 0 });
      expect(isValid).toBe(false);
    });

    it('should prevent moves outside bottom boundary', () => {
      const board = createEmptyBoard();
      const tetromino = getRandomTetromino();
      
      const isValid = isValidMove(board, tetromino, { x: 0, y: BOARD_HEIGHT });
      expect(isValid).toBe(false);
    });

    it('should prevent moves into occupied cells', () => {
      const board = createEmptyBoard();
      board[5][3] = '#FF0000'; // Place a block
      
      const tetromino = {
        shape: [[1]],
        color: '#00FF00',
        position: { x: 0, y: 0 },
        id: 'test',
      };
      
      const isValid = isValidMove(board, tetromino, { x: 3, y: 5 });
      expect(isValid).toBe(false);
    });
  });

  describe('placePiece', () => {
    it('should place piece on board correctly', () => {
      const board = createEmptyBoard();
      const tetromino = {
        shape: [[1, 1], [1, 1]], // O piece
        color: '#FFFF00',
        position: { x: 3, y: 5 },
        id: 'O',
      };
      
      const newBoard = placePiece(board, tetromino);
      
      expect(newBoard[5][3]).toBe('#FFFF00');
      expect(newBoard[5][4]).toBe('#FFFF00');
      expect(newBoard[6][3]).toBe('#FFFF00');
      expect(newBoard[6][4]).toBe('#FFFF00');
    });

    it('should not modify original board', () => {
      const board = createEmptyBoard();
      const tetromino = {
        shape: [[1]],
        color: '#FF0000',
        position: { x: 0, y: 0 },
        id: 'test',
      };
      
      placePiece(board, tetromino);
      expect(board[0][0]).toBe(null);
    });
  });

  describe('clearLines', () => {
    it('should clear full lines', () => {
      const board = createEmptyBoard();
      
      // Fill bottom row
      for (let x = 0; x < BOARD_WIDTH; x++) {
        board[BOARD_HEIGHT - 1][x] = '#FF0000';
      }
      
      const { newBoard, linesCleared } = clearLines(board);
      
      expect(linesCleared).toBe(1);
      expect(newBoard[BOARD_HEIGHT - 1].every(cell => cell === null)).toBe(true);
    });

    it('should clear multiple full lines', () => {
      const board = createEmptyBoard();
      
      // Fill bottom two rows
      for (let y = BOARD_HEIGHT - 2; y < BOARD_HEIGHT; y++) {
        for (let x = 0; x < BOARD_WIDTH; x++) {
          board[y][x] = '#FF0000';
        }
      }
      
      const { newBoard, linesCleared } = clearLines(board);
      
      expect(linesCleared).toBe(2);
      expect(newBoard[BOARD_HEIGHT - 1].every(cell => cell === null)).toBe(true);
      expect(newBoard[BOARD_HEIGHT - 2].every(cell => cell === null)).toBe(true);
    });

    it('should not clear partial lines', () => {
      const board = createEmptyBoard();
      
      // Fill bottom row except one cell
      for (let x = 0; x < BOARD_WIDTH - 1; x++) {
        board[BOARD_HEIGHT - 1][x] = '#FF0000';
      }
      
      const { newBoard, linesCleared } = clearLines(board);
      
      expect(linesCleared).toBe(0);
      expect(newBoard).toEqual(board);
    });
  });

  describe('calculateScore', () => {
    it('should calculate score based on lines cleared and level', () => {
      expect(calculateScore(1, 0)).toBe(40);
      expect(calculateScore(2, 0)).toBe(100);
      expect(calculateScore(3, 0)).toBe(300);
      expect(calculateScore(4, 0)).toBe(1200);
      
      expect(calculateScore(1, 1)).toBe(80);
      expect(calculateScore(4, 2)).toBe(3600);
    });

    it('should return 0 for no lines cleared', () => {
      expect(calculateScore(0, 5)).toBe(0);
    });
  });

  describe('calculateLevel', () => {
    it('should calculate level based on lines cleared', () => {
      expect(calculateLevel(0)).toBe(0);
      expect(calculateLevel(9)).toBe(0);
      expect(calculateLevel(10)).toBe(1);
      expect(calculateLevel(25)).toBe(2);
      expect(calculateLevel(100)).toBe(10);
    });
  });

  describe('getDropSpeed', () => {
    it('should decrease drop time as level increases', () => {
      const speed0 = getDropSpeed(0);
      const speed5 = getDropSpeed(5);
      const speed10 = getDropSpeed(10);
      
      expect(speed5).toBeLessThan(speed0);
      expect(speed10).toBeLessThan(speed5);
    });

    it('should have a minimum speed', () => {
      const highLevelSpeed = getDropSpeed(100);
      expect(highLevelSpeed).toBeGreaterThanOrEqual(50);
    });
  });
});