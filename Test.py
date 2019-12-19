from TictactoePlayer import TictactoePlayer
from Board import Board

b = Board()

#b.checkWinner()



#b.current_state[0] = 1




t = TictactoePlayer(b)

print(t.min())


turn = 'X'
for move in range(9):
    print('move: {}'.format(move))
    if turn == 'X':
        m, index = t.max()
        turn ='O'
        v = 1
    else:
        m,index = t.min()
        turn = 'X'
        v = -1

    b.current_state[index] = v
    print(b.current_state)
