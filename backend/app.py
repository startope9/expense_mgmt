from flask import Flask, request, jsonify, send_file, session
from flask_cors import CORS
import redis
from routes import expense_routes, user_routes
from flask_session import Session

app = Flask(__name__)
SECRET_KEY = 'afuibewyhfqwj9028yr378y'
app.config.from_object(__name__)

app.config['SESSION_TYPE'] = 'redis'
app.config['SESSION_PERMANENT'] = False
app.config['SESSION_USE_SIGNER'] = True
app.config['SESSION_KEY_PREFIX'] = 'app'
app.config['SESSION_REDIS'] = redis.StrictRedis(
    host='localhost', port=6379, db=0)

app.config['SECRET_KEY'] = SECRET_KEY
sess = Session()
sess.init_app(app)


CORS(app, supports_credentials=True)


@app.route('/user/create_user', methods=['GET', 'POST'])
def createAccount():
    res = request.json
    if user_routes.create_user_route(res) == 500:
        return jsonify({"messgae": "err"}), 500
    return jsonify({"message": "success, you can now login"}), 200


@app.route('/user/login', methods=['GET', 'POST'])
def login():
    res = request.json
    if user_routes.login(res['email'], res['passwd']) == 200:
        session['email'] = res['email']
        return jsonify({"message": 'success'}), 200
    return jsonify({"message": 'failure'}), 400


@app.route('/user/get_user', methods=['GET', 'POST'])
def getUser():
    if session.get('email'):
        return user_routes.get_user_route(session.get('email'))
    return 300


@app.route('/user/logout', methods=['POST'])
def logout():
    session.pop('email', None)
    return '200'


@app.route('/expense/add_expense', methods=['GET', 'POST'])
def addExpense():
    data = request.json
    if expense_routes.add_expense_route(data) != 200:
        return jsonify({"message": 'failure'}), 400
    return jsonify({"message": 'success'}), 200


@app.route('/expense/get_expenses', methods=['GET', 'POST'])
def getUserExpense():
    if 'email' in session:
        exp = expense_routes.get_expenses_user(session.get('email'))
        if exp == 400:
            return jsonify({"message": 'failure'})
        return jsonify(list(exp)), 200
    return '300'


@app.route('/expense/download_balance_sheet', methods=['GET', 'POST'])
def sheet():
    if 'email' in session:
        try:
            email = session.get('email')
            pdfpath = expense_routes.download_balance_sheet_route(email)
            return send_file(pdfpath, as_attachment=True)
        except:
            return jsonify({"message": "couldn't load pdf"}), 400
    return jsonify({"message": "redirect to login"}), 401


if __name__ == "__main__":
    app.run(debug=True)
