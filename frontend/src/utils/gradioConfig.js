import { Client } from '@gradio/client'

// const client = await Client.connect("4darsh-Dev/orchard_eyes-chatbot")
export const getPrediction = async (mssg) => {
  const client = await Client.connect('AiActivity/AI-Assistant')
  const rolePrompt =
    "You role is chatbot assistant with good conversational skills, Keep the output short (30 to 40) words maximum and You're working on Orchard Eyes : Farm management system for apple orchards. Built by Solve Ease  "

  const finalPrompt = `Role: ${rolePrompt}    
    User : ${mssg}`
  const result = await client.predict('/chat', {
    message: { text: finalPrompt }
  })
  return result.data
}
