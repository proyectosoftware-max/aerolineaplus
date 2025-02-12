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
    const [contarAdulto, setContarAdulto] = useState(localStorage.getItem('contarAdulto') || 1);
    const [adulto, setAdulto] = useState(localStorage.getItem('adulto') || 'Adulto');
    const [pasajero, setPasajero] = useState(localStorage.getItem('pasajero') || 'Pasajero' );

    return (
        <DataContext.Provider value={{ sharedData, setSharedData, fecha, setFecha, salida, setSalida, llegada, setLlegada, origen, setOrigen, destino, setDestino, precio, setPrecio, colorboton, setColorBoton, contarAdulto, setContarAdulto, adulto, setAdulto, pasajero, setPasajero }}>
            {children}
        </DataContext.Provider>
    );
};

