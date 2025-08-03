import React from 'react';
import { observer } from 'mobx-react-lite';
import {
  SidePanel,
  InfoPanel,
  InfoTitle,
  InfoValue,
  NextPieceContainer,
  NextPieceCell,
} from '../styles/StyledComponents';
import TetrisStore from '../store/TetrisStore';

interface SidePanelProps {
  store: TetrisStore;
}

const GameSidePanel: React.FC<SidePanelProps> = observer(({ store }) => {
  const { score, level, lines, nextPiece } = store.gameState;

  const renderNextPiece = () => {
    if (!nextPiece) return null;

    const cells = [];
    for (let y = 0; y < 4; y++) {
      for (let x = 0; x < 4; x++) {
        const isPartOfPiece = 
          y < nextPiece.shape.length && 
          x < nextPiece.shape[y].length && 
          nextPiece.shape[y][x];
        
        cells.push(
          <NextPieceCell 
            key={`${x}-${y}`} 
            $color={isPartOfPiece ? nextPiece.color : null} 
          />
        );
      }
    }
    return cells;
  };

  return (
    <SidePanel>
      <InfoPanel>
        <InfoTitle>Score</InfoTitle>
        <InfoValue>{score.toLocaleString()}</InfoValue>
      </InfoPanel>

      <InfoPanel>
        <InfoTitle>Level</InfoTitle>
        <InfoValue>{level}</InfoValue>
      </InfoPanel>

      <InfoPanel>
        <InfoTitle>Lines</InfoTitle>
        <InfoValue>{lines}</InfoValue>
      </InfoPanel>

      <InfoPanel>
        <InfoTitle>Next Piece</InfoTitle>
        <NextPieceContainer>
          {renderNextPiece()}
        </NextPieceContainer>
      </InfoPanel>

      {store.topScore > 0 && (
        <InfoPanel>
          <InfoTitle>High Score</InfoTitle>
          <InfoValue>{store.topScore.toLocaleString()}</InfoValue>
        </InfoPanel>
      )}
    </SidePanel>
  );
});

export default GameSidePanel;