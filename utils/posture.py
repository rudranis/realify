import numpy as np

def calculate_angle(a, b, c):
    a = np.array(a)
    b = np.array(b)
    c = np.array(c)

    ba = a - b
    bc = c - b

    cosine_angle = np.dot(ba, bc) / (np.linalg.norm(ba) * np.linalg.norm(bc))
    angle = np.arccos(np.clip(cosine_angle, -1.0, 1.0))
    return np.degrees(angle)

def analyze_pose(landmarks):
    issues = []
    
    # Example landmark dict: { 'LEFT_SHOULDER': [x, y], ... }

    # Back angle (shoulder-hip-knee)
    if all(k in landmarks for k in ['LEFT_SHOULDER', 'LEFT_HIP', 'LEFT_KNEE']):
        back_angle = calculate_angle(
            landmarks['LEFT_SHOULDER'],
            landmarks['LEFT_HIP'],
            landmarks['LEFT_KNEE']
        )
        if back_angle < 150:
            issues.append("Back angle < 150°")

    # Knee over toe (horizontal check)
    if all(k in landmarks for k in ['LEFT_KNEE', 'LEFT_ANKLE']):
        knee_x = landmarks['LEFT_KNEE'][0]
        ankle_x = landmarks['LEFT_ANKLE'][0]
        if knee_x > ankle_x:
            issues.append("Knee over toe")

    return issues
