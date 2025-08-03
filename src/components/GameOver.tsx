import React from 'react';
import { observer } from 'mobx-react-lite';
import {
  GameOverContainer,
  GameOverTitle,
  ScoreDisplay,
  MenuButton,
  FadeIn,
} from '../styles/StyledComponents';
import TetrisStore from '../store/TetrisStore';

interface GameOverProps {
  store: TetrisStore;
}

const GameOver: React.FC<GameOverProps> = observer(({ store }) => {
  const { score, level, lines } = store.gameState;
  const isNewHighScore = store.highScores.length > 0 && score >= store.highScores[0].score;

  return (
    <FadeIn>
      <GameOverContainer>
        <GameOverTitle>GAME OVER</GameOverTitle>
        
        {isNewHighScore && (
          <div style={{ 
            color: '#ffff00', 
            fontSize: '1.5rem', 
            marginBottom: '20px',
            textShadow: '0 0 10px rgba(255, 255, 0, 0.5)' 
          }}>
            🏆 NEW HIGH SCORE! 🏆
          </div>
        )}

        <ScoreDisplay>
          <div style={{ color: '#00ffff', fontSize: '1.2rem', marginBottom: '10px' }}>
            Final Score
          </div>
          <div style={{ fontSize: '2.5rem', color: '#ffffff', marginBottom: '20px' }}>
            {score.toLocaleString()}
          </div>
        </ScoreDisplay>

        <div style={{ display: 'flex', gap: '40px', marginBottom: '30px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: '#cccccc', fontSize: '1rem' }}>Level</div>
            <div style={{ color: '#ffffff', fontSize: '1.5rem', fontWeight: 'bold' }}>
              {level}
            </div>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: '#cccccc', fontSize: '1rem' }}>Lines</div>
            <div style={{ color: '#ffffff', fontSize: '1.5rem', fontWeight: 'bold' }}>
              {lines}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <MenuButton onClick={store.startGame}>
            Play Again
          </MenuButton>
          
          <MenuButton onClick={store.goToHighScores}>
            High Scores
          </MenuButton>
          
          <MenuButton onClick={store.goToMenu}>
            Main Menu
          </MenuButton>
        </div>
      </GameOverContainer>
    </FadeIn>
  );
});

export default GameOver;