import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY!)

export const getGeminiModel = () => {
  return genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
    generationConfig: {
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 1024,
    },
    safetySettings: [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ],
  })
}

export const generateMentalHealthResponse = async (userMessage: string, context?: string[]) => {
  const model = getGeminiModel()

  const systemPrompt = `You are a compassionate, professional mental health AI assistant for HealSpace, a mental health support platform. Your role is to provide supportive, empathetic responses while being clear that you are not a licensed therapist and cannot provide professional mental health treatment.

Key guidelines:
- Always be empathetic, non-judgmental, and supportive
- Encourage professional help when appropriate
- Never diagnose conditions or prescribe treatments
- Focus on active listening and validation
- Suggest healthy coping strategies when relevant
- Remind users that you're an AI assistant, not a replacement for professional care
- Keep responses conversational but professional
- If users express crisis thoughts, direct them to emergency resources

Platform context: HealSpace offers anonymous peer support, professional therapy booking, mood tracking, journaling, and support groups.

${context ? `Recent conversation context: ${context.join(' | ')}` : ''}

Respond to the user's message in a supportive, helpful way.`

  try {
    const result = await model.generateContent([
      systemPrompt,
      `User: ${userMessage}`,
      '\nAssistant:'
    ])

    const response = result.response
    let text = response.text()

    // Clean up the response
    text = text.replace(/^Assistant:\s*/i, '').trim()

    // Add disclaimer if not present
    if (!text.includes('licensed') && !text.includes('professional')) {
      text += '\n\n*Remember, I\'m an AI assistant. For personalized professional support, consider speaking with a licensed therapist through HealSpace.*'
    }

    return text
  } catch (error) {
    console.error('Gemini API error:', error)
    return 'I\'m sorry, I\'m having trouble responding right now. Please try again in a moment, or consider reaching out to a human support specialist through HealSpace.'
  }
}

export const generateCrisisResponse = () => {
  return `I'm really concerned about what you're sharing, and I want to make sure you get the immediate help you need. While I'm here to listen, I'm not equipped to handle crisis situations.

Please reach out immediately to one of these crisis resources:

**Emergency Services:**
- Call emergency services (911 in the US, 112 in Europe, or your local emergency number)
- Go to your nearest emergency room

**Crisis Hotlines:**
- National Suicide Prevention Lifeline: 988 (US)
- Crisis Text Line: Text HOME to 741741 (US)
- International Association for Suicide Prevention: Find local resources at befrienders.org

**HealSpace Professional Support:**
- Book an urgent therapy session through our platform
- Join our 24/7 crisis support group

Your safety is the most important thing. Please don't hesitate to reach out for immediate help. You're not alone in this.`
}

export const isCrisisMessage = (message: string): boolean => {
  const crisisKeywords = [
    'suicide', 'kill myself', 'end it all', 'not worth living',
    'want to die', 'better off dead', 'self harm', 'cutting',
    'overdose', 'hurt myself', 'can\'t go on', 'give up',
    'emergency', 'crisis', 'help me now'
  ]

  const lowerMessage = message.toLowerCase()
  return crisisKeywords.some(keyword => lowerMessage.includes(keyword))
}