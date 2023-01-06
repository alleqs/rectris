import { type FC, useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';
import { subscribeKey } from 'valtio/utils';
import { derived as derivedStats, state as stats } from '../models/stats';
import { state as pieceState } from '../models/piece';
import { getPiecePanelPos } from './helper';
import { posPiecesMap, SHAKE_ANIM_DURATION } from '../constants';
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
      <aside className='flex flex-col items-center w-36 xl:w-auto select-none space-y-10 relative'>
         <div className='space-y-3 z-10 relative'>
            {/* <div style={{width:WIDTH / 2, height: WIDTH * 0.3}} className='space-y-3 z-10 relative '> */}
            <h2 className='text-2xl xl:text-3xl text-center text-gray-500 font-retroGame'>Hold</h2>
            {/* <div className='w-[120px] h-[72px] xl:w-[200px] xl:h-[120px]'> */}
            <div className='w-[calc(var(--hd-board-width)/2)] h-[calc(var(--hd-board-width)*0.3)] 
            xl:w-[calc(var(--board-width)/2)] xl:h-[calc(var(--board-width)*0.3)]'>
               <svg viewBox={`0 0 5 3`} className='bg-[#FDF344A0] rounded-lg neumorphism-left'>
                  {snap.heldPiece && posPiecesMap[snap.heldPiece][0].map(([x, y], i) =>
                     <Block key={i} {...getPiecePanelPos(snap.heldPiece!, x, y + 0.5 + 2.5 * 0)} piece={snap.heldPiece!} />)}
               </svg>
            </div>
         </div>
         <InfoPanel title='Score' value={score} />
         <InfoPanel title='Lines' value={lines} />
         <InfoPanel title='Level' value={level} isNewLevel={isNewLevel} />
      </aside>
   );
};


type InfoProps = { title: string, value: number, isNewLevel?: boolean }
const InfoPanel: FC<InfoProps> = ({ title, value, isNewLevel }) =>

   <div className='space-y-2 font-retroGame z-10 relative'>
      <p className='text-lg xl:text-2xl text-center text-gray-500 '>{title}</p>
      <p className={`${title === 'Level' && isNewLevel && 'shake-horizontal'} text-xl xl:text-3xl text-center text-gray-700`}>{value.toLocaleString()}</p>
   </div>


