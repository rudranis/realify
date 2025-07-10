# backend/app.py

from flask import Flask, request, jsonify
import cv2
import base64
import numpy as np
import mediapipe as mp
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow frontend to talk to backend

mp_pose = mp.solutions.pose
pose = mp_pose.Pose()

def calculate_angle(a, b, c):
    a = np.array(a)
    b = np.array(b)
    c = np.array(c)
    radians = np.arctan2(c[1]-b[1], c[0]-b[0]) - np.arctan2(a[1]-b[1], a[0]-b[0])
    angle = np.abs(np.degrees(radians))
    return angle

def get_issues(landmarks):
    issues = []

    l_shoulder = [landmarks[11].x, landmarks[11].y]
    l_hip = [landmarks[23].x, landmarks[23].y]
    l_knee = [landmarks[25].x, landmarks[25].y]

    back_angle = calculate_angle(l_shoulder, l_hip, l_knee)
    if back_angle < 150:
        issues.append("Back angle < 150°")

    return issues

@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.json['image']
    image_data = base64.b64decode(data.split(',')[1])
    npimg = np.frombuffer(image_data, np.uint8)
    frame = cv2.imdecode(npimg, cv2.IMREAD_COLOR)

    results = pose.process(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB))
    issues = []

    if results.pose_landmarks:
        issues = get_issues(results.pose_landmarks.landmark)

    return jsonify({"bad_posture": bool(issues), "issues": issues})

if __name__ == "__main__":
    app.run(debug=True)
