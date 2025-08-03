import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from '../../App';

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('App Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
  });

  it('should render menu screen initially', () => {
    render(<App />);
    
    expect(screen.getByText('TETRIS GALAXY')).toBeInTheDocument();
    expect(screen.getByText('Start Game')).toBeInTheDocument();
    expect(screen.getByText('High Scores')).toBeInTheDocument();
  });

  it('should start game when start button is clicked', async () => {
    render(<App />);
    
    const startButton = screen.getByText('Start Game');
    fireEvent.click(startButton);
    
    await waitFor(() => {
      expect(screen.getByText('Score')).toBeInTheDocument();
      expect(screen.getByText('Level')).toBeInTheDocument();
      expect(screen.getByText('Lines')).toBeInTheDocument();
      expect(screen.getByText('Next Piece')).toBeInTheDocument();
    });
  });

  it('should navigate to high scores screen', async () => {
    render(<App />);
    
    const highScoresButton = screen.getByText('High Scores');
    fireEvent.click(highScoresButton);
    
    await waitFor(() => {
      expect(screen.getByText('High Scores')).toBeInTheDocument();
      expect(screen.getByText('No high scores yet. Be the first to play!')).toBeInTheDocument();
    });
  });

  it('should handle keyboard controls during game', async () => {
    render(<App />);
    
    // Start the game
    const startButton = screen.getByText('Start Game');
    fireEvent.click(startButton);
    
    await waitFor(() => {
      expect(screen.getByText('Score')).toBeInTheDocument();
    });

    // Test keyboard controls
    fireEvent.keyDown(window, { key: 'ArrowLeft' });
    fireEvent.keyDown(window, { key: 'ArrowRight' });
    fireEvent.keyDown(window, { key: 'ArrowDown' });
    fireEvent.keyDown(window, { key: 'ArrowUp' });
    fireEvent.keyDown(window, { key: ' ' });
    
    // Should not throw any errors
    expect(screen.getByText('Score')).toBeInTheDocument();
  });

  it('should pause game when pause button is clicked', async () => {
    render(<App />);
    
    // Start the game
    const startButton = screen.getByText('Start Game');
    fireEvent.click(startButton);
    
    await waitFor(() => {
      expect(screen.getByText('⏸ Pause')).toBeInTheDocument();
    });

    // Pause the game
    const pauseButton = screen.getByText('⏸ Pause');
    fireEvent.click(pauseButton);
    
    await waitFor(() => {
      expect(screen.getByText('PAUSED')).toBeInTheDocument();
      expect(screen.getByText('▶ Resume')).toBeInTheDocument();
    });
  });

  it('should return to menu from game', async () => {
    render(<App />);
    
    // Start the game
    const startButton = screen.getByText('Start Game');
    fireEvent.click(startButton);
    
    await waitFor(() => {
      expect(screen.getByText('🏠 Menu')).toBeInTheDocument();
    });

    // Return to menu
    const menuButton = screen.getByText('🏠 Menu');
    fireEvent.click(menuButton);
    
    await waitFor(() => {
      expect(screen.getByText('TETRIS GALAXY')).toBeInTheDocument();
      expect(screen.getByText('Start Game')).toBeInTheDocument();
    });
  });

  it('should display game controls', async () => {
    render(<App />);
    
    // Start the game
    const startButton = screen.getByText('Start Game');
    fireEvent.click(startButton);
    
    await waitFor(() => {
      expect(screen.getByText('← Left')).toBeInTheDocument();
      expect(screen.getByText('↻ Rotate')).toBeInTheDocument();
      expect(screen.getByText('Right →')).toBeInTheDocument();
      expect(screen.getByText('↓ Drop')).toBeInTheDocument();
    });
  });

  it('should handle game control button clicks', async () => {
    render(<App />);
    
    // Start the game
    const startButton = screen.getByText('Start Game');
    fireEvent.click(startButton);
    
    await waitFor(() => {
      expect(screen.getByText('← Left')).toBeInTheDocument();
    });

    // Test control buttons
    fireEvent.click(screen.getByText('← Left'));
    fireEvent.click(screen.getByText('↻ Rotate'));
    fireEvent.click(screen.getByText('Right →'));
    fireEvent.click(screen.getByText('↓ Drop'));
    
    // Should not throw any errors
    expect(screen.getByText('Score')).toBeInTheDocument();
  });
});