import torch
import torch.nn as nn
import torch.optim as optim
import torchvision
from torchvision import transforms, models
from torch.utils.data import DataLoader, Dataset
import numpy as np
import cv2
import os
from sklearn.model_selection import train_test_split
from tqdm import tqdm

class OrchardDataset(Dataset):
    def __init__(self, image_paths, mask_paths, transform=None):
        self.image_paths = image_paths
        self.mask_paths = mask_paths
        self.transform = transform

    def __len__(self):
        return len(self.image_paths)

    def __getitem__(self, idx):
        # Read the image and mask
        image = cv2.imread(self.image_paths[idx])
        if image is None:
            raise ValueError(f"Failed to load image: {self.image_paths[idx]}")
            
        mask = cv2.imread(self.mask_paths[idx], cv2.IMREAD_GRAYSCALE)
        if mask is None:
            raise ValueError(f"Failed to load mask: {self.mask_paths[idx]}")

        # Convert image to float32 before resizing to avoid data type issues
        image = image.astype(np.float32)
        
        # Resize image and mask
        image = cv2.resize(image, (256, 256))
        mask = cv2.resize(mask, (256, 256))

        # Normalize image
        image = image / 255.0

        # Convert image to RGB (if it's in BGR)
        image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

        # Convert to correct shape (H, W, C) -> (C, H, W)
        image = np.transpose(image, (2, 0, 1))

        # Convert mask to binary
        mask = np.where(mask > 0, 1, 0).astype(np.int64)

        return torch.from_numpy(image), torch.from_numpy(mask)

def load_data(image_folder, mask_folder, batch_size=16, test_size=0.2):
    # Get sorted lists of files to ensure consistent ordering
    image_files = sorted([f for f in os.listdir(image_folder) if f.endswith('.jpg')])
    
    images = []
    masks = []
    
    print("Loading dataset...")
    for image_name in tqdm(image_files):
        mask_name = image_name.replace(".jpg", ".png")
        image_path = os.path.join(image_folder, image_name)
        mask_path = os.path.join(mask_folder, mask_name)

        if os.path.exists(mask_path):
            images.append(image_path)
            masks.append(mask_path)

    # Split into training and test sets
    X_train, X_test, y_train, y_test = train_test_split(
        images, masks, test_size=test_size, random_state=42
    )

    # Create datasets
    train_dataset = OrchardDataset(X_train, y_train)
    test_dataset = OrchardDataset(X_test, y_test)

    # Create data loaders
    train_loader = DataLoader(train_dataset, batch_size=batch_size, shuffle=True, num_workers=4)
    test_loader = DataLoader(test_dataset, batch_size=batch_size, shuffle=False, num_workers=4)

    return train_loader, test_loader

def train_model(model, train_loader, device, epochs=5, save_path='tree_segmentation_model.pth'):
    criterion = nn.CrossEntropyLoss()
    optimizer = optim.Adam(model.parameters(), lr=0.001)
    
    # Initialize best metrics for model saving
    best_loss = float('inf')
    
    for epoch in range(epochs):
        model.train()
        running_loss = 0.0
        
        # Create progress bar for the epoch
        pbar = tqdm(train_loader, desc=f'Epoch {epoch+1}/{epochs}')
        
        for images, masks in pbar:
            images, masks = images.to(device), masks.to(device)
            
            optimizer.zero_grad()
            
            outputs = model(images)['out']
            loss = criterion(outputs, masks)
            
            loss.backward()
            optimizer.step()
            
            running_loss += loss.item()
            
            # Update progress bar
            pbar.set_postfix({'loss': f'{loss.item():.4f}'})
        
        epoch_loss = running_loss / len(train_loader)
        print(f'\nEpoch {epoch+1} Loss: {epoch_loss:.4f}')
        
        # Save model if it's the best so far
        if epoch_loss < best_loss:
            best_loss = epoch_loss
            # Save model state
            torch.save({
                'epoch': epoch,
                'model_state_dict': model.state_dict(),
                'optimizer_state_dict': optimizer.state_dict(),
                'loss': best_loss,
            }, save_path)
            print(f'Model saved to {save_path}')

def fine_tune_deeplabv3(num_classes=2):
    model = models.segmentation.deeplabv3_resnet101(pretrained=True)
    model.classifier[4] = nn.Conv2d(256, num_classes, kernel_size=(1, 1), stride=(1, 1))
    
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model = model.to(device)
    
    return model, device

def evaluate_model(model, test_loader, device):
    model.eval()
    correct_pixels = 0
    total_pixels = 0
    
    print("Evaluating model...")
    with torch.no_grad():
        for images, masks in tqdm(test_loader):
            images, masks = images.to(device), masks.to(device)
            
            outputs = model(images)['out']
            predicted = torch.argmax(outputs, dim=1)
            
            correct_pixels += (predicted == masks).sum().item()
            total_pixels += masks.numel()
    
    accuracy = correct_pixels / total_pixels
    print(f"Model accuracy: {accuracy * 100:.2f}%")
    return accuracy

def load_saved_model(model_path, device):
    model, _ = fine_tune_deeplabv3(num_classes=2)
    checkpoint = torch.load(model_path, map_location=device)
    model.load_state_dict(checkpoint['model_state_dict'])
    return model

# Example usage
if __name__ == "__main__":
    image_folder = "/kaggle/input/tree-binary-segmentation/images/images"
    mask_folder = "/kaggle/input/tree-binary-segmentation/masks/masks"
    save_path = "tree_segmentation_model.pth"
    
    # Load data
    train_loader, test_loader = load_data(image_folder, mask_folder, batch_size=16)
    
    # Initialize model
    model, device = fine_tune_deeplabv3(num_classes=2)
    
    # Train model
    train_model(model, train_loader, device, epochs=5, save_path=save_path)
    
    # Evaluate model
    evaluate_model(model, test_loader, device)