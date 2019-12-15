import json
import os
def Model():
    filename = os.path.join('static/tictactoe1000.json')
    model = {}

    with open(filename) as file:
        data = json.load(file)
        d =  [x['chromosome'] for x in data['879']]
        print(d)

Model()
