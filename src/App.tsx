import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import {
  GlobalStyle,
  BackgroundContainer,
  GameContainer,
} from './styles/StyledComponents';
import { GameScreen } from './types';
import TetrisStore from './store/TetrisStore';
import Menu from './components/Menu';
import Game from './components/Game';
import GameOver from './components/GameOver';
import HighScores from './components/HighScores';

const App: React.FC = observer(() => {
  const [store] = useState(() => new TetrisStore());

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      store.resetGame();
    };
  }, [store]);

  const renderCurrentScreen = () => {
    switch (store.currentScreen) {
      case GameScreen.MENU:
        return <Menu store={store} />;
      case GameScreen.GAME:
        return <Game store={store} />;
      case GameScreen.GAME_OVER:
        return <GameOver store={store} />;
      case GameScreen.HIGH_SCORES:
        return <HighScores store={store} />;
      default:
        return <Menu store={store} />;
    }
  };

  return (
    <>
      <GlobalStyle />
      <BackgroundContainer />
      <GameContainer>
        {renderCurrentScreen()}
      </GameContainer>
    </>
  );
});

export default App;