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
            print("userrrrrrrrr", user.email)
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


@app.route('/userevents', methods=['GET'])
def userevents():
    if request.method == 'GET':
        user_id = session.get("user_id")
        print("user iddddddddd", user_id)

        # Retrieve the current user
        user = User.query.get(user_id)

        if user is not None:
            # Access the user's associated events through the 'events' relationship
            userevents = user.events
            userevents_dictionaries = [event.to_dict() for event in userevents]
            print("USER EVENTSSSSSS", userevents_dictionaries)
            response = make_response(userevents_dictionaries, 200)
            return response
        else:
            # Handle the case where the user is not found
            return {"message": "User not found"}, 404


class SignUp(Resource):
    def post(self):
        data = request.get_json()
        user = User(
            username=data["username"],
            email=data["email"]
        )
        db.session.add(user)
        db.session.commit()

        session["user_id"] = user.id
        return user.to_dict(), 200


api.add_resource(SignUp, "/signup")

@app.route('/add_event_to_user', methods=['POST'])
def add_event_to_user_route():
    data = request.get_json()
    user_id = User.query.filter(User.id == session.get("user_id")).first().id
    # user_id = data.get("user_id")
    event_id = data.get("event_id")

    result = add_event_to_user(user_id, event_id)

    return result

# Define the function to add an event to a user's list
def add_event_to_user(user_id, event_id):
    # Retrieve the user and event objects
    user = User.query.get(user_id)
    event = Event.query.get(event_id)

    if user is not None and event is not None:
        # Check if the event is not already in the user's events
        if event not in user.events:
            user.events.append(event)  # Associate the event with the user
            db.session.commit()
            return {"message": "Event added to user's list successfully"}, 200
        else:
            return {"message": "Event is already in user's list"}, 409
    else:
        return {"message": "User or event not found"}, 404


@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    print("data;;;;;", data)
    user = User.query.filter(User.username == data["username"]).first()

    session["user_id"] = user.id
    print("user id login", user.id)
    return user.to_dict(), 200


@app.route("/logout", methods=["DELETE"])
def logout():
    session["user_id"] = None
    return {}, 204


@app.route("/authorized", methods=["GET"])
def authorized():
    user = User.query.filter(User.id == session.get("user_id")).first()
    print(user)
    if user:
        return user.to_dict(), 200
    else:
        return {"errors": "unauthorized"}, 401


# @app.route("/logout", methods=["DELETE"])
# def logout():
#     session["user_id"] = None
#     return {}, 204


if __name__ == "__main__":
    app.run(port=5000, debug=True)
