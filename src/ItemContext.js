import React, { createContext, useState } from "react";

// Create Context
export const ItemContext = createContext();

export const ItemProvider = ({ children }) => {
    const [items, setItems] = useState([
        { item: 'Laptop', cost: 10000, gst: 10 },
        { item: 'Computer', cost: 20000, gst: 20 },
        { item: 'Tab', cost: 30000, gst: 30 }
    ]);

    return (
        <ItemContext.Provider value={{ items, setItems }}>
            {children}
        </ItemContext.Provider>
    );
};
