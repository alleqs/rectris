import React, { type FC } from 'react';
import { state as stats } from '../../models/stats';
import { useSnapshot } from 'valtio';

type Props = {
   modalRef: React.RefObject<HTMLDialogElement>
   onStart: () => void
   onRankingReset: () => void
}


export const GameOverModal: FC<Props> = ({ onStart, modalRef, onRankingReset }) => {

   const { rank } = useSnapshot(stats);

   function handleStart() {
      onStart();
      modalRef.current?.close();
   }

   return (
      <dialog
         ref={modalRef}
         className='my-28 xl:my-44 2xl:my-auto select-none uppercase font-mono text-center 
         w-96 py-10 rounded-lg shadow-2xl bg-[#703ACFA0] backdrop-brightness-75 '>

         <div className='space-y-10 '>
            <p className='text-3xl text-white font-semibold '>Game Over</p>

            <div className='px-10 text-lg text-white'>
               {rank.map(([name, score], i) =>
                  <pre key={i} className='font-["Courier_New"] odd:bg-[#00000020]'>{formatRow(name, score)}</pre>)}
            </div>

            <div className='flex'>
               <button onClick={onRankingReset} className=" py-2 w-full hover:scale-110
               rounded-md transition flex justify-center items-center space-x-3">
                  <span className='text-xl text-white font-semibold'>Reset Scores</span>
               </button>
               <button onClick={handleStart} className="bg-rose-600 hover:bg-rose-800 py-2 w-full
               rounded-md transition flex justify-center items-center space-x-3">
                  <span className='text-xl text-white font-semibold'>New Game</span>
               </button>
            </div>

         </div>
      </dialog>
   );
};

function formatRow(name: string, score: number) {
   return name + score.toLocaleString().padStart(22).substring(name.length);
}
