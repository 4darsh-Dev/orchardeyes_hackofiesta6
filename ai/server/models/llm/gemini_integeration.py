# inteface with cohere api or any free api alternatives
# local llm could be used

import os
from dotenv import load_dotenv

dotenv_path = '/home/kalie/work/projects/OrchardEyes/ai/server/.env'

load_dotenv(dotenv_path)


import os
import google.generativeai as genai
from dotenv import load_dotenv
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load environment variables
dotenv_path = '/home/kalie/work/projects/OrchardEyes/ai/server/.env'
load_dotenv(dotenv_path)

class GeminiIntegration:
    """Handles interaction with Google's Gemini API"""
    
    def __init__(self, model_name: str = "gemini-2.0-flash", embedding_model: str = "text-embedding-004"):
        self.model_name = model_name
        self.embedding_model = embedding_model
        self._configure_gemini()
    
    def _configure_gemini(self):
        """Configure Gemini API client"""
        try:
            api_key = os.getenv("GEMINI_API_KEY")
            if not api_key:
                raise ValueError("GEMINI_API_KEY not found in environment variables")
            genai.configure(api_key=api_key)
            logger.info("Gemini API configured successfully.")
        except Exception as e:
            logger.error(f"Failed to configure Gemini: {str(e)}")
            raise
    
    def generate_response(self, query: str, context: str = "") -> str:
        """Generate a response from Gemini given a query and optional context"""
        try:
            prompt = f"Context: {context}\n\nQuestion: {query}"
            response = genai.GenerativeModel(self.model_name).generate_content(prompt)
            return response.text
        except Exception as e:
            logger.error(f"Response generation failed: {str(e)}")
            raise
    
    def embed_text(self, text: str):
        """Generate text embeddings using Gemini"""
        try:
            response = genai.embed_content(
                model=self.embedding_model,
                content=text,
                task_type="retrieval_query"
            )
            return response['embedding']
        except Exception as e:
            logger.error(f"Embedding generation failed: {str(e)}")
            raise

# example usage
gem = GeminiIntegration()
response = gem.generate_response(query="Tell me about apple cultivation?")
print(response)

