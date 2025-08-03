import { TETROMINO_SHAPES, BOARD_WIDTH, BOARD_HEIGHT, Position, Tetromino } from '../types';

export const createEmptyBoard = (): (string | null)[][] => {
  return Array.from({ length: BOARD_HEIGHT }, () => 
    Array.from({ length: BOARD_WIDTH }, () => null)
  );
};

export const getRandomTetromino = (): Tetromino => {
  const shapes = Object.keys(TETROMINO_SHAPES);
  const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
  const tetrominoData = TETROMINO_SHAPES[randomShape];
  
  return {
    shape: tetrominoData.shape,
    color: tetrominoData.color,
    position: { x: Math.floor(BOARD_WIDTH / 2) - 1, y: 0 },
    id: randomShape,
  };
};

export const rotatePiece = (piece: number[][]): number[][] => {
  const rotated = piece[0].map((_, index) =>
    piece.map(row => row[index]).reverse()
  );
  return rotated;
};

export const isValidMove = (
  board: (string | null)[][],
  piece: Tetromino,
  newPosition: Position
): boolean => {
  for (let y = 0; y < piece.shape.length; y++) {
    for (let x = 0; x < piece.shape[y].length; x++) {
      if (piece.shape[y][x]) {
        const boardX = newPosition.x + x;
        const boardY = newPosition.y + y;

        // Check boundaries
        if (boardX < 0 || boardX >= BOARD_WIDTH || boardY >= BOARD_HEIGHT) {
          return false;
        }

        // Check if position is already occupied (only check if not above board)
        if (boardY >= 0 && board[boardY][boardX]) {
          return false;
        }
      }
    }
  }
  return true;
};

export const placePiece = (
  board: (string | null)[][],
  piece: Tetromino
): (string | null)[][] => {
  const newBoard = board.map(row => [...row]);
  
  for (let y = 0; y < piece.shape.length; y++) {
    for (let x = 0; x < piece.shape[y].length; x++) {
      if (piece.shape[y][x]) {
        const boardY = piece.position.y + y;
        const boardX = piece.position.x + x;
        
        if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
          newBoard[boardY][boardX] = piece.color;
        }
      }
    }
  }
  
  return newBoard;
};

export const clearLines = (board: (string | null)[][]): { 
  newBoard: (string | null)[][]; 
  linesCleared: number 
} => {
  const fullLines: number[] = [];
  
  // Find full lines
  for (let y = 0; y < BOARD_HEIGHT; y++) {
    if (board[y].every(cell => cell !== null)) {
      fullLines.push(y);
    }
  }
  
  if (fullLines.length === 0) {
    return { newBoard: board, linesCleared: 0 };
  }
  
  // Remove full lines and add empty lines at top
  const newBoard = board.filter((_, index) => !fullLines.includes(index));
  
  // Add empty lines at the top
  for (let i = 0; i < fullLines.length; i++) {
    newBoard.unshift(Array.from({ length: BOARD_WIDTH }, () => null));
  }
  
  return { newBoard, linesCleared: fullLines.length };
};

export const calculateScore = (linesCleared: number, level: number): number => {
  const baseScores = [0, 40, 100, 300, 1200];
  return baseScores[linesCleared] * (level + 1);
};

export const calculateLevel = (lines: number): number => {
  return Math.floor(lines / 10);
};

export const getDropSpeed = (level: number): number => {
  return Math.max(50, 1000 - (level * 50));
};