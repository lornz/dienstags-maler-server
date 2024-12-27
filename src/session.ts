const sessions: Map<string, Session> = new Map();


export interface Session {
    sessionName: string;
    task: string;
    players: string[];
}

export function createOrJoinSession(sessionName: string, player: string): Session {
    const currentSession = sessions.get(sessionName);
    if (currentSession) {
        currentSession?.players.push(player);
        return currentSession;
    } else {
        const session: Session = {
            sessionName,
            task: 'Draw a cat', // TODO: Make dynamic with groq
            players: [player]
        };
        sessions.set(sessionName, session);
        return session;
    }
}