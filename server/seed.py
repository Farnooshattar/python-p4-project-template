from app import app
from models import db, User, Event
from faker import Faker
from datetime import datetime

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
            )
            events.append(event)
        user.events.extend(events)  # Populate the many-to-many relationship
        db.session.add_all(events)

    db.session.commit()


if __name__ == '__main__':
    with app.app_context():
        make_users()
        make_events()
