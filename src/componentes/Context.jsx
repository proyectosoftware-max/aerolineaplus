import React, { createContext, useState } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [sharedData, setSharedData] = useState(localStorage.getItem('sharedData') || '');
    const [fecha, setFecha] = useState(localStorage.getItem('fecha') || '');
    const [origen, setOrigen] = useState(localStorage.getItem('origen') || '');
    const [destino, setDestino] = useState(localStorage.getItem('destino') || '');
    const [salida, setSalida] = useState(localStorage.getItem('salida') || '');
    const [llegada, setLlegada] = useState(localStorage.getItem('llegada') || '');
    const [precio, setPrecio] = useState(localStorage.getItem('precio') || 0);
    const [colorboton, setColorBoton] = useState(localStorage.getItem('colorboton') || ''); 

    return (
        <DataContext.Provider value={{ sharedData, setSharedData, fecha, setFecha, salida, setSalida, llegada, setLlegada, origen, setOrigen, destino, setDestino, precio, setPrecio, colorboton, setColorBoton }}>
            {children}
        </DataContext.Provider>
    );
};

