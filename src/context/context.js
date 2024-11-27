import { useState, useContext, createContext } from "react"

export const Context = createContext(null);

export const ContextProvider = ({ children }) => {
    const [currentProtocolVisualization, setCurrentProtocolVisualization] = useState(null);
    const [jsonResponse, setJsonResponse] = useState(null);
    const [selectedProtocol, setSelectedProtocol] = useState(null);
    const [loading, setLoading] = useState(false);
    const [pendingReloads, setPendingReloads] = useState(0);

    const ContextValue = {
        currentProtocolVisualization, setCurrentProtocolVisualization,
        jsonResponse, setJsonResponse,
        selectedProtocol, setSelectedProtocol,
        loading, setLoading,
        pendingReloads, setPendingReloads,
    };

    return (
        <Context.Provider value={ContextValue}>
            {children}
        </Context.Provider>
    )
}

export const useContextProvider = () => {
    const context = useContext(Context);

    if (!context)
        throw new Error("Context must be used within a ContextProvider");

    return context;
}