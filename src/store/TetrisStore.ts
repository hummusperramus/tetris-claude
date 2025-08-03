import { makeAutoObservable } from 'mobx';
import {
  GameState,
  GameScreen,
  Tetromino,
  HighScore,
  BOARD_WIDTH,
  BOARD_HEIGHT,
} from '../types';
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
} from '../utils/tetris';

class TetrisStore {
  // Game state
  board: (string | null)[][] = createEmptyBoard();
  currentPiece: Tetromino | null = null;
  nextPiece: Tetromino | null = null;
  score = 0;
  level = 0;
  lines = 0;
  isGameOver = false;
  isPaused = false;
  isPlaying = false;
  currentScreen: GameScreen = GameScreen.MENU;
  
  // High scores
  highScores: HighScore[] = [];
  
  // Animation for menu
  animationPieces: Tetromino[] = [];
  
  // Game loop
  private gameInterval: NodeJS.Timeout | null = null;
  private animationInterval: NodeJS.Timeout | null = null;

  constructor() {
    makeAutoObservable(this);
    this.loadHighScores();
    this.startMenuAnimation();
  }

  // Game actions
  startGame = () => {
    this.resetGame();
    this.currentScreen = GameScreen.GAME;
    this.isPlaying = true;
    this.currentPiece = getRandomTetromino();
    this.nextPiece = getRandomTetromino();
    this.startGameLoop();
    this.stopMenuAnimation();
  };

  resetGame = () => {
    this.board = createEmptyBoard();
    this.currentPiece = null;
    this.nextPiece = null;
    this.score = 0;
    this.level = 0;
    this.lines = 0;
    this.isGameOver = false;
    this.isPaused = false;
    this.isPlaying = false;
    this.stopGameLoop();
  };

  pauseGame = () => {
    if (!this.isPlaying || this.isGameOver) return;
    this.isPaused = !this.isPaused;
    
    if (this.isPaused) {
      this.stopGameLoop();
    } else {
      this.startGameLoop();
    }
  };

  gameOver = () => {
    this.isGameOver = true;
    this.isPlaying = false;
    this.stopGameLoop();
    this.currentScreen = GameScreen.GAME_OVER;
    this.checkHighScore();
  };

  goToMenu = () => {
    this.currentScreen = GameScreen.MENU;
    this.resetGame();
    this.startMenuAnimation();
  };

  goToHighScores = () => {
    this.currentScreen = GameScreen.HIGH_SCORES;
    this.stopMenuAnimation();
  };

  // Piece movement
  movePiece = (direction: 'left' | 'right' | 'down') => {
    if (!this.currentPiece || !this.isPlaying || this.isPaused || this.isGameOver) return;

    const newPosition = { ...this.currentPiece.position };
    
    switch (direction) {
      case 'left':
        newPosition.x -= 1;
        break;
      case 'right':
        newPosition.x += 1;
        break;
      case 'down':
        newPosition.y += 1;
        break;
    }

    if (isValidMove(this.board, this.currentPiece, newPosition)) {
      this.currentPiece.position = newPosition;
    } else if (direction === 'down') {
      this.placePiece();
    }
  };

  rotatePiece = () => {
    if (!this.currentPiece || !this.isPlaying || this.isPaused || this.isGameOver) return;

    const rotatedShape = rotatePiece(this.currentPiece.shape);
    const rotatedPiece = { ...this.currentPiece, shape: rotatedShape };

    if (isValidMove(this.board, rotatedPiece, this.currentPiece.position)) {
      this.currentPiece.shape = rotatedShape;
    }
  };

  hardDrop = () => {
    if (!this.currentPiece || !this.isPlaying || this.isPaused || this.isGameOver) return;

    while (isValidMove(this.board, this.currentPiece, {
      ...this.currentPiece.position,
      y: this.currentPiece.position.y + 1
    })) {
      this.currentPiece.position.y += 1;
      this.score += 2; // Bonus points for hard drop
    }
    
    this.placePiece();
  };

  private placePiece = () => {
    if (!this.currentPiece) return;

    this.board = placePiece(this.board, this.currentPiece);
    
    const { newBoard, linesCleared } = clearLines(this.board);
    this.board = newBoard;
    
    if (linesCleared > 0) {
      this.lines += linesCleared;
      this.score += calculateScore(linesCleared, this.level);
      this.level = calculateLevel(this.lines);
    }

    this.currentPiece = this.nextPiece;
    this.nextPiece = getRandomTetromino();

    // Check game over
    if (this.currentPiece && !isValidMove(this.board, this.currentPiece, this.currentPiece.position)) {
      this.gameOver();
    }
  };

  // Game loop
  private startGameLoop = () => {
    this.stopGameLoop();
    const dropSpeed = getDropSpeed(this.level);
    
    this.gameInterval = setInterval(() => {
      if (!this.isPaused && this.isPlaying && !this.isGameOver) {
        this.movePiece('down');
      }
    }, dropSpeed);
  };

  private stopGameLoop = () => {
    if (this.gameInterval) {
      clearInterval(this.gameInterval);
      this.gameInterval = null;
    }
  };

  // Menu animation
  private startMenuAnimation = () => {
    this.stopMenuAnimation();
    this.generateAnimationPieces();
    
    this.animationInterval = setInterval(() => {
      this.updateAnimationPieces();
    }, 100);
  };

  private stopMenuAnimation = () => {
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
      this.animationInterval = null;
    }
  };

  private generateAnimationPieces = () => {
    this.animationPieces = Array.from({ length: 8 }, (_, i) => ({
      ...getRandomTetromino(),
      position: {
        x: Math.random() * (BOARD_WIDTH - 4),
        y: -10 - (i * 5),
      },
    }));
  };

  private updateAnimationPieces = () => {
    this.animationPieces = this.animationPieces.map(piece => {
      const newY = piece.position.y + 0.5;
      
      if (newY > BOARD_HEIGHT + 5) {
        return {
          ...getRandomTetromino(),
          position: {
            x: Math.random() * (BOARD_WIDTH - 4),
            y: -10,
          },
        };
      }
      
      return {
        ...piece,
        position: { ...piece.position, y: newY },
      };
    });
  };

  // High scores
  private loadHighScores = () => {
    const saved = localStorage.getItem('tetris-high-scores');
    if (saved) {
      try {
        this.highScores = JSON.parse(saved);
      } catch {
        this.highScores = [];
      }
    }
  };

  private saveHighScores = () => {
    localStorage.setItem('tetris-high-scores', JSON.stringify(this.highScores));
  };

  private checkHighScore = () => {
    const isHighScore = this.highScores.length < 10 || 
      this.score > Math.min(...this.highScores.map(hs => hs.score));
    
    if (isHighScore) {
      this.addHighScore('Player'); // In a real app, you'd prompt for name
    }
  };

  addHighScore = (name: string) => {
    const newScore: HighScore = {
      id: Date.now().toString(),
      name,
      score: this.score,
      level: this.level,
      lines: this.lines,
      date: new Date().toLocaleDateString(),
    };

    this.highScores.push(newScore);
    this.highScores.sort((a, b) => b.score - a.score);
    this.highScores = this.highScores.slice(0, 10);
    this.saveHighScores();
  };

  // Getters
  get topScore() {
    return this.highScores.length > 0 ? this.highScores[0].score : 0;
  }

  get gameState(): GameState {
    return {
      board: this.board,
      currentPiece: this.currentPiece,
      nextPiece: this.nextPiece,
      score: this.score,
      level: this.level,
      lines: this.lines,
      isGameOver: this.isGameOver,
      isPaused: this.isPaused,
      isPlaying: this.isPlaying,
    };
  }
}

export default TetrisStore;