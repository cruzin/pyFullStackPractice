from app import db

class HelpPage(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    locale = db.Column(db.String(140)) #arbirarily chosen, max locale length is unnkown for me
    url = db.Column(db.String(140), unique=True)
    products = db.Column(db.String()) #maybe set to array
    topics = db.Column(db.String()) #maybe set to array
    html = db.Column(db.String(20000)) #arbitraly set length
    title = db.Column(db.String(140)) #arbitraly set length
    summary = db.Column(db.String(500)) #arbitraly set length

    def __repr__(self):
        return f'<HelpPage {self.id} {self.title}>'

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

    def as_preview(self):
        return {"url": self.url, "topics": self.topics, "title": self.title}

# commands
# flask db init
# flask db migrate -m "users table" (make commit)
# flask db upgrade (apply changes)
# flask db downgrade (undo)
