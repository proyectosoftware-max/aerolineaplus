import React from 'react';
import { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { DataContext } from './Context';
import MenuNavBar from "./MenuNavBarPaso5";
import raya_avionSmall from '../material/raya_avionSmall.jpg';
import dayjs from 'dayjs';
import 'dayjs/locale/es';



const monthMap = {
    'ene': 'ene',
    'feb': 'feb',
    'mar': 'mar',
    'abr': 'abr',
    'may': 'may',
    'jun': 'jun',
    'jul': 'jul',
    'ago': 'ago',
    'sep': 'sept',
    'oct': 'oct',
    'nov': 'nov',
    'dic': 'dic'
};

const formatDate = (date) => {
    // Formato corto del día de la semana, número del día y mes
    const formattedDate = dayjs(date).format('ddd D MMM YYYY'); // Ej: "Thu 12 Sep"

    // Separar el formato en partes
    let [weekday, day, monthAbbreviation] = formattedDate.split(' ');

    // Eliminar cualquier punto en el día de la semana (si existe)
    weekday = weekday.replace('.', '');

    // Capitalizar la primera letra del día de la semana
    const capitalizedWeekday = weekday.charAt(0) + weekday.slice(1);

    // Mapea la abreviación del mes al español usando el mapa personalizado
    const capitalizedMonth = monthMap[monthAbbreviation.toLowerCase()] || monthAbbreviation;

    // Retorna el formato final, por ejemplo "Jue, 12 Sept"
    return `${capitalizedWeekday}, ${capitalizedMonth} ${day}`;
};

const Paso5 = () => {
    
    const { setSharedData, selectedDate, fecha, setFecha, origen, setSalida, setLlegada, destino, setPrecio, setColorBoton } = useContext(DataContext);
    const { ida, vuelta, precio, salida, llegada, tiempo, nombre, apellido, colorboton } = useParams();

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

    const enviarBanco = () => {
        window.location.href = `https://bancoaerolinea.onrender.com/?nombre=${encodeURIComponent(nombre)}&apellido=${encodeURIComponent(apellido)}`;

    }

    return (
        <>
            <div className="paso3"  >
                <MenuNavBar />


                <div className="contendorPaso3" >
                    <label className="titulo">Pagar y confirmar reserva</label>
                    <div className="div_resumen">
                        <p className="resumenCompra">Resumen de compra</p>
                        <label className="label_total">Total a pagar</label>
                        <label className="label_precio">${precio}<label className="label_cop_pagos">COP</label></label>
                    </div>

                    <div className="div_seleccion">
                        <p className="p_seleccion">Tu selección</p>
                        <p>vuelo de salida| <label>{formatDate(selectedDate)}</label></p>
                        <table className="tabla" style={{ width: '20%', borderCollapse: 'collapse' }}>
                            <tbody>
                                <tr>
                                    <td style={{ width: '15%', textAlign: 'center', verticalAlign: 'middle' }}>
                                        <div>
                                            <label style={{ display: 'block', fontSize: '15px', fontWeight: 'bold' }}>{salida}</label>
                                            <p style={{ marginRight: '20px', fontSize: '15px' }}>{ida}</p>
                                        </div>
                                    </td>
                                    <td style={{ width: '35%', textAlign: 'center'/*, border: '1px solid blue'*/ }}>
                                        <div style={{ marginTop: '-10px' }}>
                                            <label className='label_directoPaso3' >Vuelo Directo</label>


                                            <img src={raya_avionSmall} />
                                            <p className='label_tiempoPaso3'>{tiempo}</p>

                                        </div>
                                    </td>
                                    <td style={{ width: '25%', textAlign: 'center', verticalAlign: 'middle' }}>
                                        <div style={{ marginRight: '180px', overflow: 'visible', paddingRight: '50px', height: '70px' }}>
                                            <label style={{ display: 'block', fontSize: '15px', fontWeight: 'bold' }}>{llegada}</label>
                                            <p style={{ marginLeft: '2px', fontSize: '15px' }}>{vuelta}</p>
                                        </div>
                                    </td>

                                </tr>
                            </tbody>
                        </table>


           <div className="div_datosPaso3Movil">
           <label style={{ display: 'block', fontSize: '15px', fontWeight: 'bold' }}>{salida}</label>
                        <p style={{ marginRight: '20px', fontSize: '15px' }}>{ida}</p>


                        <div style={{ marginTop: '-10px' }}>
                            <label className='label_directoPaso3' >Vuelo Directo</label>


                            <p><img src={raya_avionSmall} /></p>
                            <p className='label_tiempoPaso3'>{tiempo}</p>

                        </div>


                        <div>
                            <label style={{ display: 'block', fontSize: '15px', fontWeight: 'bold' }}>{llegada}</label>
                            <p style={{ marginLeft: '2px', fontSize: '15px' }}>{vuelta}</p>
                        </div>
           </div>

                        


                        <button className="botonPagar" onClick={enviarBanco} >Confirmar y pagar</button>
                    </div>

                </div>


            </div>
            <div className="div_piePagina">
                <label className="label_piePagina1" >Consulta todas las condiciones de <a className='a_retracto' href="/">retracto y desistimiento </a> aplicables para Colombia.</label >
                <label className="label_piePagina2">© Avianca S.A 2024</label>
            </div>
        </>
    )
}

export default Paso5;