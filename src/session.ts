import { createTask } from "./groq";

const sessions: Map<string, Session> = new Map();


export interface Session {
    sessionName: string;
    task: string;
    players: string[];
}

export async function createOrJoinSession(sessionName: string, player: string): Promise<Session> {
    const currentSession = sessions.get(sessionName);
    if (currentSession) {
        currentSession?.players.push(player);
        return currentSession;
    } else {
        const session: Session = {
            sessionName,
            task: (await createTask())?.choices[0]?.message?.content as string,
            players: [player]
        };
        sessions.set(sessionName, session);
        return session;
    }
}