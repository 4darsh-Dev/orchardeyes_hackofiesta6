import { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import VoiceInput from "./VoiceInput"
import ChatBotImg from "../assets/chatbot-img.png"
import { getChatbotResponse } from "../api"
import { getPrediction } from "../utils/gradioConfig"
import { SyncLoader } from "react-spinners"
const Main = styled.div.withConfig({
    shouldForwardProp: (prop) => !["isOpened"].includes(prop),
})`
    z-index: ${({ isOpened }) => (isOpened ? 50 : -100)};
`
const ChatbotContainer = styled.div`
    padding: 10px;
    width: 300px;
    height: 400px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

const MessagesContainer = styled.div`
    display: flex;
    margin-bottom: 10px;
    flex-direction: column;
    align-items: flex-end;
    height: 40vh;
    overflow-y: scroll;
    letter-spacing: 1px;
`

const Message = styled.div.withConfig({
    shouldForwardProp: (prop) => !["sender"].includes(prop),
})`
    display: inline-block;
    padding: 5px;
    margin: 5px 0;
    align-self: ${({ sender }) =>
        sender === "user" ? "flex-end" : "flex-start"};
    text-align: ${({ sender }) => (sender === "user" ? "right" : "left")};
    background-color: ${({ sender }) =>
        sender === "user" ? "#e0f7fa" : "#f1f8e9"};
    border-radius: 10px;
`

const InputContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
`

const Button = styled.button`
    padding: 5px;
`
const TextArea = styled.textarea`
    border: 2px solid;
    padding: 5px 15px;
    resize: none;
    min-height: 42px;
    max-height: 200px;
    border-radius: 25px;
    overflow: hidden;
`

const Chatbot = () => {
    const [isOpened, setIsOpened] = useState(false)
    const [messages, setMessages] = useState([])
    const [input, setInput] = useState("")
    const [detectedLanguage, setDetectedLanguage] = useState("")
    const [gettingPrediction, setGettingPrediction] = useState(false)
    const textAreaRef = useRef(null)
    const handleSend = async () => {
        if (input.trim()) {
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: input, sender: "user" },
            ])
            setInput("")
            await botResponse()
        }
    }
    const botResponse = async () => {
        try {
            setGettingPrediction(true)
            const response = await getPrediction(input)
            setGettingPrediction(false)
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: response, sender: "bot" },
            ])
        } catch (error) {
            console.error("Error fetching chatbot response:", error)
            setGettingPrediction(false)
            setMessages((prevMessages) => [
                ...prevMessages,
                {
                    text: "Sorry, something went wrong. Please try again.",
                    sender: "bot",
                },
            ])
        }
    }
    //to submit input on enter
    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            handleSend()
        }
    }

    //voice input function
    const handleVoiceInput = (transcript) => {
        setInput(transcript)
        // You can also automatically send the transcript to your AI chatbot here
    }
    const handleLanguageDetected = (language) => {
        console.log("Detected language:", language)
        setDetectedLanguage(language)
        // You might want to update your UI or inform your chatbot about the detected language
    }
    // Function to adjust the height of the textarea
    const adjustTextareaHeight = () => {
        const textarea = textAreaRef.current
        if (textarea) {
            // Reset the height to auto to calculate the new height
            textarea.style.height = "auto"
            // Set the height to the scrollHeight (content height)
            textarea.style.height = `${textarea.scrollHeight}px`
        }
    }
    useEffect(() => {
        adjustTextareaHeight()
    }, [input])
    return (
        <>
            <Main
                className="fixed bottom-24 right-4 flex flex-col gap-6 items-end transition-all duration-500"
                isOpened={isOpened}
            >
                {/* {isOpened && (
                <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"></div>
            )} */}
                <ChatbotContainer
                    className={`bg-white shadow-xl ${isOpened ? "scale-100" : "scale-0"} transition-transform duration-500 rounded-md `}
                >
                    <div className="bg-red-800 h-10 rounded-md flex items-center px-2 justify-between">
                        <h3 className="text-white text-lg">ChatBot</h3>
                        <i className="fa-solid fa-ellipsis text-white"></i>
                    </div>
                    <MessagesContainer className="custom-scrollbar text-sm">
                        {messages.map((msg, index) => (
                            <Message key={index} sender={msg.sender}>
                                {msg.text}
                            </Message>
                        ))}
                        {/* {gettingPrediction && ( */}
                        <Message sender="bot">
                            <SyncLoader
                                color="#7c0a0a"
                                size={10}
                                speedMultiplier={0.5}
                                loading={gettingPrediction}
                            />
                        </Message>
                        {/* )} */}
                    </MessagesContainer>
                    <InputContainer>
                        <TextArea
                            rows={1}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Type a message..."
                            onInput={adjustTextareaHeight}
                            ref={textAreaRef}
                        />
                        {detectedLanguage && (
                            <p>Detected language: {detectedLanguage}</p>
                        )}
                        <VoiceInput
                            onTranscript={handleVoiceInput}
                            onLanguageDetected={handleLanguageDetected}
                        />
                        <Button onClick={handleSend}>
                            <span className="material-symbols-outlined">
                                send
                            </span>
                        </Button>
                    </InputContainer>
                </ChatbotContainer>
            </Main>
            <div
                className="w-16 h-16 bg-red-800 rounded-full flex items-center justify-center z-110 fixed bottom-5 right-5 cursor-pointer"
                onClick={() => {
                    setIsOpened((prevIsOpened) => !prevIsOpened)
                }}
            >
                {!isOpened ? (
                    <img src={ChatBotImg} alt="chatbot" className="h-12" />
                ) : (
                    <i className="fa-solid fa-x text-lg text-white"></i>
                )}
            </div>
        </>
    )
}

export default Chatbot
