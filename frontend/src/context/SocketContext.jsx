import { createContext } from "react";

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
    return <SocketContext.Provider>
        {children}
    </SocketContext.Provider>;

}