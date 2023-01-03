import React, { type FC } from 'react';
import '../sass/main.scss';

type Props = {}

export const Smoke: FC<Props> = ({ }) => {

   return (
      <>
         <svg version='1.1' xmlns='http://www.w3.org/2000/svg'>
            <filter id='blur'>
               <feGaussianBlur stdDeviation={10}></feGaussianBlur>
            </filter>
         </svg>
         {Array(2).fill(null).map((_, j) =>
            <div key={j} className={`h-${j + 1}`}>
               {Array(60).fill(null).map((_, i) =>
                  <div key={i} className={`c-${j + 1}`} />)}
            </div>
         )}
      </>
   );
};