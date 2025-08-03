import styled, { createGlobalStyle, keyframes } from 'styled-components';

// Global styles
export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap');
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Orbitron', monospace;
    background: linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 50%, #16213e 100%);
    color: #ffffff;
    min-height: 100vh;
    overflow: hidden;
  }

  #root {
    min-height: 100vh;
  }
`;

// Animations
const glow = keyframes`
  0% { box-shadow: 0 0 10px rgba(0, 255, 255, 0.3); }
  50% { box-shadow: 0 0 20px rgba(0, 255, 255, 0.8), 0 0 30px rgba(0, 255, 255, 0.4); }
  100% { box-shadow: 0 0 10px rgba(0, 255, 255, 0.3); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// const float = keyframes`
//   0%, 100% { transform: translateY(0px); }
//   50% { transform: translateY(-10px); }
// `;

const starTwinkle = keyframes`
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
`;

// Background
export const BackgroundContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: 
    radial-gradient(ellipse at top, #1e3c72 0%, #2a5298 50%, #0f0f23 100%),
    radial-gradient(ellipse at bottom, #0f0f23 0%, #1e3c72 50%, #2a5298 100%);
  z-index: -2;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
      radial-gradient(2px 2px at 20px 30px, rgba(255,255,255,0.3), transparent),
      radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.2), transparent),
      radial-gradient(1px 1px at 90px 40px, rgba(255,255,255,0.4), transparent),
      radial-gradient(1px 1px at 130px 80px, rgba(255,255,255,0.3), transparent),
      radial-gradient(2px 2px at 160px 30px, rgba(255,255,255,0.2), transparent);
    background-repeat: repeat;
    background-size: 200px 100px;
    animation: ${starTwinkle} 4s ease-in-out infinite;
  }
`;

// Main container
export const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  position: relative;
  z-index: 1;
`;

// Menu styles
export const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  text-align: center;
`;

export const GameTitle = styled.h1`
  font-size: 4rem;
  font-weight: 900;
  background: linear-gradient(45deg, #00ffff, #ff00ff, #ffff00, #00ffff);
  background-size: 300% 300%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 30px rgba(0, 255, 255, 0.5);
  animation: ${glow} 2s ease-in-out infinite;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

export const MenuButton = styled.button`
  background: linear-gradient(45deg, rgba(0, 255, 255, 0.2), rgba(255, 0, 255, 0.2));
  border: 2px solid #00ffff;
  color: #ffffff;
  font-family: 'Orbitron', monospace;
  font-size: 1.2rem;
  font-weight: 700;
  padding: 15px 30px;
  cursor: pointer;
  border-radius: 10px;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 2px;
  
  &:hover {
    background: linear-gradient(45deg, rgba(0, 255, 255, 0.4), rgba(255, 0, 255, 0.4));
    box-shadow: 0 0 20px rgba(0, 255, 255, 0.6);
    transform: translateY(-3px);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

// Game board styles
export const GameBoard = styled.div`
  display: flex;
  gap: 30px;
  align-items: flex-start;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
`;

export const BoardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(20, 1fr);
  gap: 1px;
  background: rgba(0, 0, 0, 0.8);
  border: 3px solid #00ffff;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 0 30px rgba(0, 255, 255, 0.3);
  width: 300px;
  height: 600px;
`;

export const BoardCell = styled.div<{ $color?: string | null }>`
  width: 100%;
  height: 100%;
  background: ${props => props.$color || 'rgba(255, 255, 255, 0.05)'};
  border: 1px solid ${props => props.$color ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.1)'};
  border-radius: 2px;
  box-shadow: ${props => props.$color ? `inset 0 0 10px rgba(255, 255, 255, 0.3)` : 'none'};
`;

// Side panel styles
export const SidePanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 200px;
`;

export const InfoPanel = styled.div`
  background: rgba(0, 0, 0, 0.7);
  border: 2px solid #00ffff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.2);
`;

export const InfoTitle = styled.h3`
  color: #00ffff;
  font-size: 1.2rem;
  margin-bottom: 10px;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

export const InfoValue = styled.div`
  color: #ffffff;
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 5px;
`;

export const NextPieceContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 2px;
  width: 80px;
  height: 80px;
  margin: 0 auto;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  padding: 10px;
`;

export const NextPieceCell = styled.div<{ $color?: string | null }>`
  width: 100%;
  height: 100%;
  background: ${props => props.$color || 'transparent'};
  border-radius: 2px;
  box-shadow: ${props => props.$color ? `inset 0 0 5px rgba(255, 255, 255, 0.3)` : 'none'};
`;

// Game controls
export const GameControls = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 20px;
  flex-wrap: wrap;
`;

export const ControlButton = styled.button`
  background: rgba(0, 255, 255, 0.2);
  border: 1px solid #00ffff;
  color: #ffffff;
  font-family: 'Orbitron', monospace;
  font-size: 0.9rem;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 5px;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(0, 255, 255, 0.4);
    box-shadow: 0 0 10px rgba(0, 255, 255, 0.4);
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

// Game over and high scores
export const GameOverContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  text-align: center;
  background: rgba(0, 0, 0, 0.8);
  border: 2px solid #ff0066;
  border-radius: 15px;
  padding: 40px;
  box-shadow: 0 0 30px rgba(255, 0, 102, 0.3);
`;

export const GameOverTitle = styled.h2`
  font-size: 2.5rem;
  color: #ff0066;
  text-shadow: 0 0 20px rgba(255, 0, 102, 0.5);
  animation: ${pulse} 2s ease-in-out infinite;
`;

export const ScoreDisplay = styled.div`
  font-size: 1.5rem;
  color: #ffffff;
  margin: 10px 0;
`;

export const HighScoresContainer = styled.div`
  background: rgba(0, 0, 0, 0.8);
  border: 2px solid #00ffff;
  border-radius: 15px;
  padding: 30px;
  max-width: 600px;
  width: 100%;
  box-shadow: 0 0 30px rgba(0, 255, 255, 0.3);
`;

export const HighScoresTitle = styled.h2`
  color: #00ffff;
  font-size: 2rem;
  text-align: center;
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

export const HighScoresList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const HighScoreItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(0, 255, 255, 0.3);
  border-radius: 8px;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(0, 255, 255, 0.1);
    border-color: #00ffff;
  }
`;

export const HighScoreRank = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  color: #ffff00;
  min-width: 30px;
`;

export const HighScoreInfo = styled.div`
  flex: 1;
  margin-left: 15px;
`;

export const HighScoreName = styled.div`
  font-size: 1.1rem;
  font-weight: 700;
  color: #ffffff;
`;

export const HighScoreDetails = styled.div`
  font-size: 0.9rem;
  color: #cccccc;
  margin-top: 5px;
`;

export const HighScoreValue = styled.div`
  font-size: 1.3rem;
  font-weight: 700;
  color: #00ffff;
`;

// Animation pieces for menu
export const AnimationBoard = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(20, 1fr);
  gap: 1px;
  width: 300px;
  height: 600px;
  opacity: 0.3;
  z-index: -1;
`;

export const AnimationCell = styled.div<{ $color?: string | null }>`
  width: 100%;
  height: 100%;
  background: ${props => props.$color || 'transparent'};
  border-radius: 2px;
  box-shadow: ${props => props.$color ? `0 0 10px ${props.$color}` : 'none'};
  transition: all 0.3s ease;
`;

// Responsive helpers
export const MobileControls = styled.div`
  display: none;
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  gap: 15px;
  z-index: 10;
  
  @media (max-width: 768px) {
    display: flex;
  }
`;

export const MobileControlButton = styled(ControlButton)`
  padding: 15px 20px;
  font-size: 1rem;
  border-radius: 10px;
`;

// Loading and transitions
export const FadeIn = styled.div`
  animation: fadeIn 0.5s ease-in-out;
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;