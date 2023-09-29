from flask import Flask, request, make_response, jsonify, session
from flask_cors import CORS
from flask_migrate import Migrate
from models import db, User, Event
from flask_restful import Api, Resource


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

CORS(app)
migrate = Migrate(app, db)

db.init_app(app)
app.secret_key = b'9\xd143$R\x0b\xfb\x8e\xf9z\xe2U\x02\x8b:'

api = Api(app)


@app.route('/')
def index():
    return '<h1>Welcome to my app!</h1>'


@app.route('/users', methods=['GET', 'POST'])
def users():
    if request.method == 'GET':
        users = User.query.all()

        user_dictionaries = []
        for user in users:
            print(user)
            user_dictionaries.append(user.to_dict())
        response = make_response(user_dictionaries, 200)

        return response


@app.route('/events', methods=['GET', 'POST'])
def events():
    if request.method == 'GET':
        events = Event.query.all()
        event_dictionaries = []
        for event in events:
            event_dictionaries.append(event.to_dict())
        response = make_response(event_dictionaries, 200)

        return response


class SignUp(Resource):
    def post(self):
        data = request.get_json()
        user = User(
            username=data["username"],
            email=data["email"]
        )
        db.session.add(user)
        db.session.commit()

        session["user_id"] = app.secret_key
        return user.to_dict(), 200


api.add_resource(SignUp, "/signup")


@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    print("data;;;;;", data)
    user = User.query.filter(User.username == data["username"]).first()

    session["user_id"] = app.secret_key
    return user.to_dict(), 200


@app.route("/authorized", methods=["GET"])
def authorized():
    user = User.query.filter(User.id == session.get("user_id")).first()
    print(user)
    if user:
        return user.to_dict(), 200
    else:
        return {"errors": "unauthorized"}, 401


@app.route("/logout", methods=["DELETE"])
def logout():
    session["user_id"] = None
    return {}, 204


if __name__ == "__main__":
    app.run(port=5000, debug=True)
