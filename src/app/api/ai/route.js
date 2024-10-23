import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  if (req.method !== "POST") {
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 }
    );
  }

  try {
    const { titles } = await req.json();

    const prompt = `Generate 5 creative and engaging YouTube video titles based on the following existing title(s): ${titles.join(
      ", "
    )}. The new titles should be similar in theme but more captivating and optimized for clicks.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that generates creative YouTube titles.",
        },
        { role: "user", content: prompt },
      ],
      max_tokens: 200,
      n: 1,
      temperature: 0.7,
    });

    const generatedText = completion.choices[0].message.content.trim();
    const generatedTitles = generatedText
      .split("\n")
      .filter((title) => title.trim() !== "");

    return NextResponse.json({ titles: generatedTitles });
  } catch (error) {
    console.error("Error generating titles:", error);
    return NextResponse.json(
      { message: "Error generating titles" },
      { status: 500 }
    );
  }
}
