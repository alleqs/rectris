import { type FC, useEffect, useRef, memo } from 'react';
import { useSnapshot } from 'valtio'
import { state as pieceState, derived as derivedPieceState } from '../models/piece';
import { state as landedState } from '../models/landed';
import { KeyStroke, Piece } from '../types';
import {
   GRID_COLOR, HIDDEN_ROWS, COLS_AMT, ROWS_AMT, posPiecesMap,
   fillColorMap, darkColorMap
} from '../constants';
import { Block } from './Block';
import { handleKeyDown, handleKeyUp, onBlur } from './helper';

type Props = {
   onKeyPress: (key: KeyStroke) => void
   fastKeys: readonly string[]
}

export const GameBoard: FC<Props> = ({ onKeyPress, fastKeys }) => {

   const { currPiece, frame, col, row } = useSnapshot(pieceState);
   const { landedRows } = useSnapshot(landedState);
   const { projectedRow } = useSnapshot(derivedPieceState);
   const timerMap = useRef<Record<string, number | undefined>>({});
   const repMap = useRef<Record<string, number | undefined>>({});

   useEffect(() => {

      fastKeys.forEach(key => {
         repMap.current[key] = undefined;
         timerMap.current[key] = undefined;
      });

      const handleKeyDownPart = handleKeyDown(onKeyPress, timerMap.current, repMap.current);
      const handleKeyUpPart = handleKeyUp(fastKeys, timerMap.current, repMap.current);
      const onBlurPart = onBlur(timerMap.current, repMap.current);

      window.addEventListener("keydown", handleKeyDownPart);
      window.addEventListener("keyup", handleKeyUpPart);
      window.addEventListener("blur", onBlurPart);

      return () => {
         window.removeEventListener("keydown", handleKeyDownPart);
         window.removeEventListener("keyup", handleKeyUpPart);
         window.removeEventListener("blur", onBlurPart);
      };
   }, []);

   return (
      <section className='
      w-[calc(var(--hd-board-width)+2*var(--x-board-margin))]
      h-[calc(var(--hd-board-height)+2*var(--y-board-margin))]
      xl:w-[calc(var(--wx-board-width)+2*var(--x-board-margin))] 
      xl:h-[calc(var(--wx-board-height)+2*var(--y-board-margin)] 
      2xl:w-[calc(var(--board-width)+2*var(--x-board-margin))] 
      2xl:h-[calc(var(--board-height)+2*var(--y-board-margin)] 
      mx-6'>
         {/* <section className='w-[272px] h-[600px] xl:w-[432px] xl:h-[920px] extra mx-6'> */}
         {/* <section style={{ width: width + 2 * 16, height: height + 2 * 60 }} className='extra mx-6'> */}
         <div className='smartphone'>
            <svg viewBox={`0 0 ${COLS_AMT} ${ROWS_AMT}`}
               className='bg-[#FFF593]'>
               <Defs />
               {/* piece */}
               {posPiecesMap[currPiece][frame].map(([x, y], i) =>
                  <Block key={i} x={col + x} y={row + y - HIDDEN_ROWS} piece={currPiece} />)}
               {/* projection */}
               {posPiecesMap[currPiece][frame].map(([x, y], i) =>
                  <Block key={i} x={col + x} y={projectedRow - HIDDEN_ROWS + y} piece={currPiece} opacity={0.25} />)}
               {landedRows.map((cols, rowIndex) => cols.map((piece, col) =>
                  piece && <Block key={col * COLS_AMT + rowIndex} x={col} y={rowIndex - HIDDEN_ROWS} piece={piece} />))}
            </svg>
         </div>
      </section>
   );
};

const Defs: FC = memo(() =>
   <>
      <defs>
         {Object.entries(fillColorMap).map(([piece, color], i) => {
            return (
               <linearGradient key={i} id={piece} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: color }} />
                  <stop offset="50%" style={{ stopColor: color }} />
                  <stop offset="50%" style={{ stopColor: darkColorMap[piece as Piece] }} />
                  <stop offset="100%" style={{ stopColor: darkColorMap[piece as Piece] }} />
               </linearGradient>)
         })}
      </defs>
      {/* grids */}
      {Array(ROWS_AMT).fill(null).map((_, i) => <line key={i} x1={0} y1={i + 1} x2={COLS_AMT} y2={i + 1} stroke={GRID_COLOR} strokeWidth={0.02} />)}
      {Array(COLS_AMT - 1).fill(null).map((_, i) => <line key={i} x1={i + 1} y1={0} x2={i + 1} y2={ROWS_AMT} stroke={GRID_COLOR} strokeWidth={0.02} />)}
   </>
);


