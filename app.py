from flask import Flask, render_template
import os
import json
app = Flask(__name__)


@app.route('/')
def Index():
    return render_template('index.html')



@app.route('/model')
def Model():
    model = {}
    filename = os.path.join(app.static_folder,'tictactoe1000.json')
    with open(filename) as file:
        data = json.load(file)

        chromosomes = [c['chromosome'] for c in data['879']]

        model['data'] = chromosomes
    return model
