import React, { type FC } from 'react';
import { brushBtnColorMap } from '../../constants';
import { BrushStroke } from '../Icons';

type Props = {
   modalRef: React.RefObject<HTMLDialogElement>
   onClose: () => void
}

// border radius tested using https://9elements.github.io/fancy-border-radius
const borderRadius = { borderRadius: '27% 73% 25% 75% / 72% 26% 74% 28% ' };
//⭠ ⭢ ⭡ ⭣
export const HelpModal: FC<Props> = ({ onClose, modalRef }) => {
   return (
      <dialog
         ref={modalRef}
         style={borderRadius}
         className='font-mono select-none text-center w-[28rem] h-[40rem]
          pt-16 shadow-2xl bg-[#703ACFA0] backdrop-brightness-75 overflow-hidden'>

         <div className='px-10 '>
            <p className='text-3xl text-white font-semibold uppercase'>Help</p>

            <table className="min-w-full">
               <tbody>
                  <tr className="border-b">
                     <td className="px-6 py-4 whitespace-nowrap text-xl font-medium text-gray-100">⭠</td>
                     <td className="text-lg text-gray-100 font-light px-6 py-4 whitespace-nowrap">
                        Move left
                     </td>
                  </tr>
                  <tr className="border-b">
                     <td className="px-6 py-4 whitespace-nowrap text-xl font-medium text-gray-100"> ⭢ </td>
                     <td className="text-lg text-gray-100 font-light px-6 py-4 whitespace-nowrap">
                        Move right
                     </td>
                  </tr>
                  <tr className="border-b">
                     <td className="px-6 py-4 whitespace-nowrap text-xl font-medium text-gray-100"> ⭡ </td>
                     <td className="text-lg text-gray-100 font-light px-6 py-4 whitespace-nowrap">
                        Rotate right
                     </td>
                  </tr>
                  <tr className="border-b">
                     <td className="px-6 py-4 whitespace-nowrap text-xl font-medium text-gray-100"> Z </td>
                     <td className="text-lg text-gray-100 font-light px-6 py-4 whitespace-nowrap">
                        Rotate left
                     </td>
                  </tr>
                  <tr className="border-b">
                     <td className="px-6 py-4 whitespace-nowrap text-xl font-medium text-gray-100"> ⭣ </td>
                     <td className="text-lg text-gray-100 font-light px-6 py-4 whitespace-nowrap">
                        Soft drop
                     </td>
                  </tr>
                  <tr className="border-b">
                     <td className="px-6 py-4 whitespace-nowrap text-xl font-semibold text-gray-100">
                        ⎵
                     </td>
                     <td className="text-lg text-gray-100 font-light px-6 py-4 whitespace-nowrap">
                        Hard drop
                     </td>
                  </tr>
               </tbody>
            </table>

            <button onClick={onClose} style={brushBtnColorMap} className="pt-10 w-full rounded-md relative">
               <BrushStroke height={60} />
               <span className='absolute top-14 left-40 text-2xl text-gray-200 font-semibold
                uppercase pointer-events-none'>Ok</span>
            </button>
         </div>
      </dialog>
   );
};