import React from 'react';
import { observer } from 'mobx-react-lite';
import {
  MenuContainer,
  GameTitle,
  MenuButton,
  AnimationBoard,
  AnimationCell,
} from '../styles/StyledComponents';
import { BOARD_WIDTH, BOARD_HEIGHT } from '../types';
import TetrisStore from '../store/TetrisStore';

interface MenuProps {
  store: TetrisStore;
}

const Menu: React.FC<MenuProps> = observer(({ store }) => {
  const renderAnimationBoard = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const board: Array<any> = Array.from({ length: BOARD_HEIGHT }, () => 
      Array.from({ length: BOARD_WIDTH }, () => null)
    );

    // Add animation pieces to the board
    store.animationPieces.forEach(piece => {
      for (let y = 0; y < piece.shape.length; y++) {
        for (let x = 0; x < piece.shape[y].length; x++) {
          if (piece.shape[y][x]) {
            const boardY = Math.floor(piece.position.y + y);
            const boardX = Math.floor(piece.position.x + x);
            
            if (
              boardY >= 0 && 
              boardY < BOARD_HEIGHT && 
              boardX >= 0 && 
              boardX < BOARD_WIDTH
            ) {
              board[boardY][boardX] = piece.color;
            }
          }
        }
      }
    });

    return board.flat().map((cell, index) => (
      <AnimationCell key={index} $color={cell} />
    ));
  };

  return (
    <MenuContainer>
      <AnimationBoard>
        {renderAnimationBoard()}
      </AnimationBoard>
      
      <GameTitle>TETRIS GALAXY</GameTitle>
      
      <div>
        <MenuButton onClick={store.startGame}>
          Start Game
        </MenuButton>
      </div>
      
      <div>
        <MenuButton onClick={store.goToHighScores}>
          High Scores
        </MenuButton>
      </div>
      
      {store.topScore > 0 && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <div style={{ color: '#00ffff', fontSize: '1.2rem' }}>
            Best Score: {store.topScore.toLocaleString()}
          </div>
        </div>
      )}
    </MenuContainer>
  );
});

export default Menu;