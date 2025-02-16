import pytesseract
from PIL import Image
import re
import json

# OCR Processing Class
class SoilHealthOCR:
    def __init__(self, tesseract_cmd=None):
        if tesseract_cmd:
            pytesseract.pytesseract.tesseract_cmd = tesseract_cmd

    def extract_text(self, image_path):
        image = Image.open(image_path)
        text = pytesseract.image_to_string(image)
        print(text)
        return text

    def parse_text(self, text):
        # Regular expressions for extracting data
        indicators_pattern = r'(Aggregate Stability|Available Water Capacity|Surface Hardness|Subsurface Hardness|Organic Matter|Active Carbon|Potentially Mineralizable Nitrogen|Root Health Rating|pH|Extractable Phosphorus|Extractable Potassium|Minor Elements)'
        value_pattern = r'(\d+\.\d+|\d+)'  # Matches numeric values

        data = {}

        # Extract sample details
        sample_details = re.findall(r'(PLOW TILL|CORN GRAIN/POTATO ROTATION|SILT TEXTURED SOIL)', text)
        data['sample_details'] = sample_details

        # Extract indicators with their values and ratings
        matches = re.findall(rf'({indicators_pattern})\s+({value_pattern})\s+(\d+)', text)
        indicators_data = []
        
        for match in matches:
            indicator, value, rating = match
            indicators_data.append({
                'indicator': indicator.strip(),
                'value': float(value),
                'rating': int(rating)
            })

        data['indicators'] = indicators_data

        # Extract overall quality score
        overall_score = re.search(r'OVERALL QUALITY SCORE.*?(\d+\.\d+)', text)
        if overall_score:
            data['overall_quality_score'] = float(overall_score.group(1))

        return data

    def process_image(self, image_path):
        text = self.extract_text(image_path)
        parsed_data = self.parse_text(text)
        return json.dumps(parsed_data, indent=4)

# Example usage
if __name__ == "__main__":
    ocr_processor = SoilHealthOCR()
    json_data = ocr_processor.process_image("/home/kalie/work/projects/OrchardEyes/ai/data/raw/soil-health-reprot-cornell.jpg")
    print(json_data)


