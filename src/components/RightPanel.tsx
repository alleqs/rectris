import { KeyboardEvent, useEffect, useRef, useState, type FC } from 'react';
import { useSnapshot } from 'valtio';
import { posPiecesMap, VISIBLE_PIECES_AMT, WIDTH } from '../constants';
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
      <aside className='flex flex-col select-none '>
         <div className='flex-1 space-y-3'>
            <h2 className="text-3xl text-center text-gray-500 font-retroGame">Next</h2>
            <svg viewBox={`0 0 5 8`} width={WIDTH * 0.5} height={WIDTH * 0.8}
               // className='bg-[#FFFF0010] backdrop-blur-md border-solid border-2 border-[#703ACF] rounded-lg'>
               className='bg-[#FFFF0010] backdrop-blur-md rounded-lg shadow[0_-5px_-5px_10px_#d5cc39] neumorphism-right'>
               {/* -5px -5px 10px #d5cc39, 5px 5px 10px #ffff4f */}
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

         <div className='w-full text-end'>
            {<button
               onClick={handlePauseBtnClick}
               onKeyDown={handleKeyDown}
               className='bg-[#581c87B0] hover:bg-[#1f2937D0] font-bold py-7 px-8 border
                border-gray-400 rounded-lg shadow transition ease-in'>
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