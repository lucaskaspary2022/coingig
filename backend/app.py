from backend.ai import classify
from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route('/get_eval', methods=['POST'])
def get_evals():
    data = request.get_json()
    if ('conditions' and 'url' in data) and (isinstance(data['conditions'], list) and isinstance(data['url'], str)):
        url = data['url']
        conditions = data['conditions']

        evals = classify(url, data)
        return jsonify({'result': evals}), 200
    else:
        return jsonify({'error': 'Invalid input'}), 400

if __name__ == '__main__':
    app.run(debug=True)