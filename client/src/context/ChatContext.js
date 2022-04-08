import { useState, createContext } from 'react'

const ChatContext = createContext();

function ChatProvider({ children }) {
    const [conversations, setConversations] = useState([]);

    const value = {
        conversations,
        setConversations
    }

    return (
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
    )
}

export { ChatContext, ChatProvider }