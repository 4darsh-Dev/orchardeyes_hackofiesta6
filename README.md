# 🌳 Smart Apple Orchard Management System

## Overview
A comprehensive solution for automated orchard management utilizing AI-powered image analysis, blockchain technology, and autonomous UAV drones.

## 🚀 Features

### **Autonomous UAV Drone System**
* High-resolution RGB camera monitoring
* Multispectral and thermal imaging
* GPS-guided precision navigation
* LiDAR-based obstacle detection
* Real-time data transmission

### **Advanced AI Image Analysis**
* Early pest detection using CNN/YOLO models
* Disease identification in fruits, flowers, and leaves
* Growth stage monitoring
* Yield prediction

### **IoT Integration**
* Soil health monitoring
* Weather station data integration
* Real-time environmental tracking

### **AI Voice Assistant**
* Multilingual support
* RAG-powered intelligent responses
* Voice and text input capabilities
* Farm management suggestions

### **Blockchain-Enabled Marketing**
* Virtual orchard tours
* Product traceability
* Transparent supply chain
* Digital certification

## 🛠️ Tech Stack

### Frontend
* React + Vite
* TailwindCSS
* React Native (Mobile App)

### Backend
* Flask (Python)
* Express.js (Node.js)
* PostgreSQL
* Pinecone/Chroma DB (Vector Storage)

### AI/ML
* PyTorch
* OpenCV
* YOLO family models
* Weights & Biases (Model training)

### Blockchain
* Avalanche Network

## 📋 Prerequisites
* Python 3.8+
* Node.js 16+
* PostgreSQL 13+
* Docker & Docker Compose

## 🔧 Installation & Setup

### 1. Clone the repository
```bash
https://github.com/4darsh-Dev/orchardeyes_hackofiesta6.git
cd orchardeyes_hackofiesta6
```

### 2. Set up Python environment
```bash
python -m venv myenv
source myenv/bin/activate  # On Windows: .\myenv\Scripts\activate
pip install -r requirements.txt
```

### 3. Install frontend dependencies
```bash
cd frontend
npm i
```

### 4. Install mobile app dependencies
```bash
cd mobile-app
npm i
```

### 5. Set up environment variables
```bash
cp .env.example .env
# Update .env with your configurations
```


## 🚀 Running the Application

### 1. Start backend services
```bash
# Start Flask server
python run.py

# Start Express server
node app.js
```

### 2. Launch frontend application
```bash
cd frontend
npm run dev
```

### 3. Run mobile application
```bash
cd mobile-app
npm run android  # For Android
npm run ios      # For iOS
```

## 🤖 Training AI Models

### 1. Prepare dataset
```bash
python scripts/prepare_data.py --input-dir /path/to/images --output-dir data/processed
```

### 2. Train YOLO model
```bash
python train.py --data data/orchard.yaml --cfg models/yolov8m.yaml --epochs 100
```


## 🤝 Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License
This project is licensed under the MIT License - see the [LICENSE](https://github.com/4darsh-Dev/orchardeyes_hackofiesta6/blob/main/LICENSE) file for details.

## 📞 Support
For support, email **vkadarsh.maurya@gmail.com**