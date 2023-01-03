import { proxy } from 'valtio';
import { state as statsState } from './stats';
import type { GameStatus } from "../types"
import { subscribeKey } from 'valtio/utils';


type State = {
   status: GameStatus
}

const initState: State = {
   status: 'PreGame',
};

export const state = proxy(initState);

subscribeKey(statsState, 'newHiScore', ({ description: endOfGame }) => {
   if (endOfGame) {
      const isNewHiScore = endOfGame === 'true';
      state.status = isNewHiScore ? 'NewHiScore' : 'Over';
   }
});

export function start() {
   state.status = 'Active';
}

export function reset() {
   state.status = 'Active';
}

export function handlePaused() {
   state.status = 'Paused';
}

export function handleResumed() {
   state.status = 'Active';
}