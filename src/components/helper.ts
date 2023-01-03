import type { Piece } from "../types"


export function getPiecePanelPos(piece: Piece, x: number, y: number): Record<'x' | 'y', number> {
   switch (piece) {
      case 'I': return { x: x + 1.5, y: y + 0.5 }
      case 'J': return { x: x + 2, y: y + 1 }
      case 'L': return { x: x + 2, y: y + 1 }
      case 'O': return { x: x + 1.5, y: y + 1 }
      case 'S': return { x: x + 2, y: y + 1 }
      case 'T': return { x: x + 2, y: y + 1 }
      case 'Z': return { x: x + 2, y: y + 1 }
   }
}