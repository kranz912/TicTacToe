
class TictactoePlayer(object):
    def __init__(self,board):
        self.Game = board

    def max(self):

        maxv = -2
        qi = None

        status = self.Game.checkWinner()

        if status == -3:
            return (1,0)
        elif status == 3:
            return (-1,0)
        elif status == 0:
            return (0,0)


        for index in range(len(self.Game.current_state)):

            if self.Game.current_state[index] == 0:
                self.Game.current_state[index] = -1
                (m,mi) = self.min()
                if m > maxv:
                    maxv = m
                    qi =index

                self.Game.current_state[index] =0

        return (maxv, qi)

    def min(self):

        minv = 2
        status = self.Game.checkWinner()
        qi = None

        if status == 3:
            return (1,0)
        elif status == -3:
            return (-1,0)
        elif status == 0:
            return (0,0)


        for index in range(len(self.Game.current_state)):

            if self.Game.current_state[index] == 0:
                self.Game.current_state[index] = 1
                (m,mi) = self.max()

                if m <minv:
                    minv =m
                    qi = index

                self.Game.current_state[index] = 0

            return (minv, qi)
