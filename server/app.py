from flask import Flask, request, make_response, jsonify
from flask_cors import CORS
from flask_migrate import Migrate
from models import db, User, Event
from flask_marshmallow import Marshmallow

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

CORS(app)
migrate = Migrate(app, db)

db.init_app(app)

ma = Marshmallow(app)


class UserSchema(ma.SQLAlchemySchema):
    class Meta:
        model = User
    id = ma.auto_field()
    username = ma.auto_field()


singular_user_schema = UserSchema()
plural_user_schema = UserSchema(many=True)


class EventSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Event
    id = ma.auto_field()
    title = ma.auto_field()


singular_event_schema = EventSchema()
plural_event_schema = EventSchema(many=True)


@app.route('/')
def index():
    return '<h1>Welcome to my app!</h1>'


@app.route('/users', methods=['GET', 'POST'])
def users():
    if request.method == 'GET':

        response = make_response(
            plural_user_schema.dump(
                User.query.order_by(User.last_name.asc()).all()),
            200
        )
        return response


@app.route('/events', methods=['GET', 'POST'])
def events():
    if request.method == 'GET':

        response = make_response(
            plural_event_schema.dump(
                Event.query.all()
            ),
            200
        )
        return response


if __name__ == "__main__":
    app.run(port=5555)
