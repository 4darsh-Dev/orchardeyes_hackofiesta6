import torch
import torch.nn as nn
import torchvision
from torchvision import transforms, models
import numpy as np
import cv2
import os
from datetime import datetime

class TreeSegmenter:
    def __init__(self, model_path):
        """
        Initialize the TreeSegmenter with a trained model.
        
        Args:
            model_path (str): Path to the saved model checkpoint
        """
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        self.model = self._load_model(model_path)
        self.model.eval()
    
    def _load_model(self, model_path):
        """Load the trained DeepLabV3 model."""
        model = models.segmentation.deeplabv3_resnet101(pretrained=False)
        model.classifier[4] = nn.Conv2d(256, 2, kernel_size=(1, 1), stride=(1, 1))
        
        checkpoint = torch.load(model_path, map_location=self.device)
        model.load_state_dict(checkpoint['model_state_dict'])
        model = model.to(self.device)
        return model
    
    def _preprocess_image(self, image):
        """
        Preprocess the input image for the model.
        
        Args:
            image (numpy.ndarray): Input image in BGR format
            
        Returns:
            torch.Tensor: Preprocessed image tensor
        """
        # Convert to float32 and resize
        image = image.astype(np.float32)
        image = cv2.resize(image, (256, 256))
        
        # Normalize
        image = image / 255.0
        
        # Convert BGR to RGB
        image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        
        # Convert to tensor format (C, H, W)
        image = np.transpose(image, (2, 0, 1))
        
        # Convert to tensor and add batch dimension
        image_tensor = torch.from_numpy(image).unsqueeze(0)
        return image_tensor.to(self.device)
    
    def _postprocess_mask(self, mask, original_size):
        """
        Postprocess the predicted mask.
        
        Args:
            mask (torch.Tensor): Predicted mask
            original_size (tuple): Original image size (height, width)
            
        Returns:
            numpy.ndarray: Processed mask
        """
        mask = mask.cpu().numpy()
        mask = cv2.resize(mask, (original_size[1], original_size[0]))
        return mask
    
    def segment_image(self, image_path, output_dir='segmentation_results'):
        """
        Segment trees in the input image and save the results.
        
        Args:
            image_path (str): Path to the input image
            output_dir (str): Directory to save the results
            
        Returns:
            tuple: (segmented_image, mask) - The processed image and its mask
        """
        # Create output directory if it doesn't exist
        os.makedirs(output_dir, exist_ok=True)
        
        # Read image
        image = cv2.imread(image_path)
        if image is None:
            raise ValueError(f"Failed to load image: {image_path}")
        
        original_size = image.shape[:2]  # (height, width)
        
        # Preprocess image
        image_tensor = self._preprocess_image(image)
        
        # Perform inference
        with torch.no_grad():
            output = self.model(image_tensor)['out']
            mask = torch.argmax(output[0], dim=0)
            mask = self._postprocess_mask(mask, original_size)
        
        # Create segmentation visualization
        segmented_image = image.copy()
        
        # Create a colored mask (green for trees)
        colored_mask = np.zeros_like(image)
        colored_mask[mask == 1] = [0, 255, 0]  # Green color for trees
        
        # Blend the original image with the colored mask
        alpha = 0.5  # Transparency factor
        segmented_image = cv2.addWeighted(segmented_image, 1, colored_mask, alpha, 0)
        
        # Generate timestamp for unique filenames
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        
        # Save results
        base_filename = os.path.splitext(os.path.basename(image_path))[0]
        
        # Save segmented image
        segmented_path = os.path.join(output_dir, f"{base_filename}_segmented_{timestamp}.jpg")
        cv2.imwrite(segmented_path, segmented_image)
        
        # Save binary mask
        mask_path = os.path.join(output_dir, f"{base_filename}_mask_{timestamp}.png")
        cv2.imwrite(mask_path, (mask * 255).astype(np.uint8))
        
        print(f"Saved segmented image to: {segmented_path}")
        print(f"Saved mask to: {mask_path}")
        
        return segmented_image, mask

# Example usage
if __name__ == "__main__":
    # Initialize the segmenter
    model_path = "tree_segmentation_model.pth"  # Path to your trained model
    segmenter = TreeSegmenter(model_path)
    
    # Example of processing a single image
    image_path = "path/to/your/image.jpg"  # Replace with your image path
    try:
        segmented_image, mask = segmenter.segment_image(image_path)
        print("Segmentation completed successfully!")
    except Exception as e:
        print(f"Error during segmentation: {str(e)}")
    
    # Example of processing multiple images in a directory
    def process_directory(input_dir, segmenter):
        for filename in os.listdir(input_dir):
            if filename.lower().endswith(('.png', '.jpg', '.jpeg')):
                image_path = os.path.join(input_dir, filename)
                try:
                    segmenter.segment_image(image_path)
                    print(f"Processed {filename}")
                except Exception as e:
                    print(f"Error processing {filename}: {str(e)}")
    
    # Uncomment and modify the following line to process a directory of images
    # process_directory("path/to/image/directory", segmenter)