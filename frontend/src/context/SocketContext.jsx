import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext.jsx";
import io from "socket.io-client";

const SocketContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useSocketContext = () => {
    return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const { authUser } = useAuthContext();

    useEffect(() => {
        if (authUser) {
            console.log("Connecting socket...");
            const socket = io("https://chatapp-kzi3.onrender.com", {
                query: {
                    userId: authUser._id,
                },
            });

            setSocket(socket);

            socket.on("connect", () => {
                console.log("Socket connected!");
            });

            socket.on("getOnlineUsers", (users) => {
                console.log("Received online users:", users);
                setOnlineUsers(users);
            });

            return () => {
                console.log("Closing socket...");
                socket.close();
            };
        } else {
            if (socket) {
                console.log("Closing socket...");
                socket.close();
                setSocket(null);
            }
        }
    }, [authUser]);


    return <SocketContext.Provider value={{ socket, onlineUsers }}>{children}</SocketContext.Provider>;
};