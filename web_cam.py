import cv2, boto3, time, os
from datetime import datetime

REGION = "ap-south-1"   # change if needed
BUCKET = "emotion-recognition5068"
FOLDER = "frames"

s3 = boto3.client("s3", region_name=REGION)
rekog = boto3.client("rekognition", region_name=REGION)

cap = cv2.VideoCapture(0)  # try 1 if 0 fails
if not cap.isOpened():
    raise RuntimeError("Webcam not available.")

print("Press 'q' to quit.")
while True:
    ok, frame = cap.read()
    if not ok:
        continue

    # Encode frame as JPEG bytes
    ok, buf = cv2.imencode(".jpg", frame, [cv2.IMWRITE_JPEG_QUALITY, 90])

    if not ok:
        continue
    img_bytes = buf.tobytes()

    # Upload frame to S3 (timestamped)
    key = f"{FOLDER}/frame_{int(time.time())}.jpg"
    s3.put_object(Bucket=BUCKET, Key=key, Body=img_bytes)

    # Call Rekognition on that S3 object
    resp = rekog.detect_faces(
        Image={"S3Object": {"Bucket": BUCKET, "Name": key}},
        Attributes=["ALL"]
    )

    label = ""
    details = resp.get("FaceDetails", [])
    if details:
        emotions = sorted(details[0].get("Emotions", []), key=lambda e: e["Confidence"], reverse=True)
        if emotions:
            label = f"{emotions[0]['Type']} {emotions[0]['Confidence']:.1f}%"

    # Overlay label
    if label:
        cv2.putText(frame, label, (20, 40), cv2.FONT_HERSHEY_SIMPLEX, 1, (0,255,0), 2)

    # Show frame
    cv2.imshow("Emotion Recognition (AWS Rekognition)", frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
