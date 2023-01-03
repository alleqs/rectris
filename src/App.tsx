import { useEffect, useRef, type FC } from 'react';
import { KeyStroke } from './types';
import { LeftPanel } from './components/LeftPanel';
import { RightPanel, type Props as RightPanelProps } from './components/RightPanel';
import { Game } from './components/Game';
import { GameOverModal } from './components/modals/GameOverModal';
import { state as gameState } from './models/gameStatus';
import { subscribeKey } from 'valtio/utils';
import { Alert } from './components/Alert';
import { NewHiScoreModal } from './components/modals/NewHiScoreModal';
import { PreGame } from './components/modals/PreGame';
import { HelpModal } from './components/modals/HelpModal';
import { BG_IMAGE } from './constants';

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
    <main style={{ backgroundImage: BG_IMAGE }}
      className={`flex justify-center py-10 h-screen bg-[#FDF344] relative`}>

      <LeftPanel />

      <section className='mx-6 smartphone'>
        <Game onKeyPress={onKeyPress} fastKeys={fastKeys} />
      </section>

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

      <div className='absolute left-auto top-2/3'>
        <Alert />
      </div>

    </main>
  );
};








