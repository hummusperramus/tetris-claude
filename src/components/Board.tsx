import React from 'react';
import { observer } from 'mobx-react-lite';
import { BoardContainer, BoardCell } from '../styles/StyledComponents';
import { BOARD_WIDTH, BOARD_HEIGHT } from '../types';
import TetrisStore from '../store/TetrisStore';

interface BoardProps {
  store: TetrisStore;
}

const Board: React.FC<BoardProps> = observer(({ store }) => {
  const { board, currentPiece } = store.gameState;

  // Create a display board that includes the current falling piece
  const displayBoard = board.map(row => [...row]);

  // Add current piece to display board
  if (currentPiece) {
    for (let y = 0; y < currentPiece.shape.length; y++) {
      for (let x = 0; x < currentPiece.shape[y].length; x++) {
        if (currentPiece.shape[y][x]) {
          const boardY = currentPiece.position.y + y;
          const boardX = currentPiece.position.x + x;
          
          if (
            boardY >= 0 && 
            boardY < BOARD_HEIGHT && 
            boardX >= 0 && 
            boardX < BOARD_WIDTH
          ) {
            displayBoard[boardY][boardX] = currentPiece.color;
          }
        }
      }
    }
  }

  return (
    <BoardContainer>
      {displayBoard.flat().map((cell, index) => (
        <BoardCell key={index} $color={cell} />
      ))}
    </BoardContainer>
  );
});

export default Board;