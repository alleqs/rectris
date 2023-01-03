import { proxy } from 'valtio';
import { subscribeKey, derive } from 'valtio/utils'
import { HIDDEN_ROWS, COLS_AMT, posPiecesMap, PIECE_TYPES_AMT, MAX_ROWS, FRAMES_AMT } from '../constants';
import { KeyStroke, Piece, pieces } from '../types';
import { resetState, shuffle } from '../utils';
import { state as landedStore } from './landed';
import { tryMoveDown } from './helper';


type State = {
   currPiece: Piece
   nextPieces: Piece[]
   heldPiece: Piece | undefined
   candHold: boolean
   frame: number
   col: number
   row: number
   isSideMovOrSpin: boolean
   //events
   downMovByUser: Symbol
}


function getInitState(): State {

   const [currPiece, ...nextPieces] = [...getShufflePieces(), ...getShufflePieces()];

   return {
      currPiece,
      ...getStartPos(),
      nextPieces,
      heldPiece: undefined,
      candHold: true,
      isSideMovOrSpin: false,
      downMovByUser: Symbol(),
   }
}

export const state = proxy(getInitState());

export const derived = derive({
   projectedRow: get => {
      const { currPiece, frame, row, col } = get(state)
      const piecePoints = posPiecesMap[currPiece][frame];
      let i = row + 1;
      for (; i <= MAX_ROWS; i++) {
         if (piecePoints.some(([x, y]) => i + y > MAX_ROWS || landedStore.landedRows[i + y][col + x])) {
            break;
         }
      }
      return i - 1;
   }
});

subscribeKey(landedStore, 'pieceLanded', _ =>
   spawn()
);


export function handleKeyPressed(key: KeyStroke) {

   const { col, row, frame, currPiece } = state;
   const { landedRows } = landedStore;
   const piecePoints = posPiecesMap[currPiece][frame];

   switch (key) {
      case 'Right': {

         const forbiddenMov = piecePoints.some(([x, y]) =>
            col + x + 2 > COLS_AMT || landedRows[row + y][col + x + 1]);

         if (!forbiddenMov) {
            state.col = col + 1;
         }
         state.isSideMovOrSpin = true;
         break;
      }
      case 'Left': {

         const forbiddenMov = piecePoints.some(([x, y]) =>
            col + x - 1 < 0 || landedRows[row + y][col + x - 1]);

         if (!forbiddenMov) {
            state.col = col - 1;
         }
         state.isSideMovOrSpin = true;
         break;
      }

      case 'Down':

         tryMoveDown(col, row, piecePoints, landedRows).map(newRow => {
            state.row = newRow;
            // fire event
            state.downMovByUser = Symbol(1);
         });

         break;

      case 'SpinRight':
      case 'SpinLeft':
         if (currPiece !== 'O') {
            const nextFrame = key === 'SpinLeft' ? (frame - 1 + FRAMES_AMT) % FRAMES_AMT : (frame + 1) % FRAMES_AMT;
            const piecePoints = posPiecesMap[currPiece][nextFrame];
            const pointTaken = piecePoints.some(([x, y]) => landedRows[row + y][col + x] || col + x < 0 || col + x > COLS_AMT - 1 || row + y > MAX_ROWS);
            if (!pointTaken) {
               state.frame = nextFrame;
            }
            state.isSideMovOrSpin = true;
         }
         break;

      case 'HardDrop':
         // const projectedRow = getProjectedRow(col, row, currPiece, frame, landedRows);
         const rowsToMove = derived.projectedRow - row;
         state.row = derived.projectedRow;
         //fire event
         state.downMovByUser = Symbol(rowsToMove);

         break;

      case 'Hold':
         if (state.candHold) {
            if (state.heldPiece) {
               [state.heldPiece, state.currPiece] = [state.currPiece, state.heldPiece];
               const { col, row } = getStartPos();
               state.col = col;
               state.row = row;
               state.frame = 0;
               state.candHold = false;
            } else {
               state.heldPiece = state.currPiece;
               spawn(false);
            }
         }
         break;
   }
}

export function handleDownMov() {
   state.row++;
}

export function handleEndTick() {
   state.isSideMovOrSpin = false;
}

export function reset() {
   resetState(state, getInitState());
}

function spawn(candHold = true) {
   state.currPiece = state.nextPieces[0];
   state.nextPieces.shift();
   state.candHold = candHold;
   const { col, row } = getStartPos();
   state.col = col;
   state.row = row;
   state.frame = 0;

   if (state.nextPieces.length <= PIECE_TYPES_AMT) {
      state.nextPieces.push(...getShufflePieces());
   }
}

//helper
function getShufflePieces() {
   return shuffle([...pieces]);
}

function getStartPos() {
   return {
      col: Math.trunc(COLS_AMT / 2) - 1,
      row: HIDDEN_ROWS - 1,
      frame: 0,
   };
}
