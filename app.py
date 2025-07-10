from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2
import numpy as np
import mediapipe as mp
import base64
import io
from PIL import Image
from utils.posture import analyze_pose

app = Flask(__name__)
CORS(app)

mp_pose = mp.solutions.pose
pose = mp_pose.Pose()

def get_landmarks_from_image(image):
    image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    results = pose.process(image_rgb)
    landmarks = {}

    if results.pose_landmarks:
        for idx, lm in enumerate(results.pose_landmarks.landmark):
            h, w, _ = image.shape
            landmarks[mp_pose.PoseLandmark(idx).name] = [lm.x * w, lm.y * h]

    return landmarks

@app.route('/')
def index():
    return "Backend is running"

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.json
    if 'image' not in data:
        return jsonify({"error": "No image data provided"}), 400

    image_data = data['image'].split(",")[1]
    image_bytes = base64.b64decode(image_data)
    image = Image.open(io.BytesIO(image_bytes)).convert('RGB')
    image_np = np.array(image)
    image_cv = cv2.cvtColor(image_np, cv2.COLOR_RGB2BGR)

    landmarks = get_landmarks_from_image(image_cv)
    issues = analyze_pose(landmarks)

    return jsonify({
        "issues": issues,
        "bad_posture": bool(issues)
    })
