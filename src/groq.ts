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

export async function createTask() {
  return groq.chat.completions.create({
    messages: [
        {
          role: "system",
          content: "You are the game master for a multiplayer game of draw and game",
        },
        // Set a user message for the assistant to respond to.
        {
          role: "user",
          content: "Reply with a task for the other players to draw. Only reply with the task itself, no additional information. e.g. 'Draw a cat', 'Draw a house', etc.",
        },
      ],
      model: "llama3-8b-8192",
  });
}
