import { KeyboardEvent, useEffect, useRef, useState, type FC } from 'react';
import { useSnapshot } from 'valtio';
import { posPiecesMap, VISIBLE_PIECES_AMT } from '../constants';
import { state as pieceState } from '../models/piece';
import { Block } from './Block';
import { getPiecePanelPos } from './helper';
import { PausedModal } from './modals/PausedModal';
import { PauseSymbol } from './Icons';
import type { Piece } from '../types';
import { sleep } from '../utils';
import { motion } from 'framer-motion';

const ANIM_DUR = 300;

export type Props = {
   onNewGame: () => void
   onPause: () => void
   onResume: () => void
}

export const RightPanel: FC<Props> = ({ onPause, onResume, onNewGame }) => {

   const { nextPieces } = useSnapshot(pieceState);
   const pasedModalRef = useRef<HTMLDialogElement>(null);
   //only for animation purpose
   const first = useRef(true);
   const [prevState, setPrevState] = useState<Piece[]>([]);
   //to avoid flicking
   const [clonedPieces, setClonedPieces] = useState<Piece[]>([...nextPieces]);
   const [freezed, setFreezed] = useState(false);

   useEffect(() => {
      (async () => {
         if (first.current) {
            setPrevState([...nextPieces]);
            first.current = false;
         } else {
            setClonedPieces([...nextPieces])
            setFreezed(true);
            await sleep(ANIM_DUR);
            setPrevState([...nextPieces]);
            setFreezed(false);
         }
      })();
   }, [nextPieces]);


   function handlePauseBtnClick() {
      pasedModalRef.current?.showModal()
      onPause();
   }

   function handleKeyDown(e: KeyboardEvent<HTMLButtonElement>) {
      e.preventDefault();
   }

   return (
      <aside className='flex flex-col items-center select-none w-36 xl:w-auto 
      h-[calc(var(--hd-board-width)*2+2*var(--y-board-margin))] xl:h-auto'>
         <div className='flex-1 space-y-3 '>
            <h2 className="text-2xl xl:text-3xl text-center text-gray-500 font-retroGame">Next</h2>
            {/* <div className='w-[120px] h-[192px] xl:w-[200px] xl:h-[320px]'> */}
            <div className='w-[calc(var(--hd-board-width)/2)] h-[calc(var(--hd-board-width)*0.8)]
            xl:w-[calc(var(--board-width)/2)] xl:h-[calc(var(--board-width)*0.8)]'>
               {/* <svg viewBox={`0 0 5 8`} width={WIDTH * 0.5} height={WIDTH * 0.8} */}
               <svg viewBox={`0 0 5 8`} className='bg-[#FFFF0010] backdrop-blur-md rounded-lg shadow[0_-5px_-5px_10px_#d5cc39] neumorphism-right'>
                  {freezed
                     ? prevState.map((nextPiece, j) =>
                        <motion.g key={j} animate={{ y: -2.5 }} transition={{ ease: "backOut" }}>
                           {j <= 3 && posPiecesMap[nextPiece][0].map(([x, y], i) =>
                              <Block key={i} {...getPiecePanelPos(nextPiece, x, y + 0.5 + 2.5 * j)} piece={nextPiece} />)}
                        </motion.g>)
                     : clonedPieces.map((nextPiece, j) =>
                        j < VISIBLE_PIECES_AMT && posPiecesMap[nextPiece][0].map(([x, y], i) =>
                           <Block key={i} {...getPiecePanelPos(nextPiece, x, y + 0.5 + 2.5 * j)} piece={nextPiece} />
                        ))}
               </svg>
            </div>
         </div>

         <div className='w-full flex justify-end'>
            {<button
               onClick={handlePauseBtnClick}
               onKeyDown={handleKeyDown}
               className='flex justify-center px-4 py-3 xl:px-8 xl:py-7
               bg-[#581c87B0] hover:bg-[#1f2937D0] font-bold 
               border border-gray-400 rounded-lg shadow transition ease-in'>
               <PauseSymbol />
            </button>}
         </div>

         {/* modal */}
         <div>
            <PausedModal
               onNewGame={onNewGame}
               onResume={onResume}
               modalRef={pasedModalRef} />
         </div>
      </aside>
   );
};