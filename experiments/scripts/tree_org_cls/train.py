import wandb
from ultralytics import YOLO
import yaml
from pathlib import Path

def train(config=None):
    with wandb.init(config=config):
        config = wandb.config


        # Train the model with updated parameters
        results = model.train(
            data='/kaggle/working/dataset.yml',
            epochs=config.epochs,
            batch=config.batch_size,
            imgsz=config.imgsz,
            lr0=config.lr0,
            lrf=config.lrf,
            momentum=config.momentum,
            weight_decay=config.weight_decay,
            device='0'  # Use GPU. Change to 'cpu' if no GPU available
        )

        # Log metrics to wandb
        wandb.log({
            "mAP50": results.results_dict['metrics/mAP50(B)'],
            "mAP50-95": results.results_dict['metrics/mAP50-95(B)']
        })

        # Save the model
        model.export(format='onnx')
        wandb.save('best.onnx')

if __name__ == '__main__':
    sweep_config = {
        'method': 'bayes',
        'metric': {'name': 'mAP50-95', 'goal': 'maximize'},
        'parameters': {
            'epochs': {'values': [50, 100]},
            'batch_size': {'values': [8, 16]},
            'imgsz': {'values': [ 640]},
            'lr0': {'min': 1e-5, 'max': 1e-1},
            'lrf': {'min': 0.01, 'max': 1.0},
            'momentum': {'min': 0.6, 'max': 0.98},
            'weight_decay': {'min': 0.0001, 'max': 0.1}
        }
    }

    sweep_id = wandb.sweep(sweep_config, project="apple_tree_detection_1k_100epoch")
    
    # n of cycles
    wandb.agent(sweep_id, train, count=1) 