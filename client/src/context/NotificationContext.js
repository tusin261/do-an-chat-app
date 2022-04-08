import { useState, createContext } from 'react'

const NotificationContext = createContext();

function NotificationProvider({ children }) {
    const [notifications, setNotifications] = useState([]);

    const value = {
        notifications,
        setNotifications
    }

    return (
        <NotificationContext.Provider value={value}>
            {children}
        </NotificationContext.Provider>
    )
}

export { NotificationContext, NotificationProvider }