import gradio as gr
from langchain.prompts import PromptTemplate
from langchain_community.llms import CTransformers
from langchain_community.vectorstores import Pinecone as LangchainPinecone
from langchain.chains import RetrievalQA
from pinecone import Pinecone
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

PINECONE_API_KEY = os.getenv('PINECONE_API_KEY')
index_name = "apple-chatbot"

class AppleChatbot:
    def __init__(self, k=2, max_tokens=512, temperature=0.8):
        self.k = k
        self.max_tokens = max_tokens
        self.temperature = temperature
        self.qa_chain = self.initialize_chatbot()

    def download_hf_embeddings(self):
        from langchain_community.embeddings import HuggingFaceEmbeddings
        return HuggingFaceEmbeddings()

    def initialize_chatbot(self):
        embeddings = self.download_hf_embeddings()
        model_path = "TheBloke/Llama-2-7B-Chat-GGML"
        
        llm = CTransformers(
            model=model_path,
            model_type="llama",
            config={
                'max_new_tokens': self.max_tokens,
                'temperature': self.temperature
            }
        )
        
        # Initialize pinecone
        pc = Pinecone(api_key=PINECONE_API_KEY)
        index = pc.Index(index_name)

        # Use the same prompt template from your original application
        prompt_template = """
        You are an expert in apple cultivation and orchard management. Use the following pieces of context to answer the question at the end. 
        If you don't know the answer, just say that you don't know, don't try to make up an answer.
        
        {context}
        
        Question: {question}
        Answer:"""
        
        PROMPT = PromptTemplate(template=prompt_template, input_variables=["context", "question"])
        chain_type_kwargs = {"prompt": PROMPT}
        
        docsearch = LangchainPinecone(index, embeddings.embed_query, "text")
        qa = RetrievalQA.from_chain_type(
            llm=llm,
            chain_type="stuff",
            retriever=docsearch.as_retriever(search_kwargs={'k': self.k}),
            return_source_documents=True,
            chain_type_kwargs=chain_type_kwargs
        )
        return qa

    def get_response(self, question):
        try:
            result = self.qa_chain({"query": question})
            return result["result"]
        except Exception as e:
            return f"Error: {str(e)}"

# Initialize the chatbot
chatbot = AppleChatbot()

# Define the Gradio interface
def respond(message, history):
    response = chatbot.get_response(message)
    return response

# Create the Gradio interface
demo = gr.ChatInterface(
    respond,
    chatbot=gr.Chatbot(height=600),
    textbox=gr.Textbox(placeholder="Ask me anything about apple cultivation...", container=False),
    title="Apple Orchard Expert Chatbot",
    description="Ask questions about apple cultivation and orchard management. Built with Langchain, Pinecone, and Llama-2.",
    theme=gr.themes.Soft(),
    examples=[
        "What are the ideal conditions for growing apples?",
        "How do I prevent common apple diseases?",
        "What is the best time to harvest apples?",
    ],
    cache_examples=False,
)

# Launch the interface
if __name__ == "__main__":
    demo.launch(
        server_name="0.0.0.0",
        server_port=7860,
        share=True,
        enable_queue=True
    )