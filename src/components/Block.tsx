import React, { type FC } from 'react';
import { darkColorMap } from '../constants';
import { Piece } from '../types';


type Props = { x: number, y: number, piece: Piece } & Record<string, any>

export const Block: FC<Props> = ({ x, y, piece, ...others }) => {
   return <rect x={x + 0.035} y={y + 0.035} {...getPieceAttrs(piece)} {...others} />
}

export function getPieceAttrs(piece: Piece) {
   return { width: 0.93, height: 0.93, rx: 0.1, strokeWidth: 0.03, stroke: darkColorMap[piece], fill: `url(#${piece})` };
}