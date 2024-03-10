import openai from "openai";
export async function POST(request) {
  const text = await request.json();
  const openAiKey = process.env.OPEN_AI_KEY;
  const baseURL = process.env.BASE_URL;
  
  const config = { apiKey: openAiKey };

  const openaiInstance = new openai(config);

  try {
    const aiResponse = await openaiInstance.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "Complete the user provided text, sentence must be fully complete, provide response in a JSON valid object where the response is stored in the 'response' key",
        },
        { role: "user", content: text },
      ],
      model: "gpt-3.5-turbo",
      response_format: { type: "json_object" },
      max_tokens: 50,

    });

    const responseData = aiResponse.choices[0].message.content;

    // console.log(responseData);

    return Response.json({
      status: 200,
      message: "Success",
      data: responseData,
      rawData: aiResponse,
    });
  } catch (error) {
    return Response.json({ status: 404, message: "Errro" });
  }

}
