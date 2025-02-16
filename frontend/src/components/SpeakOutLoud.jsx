import { Volume, Volume2 } from 'lucide-react'
import { useState, useEffect } from 'react'

const SpeakOutLoud = ({ message }) => {
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [selectedVoice, setSelectedVoice] = useState(null)

  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices()
      if (voices.length === 0) {
        // Retry loading voices after a short delay
        setTimeout(loadVoices, 100)
        return
      }

      // Pick a fixed female-sounding voice or Hindi voice
      const preferredVoice =
        voices.find(
          (v) =>
            v.name.includes('Google Hindi') || v.name.includes('Google हिन्दी')
        ) || voices[0] // Default to the first available voice if none match

      setSelectedVoice(preferredVoice)
    }

    loadVoices()
    window.speechSynthesis.onvoiceschanged = loadVoices
  }, [])

  const speak = (text) => {
    if (!text || !selectedVoice) {
      console.log('Text or voice not available')
      return
    }
    console.log('Speaking:', text, selectedVoice)
    const synth = window.speechSynthesis
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.voice = selectedVoice

    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)

    synth.speak(utterance)
  }

  return (
    <div className='chat-response'>
      {/* Speak button */}
      <button onClick={() => speak(message)} disabled={isSpeaking}>
        {isSpeaking ? <Volume size={20} /> : <Volume2 />}
      </button>
    </div>
  )
}

export default SpeakOutLoud
