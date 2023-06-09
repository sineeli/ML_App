import tensorflow as tf
from fastapi import APIRouter, Depends, File, HTTPException, UploadFile, status
from sqlalchemy.orm import Session

from app import oauth2
from app.database import get_db
from app.load_trained_models import MODELS_DICT, CARDS_CLASSES

router = APIRouter(
    prefix="/image_classification",
    tags=['Image Classification']
)


@router.post("/cards_image/predict")
async def classify_image(db: Session = Depends(get_db),
                         file: UploadFile = File(...),
                         get_current_user: int = Depends(oauth2.get_current_user)):
    """
    Predict uploaded image class from the Imagenet Dataset.

    Args:
        file: File object (allowed extension: .jpg, jpeg, png)

    Return:
        prediction: Predicted class
    """
    extension = file.filename.split(".")[-1] in ("jpg", "jpeg", "png")
    if not extension:
        return "Image must be jpg or png format!"
    if extension in ("jpg", "jpeg"):
        img = tf.io.decode_jpeg(await file.read())
    else:
        img = tf.io.decode_png(await file.read(), channels=3)
    img = tf.expand_dims(img, axis=0)
    prediction = MODELS_DICT['cards_model'](img)
    id = int(tf.argmax(prediction['probs'][0]).numpy())
    return {
        "class": CARDS_CLASSES[id]
    }

@router.post("/car_number_plate/predict")
async def classify_image(db: Session = Depends(get_db),
                         file: UploadFile = File(...),
                         get_current_user: int = Depends(oauth2.get_current_user)):
    """
    Predict uploaded image class from the Imagenet Dataset.

    Args:
        file: File object (allowed extension: .jpg, jpeg, png)

    Return:
        prediction: Predicted class
    """
    extension = file.filename.split(".")[-1] in ("jpg", "jpeg", "png")
    if not extension:
        return "Image must be jpg or png format!"
    if extension in ("jpg", "jpeg"):
        img = tf.io.decode_jpeg(await file.read())
    else:
        img = tf.io.decode_png(await file.read(), channels=3)
    img = tf.expand_dims(img, axis=0)
    prediction = MODELS_DICT['car_nam'](img)
    id = int(tf.argmax(prediction['probs'][0]).numpy())
    return {
        "class": CARDS_CLASSES[id]
    }