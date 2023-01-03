import { proxy } from 'valtio';
import { HIDDEN_ROWS, COLS_AMT, MAX_ROWS, posPiecesMap } from '../constants';
import { type Piece } from '../types';
import { resetState } from '../utils';
import { tryMoveDown } from './helper';


type State = {
   landedRows: (Piece | undefined)[][]
   //events
   pieceLanded: Symbol
   landedOnInvisibleRow: Symbol
}

const initState: State = {
   landedRows: Array(MAX_ROWS + HIDDEN_ROWS - 1).fill(null).map(_ => Array(COLS_AMT).fill(undefined)),
   pieceLanded: Symbol(),
   landedOnInvisibleRow: Symbol(),
};

export const state = proxy(initState);

export function handleTickCur(onDownMove: () => void) {
   return (col: number, row: number, piece: Piece, frame: number, isSideMovOrSpin: boolean) => {

      const piecePoints = posPiecesMap[piece][frame];
      tryMoveDown(col, row, piecePoints, state.landedRows)
         .map(onDownMove)
         //cannot move
         .orDefaultLazy(() => {

            //move while about to land, go to next tick
            if (isSideMovOrSpin) {
               return;
            }

            //game over
            if (row <= HIDDEN_ROWS) {
               console.log('game over');
               state.landedOnInvisibleRow = Symbol('true');
            }

            //land
            piecePoints.forEach(([x, y]) => state.landedRows[row + y][col + x] = piece);

            //check for dropped rows
            let droppedRows = 0;
            const newArr = state.landedRows.filter(cols => {
               const dropped = cols.every(taken => taken);
               if (dropped) droppedRows++;
               return !dropped;
            });

            Array(droppedRows).fill(null).forEach(() =>
               newArr.unshift(Array(COLS_AMT).fill(undefined)));

            state.landedRows = newArr;

            //fire landed event
            state.pieceLanded = Symbol(droppedRows);

         });
   }
}

export function reset() {
   resetState(state, initState);
}
