import tensorflow as tf
from fastapi import APIRouter, Depends, File, HTTPException, UploadFile, status
from sqlalchemy.orm import Session

from app import oauth2
from app.database import get_db
from app.load_trained_models import IMGNET_ID_TO_LABEL, MODELS_DICT

router = APIRouter(
    prefix="/image_classification",
    tags=['Image Classification']
)

@router.post("/predict")
async def classify_image(db: Session=Depends(get_db), 
                         file: UploadFile=File(...),
                         get_current_user: int=Depends(oauth2.get_current_user)):
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
        img = tf.io.decode_png(await file.read())
    img = tf.expand_dims(img, axis=0)
    prediction = MODELS_DICT['resnet50'](img)
    id = int(tf.argmax(prediction['probs'][0]).numpy())
    return {
        "class": IMGNET_ID_TO_LABEL[id]
    }
