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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrJoinSession = void 0;
const groq_1 = require("./groq");
const sessions = new Map();
function createOrJoinSession(sessionName, player) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        const currentSession = sessions.get(sessionName);
        if (currentSession) {
            currentSession === null || currentSession === void 0 ? void 0 : currentSession.players.push(player);
            return currentSession;
        }
        else {
            const session = {
                sessionName,
                task: (_c = (_b = (_a = (yield (0, groq_1.createTask)())) === null || _a === void 0 ? void 0 : _a.choices[0]) === null || _b === void 0 ? void 0 : _b.message) === null || _c === void 0 ? void 0 : _c.content,
                players: [player]
            };
            sessions.set(sessionName, session);
            return session;
        }
    });
}
exports.createOrJoinSession = createOrJoinSession;
