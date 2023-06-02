import os
import requests
import tarfile
import yaml
import logging
import tensorflow as tf

from official.core import exp_factory
from official.vision.serving import export_saved_model_lib

MODELS_DIR = 'app/tf-models'
CKPTS_DIR = 'app/tfm-ckpts'
CONFIGS_PATH = 'app/ml_exp_configs'

PWD = os.getcwd()

if not os.path.exists(f'{PWD}/{MODELS_DIR}'):
    os.mkdir(f'{PWD}/{MODELS_DIR}')

if not os.path.exists(f'{PWD}/{CKPTS_DIR}'):
    os.mkdir(f'{PWD}/{CKPTS_DIR}')


def download_ckpts():
    resnet50_i224_url = "https://storage.googleapis.com/tf_model_garden/vision/resnet/resnet-50-i224.tar.gz"
    r = requests.get(resnet50_i224_url, stream=True)
    with open(f'{PWD}/{MODELS_DIR}/resnet-50-i224.tar.gz', 'wb') as f:
        f.write(r.raw.read())
    tar = tarfile.open(f'{PWD}/{MODELS_DIR}/resnet-50-i224.tar.gz')
    tar.extractall(f'{PWD}/{CKPTS_DIR}/resnet-50-i224-ckpt/')
    tar.close()
    os.remove(f'{PWD}/{MODELS_DIR}/resnet-50-i224.tar.gz')

def export_model(model):
    exp_config = exp_factory.get_exp_config('resnet_imagenet')

    with open(f'{PWD}/{CONFIGS_PATH}/imagenet_resnet50_tpu.yaml', 'r') as file:
        override_params = yaml.full_load(file)

    exp_config.override(override_params=override_params, is_strict=False)
    export_saved_model_lib.export_inference_graph(
        input_type='image_tensor',
        batch_size=1,
        input_image_size=[224, 224],
        checkpoint_path=tf.train.latest_checkpoint(
            f'{PWD}/{CKPTS_DIR}/{model}-ckpt/'),
        params=exp_config,
        export_dir=f'{PWD}/{MODELS_DIR}/{model}/'
    )


def convert_ckpts():
    if not os.path.exists("{PWD}/{MODELS_DIR}/resnet-50-i224/"):
        export_model("resnet-50-i224")




if not os.path.exists(f'{PWD}/{MODELS_DIR}/imagenet1000_clsidx_to_labels.txt'):
    url ='https://gist.githubusercontent.com/yrevar/942d3a0ac09ec9e5eb3a/raw/238f720ff059c1f82f368259d1ca4ffa5dd8f9f5/imagenet1000_clsidx_to_labels.txt'
    r = requests.get(url, allow_redirects=True)
    with open('./imagenet1000_clsidx_to_labels.txt', 'wb') as f:
        f.write(r.content)

with open(f'{PWD}/{MODELS_DIR}/imagenet1000_clsidx_to_labels.txt') as f:
    IMGNET_ID_TO_LABEL = eval(f.read())


def load_models():
    """
    load the models from disk
    and put them in a dictionary

    Returns:
        dict: loaded models
    """

    resnet50 = tf.saved_model.load(f'{PWD}/{MODELS_DIR}/resnet-50-i224')

    models = {
        'resnet50': resnet50.signatures['serving_default']
    }

    return models

download_ckpts()
logging.info(msg="Checkpoints downloaded")

convert_ckpts()
logging.info(msg="Checkpoints converted")

MODELS_DICT = load_models()
logging.info(msg="Models Loaded")
