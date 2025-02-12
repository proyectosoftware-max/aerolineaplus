import { Container, Navbar, Nav, Card, Accordion, Modal } from 'react-bootstrap';
import { Accordion as AccordionUI, AccordionSummary, TextField, Modal as ModalUI, Box, Backdrop, Button } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ProgressBar from 'react-bootstrap/ProgressBar';
import React, { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Slide from '@mui/material/Slide';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InputAdornment from '@mui/material/InputAdornment';
import barraMediana from '../material/barraMediana.png';
import logo from '../material/logo-avianca.png';
import data from './data.json';
import RadioButton from './radio.jsx';
import iconoMovil from '../material/iconoMovil.png';
import { FaChevronDown } from 'react-icons/fa';
import { DataContext } from './Context.jsx';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
dayjs.locale('es');


const formatDate = (date) => {
  // Formato corto del día de la semana, número del día y mes
  const formattedDate = dayjs(date).format('D MMM'); // Ej: "Thu 12 Sep"

  // Separar el formato en partes
  let [day, monthAbbreviation] = formattedDate.split(' ');


  // Mapea la abreviación del mes al español usando el mapa personalizado
  const capitalizedMonth = monthMap[monthAbbreviation.toLowerCase()] || monthAbbreviation;

  // Retorna el formato final, por ejemplo "Jue, 12 Sept"
  return `${day} ${capitalizedMonth}`;
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

const MenuNavBarPaso1 = () => {

  const [lgShow, setLgShow] = useState(false);
  const [ciudadOrigen, setCiudadOrigen] = useState("Barranquilla");
  const [ciudadDestino, setCiudadDestino] = useState("Medellín");
  const [scrolled, setScrolled] = useState(false);
  const { sharedData, fecha, setFecha, salida, llegada, setSalida, setLlegada, origen, destino, setOrigen, setDestino, precio, colorboton, setColorBoton, contarAdulto, setContarAdulto, adulto, setAdulto, pasajero, setPasajero } = useContext(DataContext);
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false); // Control del estado de la flecha
  const [abrirModal, setAbrirModal] = useState(false);
  const [abrirCiudadOrigen, setAbrirCiudadOrigen] = useState(false);
  const [abrirCiudadDestino, setAbrirCiudadDestino] = useState(false);
  const [abrirFecha, setAbrirFecha] = useState(false);
  const [abrirAdulto, setAbrirAdulto] = useState(false);
  const navigate = useNavigate();
 

  const clickAbrirCiudadOrigen = () => {
    setAbrirCiudadOrigen(true);
  };

  const cerrarModalCiudadOrigen = () => {
    setAbrirCiudadOrigen(false);
  };

  const clickAbrirCiudadDestino = () => {
    setAbrirCiudadDestino(true);
  };

  const cerrarModalCiudadDestino = () => {
    setAbrirCiudadDestino(false);
  };

  const clickAbrirFecha = () => {
    setAbrirFecha(true);
  };

  const cerrarModalFecha = () => {
    setAbrirFecha(false);
  };

  const clickAbrirAdulto = () => {
    setAbrirAdulto(true);
  };

  const cerrarModalAdulto = () => {
    setAbrirAdulto(false);
  };


  const clickAbrirModal = () => {
    setAbrirModal(true);
  };

  const cerrarModal = () => {
    setAbrirModal(false);
  };

  const AbrirDestino = () => {
    setAbrirCiudadOrigen(false);
    setAbrirCiudadDestino(true);
  }
  const AbrirFecha = () => {
    setAbrirCiudadDestino(false);
    setAbrirFecha(true);
  }

  const AbrirAdulto = () => {
    setAbrirFecha(false);
    setAbrirAdulto(true);
  }


  const handleOpen = () => {
    if (precio !== 0) {
      setOpen(true);
      setExpanded(true); // Mueve la flecha hacia arriba
    }
  };

  const handleClose = () => {
    setOpen(false);
    setExpanded(false); // Vuelve la flecha a su estado original
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const [query1, setQuery1] = useState(ciudadOrigen);
  const [filteredData1, setFilteredData1] = useState([]);
  const [query2, setQuery2] = useState(ciudadDestino);
  const [filteredData2, setFilteredData2] = useState([]);

  useEffect(() => {
    // Si necesitas realizar alguna operación con los datos, puedes hacerlo aquí
  }, []);

  const handleChange1 = (e) => {
    const value = e.target.value;
    setQuery1(value);
    if (value) {
      const results = data.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredData1(results);
    } else {
      setFilteredData1([]);
    }
  };

  const highlightText1 = (text, query1) => {
    const parts = text.split(new RegExp(`(${query1})`, 'gi'));
    return (
      <span>
        {parts.map((part, index) =>
          part.toLowerCase() === query1.toLowerCase() ? (
            <strong key={index}>{part}</strong>
          ) : (
            part
          )
        )}
      </span>
    );
  };


  const handleClick1 = (name) => {
    setQuery1(name);
    setFilteredData1([]);
  };

  const handleChange2 = (e) => {
    const value = e.target.value;
    setQuery2(value);
    if (value) {
      const results = data.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredData2(results);
    } else {
      setFilteredData2([]);
    }
  };

  const highlightText2 = (text, query2) => {
    const parts = text.split(new RegExp(`(${query2})`, 'gi'));
    return (
      <span>
        {parts.map((part, index) =>
          part.toLowerCase() === query2.toLowerCase() ? (
            <strong key={index}>{part}</strong>
          ) : (
            part
          )
        )}
      </span>
    );
  };


  const handleClick2 = (name) => {
    setQuery2(name);
    setFilteredData2([]);
  };

  const handleClickMovil1 = (name) => {
    setQuery1(name);
    setFilteredData1([]);
    setAbrirCiudadOrigen(false);
    setAbrirCiudadDestino(true);
  };

  const handleClickMovil2 = (name) => {
    setQuery2(name);
    setFilteredData2([]);
    setAbrirCiudadDestino(false);
    setAbrirFecha(true);
  };

  const [startDate, setStartDate] = useState(dayjs(fecha));
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [isCalendarVisibleMovil, setIsCalendarVisibleMovil] = useState(true);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [paragraphText, setParagraphText] = useState('¿Cuándo vas a volar?');
  const calendarRef = useRef(null);

  const today = new Date(); // Fecha actual
  today.setHours(0, 0, 0, 0);
  const months = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];
  const daysOfWeek = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'];

  /*const handleDateClick = (date) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
    } else if (startDate && !endDate && date > startDate) {
      setEndDate(date);
    }
    setIsCalendarVisible(false);
  };*/


  const handleDateClick = (date) => {
    setStartDate(date); // Actualiza el estado de startDate cada vez que se selecciona una fecha
    // setFecha(date);
    setIsCalendarVisible(false); // Oculta el calendario después de seleccionar la fecha
    console.log(date);
    console.log(fecha);
  };


  const handleClickOutside = (event) => {
    if (calendarRef.current && !calendarRef.current.contains(event.target)) {
      setIsCalendarVisible(false);
    }
  };

  const handleFocus = (inputType) => {
    setIsCalendarVisible(true);
    if (inputType === 'start') {
      setParagraphText('¿Cuándo vas a volar?');
    } else if (inputType === 'end') {
      setParagraphText('¿Cuándo vuelves?');
    }
  };


  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const renderCalendar = (month, year) => {
    const firstDayOfMonth = new Date(year, month, 1).getDay() || 7; // Primer día de la semana (corregido para que comience en lunes)
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = [];

    // Rellenar con días en blanco si el mes no comienza en lunes
    for (let i = 1; i < firstDayOfMonth; i++) {
      days.push(<div key={`blank-${i}`} className="day blank"></div>);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const isDisabled = date < today;
      days.push(
        <div
          key={i}
          className={`day ${isDisabled ? 'disabled' : ''} ${startDate && dayjs(date).isSame(dayjs(startDate), 'day') ? 'selected' : ''}

            }`}
          onClick={() => !isDisabled && handleDateClick(date)}
        >
          {i}
        </div>
      );
    }

    return (
      <div className="calendar-month">
        <div className="month-year">
          <span className="arrow" onClick={() => handleMonthChange(-1)}>&lt;</span>
          {`${months[month]} ${year}`}
          <span className="arrow" onClick={() => handleMonthChange(1)}>&gt;</span>
        </div>
        <div className="days-of-week">
          {daysOfWeek.map((day, index) => (
            <div key={index} className="day-of-week">
              {day}
            </div>
          ))}
        </div>
        <div className="days">{days}</div>
      </div>
    );
  };

  const handleMonthChange = (direction) => {
    let newMonth = currentMonth + direction;
    let newYear = currentYear;

    if (newMonth < 0) {
      newMonth = 11;
      newYear -= 1;
    } else if (newMonth > 11) {
      newMonth = 0;
      newYear += 1;
    }

    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };


  const [activeKey, setActiveKey] = useState(null);
  const [contarA, setContarA] = useState(0);
  const [contarJ, setContarJ] = useState(0);
  const [contarN, setContarN] = useState(0);
  const [contarB, setContarB] = useState(0);
  const [sumacontar, setSumacontar] = useState(0);
  const [confirmarContar, setConfirmarContar] = useState(0);

  const toggleAccordion = (key) => {
    setActiveKey(activeKey === key ? null : key);
  };

  const incrementoA = () => {

    if(contarA < 2){
    setContarA(preconteo => preconteo + 1);
    /*setSumacontar(preconteo => preconteo + 1);*/
    }
  }

  const decrementoA = () => {
    if (contarA > 1) {
      setContarA(preconteo => preconteo - 1);

    }
  }

  /*
  const incrementoJ = () => {
    setContarJ(preconteo => preconteo + 1);
    setSumacontar(preconteo => preconteo + 1);
  }

  const incrementoN = () => {
    setContarN(preconteo => preconteo + 1);
    setSumacontar(preconteo => preconteo + 1);

  }

  const incrementoB = () => {
    setContarB(preconteo => preconteo + 1);
    setSumacontar(preconteo => preconteo + 1);
  }



  const decrementoJ = () => {
    if (contarJ > 0) {
      setContarJ(preconteo => preconteo - 1);
      setSumacontar(preconteo => preconteo - 1);

    }
  }

  const decrementoN = () => {
    if (contarN > 0) {
      setContarN(preconteo => preconteo - 1);
      setSumacontar(preconteo => preconteo - 1);
    }
  }

  const decrementoB = () => {
    if (contarB > 0) {
      setContarB(preconteo => preconteo - 1);
      setSumacontar(preconteo => preconteo - 1);
    }
  } */

    const clickConfirmarContar = (key) => {
      setActiveKey(activeKey === key ? null : key);
      setConfirmarContar(contarA);
      setContarAdulto(contarA);
      setAbrirAdulto(false);
    }
  

  const Buscar = () => {
    setCiudadOrigen(query1);
    setCiudadDestino(query2);
    setLgShow(false);
    setFecha(startDate);
  }

  const BuscarMovil = () => {
    setCiudadOrigen(query1);
    setCiudadDestino(query2);
    setLgShow(false);
    setFecha(startDate);
    setAbrirModal(false);
  }

  useEffect(() => {
    setStartDate(fecha);
  }, [fecha]);

  useEffect(() => {
    localStorage.setItem('origen', setOrigen(ciudadOrigen));
  }, [ciudadOrigen]);


  useEffect(() => {
    localStorage.setItem('destino', setDestino(ciudadDestino));
  }, [ciudadDestino]);

  useEffect(() => {
    localStorage.setItem('fecha', setFecha(fecha));
  }, [fecha]);

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
    localStorage.setItem('contarAdulto', setContarAdulto(contarAdulto));
  }, [contarAdulto]);

  useEffect(() => {
    localStorage.setItem('adulto', setAdulto(adulto));
  }, [adulto]);

  useEffect(() => {
    localStorage.setItem('pasajero', setPasajero(pasajero));
  }, [pasajero]);

  const clickEditarAtras = () =>{
    navigate('/');
  }

  return (
    <>
      <div
        style={{
          position: 'relative',
          zIndex: lgShow ? '0' : '1301', // Asegura que esté sobre el Backdrop
        }}
      >
        <Navbar className={`navbarEscritorio ${scrolled ? 'hidden' : ''}`} expand="lg" fixed='top'>
          <Container className='container1'>
            <Navbar.Brand href="" className='navbar-brand'>
              <img src={logo} width='170' height='40' className="d-inline-block align-top" />
            </Navbar.Brand>
            <Navbar.Collapse id="bascic navbar-nav">
              <Nav className='flex-column'>
                <div className="nav1" >
                  <Navbar.Text className='ciudad1'>{ciudadOrigen}</Navbar.Text>
                  <Navbar.Text className='a' >a</Navbar.Text>
                  <Navbar.Text className='ciudad2'>{ciudadDestino}</Navbar.Text>
                </div>
                <div className="nav2" >
                  <Nav>
                    <Navbar.Text className='fecha'><FlightTakeoffIcon sx={{ fontSize: '16px' }} /><label style={{ marginLeft: '5px' }}>{dayjs(fecha).format('D\nMMMM\nYYYY')}</label></Navbar.Text>
                    <Navbar.Text className='adulto' ><GroupAddIcon sx={{ fontSize: '16px' }} /><label style={{ marginLeft: '5px' }}>{contarAdulto} {adulto}</label></Navbar.Text>
                    <Nav.Link className='letra_editar' onClick={clickEditarAtras}><EditIcon sx={{ fontSize: '16px', color: 'rgb(90, 142, 155)' }} /><label style={{ marginLeft: '5px', textDecoration: 'underline', cursor: 'pointer' }}>Editar</label></Nav.Link>
                  </Nav>
                </div>
              </Nav>
            </Navbar.Collapse>
          </Container>

          <Container className='container2'>
            <Navbar.Collapse id="bascic navbar-nav">
              <Nav className='flex-column'>
                <div className='pasos' >
                  <Navbar.Text>Paso 1 de 5 {adulto}</Navbar.Text>
                </div>
                <div className="barra" >
                  <ProgressBar now={20} className='BarraProgreso' style={{ height: '10px' }} />
                </div>
              </Nav>

              {/* Accordion que no cambia de tamaño */}
              <AccordionUI
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
                  onClick={handleOpen} // Abrir modal al hacer clic
                  sx={{
                    fontWeight: 'bold',
                    width: '200px',
                    marginTop: '10px',
                    height: '50px',
                    paddingTop: '8px',
                    paddingBottom: '8px',
                    borderRadius: '30px',
                    fontSize: '15px',
                    marginLeft: '10px',
                    marginRight: '5px',
                    border: '2px solid black',
                    textAlign: 'center',
                    cursor: precio !== 0 ? 'pointer' : 'default', // Deshabilitar el cursor si el precio es 0
                  }}
                >
                  <div style={{ width: '100%' }}><ShoppingCartIcon sx={{ fontSize: '16px', marginTop: '-9px' }} /><label style={{ marginLeft: '8px' }}>COP </label> <label className='label_cero'>{precio}</label></div>

                </AccordionSummary>
              </AccordionUI>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Navbar className={`navbarEscritorio navbar-scroll ${scrolled ? 'visible' : 'hidden'}`} expand="lg" fixed='top'>
          <Container className='container1'>
            <Navbar.Brand href="" className='navbar-brand'>
              <img src={logo} width='170' height='40' className="d-inline-block align-top" />
            </Navbar.Brand>
            <Navbar.Collapse id="bascic navbar-nav">
              <Nav className='flex-column'>
                <div className="nav1" >
                  <Navbar.Text className='ciudad1'>{ciudadOrigen}</Navbar.Text>
                  <Navbar.Text className='a' >a</Navbar.Text>
                  <Navbar.Text className='ciudad2'>{ciudadDestino}</Navbar.Text>
                </div>
                <div className="nav2" >
                  <Nav>
                    <Navbar.Text className='fecha'><FlightTakeoffIcon sx={{ fontSize: '16px' }} /><label style={{ marginLeft: '5px' }}>{dayjs(fecha).format('D\nMMMM\nYYYY')}</label></Navbar.Text>
                    <Navbar.Text className='adulto' ><GroupAddIcon sx={{ fontSize: '16px' }} /><label style={{ marginLeft: '5px' }}>{contarAdulto} {adulto}</label></Navbar.Text>
                    <Nav.Link className='letra_editar' onClick={clickEditarAtras}><EditIcon sx={{ fontSize: '16px', color: 'rgb(90, 142, 155)' }} /><label style={{ marginLeft: '5px', textDecoration: 'underline', cursor: 'pointer' }}>Editar</label></Nav.Link>
                  </Nav>
                </div>
              </Nav>
            </Navbar.Collapse>
          </Container>

          <Container className='container2'>
            <Navbar.Collapse id="bascic navbar-nav">
              <Nav className='flex-column'>
                <div className='pasos' >
                  <Navbar.Text>Paso 1 de 5</Navbar.Text>
                </div>
                <div className="barra" >
                  <ProgressBar now={20} className='BarraProgreso' style={{ height: '10px' }} />
                </div>
              </Nav>
              <AccordionUI
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
                  onClick={handleOpen} // Abrir modal al hacer clic
                  sx={{
                    fontWeight: 'bold',
                    width: '200px',
                    marginTop: '10px',
                    height: '50px',
                    paddingTop: '8px',
                    paddingBottom: '8px',
                    borderRadius: '30px',
                    fontSize: '15px',
                    marginLeft: '10px',
                    marginRight: '5px',
                    border: '2px solid black',
                    textAlign: 'center',
                    cursor: precio !== 0 ? 'pointer' : 'default', // Deshabilitar el cursor si el precio es 0
                  }}
                >
                  <div style={{ width: '100%' }}><ShoppingCartIcon sx={{ fontSize: '16px', marginTop: '-9px' }} /><label style={{ marginLeft: '8px' }}>COP </label> <label className='label_cero'>{precio}</label></div>

                </AccordionSummary>
              </AccordionUI>
            </Navbar.Collapse>
          </Container>
        </Navbar>

      </div >

      <Navbar className={'navbarMovil'} expand="lg" fixed='top'>
        <div className='div_label_seleccion' >
          <img src={iconoMovil} className='iconoMovil'/>
          <label className="label_seleccion" >

          </label>
          <div className='div_precioMovil' >
            <div className='div_contenidoPrecioMovil'>
            <ShoppingCartIcon sx={{ fontSize: '16px', marginTop: '-9px', color:'white' }} /><label className='label_copMovil' >COP </label> <label className='label_ceroMovil'>{precio}</label></div>
            </div>
        </div>
        
        <div className='div_menuBar'>
          <p className='p_idaMenuBar'><FlightTakeoffIcon className='avion' sx={{ fontSize: '25px' }} /><label className='letra_ida' style={{ marginLeft: '5px' }}>Ida:</label> {origen} <label style={{ marginLeft: '5px', marginRight: '8px' }}>a</label>{destino}</p>
          <div className='div_movil'>
            <div className='fecha'><FlightTakeoffIcon sx={{ fontSize: '15px' }} /><label style={{ marginLeft: '5px' }}>{dayjs(fecha).format('D\nMMMM\nYYYY')}</label></div>
            <div className='adulto' ><GroupAddIcon sx={{ fontSize: '15px' }} /><label style={{ marginLeft: '5px' }}>{contarAdulto} {pasajero}</label></div>
          </div>
          <div className='letra_editar' ><EditIcon sx={{ fontSize: '14px', marginTop: '-5px', color: 'white' }} onClick={clickEditarAtras} /></div>
        </div>
      </Navbar>

      {/* Modal con flecha */}
      < ModalUI
        open={open}
        onClose={handleClose} // Cerrar modal y regresar la flecha
        closeAfterTransition
        disableScrollLock
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
          sx: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo oscuro
          },
        }
        }
      >
        <Box
          sx={{
            position: 'fixed',
            right: '70px',
            top: '14%',
            width: 480,
            height: 480,
            bgcolor: 'white',
            p: 3,
            borderRadius: 2,
            boxShadow: 240,
            zIndex: 1301,
            ':before': {
              content: '""',
              position: 'absolute',
              left: '-10px',
              top: '20px',
              borderWidth: '10px',
              borderStyle: 'solid',
              borderColor: 'transparent white transparent transparent', // Flecha apuntando al accordion
            },
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '-10px', // Ajusta la posición vertical de la flecha
              left: '70%', // Ajusta la posición horizontal de la flecha
              width: '0',
              height: '0',
              borderLeft: '10px solid transparent',
              borderRight: '10px solid transparent',
              borderBottom: '10px solid white',
              zIndex: 1, // Asegura que la flecha esté debajo del modal
            }}
          />
          <p style={{ fontSize: '22px', fontWeight: 'bold' }}>Resumen de compra</p>
          <p style={{ fontSize: '22px', fontWeight: 'bold' }}>Ida</p>
          <p style={{ fontSize: '20px', fontWeight: 'bold' }}>{origen} a {destino}</p>
          <div style={{ display: 'flex' }}>
            <div>{dayjs(fecha).format('D\nMMMM\nYYYY')}</div>
            <div
              className={`boton-${colorboton}`}
            >
              <label className='label_colorBoton'>{colorboton.charAt(0).toUpperCase() + colorboton.slice(1)}</label>
            </div>
          </div>
          <div style={{ display: 'flex' }}>
            <div style={{ fontSize: '22px', fontWeight: 'bold', }}>{salida}</div>
            <div style={{ marginTop: '5px', marginLeft: '5px', marginRight: '5px' }}><img src={barraMediana} /></div>
            <div style={{ fontSize: '22px', fontWeight: 'bold' }}>{llegada}</div>
          </div>
          <p style={{ marginTop: '30px' }}>{contarAdulto} {adulto}</p>
          <div style={{ display: 'flex', marginTop: '50px' }}>
            <div style={{ fontFamily: 'revert', fontSize: '22px', fontWeight: 'bold', marginRight: '130px' }}>Total a pagar</div>
            <div style={{ fontSize: '22px', fontWeight: 'bold' }}><label style={{ marginRight: '5px' }}>COP</label>{precio}</div>
          </div>

          {/* Botón para cerrar el modal */}
          <p onClick={handleClose} className='botonCerrar'>Cerrar</p>
        </Box>
      </ModalUI >

      <div className='div_modal'
        style={{
          position: 'relative',
          zIndex: 1401, // Asegura que esté sobre el Backdrop
        }}
      >

        <Modal
          size="xl"
          show={lgShow}
          onHide={() => setLgShow(false)}
          aria-labelledby="example-modal-sizes-title-lg"
          closeButton
          className='modal'
          dialogClassName="custom-modal-size"
          sx={{
            zIndex: 1301,
          }}
        >
          <Modal.Header className='header'
            closeButton style={{ borderBottom: 'none', paddingBottom: '0' }} >

          </Modal.Header>
          <Modal.Body className='modalBody'>
            <div className='letra_editar_busqueda'>Editar búsqueda</div>


            <RadioButton />
            <table border="0" cellPadding="10" cellSpacing="0" className='tabla_imput1'>

              <tbody>
                <tr>
                  <td className='td_ciudad' style={{ width: '60%' }}>
                    <div className='input_ciudad'>

                      <TextField
                        label="Origen"
                        variant="standard"
                        className='textField'
                        value={query1}
                        onChange={handleChange1}
                        fullWidth

                        InputLabelProps={{
                          sx: {
                            top: '45%', // Posiciona el label dentro del campo
                            left: '10%', // Alinearlo a la izquierda
                            bottom: '10px',
                            transform: 'translateY(-50%)', // Centración vertical
                            zIndex: 1, // Asegurar que se vea encima del input
                            pointerEvents: 'none', // Evitar interacción con el label
                            color: 'gray', // Color del label,
                            '&.Mui-focused': {
                              color: 'gray', // Color del label cuando está focalizado
                            },
                          },
                          shrink: false, // Evitar que el label se mueva
                          style: {
                            color: 'rgba(0, 0, 0, 0.596)',
                            fontSize: '12px',
                          },
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <FlightTakeoffIcon sx={{ marginTop: '-20px', fontSize: '19px', color: 'black' }} />
                            </InputAdornment>
                          ),
                          sx: {
                            paddingTop: '25px', // Dejar espacio para el label
                          },
                        }}
                        sx={{
                          '& .MuiInputBase-root': {
                            border: '1px solid rgba(128, 128, 128, 0.452)', // Borde gris claro en todos los lados
                            borderRadius: '4px', // Bordes redondeados opcionales
                            '&::before': {
                              borderBottom: '1px solid transparent',
                            },
                            '&:hover:not(.Mui-disabled, .Mui-error):before': {
                              borderBottom: '2px solid rgb(41, 235, 41)',
                            },
                            '&.Mui-focused:after': {
                              borderBottom: '2px solid rgb(41, 235, 41)',
                            },
                            fontWeight: 'bold',
                          },
                          input: {
                            color: 'black', // Cambia el color del texto a blanco
                            backgroundColor: 'white', // Elimina el fondo gris predeterminado
                            fontSize: '18px',
                            marginTop: '-10px'
                          }
                        }}


                      />

                      <TextField
                        label="Destino"
                        variant="standard"
                        className='textField'
                        value={query2}
                        onChange={handleChange2}
                        fullWidth

                        InputLabelProps={{
                          sx: {
                            top: '35%', // Posiciona el label dentro del campo
                            left: '10%', // Alinearlo a la izquierda
                            transform: 'translateY(-50%)', // Centración vertical
                            zIndex: 1, // Asegurar que se vea encima del input
                            pointerEvents: 'none', // Evitar interacción con el label
                            color: 'rgba(0, 0, 0, 0.596)', // Color del label,
                            '&.Mui-focused': {
                              color: 'gray', // Color del label cuando está focalizado
                            },
                            '&.Mui-focused': {
                              color: 'gray)', // Color del label cuando está focalizado
                            },
                          },
                          shrink: false, // Evitar que el label se mueva
                          style: {
                            color: 'rgba(0, 0, 0, 0.596)',
                            fontSize: '12px',
                          },
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <FlightLandIcon sx={{ marginTop: '-20px', fontSize: '19px', color: 'black' }} />
                            </InputAdornment>
                          ),
                          sx: {
                            paddingTop: '25px', // Dejar espacio para el label
                          },
                        }}
                        sx={{
                          '& .MuiInputBase-root': {
                            border: '1px solid rgba(128, 128, 128, 0.452)', // Borde gris claro en todos los lados
                            borderRadius: '4px', // Bordes redondeados opcionales
                            '&::before': {
                              borderBottom: '1px solid transparent',
                            },
                            '&:hover:not(.Mui-disabled, .Mui-error):before': {
                              borderBottom: '2px solid rgb(41, 235, 41)',
                            },
                            '&.Mui-focused:after': {
                              borderBottom: '2px solid rgb(41, 235, 41)',
                            },
                            fontWeight: 'bold',
                          },
                          input: {
                            color: 'black', // Cambia el color del texto a blanco
                            backgroundColor: 'white', // Elimina el fondo gris predeterminado
                            fontSize: '18px',
                            marginTop: '-10px'
                          }
                        }}

                      />


                    </div>
                  </td>

                  <td className='td_fecha'> <div className="date-picker">
                    <TextField
                      label="ida"
                      variant="standard"
                      className='textField'
                      value={dayjs(startDate).format('DD/MM/YYYY')}
                      onFocus={() => handleFocus('start')}
                      fullWidth
                      InputLabelProps={{
                        sx: {
                          top: '40%', // Posiciona el label dentro del campo
                          left: '25%', // Alinearlo a la izquierda
                          transform: 'translateY(-50%)', // Centración vertical
                          zIndex: 1, // Asegurar que se vea encima del input
                          pointerEvents: 'none', // Evitar interacción con el label
                          color: 'rgba(0, 0, 0, 0.596)', // Color del label,
                          '&.Mui-focused': {
                            color: 'gray', // Color del label cuando está focalizado
                          },
                        },
                        shrink: false, // Evitar que el label se mueva
                        style: {
                          color: 'rgba(0, 0, 0, 0.596)',
                          fontSize: '12px',
                        },
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <CalendarMonthIcon sx={{ marginTop: '-13px', fontSize: '19px', color: 'black' }} />
                          </InputAdornment>
                        ),
                        sx: {
                          paddingTop: '17px', // Dejar espacio para el label
                        },
                      }}
                      sx={{
                        '& .MuiInputBase-root': {
                          border: '1px solid rgba(128, 128, 128, 0.452)', // Borde gris claro en todos los lados
                          borderRadius: '4px', // Bordes redondeados opcionales
                          '&::before': {
                            borderBottom: '1px solid transparent',
                          },
                          '&:hover:not(.Mui-disabled, .Mui-error):before': {
                            borderBottom: '2px solid rgb(41, 235, 41)',
                          },
                          '&.Mui-focused:after': {
                            borderBottom: '2px solid rgb(41, 235, 41)',
                          },
                          fontWeight: 'bold',
                        },
                        input: {
                          color: 'black', // Cambia el color del texto a blanco
                          backgroundColor: 'white', // Elimina el fondo gris predeterminado
                          fontSize: '18px',
                        },
                        marginTop: '-13px',
                      }}
                    />
                    {isCalendarVisible && (
                      <div ref={calendarRef} className="calendar-container">
                        <div className='div_volar'>{paragraphText}</div>
                        <div className='div_calendario'>
                          {renderCalendar(currentMonth, currentYear)}
                          {renderCalendar(currentMonth + 1 > 11 ? 0 : currentMonth + 1, currentMonth + 1 > 11 ? currentYear + 1 : currentYear)}
                        </div>
                      </div>
                    )}
                  </div></td>

                  <td><Accordion activeKey={activeKey} onClick={() => toggleAccordion('0')}
                    aria-expanded={activeKey === '0'}
                  >
                    <Card className="custom-card">
                      <Card.Header className='CardHeader'>
                      <div className="accordion-header">
                          <div style={{marginTop: '10px',zIndex:'1', fontSize: '19px', color: 'black', display:'flex'}}>
                          <PersonAddAlt1Icon sx={{ fontSize: '19px', color: 'black' }} />
                          <h5 style={{marginLeft:'10px', marginRight:'40px'}}>{contarA}</h5>
                          <button
                           
                            onClick={() => toggleAccordion('0')}
                            aria-expanded={activeKey === '0'}
                            className={`toggle-button ${activeKey === '0' ? 'rotate' : ''}`}
                            
                          >
                            <FaChevronDown />
                          </button>
                          </div>
                        </div>
                      </Card.Header>

                    </Card>


                  </Accordion>
                  </td>
                  <td className='td_botonBuscar'><button className='botonBuscar' closeButton onClick={Buscar} >Buscar</button></td>
                </tr>
              </tbody>
            </table>
          </Modal.Body>
          <div className='div_ciudadOrigen'>
            {filteredData1.length > 0 && (
              <ul>
                {filteredData1.map((item) => (
                  <li className='li_ciudad' key={item.id} onClick={() => handleClick1(item.name)}>
                    {highlightText1(item.name, query1)}<label className='label_pais'>{item.pais}</label><label className='label_abreviatura'>{item.abreviatura}</label>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className='div_ciudadDestino'>
            {filteredData2.length > 0 && (
              <ul>
                {filteredData2.map((item) => (
                  <li className='li_ciudad' key={item.id} onClick={() => handleClick2(item.name)}>
                    {highlightText2(item.name, query2)}<label className='label_pais'>{item.pais}</label><label className='label_abreviatura'>{item.abreviatura}</label>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            {activeKey === '0' && (
              <div className="accordion-content">
                <Card.Body>
                  <table style={{ textAlign: 'center', margin: '0 auto', width: '85%', marginBottom: '0px' }}>
                    <tr ><td colspan="4" style={{ fontWeight: 'bold', float: 'left', marginBottom: '30px' }}>¿Quienes vuelan?</td></tr>
                    <tbody border="1" style={{ marginTop: '100px' }}>
                      <tr>
                        <td >
                          <p className='p1'>Adultos</p>
                          <p className='p2'>Desde 15 años</p>
                        </td>
                        <td ><button className='boton_menos' onClick={decrementoA}>-</button></td>
                        <td className='numeros'>{contarA}</td>
                        <td ><button className='boton_mas' onClick={incrementoA}>+</button></td>
                      </tr>
                      {/*
                      <tr >
                        <td >
                          <p className='p1'>Jóvenes</p>
                          <p className='p2'>De 12 a 14 años</p></td>

                        <td ><button className='boton_menos' onClick={decrementoJ}>-</button></td>
                        <td className='numeros'>{contarJ}</td>
                        <td><button className='boton_mas' onClick={incrementoJ}>+</button></td>
                      </tr>
                      <tr>
                        <td>
                          <p className='p1'>Niños</p>
                          <p className='p2'>De 2 a 11 años</p>
                        </td>

                        <td ><button className='boton_menos' onClick={decrementoN}>-</button></td>
                        <td className='numeros'>{contarN}</td>
                        <td><button className='boton_mas' onClick={incrementoN}>+</button></td>
                      </tr>

                      <tr >
                        <td >
                          <p className='p1'>Bebés</p>
                          <p className='p2'>Menores de 2 años</p>
                        </td>
                        <td ><button className='boton_menos' onClick={decrementoB}>-</button></td>
                        <td className='numeros'>{contarB}</td>
                        <td ><button className='boton_mas' onClick={incrementoB}>+</button></td>
                      </tr>*/}
                      <tr>
                        <td colSpan={4}><button className='boton_confirmar' onClick={() => clickConfirmarContar('1')} >Confirmar</button></td>
                      </tr>

                    </tbody>

                  </table>
                </Card.Body>
              </div>
            )}
          </div>
        </Modal>

        <Dialog
          open={abrirModal}
          TransitionComponent={Transition}
          keepMounted
          onClose={cerrarModal}
          aria-describedby="modal-desde-abajo"
          className='Dialog'
          sx={{
            '& .MuiDialog-paper': {
              margin: 0,
              position: 'fixed',
              bottom: 0,
              width: '100%',
              maxWidth: '100%', // Asegura que el modal ocupe todo el ancho de la pantalla
              borderRadius: '10px 10px 0 0', // Bordes redondeados en la parte superior
            },
          }}
        >
          <DialogTitle

          >
            <div className='editarBusqueda' >Editar busqueda</div>
            <IconButton
              aria-label="cerrar"
              onClick={cerrarModal}
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



            <div className='div_origenDestinoModal' >
              <div className='div_solo_idaMovil' >
                <div className="form-check custom-radio" style={{ textAlign: 'center' }}>
                  <input
                    type="radio"
                    id="oneWay"
                    name="tripType"
                    value="oneWay"
                    className="form-check-input"
                    checked={'oneWay'}
                  />
                  <label className="form-check-label" htmlFor="oneWay">
                    Solo ida
                  </label>
                </div>
              </div>


              <div className='desdeHaciaModal' style={{ marginTop: '-30px', display: 'flex', justifyContent: 'center', width: '100%' }}>
                <div className='desdeMovil' >
                  <TextField
                    label="Origen"
                    variant="standard"
                    className='textField'
                    value={query1}
                    onChange={handleChange1}
                    onClick={clickAbrirCiudadOrigen}

                    InputLabelProps={{
                      sx: {
                        top: '45%', // Posiciona el label dentro del campo
                        left: '10%', // Alinearlo a la izquierda
                        bottom: '10px',
                        transform: 'translateY(-50%)', // Centración vertical
                        zIndex: 1, // Asegurar que se vea encima del input
                        pointerEvents: 'none', // Evitar interacción con el label
                        color: 'gray', // Color del label,
                        '&.Mui-focused': {
                          color: 'gray', // Color del label cuando está focalizado
                        },
                      },
                      shrink: false, // Evitar que el label se mueva
                      style: {
                        color: 'rgba(0, 0, 0, 0.596)',
                        fontSize: '12px',
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FlightTakeoffIcon sx={{ marginTop: '-20px', fontSize: '19px', color: 'black' }} />
                        </InputAdornment>
                      ),
                      sx: {
                        paddingTop: '25px', // Dejar espacio para el label
                      },
                    }}
                    sx={{
                      '& .MuiInputBase-root': {
                        border: '1px solid rgba(128, 128, 128, 0.452)', // Borde gris claro en todos los lados
                        borderRadius: '4px', // Bordes redondeados opcionales
                        '&::before': {
                          borderBottom: '1px solid transparent',
                        },
                        '&:hover:not(.Mui-disabled, .Mui-error):before': {
                          borderBottom: '2px solid rgb(41, 235, 41)',
                        },
                        '&.Mui-focused:after': {
                          borderBottom: '2px solid rgb(41, 235, 41)',
                        },
                        fontWeight: 'bold',
                      },
                      input: {
                        color: 'black', // Cambia el color del texto a blanco
                        backgroundColor: 'white', // Elimina el fondo gris predeterminado
                        fontSize: '18px',
                        marginTop: '-10px'
                      },
                      marginBottom: '10px',
                    }}


                  />
                </div>


                <div className='haciaMovil'>
                  <TextField
                    label="Destino"
                    variant="standard"
                    className='textField'
                    value={query2}
                    onChange={handleChange2}
                    onClick={clickAbrirCiudadDestino}

                    InputLabelProps={{
                      sx: {
                        top: '35%', // Posiciona el label dentro del campo
                        left: '10%', // Alinearlo a la izquierda
                        transform: 'translateY(-50%)', // Centración vertical
                        zIndex: 1, // Asegurar que se vea encima del input
                        pointerEvents: 'none', // Evitar interacción con el label
                        color: 'rgba(0, 0, 0, 0.596)', // Color del label,
                        '&.Mui-focused': {
                          color: 'gray', // Color del label cuando está focalizado
                        },
                        '&.Mui-focused': {
                          color: 'gray)', // Color del label cuando está focalizado
                        },
                      },
                      shrink: false, // Evitar que el label se mueva
                      style: {
                        color: 'rgba(0, 0, 0, 0.596)',
                        fontSize: '12px',
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FlightLandIcon sx={{ marginTop: '-20px', fontSize: '19px', color: 'black' }} />
                        </InputAdornment>
                      ),
                      sx: {
                        paddingTop: '25px', // Dejar espacio para el label
                      },
                    }}
                    sx={{
                      '& .MuiInputBase-root': {
                        border: '1px solid rgba(128, 128, 128, 0.452)', // Borde gris claro en todos los lados
                        borderRadius: '4px', // Bordes redondeados opcionales
                        '&::before': {
                          borderBottom: '1px solid transparent',
                        },
                        '&:hover:not(.Mui-disabled, .Mui-error):before': {
                          borderBottom: '2px solid rgb(41, 235, 41)',
                        },
                        '&.Mui-focused:after': {
                          borderBottom: '2px solid rgb(41, 235, 41)',
                        },
                        fontWeight: 'bold',
                      },
                      input: {
                        color: 'black', // Cambia el color del texto a blanco
                        backgroundColor: 'white', // Elimina el fondo gris predeterminado
                        fontSize: '18px',
                        marginTop: '-10px'
                      },
                      marginBottom: '10px',
                    }}

                  />


                </div>

              </div>
              <div className='fechaOrigenModal' onFocus={focus}
                onBlur={blur}>
                <TextField
                  label="ida"
                  variant="standard"
                  className='textField'
                  value={dayjs(startDate).format('DD/MM/YYYY')}
                  onFocus={() => handleFocus('start')}
                  onClick={clickAbrirFecha}
                  fullWidth
                  InputLabelProps={{
                    sx: {
                      top: '40%', // Posiciona el label dentro del campo
                      left: '7%', // Alinearlo a la izquierda
                      transform: 'translateY(-50%)', // Centración vertical
                      zIndex: 1, // Asegurar que se vea encima del input
                      pointerEvents: 'none', // Evitar interacción con el label
                      color: 'rgba(0, 0, 0, 0.596)', // Color del label,
                      '&.Mui-focused': {
                        color: 'gray', // Color del label cuando está focalizado
                      },
                    },
                    shrink: false, // Evitar que el label se mueva
                    style: {
                      color: 'rgba(0, 0, 0, 0.596)',
                      fontSize: '12px',
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarMonthIcon sx={{ marginTop: '-13px', fontSize: '19px', color: 'black' }} />
                      </InputAdornment>
                    ),
                    sx: {
                      paddingTop: '17px', // Dejar espacio para el label
                    },
                  }}
                  sx={{
                    '& .MuiInputBase-root': {
                      border: '1px solid rgba(128, 128, 128, 0.452)', // Borde gris claro en todos los lados
                      borderRadius: '4px', // Bordes redondeados opcionales
                      '&::before': {
                        borderBottom: '1px solid transparent',
                      },
                      '&:hover:not(.Mui-disabled, .Mui-error):before': {
                        borderBottom: '2px solid rgb(41, 235, 41)',
                      },
                      '&.Mui-focused:after': {
                        borderBottom: '2px solid rgb(41, 235, 41)',
                      },
                      fontWeight: 'bold',
                    },
                    input: {
                      color: 'black', // Cambia el color del texto a blanco
                      backgroundColor: 'white', // Elimina el fondo gris predeterminado
                      fontSize: '18px',
                    },
                    marginTop: '-13px',
                    marginBottom: '10px',
                  }}
                />
                {isCalendarVisible && (
                  <div ref={calendarRef} className="calendar-container">
                    <div className='div_volar'>{paragraphText}</div>
                    <div className='div_calendario' onClick={AbrirAdulto}>
                      {renderCalendar(currentMonth, currentYear)}
                      {renderCalendar(currentMonth + 1 > 11 ? 0 : currentMonth + 1, currentMonth + 1 > 11 ? currentYear + 1 : currentYear)}
                    </div>
                  </div>
                )}


              </div>

              <div className='desdeMovil' >
                <TextField

                  variant="standard"
                  className='textField'
                  value={confirmarContar}
                  onChange={handleChange1}
                  onClick={clickAbrirAdulto}
                  fullWidth


                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonAddAlt1Icon sx={{ marginTop: '-20px', fontSize: '19px', color: 'black' }} />
                      </InputAdornment>
                    ),
                    sx: {
                      paddingTop: '25px', // Dejar espacio para el label
                    },
                  }}
                  sx={{
                    '& .MuiInputBase-root': {
                      border: '1px solid rgba(128, 128, 128, 0.452)', // Borde gris claro en todos los lados
                      borderRadius: '4px', // Bordes redondeados opcionales
                      '&::before': {
                        borderBottom: '1px solid transparent',
                      },
                      '&:hover:not(.Mui-disabled, .Mui-error):before': {
                        borderBottom: '2px solid rgb(41, 235, 41)',
                      },
                      '&.Mui-focused:after': {
                        borderBottom: '2px solid rgb(41, 235, 41)',
                      },
                      fontWeight: 'bold',
                    },
                    input: {
                      color: 'black', // Cambia el color del texto a blanco
                      backgroundColor: 'white', // Elimina el fondo gris predeterminado
                      fontSize: '18px',
                      marginTop: '-10px'
                    }
                  }}


                />
              </div>


              <div className='div_botonBuscar'>
                <button className='botonBuscarMovil' onClick={BuscarMovil} >Buscar</button>
              </div>
            </div>

          </DialogContent>
        </Dialog>

        {/* modal de ciudad de origen */}

        <Dialog
          open={abrirCiudadOrigen}
          TransitionComponent={Transition}
          keepMounted
          onClose={cerrarModalCiudadOrigen}
          aria-describedby="modal-desde-abajo"
          className='Dialog'
          sx={{
            '& .MuiDialog-paper': {
              margin: 0,
              position: 'fixed',
              top: -3,
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
            sx={{ backgroundColor: 'black', color: 'white' }}
          >
            <IconButton
              aria-label="cerrar"
              onClick={cerrarModalCiudadOrigen}
              sx={{
                position: 'absolute',
                left: 8,
                top: 8,
                color: 'white',
              }}
            >
              <ArrowBackIcon />
            </IconButton>
            <div className='origen'>Origen</div>
            <IconButton
              aria-label="cerrar"
              onClick={cerrarModalCiudadOrigen}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: 'white',
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>

          <DialogContent sx={{ borderTopLeftRadius: '20px', borderTopRightRadius: '20px', backgroundColor: 'white' }}>


            <TextField
              label="Origen"
              variant="standard"
              className='textField'
              value={query1}
              onChange={handleChange1}
              fullWidth

              InputLabelProps={{
                sx: {
                  top: '45%', // Posiciona el label dentro del campo
                  left: '10%', // Alinearlo a la izquierda
                  bottom: '10px',
                  transform: 'translateY(-50%)', // Centración vertical
                  zIndex: 1, // Asegurar que se vea encima del input
                  pointerEvents: 'none', // Evitar interacción con el label
                  color: 'gray', // Color del label,
                  '&.Mui-focused': {
                    color: 'gray', // Color del label cuando está focalizado
                  },
                },
                shrink: false, // Evitar que el label se mueva
                style: {
                  color: 'rgba(0, 0, 0, 0.596)',
                  fontSize: '12px',
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FlightTakeoffIcon sx={{ marginTop: '-20px', fontSize: '19px', color: 'black' }} />
                  </InputAdornment>
                ),
                sx: {
                  paddingTop: '25px', // Dejar espacio para el label
                },
              }}
              sx={{
                '& .MuiInputBase-root': {
                  border: '1px solid rgba(128, 128, 128, 0.452)', // Borde gris claro en todos los lados
                  borderRadius: '4px', // Bordes redondeados opcionales
                  '&::before': {
                    borderBottom: '1px solid transparent',
                  },
                  '&:hover:not(.Mui-disabled, .Mui-error):before': {
                    borderBottom: '2px solid rgb(41, 235, 41)',
                  },
                  '&.Mui-focused:after': {
                    borderBottom: '2px solid rgb(41, 235, 41)',
                  },
                  fontWeight: 'bold',
                },
                input: {
                  color: 'black', // Cambia el color del texto a blanco
                  backgroundColor: 'white', // Elimina el fondo gris predeterminado
                  fontSize: '18px',
                  marginTop: '-10px'
                }
              }}


            />


            <div className='div_ciudadOrigenMovil'>
              {filteredData1.length > 0 && (
                <ul >
                  {filteredData1.map((item) => (
                    <li className='li_ciudadMovil' key={item.id} onClick={() => handleClickMovil1(item.name)}>
                      {highlightText1(item.name, query1)}<p className='p_aeropuertoMovil'>{item.aeropuerto}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>


          </DialogContent>
        </Dialog>

        {/* modal de ciudad de destino */}

        <Dialog
          open={abrirCiudadDestino}
          TransitionComponent={Transition}
          keepMounted
          onClose={cerrarModalCiudadDestino}
          aria-describedby="modal-desde-abajo"
          className='Dialog'
          sx={{
            '& .MuiDialog-paper': {
              margin: 0,
              position: 'fixed',
              top: -3,
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
            sx={{ backgroundColor: 'black', color: 'white' }}
          >
            <IconButton
              aria-label="cerrar"
              onClick={cerrarModalCiudadDestino}
              sx={{
                position: 'absolute',
                left: 8,
                top: 8,
                color: 'white',
              }}
            >
              <ArrowBackIcon />
            </IconButton>
            <div className='destino'>Destino</div>
            <IconButton
              aria-label="cerrar"
              onClick={cerrarModalCiudadDestino}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: 'white',
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>

          <DialogContent sx={{ borderTopLeftRadius: '20px', borderTopRightRadius: '20px', backgroundColor: 'white' }}>


            <TextField
              label="Destino"
              variant="standard"
              className='textField'
              value={query2}
              onChange={handleChange2}
              onClick={clickAbrirCiudadDestino}
              fullWidth
              InputLabelProps={{
                sx: {
                  top: '35%', // Posiciona el label dentro del campo
                  left: '10%', // Alinearlo a la izquierda
                  transform: 'translateY(-50%)', // Centración vertical
                  zIndex: 1, // Asegurar que se vea encima del input
                  pointerEvents: 'none', // Evitar interacción con el label
                  color: 'rgba(0, 0, 0, 0.596)', // Color del label,
                  '&.Mui-focused': {
                    color: 'gray', // Color del label cuando está focalizado
                  },
                  '&.Mui-focused': {
                    color: 'gray)', // Color del label cuando está focalizado
                  },
                },
                shrink: false, // Evitar que el label se mueva
                style: {
                  color: 'rgba(0, 0, 0, 0.596)',
                  fontSize: '12px',
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FlightLandIcon sx={{ marginTop: '-20px', fontSize: '19px', color: 'black' }} />
                  </InputAdornment>
                ),
                sx: {
                  paddingTop: '25px', // Dejar espacio para el label
                },
              }}
              sx={{
                '& .MuiInputBase-root': {
                  border: '1px solid rgba(128, 128, 128, 0.452)', // Borde gris claro en todos los lados
                  borderRadius: '4px', // Bordes redondeados opcionales
                  '&::before': {
                    borderBottom: '1px solid transparent',
                  },
                  '&:hover:not(.Mui-disabled, .Mui-error):before': {
                    borderBottom: '2px solid rgb(41, 235, 41)',
                  },
                  '&.Mui-focused:after': {
                    borderBottom: '2px solid rgb(41, 235, 41)',
                  },
                  fontWeight: 'bold',
                },
                input: {
                  color: 'black', // Cambia el color del texto a blanco
                  backgroundColor: 'white', // Elimina el fondo gris predeterminado
                  fontSize: '18px',
                  marginTop: '-10px'
                }
              }}

            />

            <div className='div_ciudadDestinoMovil'>
              {filteredData2.length > 0 && (
                <ul>
                  {filteredData2.map((item) => (
                    <li className='li_ciudadMovil' key={item.id} onClick={() => handleClickMovil2(item.name)}>
                      {highlightText2(item.name, query2)}<p className='p_aeropuertoMovil'>{item.aeropuerto}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>




          </DialogContent>
        </Dialog>

        {/* modal de fecha */}

        <Dialog
          open={abrirFecha}
          TransitionComponent={Transition}
          keepMounted
          onClose={cerrarModalFecha}
          aria-describedby="modal-desde-abajo"
          className='Dialog'
          sx={{
            '& .MuiDialog-paper': {
              margin: 0,
              position: 'fixed',
              top: -3,
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
            sx={{ backgroundColor: 'black', color: 'white' }}
          >
            <div className='editarBusqueda'>Fechas</div>
            <IconButton
              aria-label="cerrar"
              onClick={cerrarModalFecha}
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

          <DialogContent sx={{ borderTopLeftRadius: '20px', borderTopRightRadius: '20px', backgroundColor: 'white' }}>


            <TextField
              label="ida"
              variant="standard"
              className='textField'
              value={dayjs(startDate).format('DD/MM/YYYY')}
              onFocus={() => handleFocus('start')}
              onClick={clickAbrirFecha}
              fullWidth
              InputLabelProps={{
                sx: {
                  top: '40%', // Posiciona el label dentro del campo
                  left: '7%', // Alinearlo a la izquierda
                  transform: 'translateY(-50%)', // Centración vertical
                  zIndex: 1, // Asegurar que se vea encima del input
                  pointerEvents: 'none', // Evitar interacción con el label
                  color: 'rgba(0, 0, 0, 0.596)', // Color del label,
                  '&.Mui-focused': {
                    color: 'gray', // Color del label cuando está focalizado
                  },
                },
                shrink: false, // Evitar que el label se mueva
                style: {
                  color: 'rgba(0, 0, 0, 0.596)',
                  fontSize: '12px',
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CalendarMonthIcon sx={{ marginTop: '-13px', fontSize: '19px', color: 'black' }} />
                  </InputAdornment>
                ),
                sx: {
                  paddingTop: '17px', // Dejar espacio para el label
                },
              }}
              sx={{
                '& .MuiInputBase-root': {
                  border: '1px solid rgba(128, 128, 128, 0.452)', // Borde gris claro en todos los lados
                  borderRadius: '4px', // Bordes redondeados opcionales
                  '&::before': {
                    borderBottom: '1px solid transparent',
                  },
                  '&:hover:not(.Mui-disabled, .Mui-error):before': {
                    borderBottom: '2px solid rgb(41, 235, 41)',
                  },
                  '&.Mui-focused:after': {
                    borderBottom: '2px solid rgb(41, 235, 41)',
                  },
                  fontWeight: 'bold',
                },
                input: {
                  color: 'black', // Cambia el color del texto a blanco
                  backgroundColor: 'white', // Elimina el fondo gris predeterminado
                  fontSize: '18px',
                  marginTop: '-10px'
                }
              }}
            />
            {isCalendarVisibleMovil && (
              <div ref={calendarRef} className="calendar-containerMovil">
                <div className='div_volar'>{paragraphText}</div>
                <div className='div_calendarioMovil' onClick={AbrirAdulto}>
                  {renderCalendar(currentMonth, currentYear)}

                </div>
              </div>
            )}





          </DialogContent>
        </Dialog>

        {/* modal de adulto */}

        <Dialog
          open={abrirAdulto}
          TransitionComponent={Transition}
          keepMounted
          onClose={cerrarModalAdulto}
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
            <div className='editarBusqueda'>Pasajeros</div>
            <IconButton
              aria-label="cerrar"
              onClick={cerrarModalAdulto}
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

            <TextField

              variant="standard"
              className='textField'
              value={confirmarContar}
              onChange={handleChange1}
              onClick={clickAbrirAdulto}
              fullWidth


              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonAddAlt1Icon sx={{ marginTop: '-20px', fontSize: '19px', color: 'black' }} />
                  </InputAdornment>
                ),
                sx: {
                  paddingTop: '25px', // Dejar espacio para el label
                },
              }}
              sx={{
                '& .MuiInputBase-root': {
                  border: '1px solid rgba(128, 128, 128, 0.452)', // Borde gris claro en todos los lados
                  borderRadius: '4px', // Bordes redondeados opcionales
                  '&::before': {
                    borderBottom: '1px solid transparent',
                  },
                  '&:hover:not(.Mui-disabled, .Mui-error):before': {
                    borderBottom: '2px solid rgb(41, 235, 41)',
                  },
                  '&.Mui-focused:after': {
                    borderBottom: '2px solid rgb(41, 235, 41)',
                  },
                  fontWeight: 'bold',
                },
                input: {
                  color: 'black', // Cambia el color del texto a blanco
                  backgroundColor: 'white', // Elimina el fondo gris predeterminado
                  fontSize: '18px',
                  marginTop: '-10px'
                }
              }}


            />


            <table style={{ textAlign: 'center', margin: '0 auto', width: '85%', marginBottom: '0px' }}>
              <tr ><td colspan="4" style={{ fontWeight: 'bold', float: 'left', marginBottom: '30px' }}>¿Quienes vuelan?</td></tr>
              <tbody border="1" style={{ marginTop: '100px' }}>
                <tr>
                  <td >
                    <p className='p1'>Adultos</p>
                    <p className='p2'>Desde 15 años</p>
                  </td>
                  <td ><button className='boton_menos' onClick={decrementoA}>-</button></td>
                  <td className='numeros'>{contarA}</td>
                  <td ><button className='boton_mas' onClick={incrementoA}>+</button></td>
                </tr>
                   {/*
                <tr >
                  <td>
                    <p className='p1'>Jóvenes</p>
                    <p className='p2'>De 12 a 14 años</p>
                    </td>
                  <td ><button className='boton_menos' onClick={decrementoJ}>-</button></td>
                  <td className='numeros'>{contarJ}</td>
                  <td><button className='boton_mas' onClick={incrementoJ}>+</button></td>
                </tr>
                <tr>
                  <td>
                    <p className='p1'>Niños</p>
                    <p className='p2'>De 2 a 11 años</p>
                  </td>

                  <td ><button className='boton_menos' onClick={decrementoN}>-</button></td>
                  <td className='numeros'>{contarN}</td>
                  <td><button className='boton_mas' onClick={incrementoN}>+</button></td>
                </tr>

                <tr >
                  <td >
                    <p className='p1'>Bebés</p>
                    <p className='p2'>Menores de 2 años</p>
                  </td>
                  <td ><button className='boton_menos' onClick={decrementoB}>-</button></td>
                  <td className='numeros'>{contarB}</td>
                  <td ><button className='boton_mas' onClick={incrementoB}>+</button></td>
                </tr>*/}
                <tr>
                  <td colSpan={4}><button className='boton_confirmar' onClick={() => clickConfirmarContar('1')} >Confirmar</button></td>
                </tr>

              </tbody>

            </table>
          </DialogContent>
        </Dialog>

      </div>

    </>
  );
}

export default MenuNavBarPaso1;

