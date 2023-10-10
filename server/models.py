from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from config import db, bcrypt

from sqlalchemy.ext.hybrid import hybrid_property



# Define the association table for the many-to-many relationship
user_event_association = db.Table('user_event_association',
                                  db.Column('user_id', db.Integer,
                                            db.ForeignKey('users.id')),
                                  db.Column('event_id', db.Integer,
                                            db.ForeignKey('events.id'))
                                  )


class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    # serialize_rules = ("-event.users","-comment.user")
    serialize_rules = ("-comments",)

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)
    username = db.Column(db.String(25), unique=True)
    email = db.Column(db.String(50), unique=True)
    birthday = db.Column(db.DateTime)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    _password_hash = db.Column(db.String)

    # many-to-many relationship with Event
    events = db.relationship(
        'Event', secondary=user_event_association, back_populates='users')
    comments = db.relationship('Comment', backref='user')

    @hybrid_property
    def password_hash(self):
        import ipdb; ipdb.set_trace()
        return self._password_hash
        # raise Exception("Cannot access password hashes")

    @password_hash.setter
    def password_hash(self, password):
        hashed_pw = bcrypt.generate_password_hash(password).decode("utf-8")
        self._password_hash = hashed_pw

    def authenticate(self, provided_password):
        return bcrypt.check_password_hash(self._password_hash, provided_password)

class Event(db.Model, SerializerMixin):
    __tablename__ = 'events'

    serialize_rules = ("-users", "-comments")

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    description = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    in_cart = db.Column(db.Integer)

    # many-to-many relationship with User
    users = db.relationship(
        'User', secondary=user_event_association, back_populates='events')
    # one-to-many relationship with Comment
    comments = db.relationship('Comment', backref='event')


class Comment(db.Model, SerializerMixin):
    __tablename__ = 'comments'
    serialize_rules = ("-events", "-users")

    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    event_id = db.Column(db.Integer, db.ForeignKey('events.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    # events = db.relationship('Event', backref='comments')
