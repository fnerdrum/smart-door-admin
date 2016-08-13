from flask import Flask, render_template, g, request
from flask.json import jsonify
import sqlite3

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


def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect('smart_door.db')
    return db


def query_db(query, args=()):
    db = get_db()
    db.row_factory = sqlite3.Row
    cur = db.execute(query, args)
    result = cur.fetchall()
    cur.close()
    return result


@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/entries')
def get_entries():
    return jsonify([{'timestamp': entry['timestamp']} for entry in query_db('select * from entries')])

@app.route('/users', methods=['GET', 'POST'])
def users():
    if request.method == 'POST':
        name = request.json['name']
        db = get_db()
        cursor = db.cursor()
        cursor.execute('insert into users values(null, ?)', (name,))
        id = cursor.lastrowid
        cursor.close()
        db.commit()
        return jsonify({'name': name, 'id' : id})
    else:
        return jsonify([{'id': user['id'], 'name': user['name']} for user in query_db('select * from users')])

if __name__ == '__main__':
    app.run()
