import cv2
import numpy as np
import json
import requests
from fastapi import APIRouter, Depends, File, HTTPException, UploadFile, status
from sqlalchemy.orm import Session

from app import oauth2
from app.database import get_db

router = APIRouter(prefix="/image_classification", tags=["Image Classification"])


CARDS_CLASSES = [
    "ace of clubs",
    "ace of diamonds",
    "ace of hearts",
    "ace of spades",
    "eight of clubs",
    "eight of diamonds",
    "eight of hearts",
    "eight of spades",
    "five of clubs",
    "five of diamonds",
    "five of hearts",
    "five of spades",
    "four of clubs",
    "four of diamonds",
    "four of hearts",
    "four of spades",
    "jack of clubs",
    "jack of diamonds",
    "jack of hearts",
    "jack of spades",
    "joker",
    "king of clubs",
    "king of diamonds",
    "king of hearts",
    "king of spades",
    "nine of clubs",
    "nine of diamonds",
    "nine of hearts",
    "nine of spades",
    "queen of clubs",
    "queen of diamonds",
    "queen of hearts",
    "queen of spades",
    "seven of clubs",
    "seven of diamonds",
    "seven of hearts",
    "seven of spades",
    "six of clubs",
    "six of diamonds",
    "six of hearts",
    "six of spades",
    "ten of clubs",
    "ten of diamonds",
    "ten of hearts",
    "ten of spades",
    "three of clubs",
    "three of diamonds",
    "three of hearts",
    "three of spades",
    "two of clubs",
    "two of diamonds",
    "two of hearts",
    "two of spades",
]


@router.post("/cards_image/predict")
async def classify_image(
    file: UploadFile,
    db: Session = Depends(get_db),
    get_current_user: int = Depends(oauth2.get_current_user),
):
    """
    Predict uploaded image class from the Imagenet Dataset.

    Args:
        file: File object (allowed extension: .jpg, jpeg, png)

    Return:
        prediction: Predicted class
    """
    extension = file.filename.split(".")[-1] in ("jpg", "jpeg", "png")
    if not extension:
        raise HTTPException(status_code=422, detail="Invalid file format. Only jpeg and png images are supported.")

    image_bytes = await file.read()
    image_np = np.frombuffer(image_bytes, np.uint8)
    img = cv2.imdecode(image_np, cv2.IMREAD_COLOR)
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    img = cv2.resize(img, dsize=(224, 224))
    img = img[np.newaxis, ...]

    payload = {
        "model_spec": {
            "name": "card_classification",
            "signature_name": "serving_default",
            "version": "1",
        },
        "inputs": {"inputs": img.tolist()},
    }
    # Prepare the request headers
    headers = {"Content-Type": "application/json"}

    # Convert the payload to JSON
    payload_json = json.dumps(payload)

    # Send the POST request to the container
    response = requests.post(
        "http://localhost:8501/v1/models/card_classification:predict",
        data=payload_json,
        headers=headers,
    )

    # Process the prediction response
    if response.status_code != 200:
        return {"Error:", response.text}

    prediction = response.json()["outputs"]

    return {"class": CARDS_CLASSES[np.argmax(prediction["probs"][0])],
            "prob": f'{np.max(prediction["probs"][0]):.2f}'
            }
