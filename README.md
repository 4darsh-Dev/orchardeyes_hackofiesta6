# 🌳 Smart Apple Orchard Management System

## Overview
A comprehensive solution for automated orchard management utilizing AI-powered image analysis, blockchain technology, and autonomous UAV drones.



## 🚀 Features

| **Category**               | **Details**                                                                 |
|----------------------------|-----------------------------------------------------------------------------|
| **Autonomous UAV Drone**   | High-res RGB camera, multispectral/thermal imaging, GPS navigation, LiDAR obstacle detection, real-time data transmission |
| **AI Image Analysis**      | Early pest detection (CNN/YOLO), disease identification, growth stage monitoring, yield prediction |
| **IoT Integration**        | Soil health monitoring, weather station integration, real-time environmental tracking |
| **AI Voice Assistant**     | Multilingual support, RAG-powered responses, voice/text input, farm management suggestions |
| **Blockchain Marketing**   | Virtual orchard tours, product traceability, transparent supply chain, digital certification |

## 🛠️ Tech Stack

| **Category**   | **Technologies**                                                                 |
|----------------|---------------------------------------------------------------------------------|
| **Frontend**   | React + Vite, TailwindCSS, React Native (Mobile App)                            |
| **Backend**    | Flask (Python), Express.js (Node.js), PostgreSQL, Pinecone/Chroma DB (Vector Storage) |
| **AI/ML**      | PyTorch, OpenCV, YOLO family models, Weights & Biases (Model training)          |
| **Blockchain** | Avalanche Network                                                               |


## 📋 Prerequisites
* Python 3.10
* Node.js 16+
* Supabase with prisma ORM support or use local PostreS DB

## 🔧 Installation & Setup

### Clone Repo:
```bash
   git clone https://github.com/4darsh-Dev/orchardeyes_hackofiesta6.git
   cd orchardeyes_hackofiesta6
```
## 🚀 Running the Application

### 1. Launch frontend application
```bash
cd frontend
npm install ( # downloading packages)
npm run dev
```

### 2. Start backend services
#### A> Flask server
```bash
# USE PYTHON STABLE --> 10.12  to avoid package misconfig
cd ai/server 
python -m venv myenv (#creating virual env)
pip install -r requirements.txt ( # installing python dependencies)
source myenv/bin/activate (# linux) # activate virtual environment
./myenv/Script/Activate (#windows)
```
```bash
  python app.py
```
#### B> ExpressJS Server
```bash
  cd backend
  npm install
  node app.js
```


### 3. ML Model Demo
#### Make sure to install requirements.txt located in ai/server for packages before using
```bash
   cd experiment/scripts
   # tree part classification model gradio app
   gradio tree_part_cls/app.py

   # leaf_disease demo
   gradio leaf_disease_predict/app.py

   # tree_detect
   gradio tree_detect/app.py
```


### 5. Set up environment variables
```bash
cp .env.example .env
# Update .env with your configurations
```



## 📝 License
This project is licensed under the MIT License - see the [LICENSE](https://github.com/4darsh-Dev/orchardeyes_hackofiesta6/blob/main/LICENSE) file for details.

## 📞 Support
For support, email **vkadarsh.maurya@gmail.com**
