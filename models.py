from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class PostureAnalysis(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    frame = db.Column(db.Integer, nullable=False)
    bad_posture = db.Column(db.Boolean, nullable=False)
    issues = db.Column(db.String(300), nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
