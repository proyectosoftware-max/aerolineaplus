import React from 'react';
import {useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MenuNavBar from './MenuNavBarPaso4';
import { DataContext } from './Context';
import PiePagina from './PiePagina';

const Paso4 = () => {

    const { setSharedData, selectedDate, fecha, setFecha, origen, setSalida, setLlegada, destino, setPrecio, setColorBoton } = useContext(DataContext);
    const { ida, vuelta, precio, salida, llegada, tiempo, nombre, apellido, colorboton } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.setItem('fecha', setFecha(selectedDate));
    }, [selectedDate]);

    useEffect(() => {
        localStorage.setItem('precio', setPrecio(precio));
    }, [precio]);

    useEffect(() => {
        localStorage.setItem('salida', setSalida(salida));
      }, [salida]);
    
      useEffect(() => {
        localStorage.setItem('llegada', setLlegada(llegada));
      }, [llegada]);
  
      useEffect(() => {
        localStorage.setItem('colorboton', setColorBoton(colorboton));
      }, [colorboton]);

    const enviar = () => {
        navigate(`/paso5/${origen}/${destino}/${ida}/${vuelta}/${tiempo}/${precio}/${salida}/${llegada}/${nombre}/${apellido}/${colorboton}`);
    }

    return (
        <>
            <div className="div_paso4">
                <MenuNavBar />
                <div className='contenedorPaso4'>
                    <p className='p_disfruta'>Disfruta comodamente de tu viaje en nuestros asientos</p>
                    <p className='p_continua'>Continua para ingresar a la pasarela de pagos</p>
                </div>
                <button className='boton_continuar' onClick={enviar} >
                    Continuar 
                </button>

            </div>
            <PiePagina />
        </>
    )

}

export default Paso4