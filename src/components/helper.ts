import { DALAY_KEYBOARD, keyMap, REP_INTERVAL } from "../constants";
import type { KeyStroke, Piece } from "../types"


export function handleKeyDown(onKeyPress: (key: KeyStroke) => void, timerMap: Record<string, number | undefined>, repMap: Record<string, number | undefined>) {
   return (e: KeyboardEvent) => {
      if (!e.repeat) {
         const { key } = e;
         if (key in keyMap) {
            onKeyPress(keyMap[key]);
            if (key in repMap && !repMap[key]) {
               repMap[key] = window.setTimeout(() => {
                  onKeyPress(keyMap[key]);
                  if (key in timerMap && !timerMap[key]) {
                     timerMap[key] = window.setInterval(() => { onKeyPress(keyMap[key]) }, REP_INTERVAL);
                  }
               }, DALAY_KEYBOARD);
            }
         }
      }
   }
}

export function handleKeyUp(fastKeys: readonly string[], timerMap: Record<string, number | undefined>, repMap: Record<string, number | undefined>) {
   return ({ key }: KeyboardEvent) => {
      if (fastKeys.some(k => k === key)) {
         clearTimeout(repMap[key]);
         clearInterval(timerMap[key]);
         repMap[key] = undefined;
         timerMap[key] = undefined;
      }
   }
}

export function onBlur(timerMap: Record<string, number | undefined>, repMap: Record<string, number | undefined>) {
   return () => {
      Object.entries(timerMap).forEach(([key, val]) => {
         clearInterval(val);
         timerMap[key] = undefined;
         clearTimeout(repMap[key]);
         repMap[key] = undefined;
      });
   }
}


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
