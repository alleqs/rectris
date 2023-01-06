import React, { useState, type FC } from 'react';
import { useSnapshot } from 'valtio';
import { state as stats } from '../../models/stats';

type Props = {
   onNewHiScore: (name: string) => void
   modalRef: React.RefObject<HTMLDialogElement>
}

export const NewHiScoreModal: FC<Props> = ({ modalRef, onNewHiScore }) => {

   const { score } = useSnapshot(stats);
   const [name, setName] = useState('');


   function handleClick() {
      onNewHiScore(name.trim());
      modalRef.current?.close();
   }

   function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      setName(e.currentTarget.value.slice(0, 10));
   }

   return (
      <dialog
         ref={modalRef}
         className='my-28 xl:my-auto select-none text-center w-96 py-10 rounded-lg shadow-2xl
          bg-[#703ACFA0] backdrop-brightness-75
         font-mono'>
         <div className='space-y-6 px-10 '>
            <div className='space-y-4'>
               <div className='space-y-2 text-3xl text-white'>
                  <p className='text-gray-300'>New High Score!</p>
                  <p>🎉</p>
                  <p className=' tracking-wider '>{score.toLocaleString()}</p>
               </div>
               <p className='text-2xl text-gray-300'>Enter your initials:</p>
            </div>
            <div className='inline-block text-2xl font-bold'>
               <input onChange={handleChange} size={1} value={name} spellCheck={false}
                  className="text-center text-base font-retroGame shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline uppercase" />
               <div className='invisible h-0'>{''.padStart(16, '*')}</div>
            </div>

            <button onClick={handleClick} className="bg-rose-600 hover:bg-rose-800 py-3 w-full 
            rounded-md text-xl text-white font-bold">
               OK
            </button>
         </div>

      </dialog>
   );
};