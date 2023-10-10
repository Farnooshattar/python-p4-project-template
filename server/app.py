
from models import User, Event, Comment


from flask import request, make_response, session, jsonify
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError


from config import app, api, db



@app.route('/users', methods=['GET'])
def users():
    if request.method == 'GET':

        users = User.query.all()

        user_dictionaries = []
        for user in users:
            user_dictionaries.append(user.to_dict())
            print("usertodict", user.to_dict())
        response = make_response(user_dictionaries, 200)

        return response


@app.route('/events', methods=['GET'])
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
        # Retrieve the current user
        user = User.query.get(user_id)

        if user is not None:
            # Access the user's associated events through the 'events' relationship
            userevents = user.events
            userevents_dictionaries = [event.to_dict() for event in userevents]

            response = make_response(userevents_dictionaries, 200)
            return response
        else:
            # Handle the case where the user is not found
            return {"message": "User not found"}, 404


class EventComment(Resource):
    def post(self, event_id):
        data = request.get_json()
        user_id = session.get("user_id")

        event = Event.query.get(event_id)
        user = User.query.get(user_id)

        if event is None or user is None:
            return {"message": "Event or user not found"}, 404

        text = data.get("text")

        if not text:
            return {"message": "Comment text is required"}, 400

        comment = Comment(text=text, user=user, event=event)
        db.session.add(comment)
        db.session.commit()

        return {"message": "Comment added successfully"}, 201


# Add the resource to the API
api.add_resource(EventComment, '/events/<int:event_id>/comments')


@app.route('/events/<int:event_id>/comments', methods=['GET'])
def get_event_comments(event_id):
    event = Event.query.get(event_id)
    print("event id", event_id)
    if event is None:
        return jsonify({"message": "Event not found"}), 404

    comments = Comment.query.filter_by(event_id=event_id).all()
    # You can serialize the comments as needed before sending the response
    print("comments", comments)

    serialized_comments = []  # Serialize comments as needed
    for comment in comments:
        serialized_comment = {
            "id": comment.id,
            "text": comment.text,
            "created_at": comment.created_at.strftime("%Y-%m-%d %H:%M:%S"),
            # Add other fields as needed
        }
        print("serialized comments", serialized_comment)
        serialized_comments.append(serialized_comment)

    return jsonify(serialized_comments)


class Cart(Resource):
    def patch(self):
        try:
            data = request.get_json()
            if "in_cart" not in data:
                return {"message": "Missing 'in_cart' parameter"}, 400

            # Replace this with your logic to fetch the event you want to update
            event = Event.query.filter(Event.id == data["event_id"]).first()

            if not event:
                return {"message": "Event not found"}, 404

            event.in_cart = event.in_cart+1
            db.session.commit()
            return event.to_dict(), 200
        except Exception as e:
            return {"message": str(e)}, 500


api.add_resource(Cart, "/incart")


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

def check_for_missing_values(data):
    errors_list = []
    for key, value in data.items():
        if not value:
            errors_list.append(f"{key} is required")
    return errors_list

class SignUp(Resource):
    def post(self):
        data = request.get_json()
        errors = check_for_missing_values(data)
        if len(errors) > 0:
            return {"errors": errors}, 422

        user = User(username=data['username'], email=data['email'])
        
        user.password_hash = data['password']
        
        try:
            db.session.add(user)
            db.session.commit()
            
            session["user_id"] = user.id
            return user.to_dict(), 201
        except IntegrityError as e:
            
            if isinstance(e, (IntegrityError)):
                for error in e.orig.args:
                    if "UNIQUE" in error:
                        errors.append("Email already taken. Please try again")# Get the error message as a string

            return {'errors': errors}, 422

api.add_resource(SignUp, "/signup")


@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    user = User.query.filter(User.username == data['username']).first()
    if user:
        if user.authenticate(data['password']):
            session["user_id"] = user.id 
            return user.to_dict(), 200
        else:
            return {"errors": ["Username or password incorrect"]}, 401
    else:
        return {"errors": ["Username or password incorrect"]}, 401


@app.route("/logout", methods=["DELETE"])
def logout():
    session["user_id"] = None
    return {}, 204


@app.route("/authorized", methods=["GET"])
def authorized():
    user = User.query.filter(User.id == session.get("user_id")).first()
    print("authorized", user)
    if user:
        return user.to_dict(), 200
    else:
        return {"errors": "unauthorized"}, 401


if __name__ == "__main__":
    app.run(port=5000, debug=True)
