from app import app
from models import db, User, Event, Comment
from faker import Faker
from datetime import datetime
from sqlalchemy import func

fake = Faker()


def make_users():
    User.query.delete()
    users = []
    for i in range(20):
        first_name = fake.first_name()
        last_name = fake.last_name()
        user = User(
            first_name=first_name,
            last_name=last_name,
            username=f"{first_name}_{last_name}",
            email=fake.email(),
            birthday=datetime.strptime(fake.date(), '%Y-%m-%d').date(),
        )
        users.append(user)

    db.session.add_all(users)
    db.session.commit()


def make_events():
    Event.query.delete()

    for user in User.query.all():
        events = []
        for _ in range(5):
            event = Event(
                title=fake.word(),
                description=fake.sentence(),
                in_cart=0,
            )
            events.append(event)
        user.events.extend(events)  # Populate the many-to-many relationship
        db.session.add_all(events)

    db.session.commit()

def make_comments():
    Comment.query.delete()

    for event in Event.query.all():
        comments = []
        for _ in range(3):  # Adjust the number of comments per event as needed
            comment = Comment(
                text=fake.paragraph(),               
                event_id=event.id
            )
            user=User.query.order_by(func.random()).first()  # Assign a random user to the comment
            
            user.comments.append(comment)
            db.session.add(user)
            # comments.append(comment)

    db.session.commit()

if __name__ == '__main__':
    with app.app_context():
        make_users()
        make_events()
        make_comments()
