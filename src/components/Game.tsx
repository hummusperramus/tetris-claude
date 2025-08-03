import React, { useEffect, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import {
  GameBoard,
  GameControls,
  ControlButton,
  MobileControls,
  MobileControlButton,
  FadeIn,
} from '../styles/StyledComponents';
import Board from './Board';
import SidePanel from './SidePanel';
import TetrisStore from '../store/TetrisStore';

interface GameProps {
  store: TetrisStore;
}

const Game: React.FC<GameProps> = observer(({ store }) => {
  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (!store.isPlaying || store.isGameOver) return;

    switch (event.key) {
      case 'ArrowLeft':
      case 'a':
      case 'A':
        event.preventDefault();
        store.movePiece('left');
        break;
      case 'ArrowRight':
      case 'd':
      case 'D':
        event.preventDefault();
        store.movePiece('right');
        break;
      case 'ArrowDown':
      case 's':
      case 'S':
        event.preventDefault();
        store.movePiece('down');
        break;
      case 'ArrowUp':
      case 'w':
      case 'W':
        event.preventDefault();
        store.rotatePiece();
        break;
      case ' ':
        event.preventDefault();
        store.hardDrop();
        break;
      case 'p':
      case 'P':
      case 'Escape':
        event.preventDefault();
        store.pauseGame();
        break;
    }
  }, [store]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  const { isPaused } = store.gameState;

  return (
    <FadeIn>
      <GameBoard>
        <Board store={store} />
        <SidePanel store={store} />
      </GameBoard>

      <GameControls>
        <ControlButton onClick={() => store.movePiece('left')}>
          ← Left
        </ControlButton>
        <ControlButton onClick={store.rotatePiece}>
          ↻ Rotate
        </ControlButton>
        <ControlButton onClick={() => store.movePiece('right')}>
          Right →
        </ControlButton>
        <ControlButton onClick={store.hardDrop}>
          ↓ Drop
        </ControlButton>
        <ControlButton onClick={store.pauseGame}>
          {isPaused ? '▶ Resume' : '⏸ Pause'}
        </ControlButton>
        <ControlButton onClick={store.goToMenu}>
          🏠 Menu
        </ControlButton>
      </GameControls>

      {/* Mobile controls */}
      <MobileControls>
        <MobileControlButton onClick={() => store.movePiece('left')}>
          ←
        </MobileControlButton>
        <MobileControlButton onClick={store.rotatePiece}>
          ↻
        </MobileControlButton>
        <MobileControlButton onClick={() => store.movePiece('right')}>
          →
        </MobileControlButton>
        <MobileControlButton onClick={store.hardDrop}>
          ↓
        </MobileControlButton>
      </MobileControls>

      {isPaused && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'rgba(0, 0, 0, 0.9)',
          padding: '40px',
          borderRadius: '15px',
          border: '2px solid #00ffff',
          textAlign: 'center',
          zIndex: 1000,
        }}>
          <h2 style={{ color: '#00ffff', marginBottom: '20px', fontSize: '2rem' }}>
            PAUSED
          </h2>
          <p style={{ color: '#ffffff', marginBottom: '20px' }}>
            Press P or ESC to resume
          </p>
          <ControlButton onClick={store.pauseGame}>
            Resume Game
          </ControlButton>
        </div>
      )}
    </FadeIn>
  );
});

export default Game;