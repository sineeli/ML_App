import os

import tensorflow as tf

MODELS_DIR = 'app/tf-models'
PWD = os.getcwd()

with open(f'{PWD}/{MODELS_DIR}/imagenet1000_clsidx_to_labels.txt') as f:
    IMGNET_ID_TO_LABEL = eval(f.read())


def load_models():
    """
    load the models from disk
    and put them in a dictionary

    Returns:
        dict: loaded models
    """

    resnet50 = tf.saved_model.load(f'./{MODELS_DIR}/resnet50')

    models = {
        'resnet50': resnet50.signatures['serving_default']
    }

    return models


MODELS_DICT = load_models()