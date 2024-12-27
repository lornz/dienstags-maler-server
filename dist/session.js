"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrJoinSession = void 0;
const sessions = new Map();
function createOrJoinSession(sessionName, player) {
    const currentSession = sessions.get(sessionName);
    if (currentSession) {
        currentSession === null || currentSession === void 0 ? void 0 : currentSession.players.push(player);
        return currentSession;
    }
    else {
        const session = {
            sessionName,
            task: 'Draw a cat',
            players: [player]
        };
        sessions.set(sessionName, session);
        return session;
    }
}
exports.createOrJoinSession = createOrJoinSession;
