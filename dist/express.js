"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const express_1 = __importStar(require("express"));
const axios_1 = __importDefault(require("axios"));
const groq_js_1 = require("./groq.js");
const session_js_1 = require("./session.js");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000; // Use PORT from the environment or default to 3000
let base64ImageDebug = '';
// Middleware to parse JSON payloads
app.use((0, express_1.json)());
// Endpoint to handle name submission
app.post('/submit-image', (req, res) => {
    const { name, image } = req.body;
    base64ImageDebug = image;
    if (name) {
        console.log(`Received name: ${name} and an image`);
        res.status(200).send({ message: 'Name and image logged successfully!' });
        (0, groq_js_1.getGroqChatCompletion)(image).then((chatCompletion) => {
            var _a, _b;
            console.log('got completion');
            const content = (_b = (_a = chatCompletion.choices[0]) === null || _a === void 0 ? void 0 : _a.message) === null || _b === void 0 ? void 0 : _b.content;
            console.log(content);
            // Post to https://montagsmaler-multiplayer.onrender.com/update_answer
            axios_1.default.post('https://montagsmaler-multiplayer.onrender.com/update_answer', { answer: content })
                .then(response => {
                console.log('Posted to /update_answer:', response.data);
            })
                .catch(error => {
                console.error('Error posting to /update_answer:', error);
            });
        });
    }
    else {
        res.status(400).send({ message: 'Name is required.' });
    }
});
app.post('/new-session', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { sesssionName, player } = req.body;
    // Create new session or join existing one
    console.log('create new session with name:', sesssionName, 'with player:', player);
    const session = yield (0, session_js_1.createOrJoinSession)(sesssionName, player);
    console.log('currentSession:', session);
    // Set task for player
    axios_1.default.post('https://montagsmaler-multiplayer.onrender.com/set_task', { task: session.task }).then(response => {
        console.log('Posted /set_task. Response:', response.data);
    })
        .catch(error => {
        console.error('Error posting to /set_task:', error);
    });
    if (((_a = session.players) === null || _a === void 0 ? void 0 : _a.length) > 1) {
        console.log('Session is full. Starting game...');
        // TODO: Send start game to all players
    }
}));
// Catch-all route for unmatched requests
app.use((req, res) => {
    res.status(404).send({ message: 'Endpoint not found.' });
});
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on https://dienstags-maler-server.onrender.com:${PORT}`);
});
