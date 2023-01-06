import { useEffect, useRef, type FC } from 'react';
import { KeyStroke } from './types';
import { LeftPanel } from './components/LeftPanel';
import { RightPanel, type Props as RightPanelProps } from './components/RightPanel';
import { GameBoard } from './components/GameBoard';
import { GameOverModal } from './components/modals/GameOverModal';
import { state as gameState } from './models/gameStatus';
import { subscribeKey } from 'valtio/utils';
import { Alert } from './components/Alert';
import { NewHiScoreModal } from './components/modals/NewHiScoreModal';
import { PreGame } from './components/modals/PreGame';
import { HelpModal } from './components/modals/HelpModal';
import { BG_IMAGE, boardDimensionsMap } from './constants';

type Props = {
  onStart: () => void
  onKeyPress: (key: KeyStroke) => void
  fastKeys: readonly string[]
  onNewGame: () => void
  onNewHiScore: (name: string) => void
  onRankingReset: () => void
} & RightPanelProps


export const App: FC<Props> = ({ onStart, onKeyPress, fastKeys, onNewGame, onNewHiScore, onRankingReset, ...rightPanelProps }) => {

  const gameOverModalRef = useRef<HTMLDialogElement>(null);
  const newHiScoreModalRef = useRef<HTMLDialogElement>(null);
  const startModalRef = useRef<HTMLDialogElement>(null);
  const helpModalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const unsubscribe = subscribeKey(gameState, 'status', status => {
      if (status === 'Over') {
        gameOverModalRef.current?.showModal();
      }
      else if (status === 'NewHiScore') {
        newHiScoreModalRef.current?.showModal();
      }
    });
    startModalRef.current?.showModal();
    return () => { unsubscribe() };
  }, []);


  function handleHelpModalClose() {
    helpModalRef.current?.close();
    startModalRef.current?.showModal();
  }

  return (
    <main style={{ backgroundImage: BG_IMAGE, ...boardDimensionsMap }}
      className={`flex justify-center py-5 xl:py-10 h-screen bg-[#FDF344] 
      overflow-hidden relative`}>

      <LeftPanel />

      <GameBoard onKeyPress={onKeyPress} fastKeys={fastKeys} />

      <RightPanel {...rightPanelProps} onNewGame={onNewGame} />

      {/* modals */}
      <GameOverModal
        onStart={onNewGame}
        modalRef={gameOverModalRef}
        onRankingReset={onRankingReset}
      />

      <NewHiScoreModal
        onNewHiScore={onNewHiScore}
        modalRef={newHiScoreModalRef}
      />

      <PreGame
        modalRef={startModalRef}
        helpModalRef={helpModalRef}
        onStart={onStart}
      />

      <HelpModal
        onClose={handleHelpModalClose}
        modalRef={helpModalRef}
      />

      <Alert />

    </main>
  );
};








