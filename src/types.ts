export type KeyStroke = 'Left' | 'Right' | 'Down' | 'SpinRight' | 'SpinLeft' | 'Hold' | 'HardDrop'

export const pieces = ['L', 'J', 'S', 'Z', 'T', 'O', 'I'] as const;

export type Piece = typeof pieces[number]

export type GameStatus =
   | 'PreGame'
   | 'Active'
   | 'Paused'
   | 'NewHiScore'
   | 'Over'



