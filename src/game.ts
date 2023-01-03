import { ticker } from './utils';
import { subscribeKey } from 'valtio/utils';
import { derived as statsState, reset as statsReset } from './models/stats';
import { state as game, start as gameStatusStart, reset as gameStatusReset } from './models/gameStatus';
import { state as pieceState, handleDownMov, reset as pieceReset, handleEndTick } from './models/piece';
import { handleTickCur, reset as landedReset } from './models/landed';
import { INIT_TICK_INTERVAL } from './constants';


let tickInterval = INIT_TICK_INTERVAL;
const handleTick = handleTickCur(handleDownMov);

subscribeKey(statsState, 'level', level => {
   tickInterval = calcTickInterval(level);
});

export function start() {
   gameStatusStart();
   ticker(onNewTick, () => tickInterval);
}

function onNewTick() {
   if (game.status === 'Active') {
      const { col, row, currPiece, frame, isSideMovOrSpin } = pieceState;
      handleTick(col, row, currPiece, frame, isSideMovOrSpin);
      handleEndTick();
   }
}

export function handleNewGame() {
   landedReset();
   pieceReset();
   statsReset();
   gameStatusReset();
   tickInterval = INIT_TICK_INTERVAL;
}

function calcTickInterval(level: number): number {
   //[500, 50]ms
   if (level < 10) {
      return INIT_TICK_INTERVAL / 10 * (10 - level);
   }
   //[45, 5]ms
   else if (level < 20) {
      // return 50 - 5 * (level - 10);
      return INIT_TICK_INTERVAL / 100 * (10 - (level - 10));
   }
   //[5, 1]ms
   else {
      return Math.max(INIT_TICK_INTERVAL / 100 * (1 - 0.1 * (level - 20)), 1);
   }
}