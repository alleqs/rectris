import { KeyStroke, Piece, pieces } from "./types";

//BOARD
export const COLS_AMT = 10;
export const ROWS_AMT = 20;
export const MAX_ROWS = 22;
export const HIDDEN_ROWS = 3;
//DIMENSIONS
export const HD_WIDTH = 240;
export const HD_HEIGHT = HD_WIDTH * ROWS_AMT / COLS_AMT;
export const WX_WIDTH = 320;
export const WX_HEIGHT = WX_WIDTH * ROWS_AMT / COLS_AMT;
export const WIDTH = 400;
export const HEIGHT = WIDTH * ROWS_AMT / COLS_AMT;
export const boardDimensionsMap = {
   '--hd-board-width': `${HD_WIDTH}px`,
   '--hd-board-height': `${HD_HEIGHT}px`,
   '--wx-board-width': `${WX_WIDTH}px`,
   '--wx-board-height': `${WX_HEIGHT}px`,
   '--board-width': `${WIDTH}px`,
   '--board-height': `${HEIGHT}px`,
   '--x-board-margin': '16px',
   '--y-board-margin': '60px',
};
//PIECES
export const FRAMES_AMT = 4;
export const VISIBLE_PIECES_AMT = 3;
export const PIECE_TYPES_AMT = pieces.length;
//KEYBOARD
export const REP_INTERVAL = 40;
export const DALAY_KEYBOARD = 140;
//GAME
export const INIT_TICK_INTERVAL = 500;
export const LINES_TO_INC_LEVEL = 10;

export const SHAKE_ANIM_DURATION = 1000;

// From https://similarpng.com/colorful-3d-cubes-flow-png/#getdownload
// As the site says: "Personal use only"
export const BG_IMAGE = "url('./cubes.png')";

//COLORS
export const GRID_COLOR = '#7743CE20';
export const fillColorMap: Record<Piece, string> = {
   I: 'cyan',
   J: '#79A9F5',
   L: '#E73BA5',
   S: 'springgreen',
   T: 'darkorchid',
   Z: '#B1B1B1',
   O: '#333A44',
};

export const darkColorMap: Record<Piece, string> = {
   I: 'hsl(180, 100%, 40%)',
   J: '#4B7BF5',
   L: '#A91D92',
   S: 'hsl(149.9, 100%, 40%)',
   T: 'hsl(280.1, 60.6%, 39.8%)',
   Z: '#747474',
   O: '#050833',
};

export const brushBtnColorMap: Record<string, string> = {
   '--btn-color': '#e11d48',
   '--btn-hover-color': '#9f1239',
}

//MISCELLANEOUS
export const posPiecesMap: Record<Piece, Record<number, [number, number][]>> = {
   J: {
      0: [[-1, -1], [-1, 0], [0, 0], [1, 0]],
      1: [[1, -1], [0, -1], [0, 0], [0, 1]],
      2: [[1, 1], [0, 0], [1, 0], [-1, 0]],
      3: [[-1, 1], [0, 1], [0, 0], [0, -1]],
   },
   L: {
      0: [[-1, 0], [0, 0], [1, 0], [1, -1]],
      1: [[0, -1], [0, 0], [0, 1], [1, 1]],
      2: [[-1, 1], [-1, 0], [0, 0], [1, 0]],
      3: [[-1, -1], [0, -1], [0, 0], [0, 1]],
   },
   S: {
      0: [[-1, 0], [0, 0], [0, -1], [1, -1]],
      1: [[0, -1], [0, 0], [1, 0], [1, 1]],
      2: [[-1, 1], [0, 1], [0, 0], [1, 0]],
      3: [[-1, -1], [-1, 0], [0, 0], [0, 1]],
   },
   Z: {
      0: [[-1, -1], [0, -1], [0, 0], [1, 0]],
      1: [[1, -1], [1, 0], [0, 0], [0, 1]],
      2: [[-1, 0], [0, 0], [0, 1], [1, 1]],
      3: [[0, -1], [0, 0], [-1, 0], [-1, 1]],
   },
   T: {
      0: [[-1, 0], [0, 0], [1, 0], [0, -1]],
      1: [[0, -1], [0, 0], [0, 1], [1, 0]],
      2: [[-1, 0], [0, 0], [1, 0], [0, 1]],
      3: [[0, -1], [0, 0], [0, 1], [-1, 0]],
   },
   I: {
      0: [[-1, 0], [0, 0], [1, 0], [2, 0]],
      1: [[1, -1], [1, 0], [1, 1], [1, 2]],
      2: [[-1, 1], [0, 1], [1, 1], [2, 1]],
      3: [[0, -1], [0, 0], [0, 1], [0, 2]],
   },
   O: { 0: [[0, -1], [0, 0], [1, -1], [1, 0]] },
};

export const scoreMap: Record<number, number> = {
   1: 100,
   2: 300,
   3: 500,
   4: 800
};

export const keyMap: Record<string, KeyStroke> = {
   ArrowUp: "SpinRight",
   z: "SpinLeft",
   Z: "SpinLeft",
   ArrowLeft: "Left",
   ArrowRight: "Right",
   ArrowDown: "Down",
   ' ': "HardDrop",
   c: "Hold",
   C: "Hold"
}

export const FAST_KEYS = ['ArrowLeft', 'ArrowRight', 'ArrowDown'] as const;

export const clearMap: Record<number, string> = {
   1: 'single',
   2: 'double',
   3: 'triple',
   4: 'tetris'
}

export const initRanking: [string, number][] = [['PAUL', 20_000], ['ALONZO', 10_000], ['WANG', 5000], ['AHMED', 1000], ['ZÉ', 100]];
