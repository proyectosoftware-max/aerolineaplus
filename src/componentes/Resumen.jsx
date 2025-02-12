import React, { useState, useEffect, useContext } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import MenuNavBar from './MenuNavBarResumen.jsx';
import PiePagina from './PiePagina.jsx';
import { DataContext } from './Context';
import datos from './vuelos.json';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import imagen_opcion from '../material/opcionBasic.jpg';
import raya_avion from '../material/raya_avion.jpg';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Padding } from '@mui/icons-material';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
dayjs.locale('es');



const Resumen = () => {
  const { sharedData } = useContext(DataContext);
  const [selectedDate, setSelectedDate] = useState(new Date()); // Fecha seleccionada
  const { setSharedData, fecha, setFecha, origen, setSalida, setLlegada, destino, setPrecio, setColorBoton, contarAdulto, setContarAdulto, adulto, setAdulto, pasajero, setPasajero } = useContext(DataContext);
  const [open, setOpen] = React.useState(false);
  const { ida, vuelta, tiempo, precio, salida, llegada, colorboton, contaradulto, adultopasajero } = useParams();
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    localStorage.setItem('fecha', setFecha(selectedDate));
  }, [selectedDate]);

  useEffect(() => {
    localStorage.setItem('sharedData', setSharedData(formatDateWithYear(selectedDate)));
  }, [selectedDate]);



  const formatDateWithYear = (date) => {
    const options = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('es-ES', options);

    // Convertir la primera letra del mes y el día de la semana a mayúscula
    const [weekdayWithComma, day, month, year] = formattedDate.split(' ');
    const weekday = weekdayWithComma.replace(',', '').charAt(0).toUpperCase() + weekdayWithComma.slice(1, -1);
    const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);

    // Combinar todas las partes con puntos
    return `${weekday}. ${day} ${capitalizedMonth}. ${year}`;
  };

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

  useEffect(() => {
    localStorage.setItem('contarAdulto', setContarAdulto(contaradulto));
  }, [contaradulto]);

  useEffect(() => {
    localStorage.setItem('adulto', setAdulto(adultopasajero));
  }, [adultopasajero]);

  useEffect(() => {
    localStorage.setItem('pasajero', setPasajero(adultopasajero));
  }, [adultopasajero]);

  const Paso2 = () => {
    navigate(`/paso2/${origen}/${destino}/${ida}/${vuelta}/${tiempo}/${precio}/${salida}/${llegada}/${colorboton}/${contarAdulto}/${adultopasajero}`);
  }

  return (
    <>
      <MenuNavBar />
      <div className='fondoPaso1' style={{ marginBottom: '150px' }}>
        <div className='div_escritorioResumen'>
          <p className='p_ida'><label style={{ marginLeft: '5px', marginRight: '5px', fontSize: '30px' }}>Resumen de viaje</label></p>
          <p className='p_ida'><FlightTakeoffIcon sx={{ fontSize: '30px' }} />Ida: {origen} <label style={{ marginLeft: '5px', marginRight: '5px' }}>a</label>{destino}</p>

          <div className='div_datos'>
            <div style={{ marginLeft: '40px' }}>{sharedData}</div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <tbody>
                <tr>
                  <td style={{ width: '15%', textAlign: 'center', verticalAlign: 'middle' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '30px', fontWeight: 'bold' }}>{salida}</label>
                      <p style={{ marginRight: '30px', fontSize: '20px', fontWeight: 'bold' }}>{ida}</p>
                    </div>
                  </td>
                  <td style={{ width: '35%', textAlign: 'center'/*, border: '1px solid blue'*/ }}>
                    <div style={{ marginTop: '-10px' }}>
                      <p style={{ margin: 0, textDecoration: 'underline', color: ' rgb(62, 168, 255)' }}>Directo</p>
                      <img src={raya_avion} alt="Avion" style={{ display: 'block', margin: '0 auto' }} />
                      <p style={{ marginTop: '10px' }}>{tiempo}</p>
                    </div>
                  </td>
                  <td style={{ width: '25%', textAlign: 'center', verticalAlign: 'middle' }}>
                    <div style={{ marginRight: '80px' }}>
                      <label style={{ display: 'block', fontSize: '30px', fontWeight: 'bold' }}>{llegada}</label>
                      <p style={{ marginLeft: '30px', fontSize: '20px', fontWeight: 'bold' }}>{vuelta}</p>
                    </div>
                  </td>
                  <td style={{ width: '25%', textAlign: 'center', verticalAlign: 'middle' }}>
                    <div style={{ marginLeft: '-100px' }}>
                      <label style={{ display: 'block', marginRight: '150px' }}>Desde</label>
                      <label style={{ margin: 0, fontSize: '40px', fontWeight: 'bold', marginTop: '-15px' }}>
                        <label style={{ fontSize: '15px', fontWeight: 'bold', marginRight: '10px' }}>COP</label>
                        {precio}
                      </label>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className='div_MovilResumen'> 
        <p ><label style={{ marginLeft: '5px', marginRight: '5px', fontSize: '25px', fontWeight:'bold' }}>Resumen de viaje</label></p>
          <p style={{fontSize:'20px', fontWeight:'bold'}} ><FlightTakeoffIcon sx={{ fontSize: '20px' }} />Ida: {origen} <label style={{ marginLeft: '5px', marginRight: '5px' }}>a</label>{destino}</p>

          <div className='div_datosMovil'>
            <div className='div_contendedorMovil' >
                                        <div className='div_subContenedorMovil'>

                                            <div className='div_origenMovil'>
                                                <label className='label_salidaMovil' >{salida}</label>
                                            </div>
                                            <div className='div_trayectoMovilResumen' style={{marginTop:'42px'}}>
                                                <label className='label_trayecto'>
                                                    <label className='label_directoMovil' >{sharedData}<label className='letra_directo'>Directo </label> </label>
                                                </label>
                                            </div>

                                            <div className='div_contenedorDatosVuelosMovil'>
                                                <AirplanemodeActiveIcon style={{ transform: 'rotate(90deg)', marginLeft: '5px', fontSize: '18px' }} />
                                            </div>

                                            <div className='div_destinoMovil'>
                                                <label className='label_llegadaMovil'>{llegada}</label>
                                            </div>

                                            <div className='div_categoriaMovil' >
                                                <label className={`label_categoriaMovil-${colorboton}`}>
                                                   {colorboton}
                                                </label>
                                              
                                            </div>

                                            <div className='div_valorPasajeMovil' style={{marginTop:'15px'}}>
                                                <label className='label_valorPasajeMovil'>
                                                    COP 
                                                </label>
                                               {precio}
                                            </div>
                                        </div>
                                    </div>
          </div>
        </div>

        <div>
          <div >
            <Accordion className='div_accordionEscritorio'  >
              <AccordionSummary expandIcon={<ExpandMoreIcon />} className='TypographyparrafoPrimero'>
                <Typography variant="body2" className='TypographyparrafoPrimero' >
                <NotificationsIcon sx={{color: 'orange'}} /> <strong>Ten en cuenta</strong><br />
                  <ul style={{ listStyle:'disc' }}>
                    <li style={{border: 'none', backgroundColor: 'inherit', color: 'inherit', cursor: 'default'}}>En las tarifas light, basic y classic, los reembolsos no están permitidos y los cambios de itinerario implican cargos adicionales.</li>
                    <li style={{border: 'none', backgroundColor: 'inherit', color: 'inherit', cursor: 'default'}}>Para más información puedes consultar las condiciones de tu tarifa.</li>
                   </ul>
                  
                  
                </Typography>
              </AccordionSummary>
              <AccordionDetails >


                <Typography variant="body1" gutterBottom className='TypographyparrafoPrimero'>
                  <strong>Cambios de vuelo</strong><br />
                  Para las tarifas basic, light y classic se permiten cambios antes de la salida del vuelo, pero aplican los siguientes cargos adicionales:
                </Typography>

                <Typography variant="body1" gutterBottom className='TypographyparrafoPrimero'>
                  » <strong>Cargo por cambio:</strong> son los cargos adicionales que se generan al cambiar tu vuelo de manera voluntaria (aplican únicamente para las tarifas basic, light y classic).
                </Typography>
                <Typography variant="body2" className='TypographyparrafoPrimero'>
                  Vuelos nacionales en Colombia: COP 120.000<br />
                  Vuelos nacionales en Ecuador: USD 30<br />
                  Vuelos internacionales en Suramérica: USD 185<br />
                  Otros vuelos internacionales en las Américas y Europa: USD/CAD 210<br />
                  Desde Reino Unido: GBP 150<br />
                  Desde el resto de Europa: EUR 180
                </Typography>

                <Typography variant="body1" gutterBottom className='TypographyparrafoPrimero'>
                  » <strong>Diferencia de tarifa:</strong> es la diferencia en dinero entre la tarifa del tiquete que compraste inicialmente y la nueva opción de tarifa que estás eligiendo (aplica para todas las tarifas).
                </Typography>

                <Typography variant="body1" gutterBottom className='TypographyparrafoPrimero'>
                  » <strong>Diferencias generadas por impuestos:</strong> aplican según las normativas vigentes de cada país.
                </Typography>

                <Typography variant="body1" gutterBottom className='TypographyparrafoPrimero'>
                  Para las tarifas flex y business se permiten cambios antes de la salida del vuelo sin cargo por cambio, pero podrán aplicar cargos por diferencia de tarifa e impuestos.
                </Typography>

                <Typography variant="body1" gutterBottom className='TypographyparrafoPrimero'>
                  <strong>Asientos</strong><br />
                  Ten en cuenta que la reclinación máxima de los asientos en business class puede variar según el tipo de avión.
                </Typography>

                <Typography variant="body1" gutterBottom className='TypographyparrafoPrimero'>
                  <strong>Asiento business class:</strong> business class (flatbed) o premium (de acuerdo al tipo de avión que opera la ruta) están incluidos para la tarifa business con todos sus beneficios.
                </Typography>

                <Typography variant="body1" gutterBottom className='TypographyparrafoPrimero'>
                  <strong>Asientos Plus:</strong> están incluidos y sujetos a disponibilidad comprando la tarifa flex.
                </Typography>

                <Typography variant="body1" gutterBottom className='TypographyparrafoPrimero'>
                  En algunos de nuestros aviones solo contamos con asientos Economy.
                </Typography>

                <Typography variant="body1" gutterBottom className='TypographyparrafoPrimero'>
                  <strong>Reembolsos</strong><br />
                  » Aplica para las tarifas flex y business, antes del vuelo.<br />
                  » Los reembolsos después del vuelo no se permiten en ninguna tarifa, excepto ante eventos operacionales.<br />
                  » La condición de reembolso aplica sobre el valor pagado por la tarifa. Los impuestos serán reembolsados de acuerdo con las disposiciones legales aplicables.<br />
                  » Todas nuestras tarifas (basic, light, classic y flex), excepto la business, son tarifas promocionales.<br />
                  » A partir del 1 de junio de 2023, los servicios adicionales que compres para tu reserva y decidas no utilizar, serán reembolsables únicamente si tu tarifa es flex o business.<br />
                  » Los servicios adicionales no prestados por causa imputable a la aerolínea, serán reembolsables para todas las tarifas.<br />
                  » Estás obligado a utilizar todos los segmentos de tu itinerario según el plan de vuelo que contrataste. No puedes quedarte en la ciudad de conexión sin continuar hacia tu destino final. Si decides no completar tu itinerario, consideraremos que has completado el viaje desde el origen hasta el destino final programado, y no tendrás derecho a reembolso por los segmentos no volados, excepto por los impuestos y tasas no causadas correspondientes a esos segmentos.<br />
                  Consulta todas las condiciones de retracto y desistimiento aplicables para Colombia.
                </Typography>

                <Typography variant="body1" gutterBottom className='TypographyparrafoPrimero'>
                  <strong>Servicio prioritario</strong><br />
                  La tarifa business incluye fila preferencial para atención en counter (check-in), entrega y recepción de equipaje con prioridad y abordaje prioritario.
                </Typography>

                <Typography variant="body1" gutterBottom className='TypographyparrafoPrimero'>
                  <strong>Acumulación LifeMiles</strong><br />
                  » El precio de la tarifa tomado para el cálculo de las millas no incluye tasas, impuestos o servicios adicionales.<br />
                  » Los socios elite acumulan millas adicionales, el bono elite aplica según el estatus que tenga cada socio.
                </Typography>

                <Typography variant="body2" gutterBottom className='TypographyparrafoPrimero'>
                  Estatus: Diamond (70%) | Gold (50%) | Silver (30%) | Red Plus (10%) | LifeMiles (0%)
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>

        <div className='div_accordionMovilResumen'>
                    <div>
                        <Accordion className='accordionTarifas'>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"

                                style={{ width: '100%' }}
                            >
                              <div>
                                <Typography variant="h6" paragraph className='TypographyparrafoNegrita'><NotificationsIcon sx={{color: 'orange'}} /> Ten en cuenta </Typography>
                                <Typography variant="body2" paragraph className='Typographyparrafo'> <ul style={{listStyle:'disc'}}>
                                  <li style={{border: 'none', backgroundColor: 'inherit', color: 'inherit', cursor: 'default'}}>En las tarifas light, basic y classic, <strong>los reembolsos no están permitidos y los cambios de itinerario implican cargos adicionales. </strong></li>
                                  <li style={{border: 'none', backgroundColor: 'inherit', color: 'inherit', cursor: 'default'}}> En las tarifas light, basic y classic, los reembolsos no están permitidos y los cambios de itinerario implican cargos adicionales.</li>
                                </ul> </Typography>
                                </div>
                               
                            </AccordionSummary >
                            <AccordionDetails className='accordionDetails'>
                                <Typography variant="h6" paragraph className='TypographyparrafoNegrita'><label className='flechaTarifas'>»</label>Cambios de vuelo:</Typography>
                                <Typography variant="body2" paragraph className='TypographyparrafoPrimero'>
                                    Para las tarifas basic, light y classic se permiten cambios antes de la salida del vuelo, pero aplican los siguientes cargos adicionales:
                                </Typography>
                                <Typography variant="body2" paragraph className='Typographyparrafo'>
                                » <b>Cargo por cambio:</b>  son los cargos adicionales que se generan al cambiar tu vuelo de manera voluntaria (aplican únicamente para las tarifas basic, light y classic).
                                </Typography>
                                <Typography variant="body2" component="div">

                                   {/*} <table border="1" cellPadding="10" className='tabla1' >
                                        <thead>
                                            <tr>
                                                <th className='th'>Vuelos nacionales en Colombia</th>
                                                <th className='th'>Vuelos nacionales en Ecuador</th>
                                                <th className='th'>Vuelos internacionales al interior de Suramérica</th>
                                                <th className='th'>Otros vuelos internacionales*</th>
                                                <th className='th'>Desde Reino Unido</th>
                                                <th className='th'>Desde el resto de Europa</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className='tr'>COP 120.000</td>
                                                <td className='tr'>USD 30</td>
                                                <td className='tr'>USD 185</td>
                                                <td className='tr'>USD/CAD 210</td>
                                                <td className='tr'>GBP 150</td>
                                                <td className='tr'>EUR 180</td>
                                            </tr>
                                        </tbody>
                                    </table> */}

                                    <table cellPadding="10" className='tabla1Movil' >
                                        <thead>
                                            <tr>
                                                <th className='thMovil'>Vuelos nacionales en Colombia</th>
                                                <td className='trMovil'>COP 120.000</td>

                                            </tr>
                                            <tr>
                                                <th className='thMovil'>Vuelos nacionales en Ecuador</th>
                                                <td className='trMovil'>USD 30</td>
                                            </tr>
                                            <tr>
                                                <th className='thMovil'>Vuelos internacionales al interior de Suramérica</th>
                                                <td className='trMovil'>USD 185</td>
                                            </tr>
                                            <tr>
                                                <th className='thMovil'>Otros vuelos internacionales en las Américas y vuelos hacia Europa</th>
                                                <td className='trMovil'>USD/CAD 210</td>

                                            </tr>
                                            <tr>
                                                <th className='thMovil'>Desde Reino Unido</th>
                                                <td className='trMovil'>GBP 150</td>

                                            </tr>
                                            <tr>
                                                <th className='thMovil'>Desde el resto de Europa</th>
                                                <td className='trMovil'>EUR 180</td>

                                            </tr>

                                        </thead>
                                    </table>
                                </Typography><br />
                                <Typography variant="body2" paragraph className='Typographyparrafo'>
                                »  <b>Diferencia de tarifa:</b> es la diferencia en dinero entre la tarifa del tiquete que compraste inicialmente y la nueva opción de tarifa que estás eligiendo (aplica para todas las tarifas).
                                </Typography>
                                <Typography variant="body2" paragraph className='Typographyparrafo'>
                                » <b>Diferencias generadas por impuestos:</b> aplican según las normativas vigentes de cada país.<br/>
                                    Para las tarifas flex y business se permiten cambios antes de la salida del vuelo sin cargo por cambio, pero podrán aplicar cargos por diferencia de tarifa e impuestos.
                                </Typography>

                                <Typography variant="h6" className='TypographyparrafoNegrita'><label className='flechaTarifas'>»</label>Asientos:</Typography>
                                <Typography variant="body2" paragraph className='Typographyparrafo'>
                                    Los asientos en business class tienen una reclinación de hasta 140° y de hasta 180° en aviones B787, y de hasta 165° en aviones A330(operados por wamos).<br />
                                    <b>Asientos business class:</b> aplica solamente para tarifa businesscon todos sus beneficios.<br />
                                    <b>Asientos plus:</b> están incluidos y sujetos a disponibilidad comprando la tarifa flex.<br />
                                    En algunos de nuestros aviones solo contamos con asientos Economy.
                                </Typography>
                                <Typography variant="h6" className='TypographyparrafoNegrita'><label className='flechaTarifas'>»</label>Reembolsos</Typography>
                                <Typography variant="body2" paragraph className='Typographyparrafo'>
                                »  Aplica para las tarifas flex y business, antes del vuelo. <br />
                                »  Los reembolsos después del vuelo no se permiten en ninguna tarifa, excepto ante eventos operacionales. <br />
                                »   La condición de reembolso aplica sobre el valor pagado por la tarifa. Los impuestos serán reembolsados de acuerdo con las disposiciones legales aplicables.<br />
                                »    Todas nuestras tarifas (basic, light, classic y flex), excepto la business, son tarifas promocionales.<br />
                                »    A partir del 1 de junio de 2023, los servicios adicionales que compres para tu reserva y decidas no utilizar, serán reembolsables <b>únicamente si tu tarifa es flex o business.</b> <br />
                                »     Los servicios adicionales no prestados por causa imputable a la aerolínea, serán reembolsables para todas las tarifas. <br />
                                    Consulta más información sobre el derecho de retracto, desistimiento y otras leyes según el país en nuestro Centro de ayuda.<br />
                                    »    Estás obligado a utilizar todos los segmentos de tu itinerario según el plan de vuelo que contrataste. No puedes quedarte en la ciudad de conexión sin continuar hacia tu destino final. Si decides no completar tu itinerario, consideraremos que has completado el viaje desde el origen hasta el destino final programado, y no tendrás derecho a reembolso por los segmentos no volados, excepto por los impuestos y tasas no causadas correspondientes a esos segmentos.
                                    Consulta todas las condiciones de retracto y desistimiento aplicables para Colombia.
                                    <br />

                                </Typography>



                                <Typography variant="h6" className='TypographyparrafoNegrita'><label className='flechaTarifas'>»</label>Servicio prioritario</Typography>
                                <Typography variant="body2" paragraph className='Typographyparrafo'>
                                    La tarifa business incluye fila preferencial para atención en counter (check-in), entrega y recepción de equipaje con prioridad y abordaje prioritario.
                                </Typography>
                                <Typography variant="h6" className='TypographyparrafoNegrita'><label className='flechaTarifas'>»</label>Acumulación lifemiles</Typography>
                                <Typography variant="body2" paragraph className='Typographyparrafo'>
                                    El precio de la tarifa tomado para el cálculo de las millas no incluye tasas, impuestos o servicios adicionales.<br />
                                    Los socios elite acumulan millas adicionales, el bono elite aplica según el estatus que tenga cada socio:
                                  {/*  <table border="1" cellPadding="10" className='tabla2'>
                                        <thead>
                                            <tr>
                                                <th className='th'>Estatus</th>
                                                <th className='th'>Diamond</th>
                                                <th className='th'>Gold</th>
                                                <th className='th'>Silver</th>
                                                <th className='th'>Red Plus</th>
                                                <th className='th'>lifemiles</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className='th'>Bono Elite</td>
                                                <td className='tr'>70%</td>
                                                <td className='tr'>50%</td>
                                                <td className='tr'>30%</td>
                                                <td className='tr'>10%</td>
                                                <td className='tr'>0%</td>
                                            </tr>
                                        </tbody>
                                    </table>*/} 

                                    <table cellPadding="10" className='tabla1Movil' >
                                        <thead>
                                            <tr>
                                                <th className='thMovil'>Estatus</th>
                                                <th className='thMovil'>Bono Elite</th>

                                            </tr>
                                            <tr>
                                                <td className='thMovil'>Diamond</td>
                                                <td className='trMovil'>70%</td>
                                            </tr>
                                            <tr>
                                                <td className='thMovil'>Gold</td>
                                                <td className='trMovil'>50%</td>
                                            </tr>
                                            <tr>
                                                <td className='thMovil'>Silver</td>
                                                <td className='trMovil'>30%</td>

                                            </tr>

                                            <tr>
                                                <td className='thMovil'>Red Plus</td>
                                                <td className='trMovil'>10%</td>
                                            </tr>
                                            <tr>
                                                <td className='thMovil'>lifemiles</td>
                                                <td className='trMovil'>0%</td>

                                            </tr>

                                        </thead>
                                    </table>
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                </div>

        <div className='div_preciosResumen'>
          <p>Total de la reserva:<br />
            <label style={{ fontSize: '23px', fontWeight: 'bold', marginTop: '-20px' }}>COP {precio}</label>
          </p>

          <button
            style={{ backgroundColor: 'black', color: 'white', borderRadius: '30px', width: '160px', height: '50px', fontSize: '20px', fontWeight: 'bold', marginLeft: '40px' }}
            onClick={Paso2}
          >
            Continuar
          </button>
        </div>

   <button className='botonBuscarMovilResumen' onClick={Paso2} >Continuar</button>



      </div>
      <PiePagina />
    </>
  );

}

export default Resumen;
