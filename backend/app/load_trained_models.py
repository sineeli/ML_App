# import os
# import requests
# import tarfile
# import yaml

# import tensorflow as tf
# # from google.cloud import storage



# # from official.core import exp_factory
# # from official.vision.serving import export_saved_model_lib

# BUCKET_NAME =  'tf2-exported-models'

# PWD = os.getcwd()

# if not os.path.exists(f'{PWD}/tf-models'):
#     os.mkdir(f'{PWD}/tf-models')

# MODELS_DIR = f'{PWD}/tf-models'






# def load_model(model_name):
#     """
#     load the models from disk
#     and put them in a dictionary

#     Returns:
#         dict: loaded models
#     """

#     model = tf.saved_model.load(f'{MODELS_DIR}/{model_name}')
#     return model


# def download_and_unzip_tar_gz(bucket_name, file_name, destination_folder):
#     # Instantiate a client
#     client = storage.Client()

#     # Get the bucket
#     bucket = client.get_bucket(bucket_name)

#     # Get the blob (file)
#     blob = bucket.blob(file_name)

#     # Download the blob to a local file
#     local_file_path = f"{destination_folder}/{file_name}"
#     blob.download_to_filename(local_file_path)

#     # Extract the contents of the tar.gz file
#     with tarfile.open(local_file_path, "r:gz") as tar:
#         tar.extractall(path=destination_folder)

#     # Remove the downloaded tar.gz file
#     os.remove(local_file_path)
    
    
# def download_models(model_name):
#     models_list = os.listdir(MODELS_DIR)
#     if model_name not in models_list:
#         MODEL_PATH = os.path.join(MODELS_DIR, 
#                                   model_name)
#         download_and_unzip_tar_gz(BUCKET_NAME, 
#                                   f'{model_name}.tar.gz',
#                                   MODELS_DIR)
#         print("Downloaded from GCP")
#     else:
#         print("Model already present in local server")


# # MODELS_LIST = ['card_classification']

# # print("Downloading models started...")

# # # for model_name in MODELS_LIST:
# # #     download_models(model_name)
    
# # print("All models downloaded")

# # print("Models loading started...")
# # MODELS_DICT = {}
# # for model_name in MODELS_LIST:
# #     MODELS_DICT[model_name] = load_model(model_name)

# # print("Models loaded")