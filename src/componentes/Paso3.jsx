import React from "react";
import { useState, useEffect, useContext } from 'react';
import Accordion from '@mui/material/Accordion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccordionSummary from '@mui/material/AccordionSummary';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import barraMediana from '../material/barraMediana.png';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import MenuNavBar from './MenuNavBarPaso3.jsx';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Adulto from '@mui/icons-material/PersonOutline';
import Contacto from '@mui/icons-material/SettingsPhone';
import PiePagina from './PiePagina.jsx';
import { useParams, useNavigate } from "react-router-dom";
import { DataContext } from './Context';
//import avionReserva from '../material/avionReserva.jpg';
import codigosPaises from './codigosPaises.jsx';
//import flechaAccordion from '../material/flechaAccordion.jpg';
import equipajeMano from '../material/equipajeMano.png';
import equipajeDeportivo from '../material/equipajeDeportivo.png';
import lounges from '../material/lounges.png';
import especial from '../material/especial.png';
import viaje from '../material/viaje.png';
import dayjs from 'dayjs';
import 'dayjs/locale/es';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const monthMap = {
    'ene': 'Ene',
    'feb': 'Feb',
    'mar': 'Mar',
    'abr': 'Abr',
    'may': 'May',
    'jun': 'Jun',
    'jul': 'Jul',
    'ago': 'Ago',
    'sep': 'Sept',
    'oct': 'Oct',
    'nov': 'Nov',
    'dic': 'Dic'
};

const formatDate = (date) => {
    // Formato corto del día de la semana, número del día y mes
    const formattedDate = dayjs(date).format('ddd D MMM YYYY'); // Ej: "Thu 12 Sep"

    // Separar el formato en partes
    let [weekday, day, monthAbbreviation, year] = formattedDate.split(' ');

    // Eliminar cualquier punto en el día de la semana (si existe)
    weekday = weekday.replace('.', '');

    // Capitalizar la primera letra del día de la semana
    const capitalizedWeekday = weekday.charAt(0).toUpperCase() + weekday.slice(1);

    // Mapea la abreviación del mes al español usando el mapa personalizado
    const capitalizedMonth = monthMap[monthAbbreviation.toLowerCase()] || monthAbbreviation;

    // Retorna el formato final, por ejemplo "Jue, 12 Sept"
    return `${capitalizedWeekday}, ${capitalizedMonth} ${day}, ${year} `;
};

// Función de transición para hacer que el modal aparezca desde abajo
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const Paso3 = () => {
    const { setSharedData, selectedDate, fecha, setFecha, origen, setSalida, setLlegada, destino, setPrecio, setColorBoton } = useContext(DataContext);
    const { ida, vuelta, precio, salida, llegada, tiempo, nombre, apellido, colorboton } = useParams();
    const [value, setValue] = useState(0);
    const [age, setAge] = useState('');
    const [open, setOpen] = useState(false);
    const [showDiv1, setShowDiv1] = useState(true);
    const [abrirServicios,setAbrirServicios] = useState(false);
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
        navigate(`/paso4/${origen}/${destino}/${ida}/${vuelta}/${tiempo}/${precio}/${salida}/${llegada}/${nombre}/${apellido}/${colorboton}`);
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };



    const change = (event) => {
        setAge(event.target.value);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const [expanded, setExpanded] = useState(false);

    const expandir = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const clickAbrirServicios = () => {
        if (precio !== 0) {
          setAbrirServicios(true);
          setExpanded(true); // Mueve la flecha hacia arriba
        }
      };

      const clickCerrarModalServicios = () => {
        setAbrirServicios(false);
        setExpanded(false); // Mueve la flecha hacia abajo
      };

    const handleIconClick = (event) => {
        event.stopPropagation(); // Evita que el click expanda el Accordion
        console.log("Icono presionado");
    };

    useEffect(() => {
        let lastScrollTop = 0;

        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            if (scrollTop > lastScrollTop) {
                // Scrolling down - hide div1, show div2
                setShowDiv1(false);
            } else {
                // Scrolling up - show div1, hide div2
                setShowDiv1(true);
            }

            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Prevent negative scrolling
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    

    return (
        <>
            <div className="div_paso3"  >
                <MenuNavBar />
                <div className='div_contenedorPaso3'>

                    <div className='div_Paso3'>
                        <label className="p_primertitulo" >Personaliza tu viaje</label>

                        <div className="contenidoPaso3">
                            <div className="divPrimerContenedor" >
                                <div className="div_equipajeMano">
                                    <div className='contenedorImagen'>
                                        <img src={equipajeMano} className="img_adicionales" />
                                    </div>

                                    <div className="div_contendio">
                                        <p className="p_elije"> Equipaje de mano y bodega</p>
                                        <p className="p_texto">Revisa tu equipaje incluido en tu tarifa y añade el que necesita</p>
                                        <div className="div_desdePrecio">
                                            <p className="p_desde" >Desde</p>
                                            <label className="p_precioCard"><label className="p_cop">COP</label>$65.000</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="div_equipajeDeportivo">
                                    <div className='contenedorImagen'>
                                        <img src={equipajeDeportivo} className="img_adicionales" />
                                    </div>

                                    <div className="div_contendio">
                                        <p className="p_elije"> Equipaje deportivo</p>
                                        <p className="p_texto">Vuela con tu pasión a todas partes</p>
                                        <div className="div_desdePrecio">
                                            <p className="p_desde" >Desde</p>
                                            <label className="p_precioCard"><label className="p_cop">COP</label>$85.000</label>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <p className="p_segundotitulo">Complementa tu viaje con las opciones que teneos para ti </p>
                            <div className="divSegundoContenedor">
                                
                                <div className="div_equipajeMano">
                                    <div className='contenedorImagen'>
                                        <img src={lounges} className="img_adicionales" />
                                    </div>

                                    <div className="div_contendio">
                                        <p className="p_elije"> avianca louges</p>
                                        <p className="p_texto">Espera tu vuelo con tus comodidades</p>
                                        <div className="div_desdePrecio">
                                            <p className="p_desde" >Desde</p>
                                            <label className="p_precioCard"><label className="p_cop">COP</label>$126.000</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="div_equipajeDeportivo">
                                    <div className='contenedorImagen'>
                                        <img src={especial} className="img_adicionales" />
                                    </div>

                                    <div className="div_contendio">
                                        <p className="p_elije"> Asistencia especial</p>
                                        <p className="p_texto">Conoce las opciones según tys necesidades</p>
                                        <div className="div_desdePrecioGratis">
                                            <label className="p_precioGratis">Servicio gratuito</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="div_equipajeDeportivo">
                                    <div className='contenedorImagen'>
                                        <img src={viaje} className="img_adicionales" />
                                    </div>

                                    <div className="div_contendio">
                                        <p className="p_elije"> Asistencia en viajes</p>
                                        <p className="p_texto">Cobertura médica, legal y más en tu destino</p>
                                        <div className="div_desdePrecio">
                                            <p className="p_desde" >Desde</p>
                                            <label className="p_precioCard"><label className="p_cop">COP</label>$34.000</label>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <button className='boton_continuarAdicionales' onClick={enviar} >
                                Continuar
                            </button>
                             {/* Accordion que no cambia de tamaño */}
              <Accordion
              className='accordionBoton'
                expanded={false} // Mantener el accordion sin expansión
                sx={{
                  backgroundColor: 'transparent', // Fondo transparente
                  border: 'none', // Sin bordes
                  boxShadow: 'none', // Sin sombra
                  '&:before': {
                    display: 'none', // Elimina cualquier borde predeterminado
                  },
                  cursor: precio !== 0 ? 'pointer' : 'default', // Deshabilitar el cursor si el precio es 0
                }}
              >
                <AccordionSummary
                  expandIcon={
                    precio !== 0 ? ( // Solo mostrar la flecha si el precio es diferente de 0
                      <ExpandMoreIcon style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                    ) : null
                  } // Animación solo de la flecha
                  onClick={clickAbrirServicios} // Abrir modal al hacer clic
                  sx={{
                    fontWeight: 'bold',
                    width: '100%',
                    marginTop: '10px',
                    height: '50px',
                    paddingTop: '8px',
                    paddingBottom: '8px',
                    borderRadius: '30px',
                    fontSize: '15px',
                    marginRight: '5px',
                    border: '2px solid black',
                    textAlign: 'center',
                    cursor: precio !== 0 ? 'pointer' : 'default', // Deshabilitar el cursor si el precio es 0
                  }}
                >
                  <div style={{ width: '100%' }}><ShoppingCartIcon sx={{ fontSize: '16px', marginTop: '-9px' }} /><label style={{ marginLeft: '8px' }}>COP </label> <label className='label_ceroPaso3'>{precio}</label></div>

                </AccordionSummary>
              </Accordion>

              {/* modal de resumen de compra */}

        <Dialog
          open={abrirServicios}
          TransitionComponent={Transition}
          keepMounted
          onClose={clickCerrarModalServicios}
          aria-describedby="modal-desde-abajo"
          className='Dialog'
          sx={{
            '& .MuiDialog-paper': {
              margin: 0,
              position: 'fixed',
              top: 0,
              bottom: 0,
              width: '100%',
              overflowY: 'auto', // Permite desplazamiento si el contenido es más grande que el modal
              maxWidth: '100%', // Asegura que el modal ocupe todo el ancho de la pantalla
              maxHeight: '100%',
              backgroundColor: 'black',
            },
          }}
        >
          <DialogTitle
            sx={{ backgroundColor: 'black', color: 'black', marginTop:'-20px' }}
          >
    
            
            <IconButton
              aria-label="cerrar"
              onClick={clickCerrarModalServicios}
              sx={{
                position: 'absolute',
                right: 8,
                top: 20,
                color: 'black',
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>

          <DialogContent sx={{ borderTopLeftRadius: '20px', borderTopRightRadius: '20px', backgroundColor: 'white' }}>
          <div style={{marginTop:'15px'}}>
          <p style={{ fontSize: '22px', fontWeight: 'bold' }}>Resumen de compra</p>
          <p style={{ fontSize: '22px', fontWeight: 'bold' }}>Ida</p>
          <p style={{ fontSize: '20px', fontWeight: 'bold' }}>{origen} a {destino}</p>
          <div style={{ display: 'flex' }}>
            <div>{dayjs(fecha).format('D\nMMMM\nYYYY')}</div>
            <div
              className={`boton-${colorboton}-movil`}
            >
              <label className='label_colorBotonMovil'>{colorboton.charAt(0).toUpperCase() + colorboton.slice(1)}</label>
            </div>
          </div>
          <div style={{ display: 'flex' }}>
            <div style={{ fontSize: '20px', fontWeight: 'bold', }}>{salida}</div>
            <div style={{ marginTop: '5px', marginLeft: '5px', marginRight: '5px' }}><img style={{width:'100%'}} src={barraMediana} /></div>
            <div style={{ fontSize: '20px', fontWeight: 'bold' }}>{llegada}</div>
          </div>
          <p style={{ marginTop: '30px' }}>1 Adulto</p>
          <div style={{ display: 'flex', marginTop: '50px' }}>
            <div style={{ fontFamily: 'revert', fontSize: '20px', fontWeight: 'bold', marginRight: '50px' }}>Total a pagar</div>
            <div style={{ fontSize: '20px', fontWeight: 'bold' }}><label style={{ marginRight: '5px' }}>COP</label>{precio}</div>
          </div>
          </div>
          </DialogContent>
        </Dialog>
                        </div>


                    </div>


                </div>

               
                
            </div>
            <PiePagina/>
        </>


    );
}

export default Paso3;