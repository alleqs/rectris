import React, { type FC } from 'react';
import { brushBtnColorMap } from '../../constants';
import { BrushStroke } from '../Icons';

type Props = {
   onResume: () => void
   onNewGame: () => void
   modalRef: React.RefObject<HTMLDialogElement>
}


export const PausedModal: FC<Props> = ({ onNewGame, onResume, modalRef }) => {

   function handleNewGame() {
      onNewGame();
      modalRef.current?.close();
   }

   function handleResume() {
      onResume();
      modalRef.current?.close();
   }


   return (
      <dialog
         ref={modalRef}
         onClose={onResume}
         className='my-48 xl:my-72 2xl:my-auto select-none text-center w-96 py-10 rounded-md 
         shadow-lg bg-[#703ACFA0] backdrop-brightness-75'>

         <div className='space-y-10 font-mono'>

            <p className='text-3xl text-gray-200 font-semibold'>Paused</p>

            <div className='flex'>

               <button onClick={handleNewGame} className="text-2xl text-gray-200 hover:scale-110 w-full rounded-md transition ease-in">
                  ↻ New game
               </button>
               <button onClick={handleResume} style={brushBtnColorMap} className="w-full rounded-md relative">
                  <BrushStroke height={44} />
                  <span className='absolute top-2 right-7 text-2xl text-gray-200 font-semibold pointer-events-none'>▶ Resume</span>
               </button>
            </div>
         </div>
      </dialog>
   );
};




