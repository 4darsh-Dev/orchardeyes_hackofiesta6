# pinecone retriever logic with vector operations

# src/retriever.py

import os
from dotenv import load_dotenv
import google.generativeai as genai
from pinecone import Pinecone, ServerlessSpec
from langchain_community.vectorstores import Pinecone as LangchainPinecone
from langchain.memory import ConversationBufferMemory
from typing import List, Optional, Dict, Any
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

dotenv_path = '/home/kalie/work/projects/OrchardEyes/ai/server/.env'

load_dotenv(dotenv_path)

class GeminiEmbedder:
    """Handles text embeddings using Google's Gemini API"""
    
    def __init__(self):
        self._configure_gemini()
        self.model_name = "text-embedding-004"
    
    def _configure_gemini(self):
        """Configure Gemini API client"""
        try:
            api_key = os.getenv("GEMINI_API_KEY")
            if not api_key:
                raise ValueError("GEMINI_API_KEY not found in environment variables")
            genai.configure(api_key=api_key)
        except Exception as e:
            logger.error(f"Failed to configure Gemini: {str(e)}")
            raise

    def embed_query(self, text: str) -> List[float]:
        """Generate embedding for a single text query"""
        try:
            response = genai.embed_content(
                model=self.model_name,
                content=text,
                task_type="retrieval_query"
            )
            print(response)
            return response['embedding']
        except Exception as e:
            logger.error(f"Embedding generation failed: {str(e)}")
            raise

class GeminiLLM:
    """Handles Gemini LLM for response generation with memory"""
    
    def __init__(self):
        self._configure_gemini()
        self.model_name = "gemini-2.0-flash"
        self.memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)
    
    def _configure_gemini(self):
        """Configure Gemini API client"""
        try:
            api_key = os.getenv("GEMINI_API_KEY")
            if not api_key:
                raise ValueError("GEMINI_API_KEY not found in environment variables")
            genai.configure(api_key=api_key)
        except Exception as e:
            logger.error(f"Failed to configure Gemini: {str(e)}")
            raise

    def generate_response(self, query: str, context: str) -> str:
        """Generate response using Gemini LLM with memory"""
        try:
            # Combine context and query
            prompt = f"Context: {context}\n\nQuestion: {query}"
            
            # Add to memory
            self.memory.save_context({"input": query}, {"output": ""})
            
            # Generate response
            response = genai.generate_content(
                model=self.model_name,
                contents=prompt
            )
            
            # Update memory with response
            self.memory.save_context({"input": query}, {"output": response.text})
            
            return response.text
        except Exception as e:
            logger.error(f"Response generation failed: {str(e)}")
            raise

class PineconeRetriever:
    """Handles Pinecone vector database operations with Gemini embeddings"""
    
    def __init__(self, index_name: str = "apple-chatbot"):
        self.index_name = index_name
        self._configure_pinecone()
        self.embedder = GeminiEmbedder()
        self.llm = GeminiLLM()
        self.index = self._get_pinecone_index()

    def _configure_pinecone(self):
        """Configure Pinecone client"""
        try:
            api_key = os.getenv("PINECONE_API_KEY")
            if not api_key:
                raise ValueError("PINECONE_API_KEY not found in environment variables")
            self.pc = Pinecone(api_key=api_key)
        except Exception as e:
            logger.error(f"Pinecone configuration failed: {str(e)}")
            raise

    def _get_pinecone_index(self):
        """Retrieve or create Pinecone index"""
        try:
            if self.index_name not in self.pc.list_indexes().names():
                self._create_index()
            return self.pc.Index(self.index_name)
        except Exception as e:
            logger.error(f"Index retrieval failed: {str(e)}")
            raise

    def _create_index(self):
        """Create new Pinecone index if not exists"""
        try:
            self.pc.create_index(
                name=self.index_name,
                dimension=768,  # Gemini embedding dimension
                metric="cosine",
                spec=ServerlessSpec(
                    cloud="aws",
                    region="us-west-2"
                )
            )
            logger.info(f"Created new index: {self.index_name}")
        except Exception as e:
            logger.error(f"Index creation failed: {str(e)}")
            raise

    def get_retriever(self, k: int = 2):
        """Create Langchain retriever with hybrid search"""
        try:
            vector_store = LangchainPinecone(
                index=self.index,
                embedding=self.embedder.embed_query,
                text_key="text"
            )
            return vector_store.as_retriever(
                search_kwargs={'k': k}
            )
        except Exception as e:
            logger.error(f"Retriever creation failed: {str(e)}")
            raise

# Utility function for easy access
def initialize_retriever(index_name: str = "apple-chatbot", k: int = 2):
    """Initialize and return configured retriever"""
    try:
        retriever = PineconeRetriever(index_name)
        return retriever
    except Exception as e:
        logger.error(f"Retriever initialization failed: {str(e)}")
        raise