from flask import Flask, render_template
from flask.json import jsonify
app = Flask(__name__)

logs = [
    {
        'name': 'Frithjof Nerdrum',
        'image': '/static/bear.jpg'
    }, {
        'name': 'Idir Berg Ould-Saada',
        'image': '/static/cat.png'
    }, {
        'name': 'Kong Harald',
        'image': '/static/dog.jpeg'
    }, {
        'name': 'Dronning Sonja',
        'image': '/static/ducks.jpg'
    }
]

@app.route('/')
def hello():
    return render_template('index.html')

@app.route('/entries')
def hello_rest():
    return jsonify(logs)

if __name__ == '__main__':
    app.run()