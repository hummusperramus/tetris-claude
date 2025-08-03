export interface Position {
  x: number;
  y: number;
}

export interface TetrominoShape {
  shape: number[][];
  color: string;
}

export interface Tetromino {
  shape: number[][];
  color: string;
  position: Position;
  id: string;
}

export interface GameState {
  board: (string | null)[][];
  currentPiece: Tetromino | null;
  nextPiece: Tetromino | null;
  score: number;
  level: number;
  lines: number;
  isGameOver: boolean;
  isPaused: boolean;
  isPlaying: boolean;
}

export interface HighScore {
  id: string;
  name: string;
  score: number;
  level: number;
  lines: number;
  date: string;
}

export enum GameScreen {
  MENU = 'menu',
  GAME = 'game',
  GAME_OVER = 'gameOver',
  HIGH_SCORES = 'highScores',
}

export const BOARD_WIDTH = 10;
export const BOARD_HEIGHT = 20;

export const TETROMINO_SHAPES: { [key: string]: TetrominoShape } = {
  I: {
    shape: [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    color: '#00FFFF',
  },
  O: {
    shape: [
      [1, 1],
      [1, 1],
    ],
    color: '#FFFF00',
  },
  T: {
    shape: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
    color: '#800080',
  },
  S: {
    shape: [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0],
    ],
    color: '#00FF00',
  },
  Z: {
    shape: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
    ],
    color: '#FF0000',
  },
  J: {
    shape: [
      [1, 0, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
    color: '#0000FF',
  },
  L: {
    shape: [
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 0],
    ],
    color: '#FFA500',
  },
};