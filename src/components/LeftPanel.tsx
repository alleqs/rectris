import { type FC, useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';
import { subscribeKey } from 'valtio/utils';
import { derived as derivedStats, state as stats } from '../models/stats';
import { state as pieceState } from '../models/piece';
import { getPiecePanelPos } from './helper';
import { posPiecesMap, SHAKE_ANIM_DURATION, WIDTH } from '../constants';
import { Block } from './Block';
import { sleep } from '../utils';

export const LeftPanel: FC = () => {

   const { score, lines } = useSnapshot(stats);
   const { level } = useSnapshot(derivedStats);
   const snap = useSnapshot(pieceState);
   //for animation
   const [isNewLevel, setIsNewLevel] = useState(false);

   useEffect(() => {

      const unsubscribe = subscribeKey(derivedStats, 'level', async newLevel => {
         if (newLevel > 1) {
            setIsNewLevel(true);
            await sleep(SHAKE_ANIM_DURATION);
            setIsNewLevel(false);
         }
      });
      return () => { unsubscribe() };

   }, []);

   return (
      <aside className='select-none space-y-10 relative'>
         <div className='space-y-3 z-10 relative'>
            <h2 className='text-3xl text-center text-gray-500 font-retroGame'>Hold</h2>
            <svg viewBox={`0 0 5 3`} width={WIDTH / 2} height={WIDTH * 0.3} className='bg-[#FDF344A0] rounded-lg neumorphism-left'>
               {snap.heldPiece && posPiecesMap[snap.heldPiece][0].map(([x, y], i) =>
                  <Block key={i} {...getPiecePanelPos(snap.heldPiece!, x, y + 0.5 + 2.5 * 0)} piece={snap.heldPiece!} />)}
            </svg>
         </div>
         <InfoPanel title='Score' value={score} />
         <InfoPanel title='Lines' value={lines} />
         <InfoPanel title='Level' value={level} isNewLevel={isNewLevel} />
         {/* <Smoke /> */}
      </aside>
   );
};


type InfoProps = { title: string, value: number, isNewLevel?: boolean }
const InfoPanel: FC<InfoProps> = ({ title, value, isNewLevel }) => {
   return (
      <div className='space-y-2 font-retroGame z-10 relative'>
         <p className='text-2xl text-center text-gray-500 '>{title}</p>
         <p className={`${title === 'Level' && isNewLevel && 'shake-horizontal'} text-3xl text-center text-gray-700`}>{value.toLocaleString()}</p>
      </div>
   );
}
