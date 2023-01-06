import React, { type FC } from 'react';
import reactLogo from '../../assets/rectris.svg';
import { Smoke } from '../Smoke';

type Props = {
   modalRef: React.RefObject<HTMLDialogElement>
   helpModalRef: React.RefObject<HTMLDialogElement>
   onStart: () => void
}

export const PreGame: FC<Props> = ({ onStart, modalRef: selfModalRef, helpModalRef }) => {

   function handleStart() {
      onStart();
      selfModalRef.current?.close();
   }

   function handleHelpClick() {
      selfModalRef.current?.close();
      helpModalRef.current?.showModal();
   }

   return (
      <dialog
         ref={selfModalRef}
         className='my-28 xl:my-auto select-none text-center tracking-wider bg-[#703ACFA0] 
         backdrop-brightness-75 shadow-2xl overflow-hidden rounded-md'>
         <div className='flex flex-col justify-between w-[24rem] h-[15rem] pt-12 space-y-10'>
            <div className='text-5xl logo-name'>
               <span data-text="RECTRIS">RECTRIS</span>
            </div>
            <img className='h-32 logo-icon' src={reactLogo} alt="React logo" />
            <div className='flex justify-between font-mono'>

               <button onClick={handleHelpClick} className="hover:scale-110 neonText w-full 
               py-2 flex justify-center items-baseline space-x-5 transition">
                  <span className='text-2xl'>?</span>
                  <span className='text-xl'>Help</span>
               </button>

               <button onClick={handleStart} className="hover:scale-110 neonText neonBorder py-2 
               w-full flex justify-center items-center space-x-5 transition ">
                  <span className='text-2xl'>▶</span>
                  <span className='font-semibold text-xl'>Play</span>
               </button>

            </div>
         </div>
         <Smoke />
      </dialog>
   );
};