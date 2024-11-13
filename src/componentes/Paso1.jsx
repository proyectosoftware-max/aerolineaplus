
import React, { useState, useEffect, useContext } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import { Card, CardContent, CardActions, Button, Grid, darken } from '@mui/material';
import raya_avion from '../material/raya_avion.jpg';
import PiePagina from './PiePagina.jsx';
import { DataContext } from './Context';
import datos from './vuelos.json';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import img_barraMediana from '../material/barraMediana.png';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import imagen_opcion_basic from '../material/opcionBasic.jpg';
import imagen_opcion_classic from '../material/opcionClassic.jpg';
import img_basic from '../material/basic.jpg';
import img_classic from '../material/classic.jpg';
import img_flex from '../material/flex.jpg';
import img_basicMovil from '../material/basicMovil.png';
import img_classicMovil from '../material/classicMovil.png';
import img_flexMovil from '../material/flexMovil.png';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
dayjs.locale('es');


const generateDatesWithPrices = (startDate, count) => {
    const datesWithPrices = [];
    const currentDate = new Date(startDate);

    for (let i = 0; i < count; i++) {
        const date = new Date(currentDate);
        //const price = Math.floor(Math.random() * 100000 + 123490); // Genera precios aleatorios
        const price = 223490
        datesWithPrices.push({ date, price });
        currentDate.setDate(currentDate.getDate() + 1); // Incrementa la fecha en 1 día
    }

    return datesWithPrices;
};

const formatDate = (date) => {
    const options = { weekday: 'short', day: 'numeric', month: 'short' };
    const formattedDate = date.toLocaleDateString('es-ES', options);

    // Convertir la primera letra del mes y el día de la semana a mayúscula
    const [weekdayWithComma, day, month] = formattedDate.split(' ');
    const weekday = weekdayWithComma.replace(',', '').charAt(0).toUpperCase() + weekdayWithComma.slice(1, -1);
    const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);

    // Combinar todas las partes con puntos
    return `${weekday}. ${day} ${capitalizedMonth}.`;
};



const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO').format(price);
};

const capitalizeFirstLetter = (str) => {
    return str ? str.charAt(0).toUpperCase() + str.slice(1) : ''; // Verifica que 'str' no sea undefined
};

const formatDateWithDayjs = (fecha) => {
    if (!fecha) return ''; // Verifica que 'fecha' no sea undefined o null

    const formattedDate = dayjs(fecha).format('ddd DD MMM. YYYY'); // Formato inicial
    const parts = formattedDate.split(' ');

    if (parts.length < 3) return formattedDate; // Asegúrate de que haya suficientes partes en la fecha

    // Convertir la primera letra del día y el mes a mayúscula
    parts[0] = capitalizeFirstLetter(parts[0]); // Día
    parts[2] = capitalizeFirstLetter(parts[2]); // Mes

    return parts.join(' ');
};

// Función de transición para hacer que el modal aparezca desde abajo
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Paso1 = () => {
    const [selectedDate, setSelectedDate] = useState(new Date()); // Fecha seleccionada
    const { setSharedData, fecha, setFecha, setSalida, setLlegada, origen, destino, setPrecio, colorboton, setColorBoton } = useContext(DataContext);
    const [vuelos, setVuelos] = useState(null);
    const [vueloOrigen, setVueloOrigen] = useState('');
    const [vueloDestino, setVueloDestino] = useState('');
    const [vueloTiempo, setVueloTiempo] = useState('');
    const [vueloSalida, setVueloSalida] = useState('');
    const [vueloLlegada, setVueloLlegada] = useState('');
    const [vueloPrecio, setVueloPrecio] = useState(0);
    const [vueloPrecioAntes, setVueloPrecioAntes] = useState(0);
    const [abrirCard, setAbrirCard] = useState(false);
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [openClassic, setOpenClassic] = useState(false);



    const handleClickOpenBasic = (vuelo) => {
        setVueloOrigen(vuelo.codigo_origen);
        setVueloDestino(vuelo.codigo_destino);
        setVueloTiempo(vuelo.tiempo_vuelo);
        setVueloSalida(vuelo.hora_salida);
        setVueloLlegada(vuelo.hora_llegada);
        setOpen(true);
    };

    const handleClickOpenClassic = (vuelo) => {
        setVueloOrigen(vuelo.codigo_origen);
        setVueloDestino(vuelo.codigo_destino);
        setVueloTiempo(vuelo.tiempo_vuelo);
        setVueloSalida(vuelo.hora_salida);
        setVueloLlegada(vuelo.hora_llegada);
        setVueloPrecioAntes(vuelo.valor_pasaje);
        setOpenClassic(true);
    };



    const clickAbrirCard = (vuelo) => {
        setVueloOrigen(vuelo.codigo_origen);
        setVueloDestino(vuelo.codigo_destino);
        setVueloTiempo(vuelo.tiempo_vuelo);
        setVueloSalida(vuelo.hora_salida);
        setVueloLlegada(vuelo.hora_llegada);
        setVueloPrecioAntes(vuelo.valor_pasaje);
        setAbrirCard(true);
    };

    const cerrarCard = () => {
        setAbrirCard(false);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCloseClassic = () => {
        setOpenClassic(false);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => Math.max(prevIndex - visibleItems, 0));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => Math.min(prevIndex + visibleItems, maxIndex));
    };

    const [datesWithPrices, setDatesWithPrices] = useState([]);
    const [selectedPrice, setSelectedPrice] = useState(null); // Estado para almacenar el precio seleccionado

    // Función para generar fechas y precios
    const generateDatesWithPrices = (startDate, count) => {
        const datesWithPrices = [];
        const currentDate = new Date(startDate);

        for (let i = 0; i < count; i++) {
            const date = new Date(currentDate);
            const price = Math.floor(Math.random() * 10000 + 70000); // Genera precios aleatorios
            datesWithPrices.push({ date, price });
            currentDate.setDate(currentDate.getDate() + 1);
        }

        return datesWithPrices;
    };

    // Guardar y obtener precios en el localStorage
    const getStoredPrices = () => {
        const today = new Date().toLocaleDateString(); // Obtenemos la fecha actual en formato de string
        const storedPrices = JSON.parse(localStorage.getItem('prices'));

        if (storedPrices && storedPrices.date === today) {
            // Si ya hay precios guardados para hoy, los utilizamos
            // return storedPrices.prices;

            // Si no hay precios para hoy, los generamos y los guardamos
            const startDate = new Date();
            const itemCount = 300; // Número de elementos en el carrusel
            const newPrices = generateDatesWithPrices(startDate, itemCount);

            // Guardar los precios con la fecha actual en el localStorage
            localStorage.setItem('prices', JSON.stringify({ date: today, prices: newPrices }));

            return newPrices;

        } else {
            // Si no hay precios para hoy, los generamos y los guardamos
            const startDate = new Date();
            const itemCount = 300; // Número de elementos en el carrusel
            const newPrices = generateDatesWithPrices(startDate, itemCount);

            // Guardar los precios con la fecha actual en el localStorage
            localStorage.setItem('prices', JSON.stringify({ date: today, prices: newPrices }));

            return newPrices;
        }
    };

    // Al cargar el componente, obtenemos o generamos los precios
    useEffect(() => {
        const prices = getStoredPrices();
        setDatesWithPrices(prices);

        // Selecciona el precio del primer elemento al cargar el componente
        if (prices.length > 0) {
            setSelectedPrice(prices[0].price);
        }
    }, []);

    const [currentIndex, setCurrentIndex] = useState(0);
    const visibleItems = 7; // Cantidad de fechas visibles a la vez
    const itemWidth = 170; // Ancho de cada elemento del carrusel
    const totalWidth = itemWidth;
    const carouselWidth = totalWidth * visibleItems; // Ancho total del carrusel visible
    const maxIndex = datesWithPrices.length - visibleItems; // Índice máximo permitido



    const enviarDatosMovilPrecioBasic = () => {

        localStorage.setItem('salida', setSalida(vueloSalida));
        localStorage.setItem('llegada', setLlegada(vueloLlegada));
        localStorage.setItem('colorboton', setColorBoton('basic'));
        const precioBasic = selectedPrice.toLocaleString('es-CO')
        navigate(`/resumen/${origen}/${destino}/${vueloOrigen}/${vueloDestino}/${vueloTiempo}/${precioBasic}/${vueloSalida}/${vueloLlegada}/${'basic'}`);

    };

    const enviarDatosMovilPrecioClassic = () => {
        localStorage.setItem('salida', setSalida(vueloSalida));
        localStorage.setItem('llegada', setLlegada(vueloLlegada));
        localStorage.setItem('colorboton', setColorBoton('classic'));
        const precioClassic = (parseFloat(selectedPrice) + 113050).toLocaleString('es-CO')
        navigate(`/resumen/${origen}/${destino}/${vueloOrigen}/${vueloDestino}/${vueloTiempo}/${precioClassic}/${vueloSalida}/${vueloLlegada}/${'classic'}`);

    };

    const enviarDatosMovilPrecioFlex = () => {
        localStorage.setItem('salida', setSalida(vueloSalida));
        localStorage.setItem('llegada', setLlegada(vueloLlegada));
        localStorage.setItem('colorboton', setColorBoton('flex'));
        const precioFlex = (parseFloat(selectedPrice) + 154700).toLocaleString('es-CO')
        navigate(`/resumen/${origen}/${destino}/${vueloOrigen}/${vueloDestino}/${vueloTiempo}/${precioFlex}/${vueloSalida}/${vueloLlegada}/${'flex'}`);

    };

    const clickBasic = () => {
        localStorage.setItem('salida', setSalida(vueloSalida));
        localStorage.setItem('llegada', setLlegada(vueloLlegada));
        localStorage.setItem('colorboton', setColorBoton('basic'));
        const precioBasic = selectedPrice.toLocaleString('es-CO')
        navigate(`/resumen/${origen}/${destino}/${vueloOrigen}/${vueloDestino}/${vueloTiempo}/${precioBasic}/${vueloSalida}/${vueloLlegada}/${'basic'}`);
    }

    const clickClassic = () => {
        localStorage.setItem('salida', setSalida(vueloSalida));
        localStorage.setItem('llegada', setLlegada(vueloLlegada));
        localStorage.setItem('colorboton', setColorBoton('classic'));
        const precioClassic = (parseFloat(selectedPrice) + 113050).toLocaleString('es-CO')
        navigate(`/resumen/${origen}/${destino}/${vueloOrigen}/${vueloDestino}/${vueloTiempo}/${precioClassic}/${vueloSalida}/${vueloLlegada}/${'classic'}`);
    }

    const clickFlex = (vuelo) => {
        localStorage.setItem('salida', setSalida(vuelo.hora_salida));
        localStorage.setItem('llegada', setLlegada(vuelo.hora_salida));
        localStorage.setItem('colorboton', setColorBoton('flex'));
        const precioFlex = (parseFloat(selectedPrice) + 154700).toLocaleString('es-CO')
        navigate(`/resumen/${origen}/${destino}/${vuelo.codigo_origen}/${vuelo.codigo_destino}/${vuelo.tiempo_vuelo}/${precioFlex}/${vuelo.hora_salida}/${vuelo.hora_llegada}/${'flex'}`);
    }

    useEffect(() => {
        const vuelosFiltrado = datos.vuelos.find(vuelo => vuelo.origen === origen && vuelo.destino === destino);
        setVuelos(vuelosFiltrado);
        setFecha(selectedDate);
        console.log(origen);
        console.log(destino);
        console.log(datos.vuelos.find(vuelo => vuelo.origen === origen && vuelo.destino === destino));
    }, [origen, destino, vuelos]);

    useEffect(() => {
        localStorage.setItem('sharedData', setSharedData(formatDateWithYear(selectedDate)));
    }, [selectedDate]);

    useEffect(() => {
        localStorage.setItem('fecha', setFecha(selectedDate));
    }, [selectedDate]);

    useEffect(() => {
        localStorage.setItem('precio', setPrecio(vueloPrecio));
    }, [vueloPrecio]);

    useEffect(() => {
        localStorage.setItem('colorboton', setColorBoton(colorboton));
    }, [colorboton]);


    const change = () => {

        localStorage.setItem('sharedData', setSharedData(formatDateWithYear(selectedDate)));
        localStorage.setItem('fecha', setFecha(selectedDate));
    }

    const handleDatePriceClick = (date, price) => {
        setSelectedDate(date);
        setSelectedPrice(price);
        setFecha(date);
        change(date);

    };


    /*  const isSelectedDate = (date) => {
          return date.toDateString() === fecha.toDateString();
      }; */

    const isSelectedDate = (date) => {
        return dayjs(date).isSame(dayjs(fecha), 'day');
    };

    const [expanded, setExpanded] = React.useState(false);

    const handleExpansion = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

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

    const clickBotonAccordion = () => {

        navigate(`/resumen/${vueloOrigen}/${vueloDestino}/${vueloTiempo}/${vueloPrecio}/${vueloSalida}/${vueloLlegada}`);
    }

    return (
        <>

            <div className='fondoPaso1'>
                <p className='p_ida'><FlightTakeoffIcon className='avion' sx={{ fontSize: '25px' }} /><label className='letra_ida' style={{ marginLeft: '5px' }}>Ida:</label> {origen} <label style={{ marginLeft: '5px', marginRight: '5px' }}>a</label>{destino}</p>
                <p className='p_idaMovil'><label className='letra_idaMovil' style={{ marginLeft: '5px' }}>Ida:<br /></label><br /> <FlightTakeoffIcon className='avionMovil' sx={{ fontSize: '25px' }} /> {origen} <label style={{ marginLeft: '5px', marginRight: '5px' }}>a</label>{destino}</p>

                <div className="carousel-wrapper">
                    <button className="carousel-control prev" onClick={handlePrev}>&#10094;</button>
                    <div className="carousel-container">
                        <div
                            className="carousel-content"
                            style={{
                                transform: `translateX(-${currentIndex * totalWidth}px)`,
                                width: `${carouselWidth}px` // Ancho total del carrusel para visualizar 7 elementos
                            }}
                        >
                            {datesWithPrices.map(({ date, price }, index) => {
                                // Almacenar el precio en el estado al renderizar el carrusel
                                if (index === 0 && selectedPrice === null) {
                                    setSelectedPrice(price); // Guardar el precio del primer elemento al cargarse
                                }

                                return (
                                    <div className="carousel-item-content"
                                        key={index} onChange={change} onClick={() => handleDatePriceClick(date, price)}
                                        style={{
                                            border: isSelectedDate(date) ? '2px solid lightgreen' : 'none',
                                            fontWeight: isSelectedDate(date) ? 'bold' : 'normal',

                                        }}
                                    >
                                        <label className='label_fecha'>{formatDate(date)}</label>
                                        <label className='label_cop'>COP <label className='label_precio' >${`${formatPrice(price)}`}</label></label>
                                    </div>);
                            })}
                        </div>
                    </div>
                    <button className="carousel-control next" onClick={handleNext}>&#10095;</button>
                </div>

                <div className='div_ordenar_por'>
                    <label className='label_ordenar_por'>Ordenar por:</label>
                    <button className='boton_mejor_precio'>Mejor precio</button>
                    <button className='boton_vuelos_directos'>Vuelos directos</button>
                </div>

                {vuelos ? (
                    vuelos.horarios.map((vuelo, index) => (
                        <div className='div_accordion'>
                            <Accordion className='accordion' expanded={expanded === index}
                                key={index}
                                onChange={handleExpansion(index)}
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}

                                    aria-controls={`panel${index}-content`}
                                    id={`panel${index}-header`}
                                > <table className='tablaAccordion' style={{ width: '100%', borderCollapse: 'collapse' }}>
                                        <tbody>
                                            <tr>
                                                <td style={{ width: '15%', textAlign: 'center', verticalAlign: 'middle' }}>
                                                    <div>
                                                        <label style={{ display: 'block', fontSize: '30px', fontWeight: 'bold' }}>{vuelo.hora_salida}</label>
                                                        <p style={{ marginRight: '30px', fontSize: '20px', fontWeight: 'bold' }}>{vuelo.codigo_origen}</p>
                                                    </div>
                                                </td>
                                                <td style={{ width: '35%', textAlign: 'center'/*, border: '1px solid blue'*/ }}>
                                                    <div style={{ marginTop: '-10px' }}>
                                                        <p style={{ margin: 0, textDecoration: 'underline', color: ' rgb(62, 168, 255)' }}>Directo</p>
                                                        <img src={raya_avion} alt="Avion" style={{ display: 'block', margin: '0 auto' }} />
                                                        <p style={{ marginTop: '10px' }}>{vuelo.tiempo_vuelo}</p>
                                                    </div>
                                                </td>
                                                <td style={{ width: '25%', textAlign: 'center', verticalAlign: 'middle' }}>
                                                    <div style={{ marginRight: '80px' }}>
                                                        <label style={{ display: 'block', fontSize: '30px', fontWeight: 'bold' }}>{vuelo.hora_llegada}</label>
                                                        <p style={{ marginLeft: '30px', fontSize: '20px', fontWeight: 'bold' }}>{vuelo.codigo_destino}</p>
                                                    </div>
                                                </td>
                                                <td style={{ width: '25%', textAlign: 'center', verticalAlign: 'middle' }}>
                                                    <div style={{ marginLeft: '-100px' }}>
                                                        <label style={{ display: 'block', marginRight: '150px' }}>Desde</label>
                                                        <label style={{ margin: 0, fontSize: '40px', fontWeight: 'bold', marginTop: '-15px' }}>
                                                            <label style={{ fontSize: '15px', fontWeight: 'bold', marginRight: '10px' }}>COP</label>
                                                            ${`${formatPrice(selectedPrice)}`}
                                                        </label>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>

                                </AccordionSummary>
                                <AccordionDetails>
                                    <div className='CardEscritorio'>
                                        <p style={{ textAlign: 'center', marginBottom: '30px', fontSize: '25px', fontWeight: 'bold' }}>Elige cómo quieres volar</p>
                                        <Typography>
                                            <Grid container spacing={3} >
                                                <Grid item xs={12} sm={6} md={4} style={{ marginTop: '50px' }}>
                                                    <Card sx={{
                                                        maxWidth: 345, margin: '0 auto', borderRadius: '15px', height: '100%', paddingBottom: '50px', boxShadow: '1px 5px 10px 5px rgba(0, 0, 0, 0.16)',
                                                        WebkitBoxShadow: '1px 5px 10px 5px rgba(0, 0, 0, 0.16)',
                                                        MozBoxShadow: '1px 5px 10px 5px rgba(0, 0, 0, 0.16)'
                                                    }}>
                                                        <CardContent>
                                                            <Typography variant="h5" component="div">

                                                            </Typography>
                                                            <Typography variant="body2" color="text.secondary">
                                                                <div style={{ position: 'absolute', marginTop: '110px', marginLeft: '20px', fontSize: '30px', fontWeight: 'bold', color: 'rgb(226, 17, 17)' }}><label style={{ fontSize: '23px' }}>COP</label> ${`${formatPrice(selectedPrice)}`}</div>
                                                                <img src={img_basic} style={{ marginTop: '15px', marginBottom: '-5px' }} />
                                                            </Typography>
                                                        </CardContent>
                                                        <CardActions sx={{ justifyContent: 'center' }}>
                                                            <Button variant="contained" sx={{
                                                                textTransform: 'none',
                                                                backgroundColor: 'rgb(226, 17, 17)',
                                                                borderRadius: '50px',
                                                                fontSize: '14px',
                                                                height: '45px',
                                                                width: '250px',
                                                                '&:hover': { backgroundColor: darken('rgb(226, 17, 17)', 0.2) }

                                                            }} onClick={() => handleClickOpenBasic(vuelo)}  >Seleccionar</Button>
                                                        </CardActions>
                                                        <Typography variant="p" color="text.secondary" sx={{ marginLeft: '120px', fontSize: '12px' }}>
                                                            Precio por pasajero
                                                        </Typography>

                                                    </Card>

                                                </Grid>
                                                <Grid item xs={12} sm={6} md={4} style={{ paddingTop: '-10px' }}>
                                                    <Card sx={{
                                                        maxWidth: 345, margin: '0 auto', border: '2px solid rgb(204, 51, 140)', borderRadius: '15px', height: '100%', paddingBottom: '50px', boxShadow: '1px 5px 10px 5px rgba(0, 0, 0, 0.16)',
                                                        WebkitBoxShadow: '1px 5px 10px 5px rgba(0, 0, 0, 0.16)',
                                                        MozBoxShadow: '1px 5px 10px 5px rgba(0, 0, 0, 0.16)'
                                                    }}>
                                                        <CardContent>
                                                            <Typography variant="h5" component="div">

                                                            </Typography>
                                                            <Typography variant="body2" color="text.secondary">
                                                                <div style={{ position: 'absolute', marginTop: '155px', marginLeft: '20px', fontSize: '30px', fontWeight: 'bold', color: 'rgb(204, 51, 140)' }}><label style={{ fontSize: '23px' }}>COP</label>${(parseFloat(selectedPrice) + 113050).toLocaleString('es-CO')}</div>
                                                                <img src={img_classic} style={{ marginTop: '30px', marginBottom: '-5px' }} />
                                                            </Typography>
                                                        </CardContent>
                                                        <CardActions sx={{ justifyContent: 'center' }}>
                                                            <Button variant="contained" sx={{
                                                                textTransform: 'none',
                                                                backgroundColor: 'rgb(204, 51, 140)',
                                                                borderRadius: '50px',
                                                                fontSize: '14px',
                                                                height: '45px',
                                                                width: '250px',
                                                                '&:hover': { backgroundColor: darken('rgb(204, 51, 140)', 0.2) }

                                                            }} onClick={() => handleClickOpenClassic(vuelo)}   >Seleccionar</Button>
                                                        </CardActions>
                                                        <Typography variant="p" color="text.secondary" sx={{ marginLeft: '120px', fontSize: '12px' }}>
                                                            Precio por pasajero
                                                        </Typography>

                                                    </Card>
                                                </Grid>
                                                <Grid item xs={12} sm={6} md={4} style={{ marginTop: '50px' }}>
                                                    <Card sx={{
                                                        maxWidth: 345, margin: '0 auto', border: '15px', height: '100%', paddingBottom: '50px', boxShadow: '1px 5px 10px 5px rgba(0, 0, 0, 0.16)',
                                                        WebkitBoxShadow: '1px 5px 10px 5px rgba(0, 0, 0, 0.16)',
                                                        MozBoxShadow: '1px 5px 10px 5px rgba(0, 0, 0, 0.16)'
                                                    }}>
                                                        <CardContent>
                                                            <Typography variant="h5" component="div">

                                                            </Typography>
                                                            <Typography variant="body2" color="text.secondary">
                                                                <div style={{ position: 'absolute', marginTop: '105px', marginLeft: '20px', fontSize: '30px', fontWeight: 'bold', color: 'rgb(247, 123, 8)' }}><label style={{ fontSize: '23px' }}>COP</label> ${(parseFloat(selectedPrice) + 154700).toLocaleString('es-CO')}</div>
                                                                <img src={img_flex} style={{ marginTop: '-15px', marginBottom: '1px' }} />
                                                            </Typography>
                                                        </CardContent>
                                                        <CardActions sx={{ justifyContent: 'center' }}>
                                                            <Button variant="contained" sx={{
                                                                textTransform: 'none',
                                                                backgroundColor: 'rgb(247, 123, 8)',
                                                                borderRadius: '50px',
                                                                fontSize: '14px',
                                                                height: '45px',
                                                                width: '250px',
                                                                '&:hover': { backgroundColor: darken('rgb(247, 123, 8)', 0.2) }

                                                            }} onClick={() => clickFlex(vuelo)} >Seleccionar</Button>
                                                        </CardActions>
                                                        <Typography variant="p" color="text.secondary" sx={{ marginLeft: '120px', fontSize: '12px' }}>
                                                            Precio por pasajero
                                                        </Typography>

                                                    </Card>
                                                </Grid>
                                            </Grid>
                                        </Typography>
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                        </div>
                    ))
                ) : (
                    <p style={{ visibility: 'hidden' }} >No se encontraron vuelos</p>
                )}

                {vuelos ? (
                    vuelos.horarios.map((vuelo, index) => (
                        <div className='div_accordionSemiMovil'>
                            <Accordion className='accordionSemiMovil' expanded={expanded === false}
                                key={index}
                                onChange={handleExpansion(index)}
                                onClick={() => clickAbrirCard(vuelo)}
                            >
                                <AccordionSummary

                                    aria-controls={`panel${index}-content`}
                                    id={`panel${index}-header`}
                                >

                                    <div className='div_contendedorMovilSemiMovil' >
                                        <div className='div_subContenedorMovilSemiMovil'>
                                            <div className='div_trayectoSemiMovilSemiMovil'>
                                                <label className='label_trayectoSemiMovil'>
                                                    <label className='label_directoMovilSemiMovil' ><label className='letra_directoSemiMovil'>Directo </label>{vuelo.tiempo_vuelo}</label>
                                                </label>
                                            </div>
                                        </div>
                                        <div className='div_contenedorVuelosSemiMovil'>

                                            <div className='div_origenMovilSemiMovil'>
                                                <label className='label_salidaMovilSemiMovil' >{vuelo.hora_salida}</label>
                                                <p className='p_codigoOrigenMovilSemiMovil'>{vuelo.codigo_origen}</p>
                                            </div>


                                            <div className='div_contenedorDatosVuelosMovilSemiMovil'>
                                                <img src={img_barraMediana} alt="Avion" style={{ display: 'block', margin: '0 auto', width: '50%' }} />
                                            </div>
                                            <div className='div_destinoMovilSemiMovil'>
                                                <label className='label_llegadaMovilSemiMovil'>{vuelo.hora_llegada}</label>
                                                <p className='p_codigoDestinoMovilSemiMovil'>{vuelo.codigo_destino}</p>
                                            </div>

                                        </div>
                                        <div className='div_valorPasajeMovilSemiMovil'>

                                            <div className='div_contenedorValorPasaje'>

                                                <label className='label_valorPasajeMovilSemiMovil'>
                                                    <label className='desdeSemiMovil'>Desde</label><br />
                                                    <label className='label_cop_MovilSemiMovil'>
                                                        COP
                                                    </label><label className='label_precioSemiMovil'>{`${formatPrice(selectedPrice)}`}</label></label>
                                            </div>
                                        </div>
                                    </div>

                                </AccordionSummary>
                                <AccordionDetails>

                                </AccordionDetails>
                            </Accordion>
                        </div>
                    ))
                ) : (
                    <p style={{ visibility: 'hidden' }}>No se encontraron vuelos</p>
                )}

                {vuelos ? (
                    vuelos.horarios.map((vuelo, index) => (
                        <div className='div_accordionMovil'>
                            <Accordion className='accordion' expanded={expanded === false}
                                key={index}
                                onChange={handleExpansion(index)}
                                onClick={() => clickAbrirCard(vuelo)}
                            >
                                <AccordionSummary

                                    aria-controls={`panel${index}-content`}
                                    id={`panel${index}-header`}
                                >

                                    <div className='div_contendedorMovil' >
                                        <div className='div_subContenedorMovil'>

                                            <div className='div_origenMovil'>
                                                <label className='label_salidaMovil' >{vuelo.hora_salida}</label>
                                                <p className='p_codigoOrigenMovil'>{vuelo.codigo_origen}</p>
                                            </div>
                                            <div className='div_trayecto'>
                                                <label className='label_trayecto'>
                                                    <label className='label_directoMovil' >{vuelo.tiempo_vuelo}<label className='letra_directo'>Directo </label> </label>
                                                </label>
                                            </div>

                                            <div className='div_contenedorDatosVuelosMovil'>
                                                <AirplanemodeActiveIcon style={{ transform: 'rotate(90deg)', marginLeft: '5px', fontSize: '18px' }} />
                                            </div>

                                            <div className='div_destinoMovil'>
                                                <label className='label_llegadaMovil'>{vuelo.hora_llegada}</label>
                                                <p className='p_codigoDestinoMovil'>{vuelo.codigo_destino}</p>
                                            </div>

                                            <div className='div_valorPasajeMovil'>
                                                <label className='label_valorPasajeMovil'>
                                                    COP
                                                </label>
                                                {`${formatPrice(selectedPrice)}`}
                                            </div>
                                        </div>
                                    </div>

                                </AccordionSummary>
                                <AccordionDetails>

                                </AccordionDetails>
                            </Accordion>
                        </div>
                    ))
                ) : (
                    <p style={{ visibility: 'hidden' }}>No se encontraron vuelos</p>
                )}

                {/* modal de basic, classic y flex */}

                <Dialog
                    open={abrirCard}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={cerrarCard}
                    aria-describedby="modal-desde-abajo"
                    className='Dialog'
                    sx={{
                        '& .MuiDialog-paper': {
                            margin: 0,
                            position: 'fixed',
                            top: 10,
                            bottom: 0,
                            width: '100%',
                            borderRadius: '10px 10px 0 0',
                            overflowY: 'auto', // Permite desplazamiento si el contenido es más grande que el modal
                            maxWidth: '100%', // Asegura que el modal ocupe todo el ancho de la pantalla
                            maxHeight: '100%',
                        },
                    }}
                >
                    <DialogTitle

                    >
                        <div className='editarBusqueda'>Selecciona tu tarifa</div>
                        <IconButton
                            aria-label="cerrar"
                            onClick={cerrarCard}
                            sx={{
                                position: 'absolute',
                                right: 8,
                                top: 8,
                                color: (theme) => theme.palette.grey[500],
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>

                    <DialogContent>


                        <Card sx={{
                            maxWidth: 345, margin: '0 auto', borderRadius: '15px', height: 'auto', paddingBottom: '50px', marginTop: '15px', marginBottom: '30px', boxShadow: '1px 5px 10px 5px rgba(0, 0, 0, 0.16)',
                            WebkitBoxShadow: '1px 5px 10px 5px rgba(0, 0, 0, 0.16)',
                            MozBoxShadow: '1px 5px 10px 5px rgba(0, 0, 0, 0.16)',

                        }}>
                            <CardContent>
                                <Typography variant="h5" component="div">

                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    <div style={{ position: 'relative' }}>
                                        {/* Precio posicionado sobre la imagen */}
                                        <div style={{
                                            position: 'absolute', top: '100px', left: '15px', fontSize: '30px', fontWeight: 'bold', color: 'rgb(226, 17, 17)'
                                        }}>
                                            <label style={{ fontSize: '23px' }}>COP</label> ${`${formatPrice(selectedPrice)}`}
                                        </div>
                                        {/* Imagen */}
                                        <img src={img_basic} style={{ marginTop: '15px', marginBottom: '-5px' }} />
                                    </div>


                                </Typography>
                            </CardContent>
                            <CardActions sx={{ justifyContent: 'center' }}>
                                <Button variant="contained" sx={{
                                    textTransform: 'none',
                                    backgroundColor: 'rgb(226, 17, 17)',
                                    borderRadius: '50px',
                                    fontSize: '14px',
                                    height: '45px',
                                    width: '250px',
                                    '&:hover': { backgroundColor: darken('rgb(226, 17, 17)', 0.2) }

                                }} onClick={() => enviarDatosMovilPrecioBasic()}  >Seleccionar</Button>
                            </CardActions>
                            <Typography variant="p" color="text.secondary" sx={{ marginLeft: '120px', fontSize: '12px' }}>
                                Precio por pasajero
                            </Typography>

                        </Card>



                        <Card sx={{
                            maxWidth: 345, margin: '0 auto', border: '2px solid rgb(204, 51, 140)', borderRadius: '15px', height: 'auto', paddingBottom: '50px', marginBottom: '30px', boxShadow: '1px 5px 10px 5px rgba(0, 0, 0, 0.16)',
                            WebkitBoxShadow: '1px 5px 10px 5px rgba(0, 0, 0, 0.16)',
                            MozBoxShadow: '1px 5px 10px 5px rgba(0, 0, 0, 0.16)'
                        }}>
                            <CardContent>
                                <Typography variant="h5" component="div">

                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    <div style={{ position: 'relative' }}>
                                        {/* Precio posicionado sobre la imagen */}
                                        <div style={{
                                            position: 'absolute', top: '100px', left: '15px', fontSize: '30px', fontWeight: 'bold', color: 'rgb(204, 51, 140)'
                                        }}>
                                            <label style={{ fontSize: '23px' }}>COP</label> ${(parseFloat(selectedPrice) + 113050).toLocaleString('es-CO')}
                                        </div>
                                        {/* Imagen */}
                                        <img src={img_classic} style={{ marginTop: '15px', marginBottom: '-5px' }} />
                                    </div>

                                </Typography>
                            </CardContent>
                            <CardActions sx={{ justifyContent: 'center' }}>
                                <Button variant="contained" sx={{
                                    textTransform: 'none',
                                    backgroundColor: 'rgb(204, 51, 140)',
                                    borderRadius: '50px',
                                    fontSize: '14px',
                                    height: '45px',
                                    width: '250px',
                                    '&:hover': { backgroundColor: darken('rgb(204, 51, 140)', 0.2) }

                                }} onClick={() => enviarDatosMovilPrecioClassic()}   >Seleccionar</Button>
                            </CardActions>
                            <Typography variant="p" color="text.secondary" sx={{ marginLeft: '120px', fontSize: '12px' }}>
                                Precio por pasajero
                            </Typography>

                        </Card>


                        <Card sx={{
                            maxWidth: 345, margin: '0 auto', border: '15px', height: 'auto', paddingBottom: '50px', marginBottom: '30px', boxShadow: '1px 5px 10px 5px rgba(0, 0, 0, 0.16)',
                            WebkitBoxShadow: '1px 5px 10px 5px rgba(0, 0, 0, 0.16)',
                            MozBoxShadow: '1px 5px 10px 5px rgba(0, 0, 0, 0.16)'
                        }}>
                            <CardContent>
                                <Typography variant="h5" component="div">

                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    <div style={{ position: 'relative' }}>
                                        {/* Precio posicionado sobre la imagen */}
                                        <div style={{
                                            position: 'absolute', top: '100px', left: '15px', fontSize: '30px', fontWeight: 'bold', color: 'rgb(247, 123, 8)'
                                        }}>
                                            <label style={{ fontSize: '23px' }}>COP</label> ${(parseFloat(selectedPrice) + 154700).toLocaleString('es-CO')}
                                        </div>
                                        {/* Imagen */}
                                        <img src={img_flex} style={{ marginTop: '15px', marginBottom: '-5px' }} />
                                    </div>

                                </Typography>
                            </CardContent>
                            <CardActions sx={{ justifyContent: 'center' }}>
                                <Button variant="contained" sx={{
                                    textTransform: 'none',
                                    backgroundColor: 'rgb(247, 123, 8)',
                                    borderRadius: '50px',
                                    fontSize: '14px',
                                    height: '45px',
                                    width: '250px',
                                    '&:hover': { backgroundColor: darken('rgb(247, 123, 8)', 0.2) }

                                }} onClick={() => enviarDatosMovilPrecioFlex()} >Seleccionar</Button>
                            </CardActions>
                            <Typography variant="p" color="text.secondary" sx={{ marginLeft: '120px', fontSize: '12px' }}>
                                Precio por pasajero
                            </Typography>

                        </Card>





                    </DialogContent>
                </Dialog>




                <div className='div_accordion'>
                    <div>
                        <Accordion className='accordionTarifas'>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"

                                style={{ width: '97%' }}
                            >
                                <Typography variant="body2" paragraph style={{ marginTop: '10px', marginBottom: '10px', fontSize: '20px', fontWeight: 'bold' }}>Condiciones tarifarias</Typography>
                            </AccordionSummary >
                            <AccordionDetails >
                                <Typography variant="h6" paragraph className='TypographyparrafoNegrita'>Cambios de vuelo</Typography>
                                <Typography variant="body2" paragraph className='TypographyparrafoPrimero'>
                                    Para las tarifas basic, light y classic se permiten cambios antes de la salida del vuelo, pero aplican los siguientes cargos adicionales:
                                </Typography>
                                <Typography variant="body2" paragraph className='Typographyparrafo'>
                                    Cargo por cambio: son los cargos adicionales que se generan al cambiar tu vuelo de manera voluntaria (aplican únicamente para las tarifas basic, light y classic).
                                </Typography>
                                <Typography variant="body2" component="div">
                                    <table border="1" cellPadding="10" cellSpacing="0" className='tabla1' >
                                        <thead>
                                            <tr>
                                                <th className='th'>Destino</th>
                                                <th>Cargo</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className='th'>Vuelos nacionales en Colombia</td>
                                                <td className='th'>120.000 COP</td>
                                            </tr>
                                            <tr>
                                                <td className='th'>Vuelos nacionales en Ecuador</td>
                                                <td>30 USD</td>
                                            </tr>
                                            <tr>
                                                <td className='th'>Vuelos internacionales al interior de Suramérica</td>
                                                <td>185 USD</td>
                                            </tr>
                                            <tr>
                                                <td className='th'>Otros vuelos internacionales en las Américas y vuelos hacia Europa</td>
                                                <td>USD/CAD 210</td>
                                            </tr>
                                            <tr>
                                                <td className='th'>Desde Reino Unido</td>
                                                <td>GBP 150</td>
                                            </tr>
                                            <tr>
                                                <td className='th'>Desde el resto de Europa</td>
                                                <td>EUR 180</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </Typography>
                                <Typography variant="body2" paragraph className='Typographyparrafo'>
                                    Diferencia de tarifa: es la diferencia en dinero entre la tarifa del tiquete que compraste inicialmente y la nueva opción de tarifa que estás eligiendo (aplica para todas las tarifas).
                                </Typography>
                                <Typography variant="body2" paragraph className='Typographyparrafo'>
                                    Diferencias generadas por impuestos: aplican según las normativas vigentes de cada país.
                                </Typography>
                                <Typography variant="body2" paragraph className='Typographyparrafo'>
                                    Para las tarifas flex y business se permiten cambios antes de la salida del vuelo sin cargo por cambio, pero podrán aplicar cargos por diferencia de tarifa e impuestos.
                                </Typography>
                                <Typography variant="h6" className='TypographyparrafoNegrita'>Asientos</Typography>
                                <Typography variant="body2" paragraph className='Typographyparrafo'>
                                    Ten en cuenta que la reclinación máxima de los asientos en business class puede variar según el tipo de avión.
                                </Typography>
                                <Typography variant="body2" paragraph className='Typographyparrafo'>
                                    Asiento business class, business class (Flatbed) o Premium (de acuerdo al tipo de avión que opera la ruta) están incluidos para la tarifa business con todos sus beneficios.
                                </Typography>
                                <Typography variant="body2" paragraph className='Typographyparrafo'>
                                    Asientos Plus: están incluidos y sujetos a disponibilidad comprando la tarifa flex.
                                </Typography>
                                <Typography variant="body2" paragraph className='Typographyparrafo'>
                                    En algunos de nuestros aviones solo contamos con asientos Economy.
                                </Typography>
                                <Typography variant="h6" className='TypographyparrafoNegrita'>Reembolsos</Typography>
                                <Typography variant="body2" paragraph className='Typographyparrafo'>
                                    Aplica para las tarifas flex y business, antes del vuelo.
                                </Typography>
                                <Typography variant="body2" paragraph className='Typographyparrafo'>
                                    Los reembolsos después del vuelo no se permiten en ninguna tarifa, excepto ante eventos operacionales.
                                </Typography>
                                <Typography variant="body2" paragraph className='Typographyparrafo'>
                                    La condición de reembolso aplica sobre el valor pagado por la tarifa. Los impuestos serán reembolsados de acuerdo con las disposiciones legales aplicables.
                                </Typography>
                                <Typography variant="body2" paragraph className='Typographyparrafo'>
                                    Todas nuestras tarifas (basic, light, classic y flex), excepto la business, son tarifas promocionales.
                                </Typography>
                                <Typography variant="body2" paragraph>
                                    A partir del 1 de junio de 2023, los servicios adicionales que compres para tu reserva y decidas no utilizar, serán reembolsables únicamente si tu tarifa es flex o business.
                                </Typography>
                                <Typography variant="body2" paragraph className='Typographyparrafo'>
                                    Los servicios adicionales no prestados por causa imputable a la aerolínea, serán reembolsables para todas las tarifas.
                                </Typography>
                                <Typography variant="body2" paragraph className='Typographyparrafo'>
                                    Consulta más información sobre el derecho de retracto, desistimiento y otras leyes según el país en nuestro Centro de ayuda.
                                </Typography>
                                <Typography variant="body2" paragraph className='Typographyparrafo'>
                                    Estás obligado a utilizar todos los segmentos de tu itinerario según el plan de vuelo que contrataste. No puedes quedarte en la ciudad de conexión sin continuar hacia tu destino final. Si decides no completar tu itinerario, consideraremos que has completado el viaje desde el origen hasta el destino final programado, y no tendrás derecho a reembolso por los segmentos no volados, excepto por los impuestos y tasas no causadas correspondientes a esos segmentos.
                                </Typography>
                                <Typography variant="h6" className='TypographyparrafoNegrita'>Servicio prioritario</Typography>
                                <Typography variant="body2" paragraph className='Typographyparrafo'>
                                    La tarifa business incluye fila preferencial para atención en counter (check-in), entrega y recepción de equipaje con prioridad y abordaje prioritario.
                                </Typography>
                                <Typography variant="h6" className='TypographyparrafoNegrita'>Acumulación lifemiles</Typography>
                                <Typography variant="body2" paragraph className='Typographyparrafo'>
                                    El precio de la tarifa tomado para el cálculo de las millas no incluye tasas, impuestos o servicios adicionales.
                                </Typography>
                                <Typography variant="body2" paragraph className='Typographyparrafo'>
                                    Los socios elite acumulan millas adicionales, el bono elite aplica según el estatus que tenga cada socio:
                                </Typography>
                                <Typography variant="body2" component="div" >
                                    <table border="1" cellPadding="10" cellSpacing="0" className='tabla2'>
                                        <thead>
                                            <tr>
                                                <th>Diamond</th>
                                                <th>Gold</th>
                                                <th>Silver</th>
                                                <th>Red Plus</th>
                                                <th>lifemiles</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className='setenta'>70%</td>
                                                <td>50%</td>
                                                <td>30%</td>
                                                <td>10%</td>
                                                <td>0%</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                </div>

                <React.Fragment>

                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        sx={{
                            zIndex: 1301,
                        }}
                    >

                        <DialogContent
                        >
                            <DialogContentText id="alert-dialog-description">
                                <img src={imagen_opcion_basic} />

                            </DialogContentText>
                            <label style={{
                                textDecoration: 'underline',
                                color: '#558bff ',
                                marginTop: '10px',
                                marginLeft: '70px',
                                fontSize: '15px',
                                cursor: 'pointer'

                            }} onClick={clickBasic} >Continuar con basic</label>
                            <button style={{
                                textAlign: 'center',
                                backgroundColor: 'black',
                                width: '250px',
                                color: 'white',
                                padding: '10px',
                                borderRadius: '30px',
                                fontSize: '17px',
                                fontWeight: 'bold',
                                float: 'right'
                            }} onClick={clickClassic} >¡Quiero classic!</button>
                        </DialogContent>
                    </Dialog>
                </React.Fragment>

                <React.Fragment>

                    <Dialog
                        open={openClassic}
                        onClose={handleCloseClassic}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        sx={{
                            zIndex: 1301,
                        }}
                    >

                        <DialogContent
                        >
                            <DialogContentText id="alert-dialog-description">
                                <img src={imagen_opcion_classic} style={{ marginTop: '-30px' }} />

                            </DialogContentText>
                            <label style={{
                                textDecoration: 'underline',
                                color: 'black ',
                                marginTop: '10px',
                                marginLeft: '70px',
                                fontSize: '15px',
                                cursor: 'pointer'

                            }} onClick={clickClassic} >Continuar con classic</label>
                            <button style={{
                                textAlign: 'center',
                                backgroundColor: 'orange',
                                width: '250px',
                                color: 'white',
                                padding: '10px',
                                border: 'none',
                                borderRadius: '30px',
                                fontSize: '17px',
                                fontWeight: 'bold',
                                float: 'right'
                            }} onClick={clickFlex} >¡Quiero flex!</button>
                        </DialogContent>
                    </Dialog>
                </React.Fragment>


            </div>
            <PiePagina />
        </>
    );

}

export default Paso1;
