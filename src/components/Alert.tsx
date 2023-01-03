import { type FC, useEffect, useRef, useState } from 'react';
import { state as landedState } from '../models/landed';
import { state as statsState } from '../models/stats'
import { subscribeKey } from 'valtio/utils';
import { motion } from 'framer-motion';
import { clearMap } from '../constants';


export const Alert: FC = () => {

   const [key, setKey] = useState(0);
   const clearedRows = useRef(0);
   const consecutiveDrops = statsState.consecutiveDrops - 1;

   useEffect(() => {
      const unsubscribe = subscribeKey(landedState, 'pieceLanded', ({ description: strClearedRows }) => {
         if (strClearedRows) {
            clearedRows.current = +strClearedRows;
            setKey(k => k + 1);
         }
      });
      return () => { unsubscribe() };

   }, []);

   return (
      <>
         {key > 0 && <motion.div key={key} initial="hidden" animate="visible" variants={variants} transition={{ duration: 3 }}
            className='text-center text-lg font-semibold font-sans text-fuchsia-900 opacity-70 space-y-2 uppercase'>
            <motion.p variants={variantsItem} transition={transition}>
               {clearMap[clearedRows.current] ?? ''}
            </motion.p>
            <motion.p className='text-xl' variants={variantsItem} transition={transition}>
               {consecutiveDrops > 0 && `COMBO ${consecutiveDrops > 1 ? consecutiveDrops : ''}`}
            </motion.p>
         </motion.div>}
      </>
   );
};

//Animation effects
const variants = {
   hidden: {},
   visible: {
      transition: {
         staggerChildren: 0.3,
      },
   }
};

const variantsItem = {
   hidden: {
      y: 0,
      scale: 1,
      opacity: 0.1,
   },
   visible: {
      y: [0, -70, -70],
      scale: [1, 1.5, 1.5],
      opacity: [0.1, 1, 0],
   }
};

const transition = {
   duration: 3,
   ease: "backOut",
   times: [0, 0.9, 1],
};