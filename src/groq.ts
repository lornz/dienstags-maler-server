import Groq from "groq-sdk";

const groq = new Groq({ apiKey: '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' });

export async function getGroqChatCompletion(base64Image: string) {
  console.log('call croq please');
  return groq.chat.completions.create({
    messages: [
          {
              role: "user",
              content: [
                  { type: "text", text: "What's in this image? Please just name the object, don't add long explanations.. leave out the, a and stuff too, just one word basically" },
                  {
                      type: "image_url",
                      image_url: {
                          url: `${base64Image}`,
                      },
                  },
              ],
          },
      ],
      model: "llama-3.2-11b-vision-preview",
  });
}
