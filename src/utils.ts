import cloneDeep from 'lodash/cloneDeep';

export function ticker(onTick: () => void, getWaitTime: () => number) {

   function timeout() {

      setTimeout(() => {
         onTick();
         timeout();
      }, getWaitTime());
   }

   timeout();
}

export function resetState<T extends object>(state: T, initState: T) {
   Object.entries(cloneDeep(initState)).forEach(([key, value]) => {
      state[key as keyof T] = value;
   });
}

//from SO
export function shuffle<T>(array: T[]) {

   let currentIndex = array.length, randomIndex;

   while (currentIndex != 0) {

      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
         array[randomIndex], array[currentIndex]];
   }

   return array;
}


export function sleep(ms: number) {
   return new Promise(r => setTimeout(r, ms));
}


