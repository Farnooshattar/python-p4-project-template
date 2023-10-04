from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ForeignKey
from sqlalchemy import MetaData
from sqlalchemy_serializer import SerializerMixin

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)


# Define the association table for the many-to-many relationship
user_event_association = db.Table('user_event_association',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id')),
    db.Column('event_id', db.Integer, db.ForeignKey('events.id'))
)

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    # serialize_rules = ("-event.users","-comment.user")
    serialize_rules = ("-users.events","-comments")
    
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)
    username = db.Column(db.String(25), unique=True)
    email = db.Column(db.String(50), unique=True)
    birthday = db.Column(db.DateTime)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    # many-to-many relationship with Event
    events = db.relationship('Event', secondary=user_event_association, back_populates='users')
    comments = db.relationship('Comment', backref='user')


class Event(db.Model, SerializerMixin):
    __tablename__ = 'events'

    serialize_rules = ("-events.users", "-comments")

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    description = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    in_cart = db.Column(db.Integer)

    # many-to-many relationship with User
    users = db.relationship('User', secondary=user_event_association, back_populates='events')
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

   
    