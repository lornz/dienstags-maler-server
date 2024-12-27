"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTask = exports.getGroqChatCompletion = void 0;
const groq_sdk_1 = __importDefault(require("groq-sdk"));
const groq = new groq_sdk_1.default({ apiKey: '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' });
function getGroqChatCompletion(base64Image) {
    return __awaiter(this, void 0, void 0, function* () {
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
    });
}
exports.getGroqChatCompletion = getGroqChatCompletion;
function createTask() {
    return __awaiter(this, void 0, void 0, function* () {
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
    });
}
exports.createTask = createTask;
