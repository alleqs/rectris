import { type FC, useEffect, useRef, memo } from 'react';
import { useSnapshot } from 'valtio'
import { state as pieceState, derived as derivedPieceState } from '../models/piece';
import { state as landedState } from '../models/landed';
import { KeyStroke, Piece } from '../types';
import { DALAY_KEYBOARD, GRID_COLOR, HIDDEN_ROWS, keyMap, COLS_AMT, ROWS_AMT, posPiecesMap, REP_INTERVAL, fillColorMap, darkColorMap, WIDTH, HEIGHT } from '../constants';
import { Block } from './Block';

type Props = {
   onKeyPress: (key: KeyStroke) => void
   fastKeys: readonly string[]
}

export const Game: FC<Props> = ({ onKeyPress, fastKeys }) => {

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

      <svg viewBox={`0 0 ${COLS_AMT} ${ROWS_AMT}`} width={WIDTH} height={HEIGHT}
         className='bg-[#FFF593] rounded-lg'>
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
   );
};


function handleKeyDown(onKeyPress: (key: KeyStroke) => void, timerMap: Record<string, number | undefined>, repMap: Record<string, number | undefined>) {
   return (e: KeyboardEvent) => {
      if (!e.repeat) {
         const { key } = e;
         if (key in keyMap) {
            onKeyPress(keyMap[key]);
            if (key in repMap && !repMap[key]) {
               repMap[key] = setTimeout(() => {
                  onKeyPress(keyMap[key]);
                  if (key in timerMap && !timerMap[key]) {
                     timerMap[key] = setInterval(() => { onKeyPress(keyMap[key]) }, REP_INTERVAL);
                  }
               }, DALAY_KEYBOARD);
            }
         }
      }
   }
}

function handleKeyUp(fastKeys: readonly string[], timerMap: Record<string, number | undefined>, repMap: Record<string, number | undefined>) {
   return ({ key }: KeyboardEvent) => {
      if (fastKeys.some(k => k === key)) {
         clearTimeout(repMap[key]);
         clearInterval(timerMap[key]);
         repMap[key] = undefined;
         timerMap[key] = undefined;
      }
   }
}

function onBlur(timerMap: Record<string, number | undefined>, repMap: Record<string, number | undefined>) {
   return () => {
      Object.entries(timerMap).forEach(([key, val]) => {
         clearInterval(val);
         timerMap[key] = undefined;
         clearTimeout(repMap[key]);
         repMap[key] = undefined;
      });
   }
}

const Defs: FC = memo(() => {

   return (
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
});
