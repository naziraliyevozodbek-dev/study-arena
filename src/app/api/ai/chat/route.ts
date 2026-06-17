import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // MOCK AI LOGIC
    // In production, you would use OpenAI SDK, Google Gemini API, or Anthropic.
    // Example (OpenAI):
    // const completion = await openai.chat.completions.create({
    //   messages: [{ role: "system", content: "You are a helpful tutor..." }, { role: "user", content: message }],
    //   model: "gpt-4",
    // });
    // const reply = completion.choices[0].message.content;

    // We'll create a simple keyword-based mock for demonstration
    let reply = "That's an interesting question! I am a mock AI currently, but I'm ready to be wired up to a real LLM provider like Gemini or OpenAI.";
    
    const msgLower = message.toLowerCase();
    if (msgLower.includes("hello") || msgLower.includes("hi")) {
      reply = "Hello! Ready to learn some German or English today?";
    } else if (msgLower.includes("german") || msgLower.includes("deutsch")) {
      reply = "Die deutsche Sprache ist wunderbar! How can I help you? Do you want to practice cases (Nominativ, Akkusativ, Dativ, Genitiv)?";
    } else if (msgLower.includes("ielts")) {
      reply = "For IELTS, practice is key. I can help you with writing task 2 or speaking practice. What would you prefer?";
    } else if (msgLower.includes("streak") || msgLower.includes("xp")) {
      reply = "You can earn XP by completing daily quests and keeping your streak alive! Keep it up!";
    }

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('AI API error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
