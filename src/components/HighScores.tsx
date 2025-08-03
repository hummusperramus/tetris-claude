import React from 'react';
import { observer } from 'mobx-react-lite';
import {
  HighScoresContainer,
  HighScoresTitle,
  HighScoresList,
  HighScoreItem,
  HighScoreRank,
  HighScoreInfo,
  HighScoreName,
  HighScoreDetails,
  HighScoreValue,
  MenuButton,
  FadeIn,
} from '../styles/StyledComponents';
import TetrisStore from '../store/TetrisStore';

interface HighScoresProps {
  store: TetrisStore;
}

const HighScores: React.FC<HighScoresProps> = observer(({ store }) => {
  const getRankEmoji = (rank: number) => {
    switch (rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return `#${rank}`;
    }
  };

  return (
    <FadeIn>
      <HighScoresContainer>
        <HighScoresTitle>High Scores</HighScoresTitle>
        
        {store.highScores.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            color: '#cccccc', 
            fontSize: '1.2rem',
            margin: '40px 0' 
          }}>
            No high scores yet. Be the first to play!
          </div>
        ) : (
          <HighScoresList>
            {store.highScores.map((score, index) => (
              <HighScoreItem key={score.id}>
                <HighScoreRank>
                  {getRankEmoji(index + 1)}
                </HighScoreRank>
                
                <HighScoreInfo>
                  <HighScoreName>{score.name}</HighScoreName>
                  <HighScoreDetails>
                    Level {score.level} • {score.lines} lines • {score.date}
                  </HighScoreDetails>
                </HighScoreInfo>
                
                <HighScoreValue>
                  {score.score.toLocaleString()}
                </HighScoreValue>
              </HighScoreItem>
            ))}
          </HighScoresList>
        )}

        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '20px', 
          marginTop: '30px',
          flexWrap: 'wrap' 
        }}>
          <MenuButton onClick={store.startGame}>
            Start Game
          </MenuButton>
          
          <MenuButton onClick={store.goToMenu}>
            Main Menu
          </MenuButton>
        </div>
      </HighScoresContainer>
    </FadeIn>
  );
});

export default HighScores;