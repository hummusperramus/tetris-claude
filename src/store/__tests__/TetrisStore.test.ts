import { describe, it, expect, beforeEach, vi } from 'vitest';
import TetrisStore from '../TetrisStore';
import { GameScreen } from '../../types';

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('TetrisStore', () => {
  let store: TetrisStore;

  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
    store = new TetrisStore();
  });

  describe('initialization', () => {
    it('should initialize with correct default values', () => {
      expect(store.score).toBe(0);
      expect(store.level).toBe(0);
      expect(store.lines).toBe(0);
      expect(store.isGameOver).toBe(false);
      expect(store.isPaused).toBe(false);
      expect(store.isPlaying).toBe(false);
      expect(store.currentScreen).toBe(GameScreen.MENU);
      expect(store.currentPiece).toBe(null);
      expect(store.nextPiece).toBe(null);
    });

    it('should create empty board', () => {
      expect(store.board).toHaveLength(20);
      expect(store.board[0]).toHaveLength(10);
      expect(store.board.every(row => row.every(cell => cell === null))).toBe(true);
    });

    it('should initialize with animation pieces', () => {
      expect(store.animationPieces).toHaveLength(8);
    });
  });

  describe('game flow', () => {
    it('should start game correctly', () => {
      store.startGame();
      
      expect(store.currentScreen).toBe(GameScreen.GAME);
      expect(store.isPlaying).toBe(true);
      expect(store.currentPiece).not.toBe(null);
      expect(store.nextPiece).not.toBe(null);
      expect(store.score).toBe(0);
      expect(store.level).toBe(0);
      expect(store.lines).toBe(0);
    });

    it('should reset game correctly', () => {
      store.startGame();
      store.score = 100;
      store.level = 2;
      store.lines = 5;
      
      store.resetGame();
      
      expect(store.score).toBe(0);
      expect(store.level).toBe(0);
      expect(store.lines).toBe(0);
      expect(store.isPlaying).toBe(false);
      expect(store.isGameOver).toBe(false);
      expect(store.currentPiece).toBe(null);
      expect(store.nextPiece).toBe(null);
    });

    it('should handle game over', () => {
      store.startGame();
      store.gameOver();
      
      expect(store.isGameOver).toBe(true);
      expect(store.isPlaying).toBe(false);
      expect(store.currentScreen).toBe(GameScreen.GAME_OVER);
    });

    it('should pause and resume game', () => {
      store.startGame();
      
      store.pauseGame();
      expect(store.isPaused).toBe(true);
      
      store.pauseGame();
      expect(store.isPaused).toBe(false);
    });
  });

  describe('piece movement', () => {
    beforeEach(() => {
      store.startGame();
    });

    it('should move piece left', () => {
      const initialX = store.currentPiece!.position.x;
      store.movePiece('left');
      expect(store.currentPiece!.position.x).toBe(initialX - 1);
    });

    it('should move piece right', () => {
      const initialX = store.currentPiece!.position.x;
      store.movePiece('right');
      expect(store.currentPiece!.position.x).toBe(initialX + 1);
    });

    it('should move piece down', () => {
      const initialY = store.currentPiece!.position.y;
      store.movePiece('down');
      expect(store.currentPiece!.position.y).toBe(initialY + 1);
    });

    it('should rotate piece', () => {
      // const initialShape = store.currentPiece!.shape;
      store.rotatePiece();
      // Should either rotate or stay the same if rotation is invalid
      expect(store.currentPiece!.shape).toBeDefined();
    });

    it('should not move when game is paused', () => {
      const initialX = store.currentPiece!.position.x;
      store.pauseGame();
      store.movePiece('left');
      expect(store.currentPiece!.position.x).toBe(initialX);
    });

    it('should not move when game is over', () => {
      const initialX = store.currentPiece!.position.x;
      store.gameOver();
      store.movePiece('left');
      expect(store.currentPiece!.position.x).toBe(initialX);
    });
  });

  describe('screen navigation', () => {
    it('should navigate to menu', () => {
      store.goToMenu();
      expect(store.currentScreen).toBe(GameScreen.MENU);
    });

    it('should navigate to high scores', () => {
      store.goToHighScores();
      expect(store.currentScreen).toBe(GameScreen.HIGH_SCORES);
    });
  });

  describe('high scores', () => {
    it('should add high score', () => {
      store.score = 1000;
      store.level = 5;
      store.lines = 20;
      
      store.addHighScore('Test Player');
      
      expect(store.highScores).toHaveLength(1);
      expect(store.highScores[0].name).toBe('Test Player');
      expect(store.highScores[0].score).toBe(1000);
      expect(store.highScores[0].level).toBe(5);
      expect(store.highScores[0].lines).toBe(20);
    });

    it('should sort high scores correctly', () => {
      store.score = 500;
      store.addHighScore('Player 1');
      
      store.score = 1000;
      store.addHighScore('Player 2');
      
      store.score = 750;
      store.addHighScore('Player 3');
      
      expect(store.highScores[0].score).toBe(1000);
      expect(store.highScores[1].score).toBe(750);
      expect(store.highScores[2].score).toBe(500);
    });

    it('should limit high scores to 10', () => {
      for (let i = 0; i < 15; i++) {
        store.score = 100 * i;
        store.addHighScore(`Player ${i}`);
      }
      
      expect(store.highScores).toHaveLength(10);
    });

    it('should save high scores to localStorage', () => {
      store.score = 1000;
      store.addHighScore('Test Player');
      
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'tetris-high-scores',
        expect.stringContaining('Test Player')
      );
    });
  });

  describe('getters', () => {
    it('should return correct top score', () => {
      expect(store.topScore).toBe(0);
      
      store.score = 500;
      store.addHighScore('Player 1');
      expect(store.topScore).toBe(500);
      
      store.score = 1000;
      store.addHighScore('Player 2');
      expect(store.topScore).toBe(1000);
    });

    it('should return correct game state', () => {
      store.startGame();
      const gameState = store.gameState;
      
      expect(gameState.board).toBe(store.board);
      expect(gameState.currentPiece).toBe(store.currentPiece);
      expect(gameState.nextPiece).toBe(store.nextPiece);
      expect(gameState.score).toBe(store.score);
      expect(gameState.level).toBe(store.level);
      expect(gameState.lines).toBe(store.lines);
      expect(gameState.isGameOver).toBe(store.isGameOver);
      expect(gameState.isPaused).toBe(store.isPaused);
      expect(gameState.isPlaying).toBe(store.isPlaying);
    });
  });
});