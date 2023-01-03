import './index.css';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { handleKeyPressed } from './models/piece';
import { handleNewGame, start as startGame } from './game';
import { handlePaused, handleResumed } from './models/gameStatus';
import { FAST_KEYS } from './constants';
import { handleNewHiScore, resetRanking } from './models/stats';

declare module 'valtio' {
  function useSnapshot<T extends object>(p: T): T
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <App
    onStart={startGame}
    onKeyPress={handleKeyPressed}
    fastKeys={FAST_KEYS}
    onNewGame={handleNewGame}
    onPause={handlePaused}
    onResume={handleResumed}
    onNewHiScore={handleNewHiScore}
    onRankingReset={resetRanking}
  />
);
