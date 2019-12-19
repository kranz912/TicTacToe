class Board(object):
    def __init__(self):
        self.current_state =[0,0,0,0,0,0,0,0,0]

        self.turn = 'X'

    def checkWinner(self):

        winning_states = [
                [0,1,2],
                [3,4,5],
                [6,7,8],
                [0,3,6],
                [1,4,7],
                [2,5,8],
                [0,4,8],
                [2,4,6]
                ]
        turn = 'X'
        winner = ''
        for states in winning_states:
            score = 0
            for nodes in states:
                score += self.current_state[nodes]
                if score == 3 or score == -3:
                    return score
        
        movesleft = len([x for x in self.current_state if x ==0])
        if movesleft == 0:
            return 0

        return None
