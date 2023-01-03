import { proxy } from 'valtio';
import { subscribeKey, derive, devtools } from 'valtio/utils';
import { state as landedState } from './landed'
import { state as pieceState } from './piece';
import { initRanking, LINES_TO_INC_LEVEL, scoreMap } from "../constants";
import { resetState } from '../utils';

type DeriGet = (obj: State) => State

type State = {
   lines: number
   score: number
   rank: [string, number][]
   consecutiveDrops: number
   _pos: number
   //event
   newHiScore: Symbol
}

const FAKE_POS = -1;
const KEY = 'rank';

const initState: State = {
   lines: 0,
   score: 0,
   rank: retrieveInitRank(),
   consecutiveDrops: 0,
   _pos: FAKE_POS,
   newHiScore: Symbol()
};

export const state = proxy(initState);

devtools(state, { name: 'stats', enabled: true });

export const derived = derive({
   get level() { return (get: DeriGet) => 1 + Math.trunc(get(state).lines / LINES_TO_INC_LEVEL) },
   get combo() { return (get: DeriGet) => state.consecutiveDrops * 50 * this.level(get) }
});

console.log('landedOnInvisibleRow')
subscribeKey(landedState, 'landedOnInvisibleRow', ({ description: endOfGame }) => {
   if (endOfGame) {
      for (let i = state.rank.length - 1; i >= 0; i--) {
         if (state.score > state.rank[i][1]) {
            state._pos = i;
            continue;
         }
         break;
      }
      if (state._pos !== FAKE_POS) {
         state.rank.splice(state._pos, 0, ['', state.score]);
         state.rank.pop();
      }
      console.log('state._pos', state._pos)
      state.newHiScore = Symbol(state._pos !== FAKE_POS ? 'true' : 'false');
   }
});


export function handleNewHiScore(name: string) {
   state.rank[state._pos!][0] = name;
   state.newHiScore = Symbol('false');
   localStorage.setItem(KEY, JSON.stringify(state.rank));
}


subscribeKey(landedState, 'pieceLanded', ({ description: strDroppedRows }) => {
   if (strDroppedRows) {
      const droppedRows = +strDroppedRows;
      // console.log('droppedRows', droppedRows)
      if (droppedRows === 0) {
         state.consecutiveDrops = 0;
      }
      else {
         state.lines += droppedRows;
         // const combo = state.consecutiveDrops * 50 * derived.level;
         state.consecutiveDrops++;
         console.log('combo', derived.combo);
         state.score = state.score + scoreMap[droppedRows] * derived.level + derived.combo;
      }
   }

});

subscribeKey(pieceState, 'downMovByUser', ({ description: downMovByUser }) => {
   if (downMovByUser) {
      const factor = +downMovByUser > 1 ? 2 : 1;
      state.score += factor * +downMovByUser;
   }
});

export function reset() {
   resetState(state, { ...initState, rank: state.rank });
}

export function resetRanking() {
   state.rank = initRanking;
   localStorage.setItem(KEY, JSON.stringify(initRanking));
}

function retrieveInitRank(): [string, number][] {
   const json = localStorage.getItem(KEY);
   if (json) {
      return JSON.parse(json) as [string, number][];
   }
   localStorage.setItem(KEY, JSON.stringify(initRanking));
   return initRanking;
}
