import logging
from werkzeug.utils import secure_filename

# Configure logging
logging.basicConfig(
    filename='server.log',
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)

def log_request_info(request):
    logging.info(f"{request.remote_addr} - {request.method} {request.path}")

def allowed_file(filename, allowed_extensions={"png", "jpg", "jpeg"}):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in allowed_extensions

def save_uploaded_file(file, upload_folder='uploads'):
    filename = secure_filename(file.filename)
    file_path = f"{upload_folder}/{filename}"
    file.save(file_path)
    return file_path
