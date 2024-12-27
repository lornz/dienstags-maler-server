import Groq from "groq-sdk";

const groq = new Groq({ apiKey: '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' });

export async function main() {
  const chatCompletion = await getGroqChatCompletion();
  // Print the completion returned by the LLM.
  console.log(chatCompletion.choices[0]?.message?.content || "");
}

export async function getGroqChatCompletion(base64Image) {
  return groq.chat.completions.create({
    messages: [
          {
              role: "user",
              content: [
                  { type: "text", text: "What's in this image? Please just name the object, don't add long explanations.. leave out the, a and stuff too, just one word basically" },
                  {
                      type: "image_url",
                      image_url: {
                          url: `data:image/jpeg;base64,${base64Image}`,
                      },
                  },
              ],
          },
      ],
      model: "llama-3.2-11b-vision-preview",
  });
}

main();