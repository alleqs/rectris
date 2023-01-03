import { ROWS_AMT } from '../constants';
import { Piece } from '../types';
import { type Maybe, Nothing, Just } from 'purify-ts';


export function tryMoveDown(col: number, row: number, piecePoints: [number, number][], landedRows: (Piece | undefined)[][]): Maybe<number> {

   const forbiddenMov = piecePoints.some(([x, y]) =>
      row + y - 1 > ROWS_AMT || landedRows[row + y + 1][col + x]);

   return forbiddenMov
      ? Nothing
      : Just(row + 1);
}