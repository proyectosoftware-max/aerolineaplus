import MenuNavBarPasos from "./MenuNavBarPaso2.jsx";
import React from "react";
import { useState, useEffect, useContext } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Adulto from '@mui/icons-material/PersonOutline';
import Contacto from '@mui/icons-material/SettingsPhone';
import PiePagina from './PiePagina.jsx';
import { useNavigate, useParams } from "react-router-dom";
import { DataContext } from './Context';
//import avionReserva from '../material/avionReserva.jpg';
import codigosPaises from './codigosPaises.jsx';
//import lifesMiles from './lifesMiles.jsx';
//import signoMas from '../material/signoMas.jpg';
//import signoEquis from '../material/signoEquis.jpg';
import FormControlLabel from '@mui/material/FormControlLabel';
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


const Pasos2 = () => {
    const { setSharedData, fecha, setFecha, origen, setSalida, setLlegada, destino, setPrecio, setColorBoton } = useContext(DataContext);
    const { ida, vuelta, precio, salida, llegada, tiempo, nombre, apellido, colorboton } = useParams();
    const { selectedDate } = useContext(DataContext);
    const [nombrePasajero, setNombrePasajero] = useState('Pasajero');
    const [apellidoPasajero, setApellidoPasajero] = useState('');
    const [genero, setGenero] = useState('');
    const [nombreInicial, setNombreInicial] = useState('');
    const [apellidoInicial, setApellidoInicial] = useState('');
    const [nacionalidad, setNacionalidad] = useState('');
    const [dia, setDia] = useState('Dia');
    const [mes, setMes] = useState('Mes');
    const [anual, setAnual] = useState('Año');
    const [prefijo, setPrefijo] = useState('');
    const [correo, setCorreo] = useState('');
    const [telefono, setTelefono] = useState('');
    const [value, setValue] = useState(0);
    const [paisIndicativo, setPaisIndicativo] = useState('Nacionalidad*');
    const [nombreAdulto, setNombreAdulto] = useState('Adulto');
    const [activar, setActivar] = useState(false);
    const [activarTodo, setActivarTodo] = useState(false);
    const [lifes, setLifes] = useState('lifemiles');
    const [checklifes, setChecklifes] = useState(false);
    const [checkservicios, setCheckservicios] = useState(false);
    const [checkAceptar, setCheckAceptar] = useState(false);
    const [checkRecibir, setCheckRecibir] = useState(false);
    const [errorNombre, setErrorNombre] = useState(false);
    const [errorApellido, setErrorApellido] = useState(false);
    const [errorCorreo, setErrorCorreo] = useState(false);
    const [errorTelefono, setErrorTelefono] = useState(false);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const dias = Array.from({ length: 31 }, (_, i) => i + 1);
    const meses = Array.from({ length: 12 }, (_, i) => i + 1);
    const años = Array.from({ length: 2009 - 1906 + 1 }, (_, i) => 2009 - i);

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



    useEffect(() => {
        if (nombre == 'nombre' && apellido == 'apellido' && telefono == 'telefono') {
            setNombreAdulto('Adulto');
            setNombrePasajero('Pasajero');


        } else if (nombre != 'nombre' && apellido != 'apellido' && telefono != 'telefono') {
            setNombreAdulto(nombre);
            setNombrePasajero(nombre);
            setApellidoPasajero(apellido);
            setTelefono(telefono);
        }



    }, []);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {

        if (nombreInicial.trim() === 'Pasajero' || nombreInicial.trim() === '' || apellidoInicial.trim() === '') {
            setActivar(false);


        } else {
            setActivar(true);
        }
        console.log('Activar: ' + activar);
    }, [nombreInicial, apellidoInicial]);

    useEffect(() => {

        if (correo.trim() === '' || telefono.trim() === '') {
            setActivarTodo(false);


        } else {
            setActivarTodo(true);
        }

    }, [correo, telefono]);

    const changeGenero = (e) => {
        setGenero(e.target.value);
    }

    const changeNombre = (e) => {
        setNombrePasajero(e.target.value);
        setNombreAdulto(e.target.value);
        setNombreInicial(e.target.value);

        if (e.target.value.trim() === '') {
            setErrorNombre(true);
        } else {
            setErrorNombre(false);
        }
    }

    const changeApellido = (e) => {
        setApellidoPasajero(e.target.value);
        setApellidoInicial(e.target.value);

        if (e.target.value.trim() === '') {
            setErrorApellido(true);
        } else {
            setErrorApellido(false);
        }
    }

    const changeNacionalidad = (e) => {
        setNacionalidad(e.target.value);
    }

    const changeDia = (e) => {
        setDia(e.target.value);
    }

    const changeMes = (e) => {
        setMes(e.target.value);
    }


    const changeAnual = (e) => {
        setAnual(e.target.value);
    }

    const changePaisIndicativo = (event) => {
        setPaisIndicativo(event.target.value);
        console.log('Valor: ' + paisIndicativo);
    };

    const changePrefijo = (e) => {
        setPrefijo(e.target.value);
    }

    const changeCorreo = (event) => {
        setCorreo(event.target.value);

        if (e.target.value.trim() === '') {
            setErrorCorreo(true);
        } else {
            setErrorCorreo(false);
        }
    };

    const changeTelefono = (event) => {
        setTelefono(event.target.value);
        console.log('Valor: ' + paisIndicativo);

        if (e.target.value.trim() === '') {
            setErrorTelefono(true);
        } else {
            setErrorTelefono(false);
        }
    };

    const changelifes = (event) => {
        setLifes(event.target.value);
        console.log('Valor: ' + lifes);
    };

    const changeCheckLifes = () => {
        setChecklifes(!checklifes);
    }

    const changeCheckAceptar = (event) => {
        setCheckAceptar(!checkAceptar);
        console.log('Valor: ' + lifes);
    };

    const changeCheckRecibir = () => {
        setCheckRecibir(!checkRecibir);
    }


    const changeCheckServicios = () => {
        setCheckservicios(!checkservicios);
    }


    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const enviar = () => {

        if (!nombreInicial.trim() || !apellidoInicial.trim() || !genero || !dia || !mes || !anual || !nacionalidad || !prefijo || !telefono.trim() || !correo.trim()) {
            alert('Debe completar todos los campos');
        } else {
            navigate(`/paso3/${origen}/${destino}/${ida}/${vuelta}/${tiempo}/${precio}/${salida}/${llegada}/${nombreInicial}/${apellidoInicial}/${colorboton}`);
        }

    }

    const [showDiv1, setShowDiv1] = useState(true);

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

    // Función para cambiar de tab sin importar si hay validaciones
    const cambiarTab = () => {
        // Validar ambos campos
        let valid = true;

        if (nombrePasajero.trim() === 'Pasajero' || nombrePasajero.trim() === '') {
            setErrorNombre(true);
            valid = false;
        } else {
            setErrorNombre(false);
        }

        if (apellidoPasajero.trim() === '') {
            setErrorApellido(true);
            valid = false;
        } else {
            setErrorApellido(false);
        }

        console.log('Hola');
        // Si ambos campos son válidos, pasar al Tab 2
        if (valid) {
            setValue(1);
        }
    }



    return (
        <>
            <div className="paso2"  >
                <MenuNavBarPasos />
                <div className='textoPasajero'>
                    <label className='label_pasajero' >Pasajero</label><br />
                    <label>Ingresa el nombre y primer apellido (de cada pasajero) tal y como aparecen en el pasaporte o documento de identidad.</label><br />
                </div>
                <div className="div_pasajero">
                    <label className="label_adulto">Adulto1:</label><label className="textoNombreApellido">{`${nombreInicial} ${apellidoInicial}`}</label><br />
                    <div className="PrimerFormEscritorio">
                        <FormControl variant="standard" style={{ marginTop: '-1px', marginRight: '15px' }}>
                            <InputLabel
                                id="select-label"
                                sx={{
                                    transform: genero ? 'translate(14px, 20px) scale(0.85)' : 'translate(18px, 30px) scale(1.1)',
                                    color: genero ? 'YellowGreen' : 'black',
                                    fontWeight: genero ? 'bold' : 'normal',
                                    '&.Mui-focused': {
                                        marginBottom: '5px',
                                        transform: 'translate(14px, 20px) scale(0.85)',
                                        color: 'YellowGreen',
                                        fontWeight: 'bold',
                                    },
                                    '&:not(.Mui-focused)': {
                                        color: 'black', // Texto en negro cuando no está enfocado
                                        fontWeight: 'normal',
                                    },
                                }}
                            >
                                Genero*
                            </InputLabel>
                            <Select
                                labelId="select-label"
                                id="demo-simple-select"
                                value={genero}
                                onChange={changeGenero}

                                disableUnderline

                                MenuProps={{
                                    disableScrollLock: true, // Permite que el scroll de la página continúe
                                    PaperProps: {
                                        sx: {
                                            maxHeight: 200,
                                            overflow: 'auto',
                                        },
                                    },
                                }}

                                sx={{
                                    width: '150px',
                                    border: '1px solid rgba(0, 0, 0, 0.527)', // Color del borde inicial
                                    borderRadius: '4px', // Bordes redondeados
                                    padding: '5px 5px', // Ajusta el padding del select
                                    '&:hover': {
                                        borderColor: 'rgb(9, 197, 9)', // Color del borde al hacer hover
                                    },
                                    '&.Mui-focused': {
                                        borderColor: 'rgb(9, 197, 9)', // Color del borde al hacer focus
                                        color: 'black',
                                        fontWeight: 'bold',
                                    },
                                    '& .MuiSelect-select': {
                                        padding: '12px', // Ajusta el padding del select
                                        fontWeight: 'bold', // Texto en negrita cuando hay contenido
                                        color: 'black', // Texto en negro cuando tiene contenido
                                    },
                                }}
                            >
                                <MenuItem value="">

                                </MenuItem>
                                <MenuItem value={1}>Masculino</MenuItem>
                                <MenuItem value={2}>Femenino</MenuItem>
                                <MenuItem value={3}>Otro</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField
                            label="Nombre(s)*"
                            variant="standard"
                            onChange={changeNombre}
                            value={nombreInicial}
                            InputProps={{
                                disableUnderline: true, // Elimina la línea inferior
                                sx: {
                                    border: '1px solid', // Añade un borde alrededor
                                    borderColor: 'rgba(0, 0, 0, 0.527)', // Color del borde inicial
                                    borderRadius: '4px', // Bordes redondeados
                                    padding: '12px 12px', // Ajusta el padding del input
                                    '&:hover': {
                                        borderColor: 'rgb(9, 197, 9)', // Color del borde al hacer hover
                                    },
                                    '&.Mui-focused': {
                                        border: '2px solid rgb(9, 197, 9)',
                                        borderColor: 'rgb(9, 197, 9)', // Color del borde al hacer focus
                                        color: 'black',
                                        fontWeight: 'bold',
                                    },

                                },
                            }}
                            InputLabelProps={{
                                sx: {
                                    transform: 'translate(18px, 30px) scale(1.1)', // Posición inicial del label
                                    color: 'black', // Color del label
                                    '&.Mui-focused': {
                                        marginBottom: '5px',
                                        transform: 'translate(14px, 20px) scale(0.85)', // Mantiene el label dentro del borde al enfocar
                                        color: 'YellowGreen', // Cambia el color del label cuando está enfocado
                                        fontWeight: 'bold'
                                    },
                                    // Mantiene el label en la posición escalada si hay texto
                                    '&.MuiFormLabel-filled': {
                                        transform: 'translate(14px, 20px) scale(0.85)', // Mantiene el label arriba si hay texto
                                        color: 'YellowGreen', // Color cuando está lleno
                                    },
                                    '&:not(.Mui-focused)': {
                                        color: 'black', // Texto en negro cuando no está enfocado

                                    },
                                },
                            }}

                            sx={{
                                width: '440px',
                                marginRight: '15px',
                                '&.Mui-focused .MuiInputBase-input': {
                                    color: 'black', // Texto en negro cuando se pierde el foco
                                    fontWeight: 'bold',
                                },
                                '&.Mui-filled .MuiInputBase-input': {
                                    fontWeight: 'bold', // Texto en negrita cuando hay contenido
                                    color: 'black', // Texto en negro
                                },
                                '&:not(.Mui-focused) .MuiInputBase-input': {
                                    color: 'black', // Texto en negro cuando no está enfocado
                                    fontWeight: 'bold',
                                },
                            }}
                        />


                        <TextField
                            label="Apellido"
                            variant="standard"
                            onChange={changeApellido}
                            value={apellidoInicial}
                            InputProps={{
                                disableUnderline: true, // Elimina la línea inferior
                                sx: {
                                    border: '1px solid', // Añade un borde alrededor
                                    borderColor: 'rgba(0, 0, 0, 0.527)', // Color del borde inicial
                                    borderRadius: '4px', // Bordes redondeados
                                    padding: '12px 12px', // Ajusta el padding del input
                                    '&:hover': {
                                        borderColor: 'rgb(9, 197, 9)', // Color del borde al hacer hover
                                    },
                                    '&.Mui-focused': {
                                        border: '2px solid rgb(9, 197, 9)',
                                        borderColor: 'rgb(9, 197, 9)', // Color del borde al hacer focus
                                        color: 'black',
                                        fontWeight: 'bold',
                                    },

                                },
                            }}
                            InputLabelProps={{
                                sx: {
                                    transform: 'translate(18px, 30px) scale(1.1)', // Posición inicial del label
                                    color: 'black', // Color del label
                                    '&.Mui-focused': {
                                        marginBottom: '5px',
                                        transform: 'translate(14px, 20px) scale(0.85)', // Mantiene el label dentro del borde al enfocar
                                        color: 'YellowGreen', // Cambia el color del label cuando está enfocado
                                        fontWeight: 'bold'
                                    },
                                    // Mantiene el label en la posición escalada si hay texto
                                    '&.MuiFormLabel-filled': {
                                        transform: 'translate(14px, 20px) scale(0.85)', // Mantiene el label arriba si hay texto
                                        color: 'YellowGreen', // Color cuando está lleno
                                    },
                                    '&:not(.Mui-focused)': {
                                        color: 'black', // Texto en negro cuando no está enfocado

                                    },
                                },
                            }}

                            sx={{
                                width: '440px',
                                '&.Mui-focused .MuiInputBase-input': {
                                    color: 'black', // Texto en negro cuando se pierde el foco
                                    fontWeight: 'bold',
                                },
                                '&.Mui-filled .MuiInputBase-input': {
                                    fontWeight: 'bold', // Texto en negrita cuando hay contenido
                                    color: 'black', // Texto en negro
                                },
                                '&:not(.Mui-focused) .MuiInputBase-input': {
                                    color: 'black', // Texto en negro cuando no está enfocado
                                    fontWeight: 'bold',
                                },
                            }}
                        />

                        <div style={{ display: 'flex' }}>
                            <div style={{ display: 'flex', border: '1px solid gray', width: '430px', height: '60px', marginTop: '15px', borderRadius: '10px' }}>
                                <FormControl sx={{ m: 1, minWidth: 120 }}>


                                    <Select
                                        labelId="demo-select-small-label"
                                        id="demo-select-small"
                                        value={dia}
                                        size="small"
                                        onChange={changeDia}
                                        MenuProps={{
                                            disableScrollLock: true, // Permite que el scroll de la página continúe
                                            PaperProps: {
                                                sx: {
                                                    maxHeight: 200,
                                                    overflow: 'auto',
                                                },
                                            },
                                        }}
                                    >
                                        <MenuItem value="Dia" disabled sx={{ visibility: 'hidden', height: '0px' }}>
                                            Dia
                                        </MenuItem>
                                        {dias.map((dia) => (
                                            <MenuItem value={dia}>{dia}</MenuItem>
                                        ))}


                                    </Select>

                                </FormControl>

                                <FormControl sx={{ m: 1, minWidth: 120 }}>


                                    <Select
                                        labelId="demo-select-small-label"
                                        id="demo-select-small"
                                        value={mes}
                                        size="small"
                                        onChange={changeMes}
                                        MenuProps={{
                                            disableScrollLock: true, // Permite que el scroll de la página continúe
                                            PaperProps: {
                                                sx: {
                                                    maxHeight: 200,
                                                    overflow: 'auto',
                                                },
                                            },
                                        }}
                                    >
                                        <MenuItem value="Mes" disabled sx={{ visibility: 'hidden', height: '0px' }}>
                                            Mes
                                        </MenuItem>
                                        {meses.map((mes) => (
                                            <MenuItem value={mes}>{mes}</MenuItem>
                                        ))}
                                    </Select>


                                </FormControl>

                                <FormControl sx={{ m: 1, minWidth: 120 }}>

                                    <Select
                                        labelId="demo-select-small-label"
                                        id="demo-select-small"
                                        value={anual}
                                        size="small"
                                        onChange={changeAnual}
                                        MenuProps={{
                                            disableScrollLock: true, // Permite que el scroll de la página continúe
                                            PaperProps: {
                                                sx: {
                                                    maxHeight: 200,
                                                    overflow: 'auto',
                                                },
                                            },
                                        }}
                                    >
                                        <MenuItem value="Año" disabled sx={{ visibility: 'hidden', height: '0px' }}>
                                            Año
                                        </MenuItem>
                                        {años.map((año) => (
                                            <MenuItem value={año}>{año}</MenuItem>
                                        ))}
                                    </Select>


                                </FormControl>
                            </div>

                            <FormControl variant="standard" style={{ marginTop: '-1px', marginLeft: '15px' }}>
                                <InputLabel
                                    id="select-label"
                                    sx={{
                                        transform: nacionalidad ? 'translate(14px, 20px) scale(0.85)' : 'translate(18px, 30px) scale(1.1)',
                                        color: nacionalidad ? 'YellowGreen' : 'black',
                                        fontWeight: nacionalidad ? 'bold' : 'normal',
                                        '&.Mui-focused': {
                                            marginBottom: '5px',
                                            transform: 'translate(14px, 20px) scale(0.85)',
                                            color: 'YellowGreen',
                                            fontWeight: 'bold',
                                        },
                                        '&:not(.Mui-focused)': {
                                            color: 'black', // Texto en negro cuando no está enfocado
                                            fontWeight: 'normal',

                                        },
                                    }}
                                >
                                    Nacionalidad*
                                </InputLabel>
                                <Select
                                    labelId="select-label"
                                    id="demo-simple-select"
                                    value={nacionalidad}
                                    onChange={changeNacionalidad}

                                    disableUnderline

                                    MenuProps={{
                                        disableScrollLock: true, // Permite que el scroll de la página continúe
                                        PaperProps: {
                                            sx: {
                                                maxHeight: 200,
                                                overflow: 'auto',
                                            },
                                        },
                                    }}

                                    sx={{
                                        width: '200px',
                                        border: '1px solid rgba(0, 0, 0, 0.527)', // Color del borde inicial
                                        borderRadius: '4px', // Bordes redondeados
                                        padding: '5px 5px', // Ajusta el padding del select
                                        '&:hover': {
                                            borderColor: 'rgb(9, 197, 9)', // Color del borde al hacer hover
                                        },
                                        '&.Mui-focused': {
                                            borderColor: 'rgb(9, 197, 9)', // Color del borde al hacer focus
                                            color: 'black',
                                            fontWeight: 'bold',
                                        },
                                        '& .MuiSelect-select': {
                                            padding: '12px', // Ajusta el padding del select
                                            fontWeight: 'bold', // Texto en negrita cuando hay contenido
                                            color: 'black', // Texto en negro cuando tiene contenido
                                        },
                                    }}
                                >

                                    {codigosPaises.map((pais, index) => (
                                        <MenuItem key={index} value={`${pais.nombre}`}

                                            sx={{
                                                '&:hover': {
                                                    color: 'black', // Cambiar el color de la letra al pasar el cursor
                                                }
                                            }}

                                        >
                                            {`${pais.nombre}`}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                        </div>

                    </div>

                    <div className="PrimerFormMovil">
                    <div style={{ display: 'flex' }}>
                        <FormControl variant="standard" style={{ marginTop: '-1px', marginRight: '15px', width: '100%' }}>
                            
                                <InputLabel
                                    id="select-label"
                                    sx={{
                                        fontSize: '15px',
                                        transform: genero ? 'translate(14px, 20px) scale(0.85)' : 'translate(18px, 30px) scale(1.1)',
                                        color: genero ? 'YellowGreen' : 'black',
                                        fontWeight: genero ? 'bold' : 'normal',
                                        '&.Mui-focused': {
                                            marginBottom: '5px',
                                            transform: 'translate(14px, 20px) scale(0.85)',
                                            color: 'YellowGreen',
                                            fontWeight: 'bold',
                                        },
                                        '&:not(.Mui-focused)': {
                                            color: 'black', // Texto en negro cuando no está enfocado
                                            fontWeight: 'normal',
                                        },
                                    }}
                                >
                                    Genero*
                                </InputLabel>
                                <Select
                                    labelId="select-label"
                                    id="demo-simple-select"
                                    value={genero}
                                    onChange={changeGenero}

                                    disableUnderline

                                    MenuProps={{
                                        disableScrollLock: true, // Permite que el scroll de la página continúe
                                        PaperProps: {
                                            sx: {
                                                maxHeight: 200,
                                                overflow: 'auto',
                                            },
                                        },
                                    }}

                                    sx={{
                                        width: '100%',
                                        border: '1px solid rgba(0, 0, 0, 0.527)', // Color del borde inicial
                                        borderRadius: '4px', // Bordes redondeados
                                        padding: '5px 5px', // Ajusta el padding del select
                                        '&:hover': {
                                            borderColor: 'rgb(9, 197, 9)', // Color del borde al hacer hover
                                        },
                                        '&.Mui-focused': {
                                            borderColor: 'rgb(9, 197, 9)', // Color del borde al hacer focus
                                            color: 'black',
                                            fontWeight: 'bold',
                                        },
                                        '& .MuiSelect-select': {
                                            padding: '9px', // Ajusta el padding del select
                                            fontWeight: 'bold', // Texto en negrita cuando hay contenido
                                            color: 'black', // Texto en negro cuando tiene contenido
                                        },
                                    }}
                                >
                                    <MenuItem value="">

                                    </MenuItem>
                                    <MenuItem value={1}>Masculino</MenuItem>
                                    <MenuItem value={2}>Femenino</MenuItem>
                                    <MenuItem value={3}>Otro</MenuItem>
                                </Select>
                        </FormControl>

                        <TextField
                            label="Nombre(s)*"
                            variant="standard"
                            onChange={changeNombre}
                            value={nombreInicial}
                            InputProps={{
                                disableUnderline: true, // Elimina la línea inferior
                                sx: {
                                    border: '1px solid', // Añade un borde alrededor
                                    borderColor: 'rgba(0, 0, 0, 0.527)', // Color del borde inicial
                                    borderRadius: '4px', // Bordes redondeados
                                    padding: '9px 9px', // Ajusta el padding del input
                                    '&:hover': {
                                        borderColor: 'rgb(9, 197, 9)', // Color del borde al hacer hover
                                    },
                                    '&.Mui-focused': {
                                        border: '2px solid rgb(9, 197, 9)',
                                        borderColor: 'rgb(9, 197, 9)', // Color del borde al hacer focus
                                        color: 'black',
                                        fontWeight: 'bold',
                                    },

                                },
                            }}
                            InputLabelProps={{
                                sx: {
                                    fontSize: '15px',
                                    transform: 'translate(18px, 30px) scale(1.1)', // Posición inicial del label
                                    color: 'black', // Color del label
                                    '&.Mui-focused': {
                                        marginBottom: '5px',
                                        transform: 'translate(14px, 20px) scale(0.85)', // Mantiene el label dentro del borde al enfocar
                                        color: 'YellowGreen', // Cambia el color del label cuando está enfocado
                                        fontWeight: 'bold'
                                    },
                                    // Mantiene el label en la posición escalada si hay texto
                                    '&.MuiFormLabel-filled': {
                                        transform: 'translate(14px, 20px) scale(0.85)', // Mantiene el label arriba si hay texto
                                        color: 'YellowGreen', // Color cuando está lleno
                                    },
                                    '&:not(.Mui-focused)': {
                                        color: 'black', // Texto en negro cuando no está enfocado

                                    },
                                },
                            }}

                            sx={{
                                width: '440px',
                                marginRight: '15px',
                                '&.Mui-focused .MuiInputBase-input': {
                                    color: 'black', // Texto en negro cuando se pierde el foco
                                    fontWeight: 'bold',
                                },
                                '&.Mui-filled .MuiInputBase-input': {
                                    fontWeight: 'bold', // Texto en negrita cuando hay contenido
                                    color: 'black', // Texto en negro
                                },
                                '&:not(.Mui-focused) .MuiInputBase-input': {
                                    color: 'black', // Texto en negro cuando no está enfocado
                                    fontWeight: 'bold',
                                },
                            }}
                        />

                    </div>


                    <TextField
                        label="Apellido"
                        variant="standard"
                        onChange={changeApellido}
                        value={apellidoInicial}
                        InputProps={{
                            disableUnderline: true, // Elimina la línea inferior
                            sx: {
                                fontSize: '15px',
                                border: '1px solid', // Añade un borde alrededor
                                borderColor: 'rgba(0, 0, 0, 0.527)', // Color del borde inicial
                                borderRadius: '4px', // Bordes redondeados
                                padding: '9px 9px', // Ajusta el padding del input
                                '&:hover': {
                                    borderColor: 'rgb(9, 197, 9)', // Color del borde al hacer hover
                                },
                                '&.Mui-focused': {
                                    border: '2px solid rgb(9, 197, 9)',
                                    borderColor: 'rgb(9, 197, 9)', // Color del borde al hacer focus
                                    color: 'black',
                                    fontWeight: 'bold',
                                },

                            },
                        }}
                        InputLabelProps={{
                            sx: {
                                fontSize: '15px',
                                transform: 'translate(18px, 30px) scale(1.1)', // Posición inicial del label
                                color: 'black', // Color del label
                                '&.Mui-focused': {
                                    marginBottom: '5px',
                                    transform: 'translate(14px, 20px) scale(0.85)', // Mantiene el label dentro del borde al enfocar
                                    color: 'YellowGreen', // Cambia el color del label cuando está enfocado
                                    fontWeight: 'bold'
                                },
                                // Mantiene el label en la posición escalada si hay texto
                                '&.MuiFormLabel-filled': {
                                    transform: 'translate(14px, 20px) scale(0.85)', // Mantiene el label arriba si hay texto
                                    color: 'YellowGreen', // Color cuando está lleno
                                },
                                '&:not(.Mui-focused)': {
                                    color: 'black', // Texto en negro cuando no está enfocado

                                },
                            },
                        }}

                        sx={{
                            width: '100%',
                            '&.Mui-focused .MuiInputBase-input': {
                                color: 'black', // Texto en negro cuando se pierde el foco
                                fontWeight: 'bold',
                            },
                            '&.Mui-filled .MuiInputBase-input': {
                                fontWeight: 'bold', // Texto en negrita cuando hay contenido
                                color: 'black', // Texto en negro
                            },
                            '&:not(.Mui-focused) .MuiInputBase-input': {
                                color: 'black', // Texto en negro cuando no está enfocado
                                fontWeight: 'bold',
                            },
                        }}
                    />

                    <div style={{ display: 'flex' }}>
                        <div style={{ display: 'flex', border: '1px solid gray', width: '100%', height: '60px', marginTop: '20px', borderRadius: '10px' }}>
                            <FormControl sx={{ m: 1, width: '100%' }}>


                                <Select
                                    labelId="demo-select-small-label"
                                    id="demo-select-small"
                                    value={dia}
                                    size="small"
                                    onChange={changeDia}
                                    MenuProps={{
                                        disableScrollLock: true, // Permite que el scroll de la página continúe
                                        PaperProps: {
                                            sx: {
                                                maxHeight: 200,
                                                overflow: 'auto',
                                            },
                                        },
                                    }}

                                    sx={{
                                        width: '100%',
                                        fontSize: '16px'

                                    }}
                                >
                                    <MenuItem value="Dia" disabled sx={{ visibility: 'hidden', height: '0px' }}>
                                        Dia
                                    </MenuItem>
                                    {dias.map((dia) => (
                                        <MenuItem value={dia}>{dia}</MenuItem>
                                    ))}


                                </Select>

                            </FormControl>

                            <FormControl sx={{ m: 1, width: '100%' }}>


                                <Select
                                    labelId="demo-select-small-label"
                                    id="demo-select-small"
                                    value={mes}
                                    size="small"
                                    onChange={changeMes}
                                    MenuProps={{
                                        disableScrollLock: true, // Permite que el scroll de la página continúe
                                        PaperProps: {
                                            sx: {
                                                maxHeight: 100,
                                                overflow: 'auto',
                                            },
                                        },
                                    }}
                                    sx={{
                                        width: '100%',
                                        fontSize: '16px',
                                        marginRight: '2px',

                                    }}
                                >
                                    <MenuItem value="Mes" disabled sx={{ visibility: 'hidden', height: '0px' }}>
                                        Mes
                                    </MenuItem>
                                    {meses.map((mes) => (
                                        <MenuItem value={mes}>{mes}</MenuItem>
                                    ))}
                                </Select>


                            </FormControl>

                            <FormControl sx={{ m: 1, width: '100%' }}>

                                <Select
                                    labelId="demo-select-small-label"
                                    id="demo-select-small"
                                    value={anual}
                                    size="small"
                                    onChange={changeAnual}
                                    MenuProps={{
                                        disableScrollLock: true, // Permite que el scroll de la página continúe
                                        PaperProps: {
                                            sx: {
                                                maxHeight: 200,
                                                overflow: 'auto',
                                            },
                                        },
                                    }}

                                    sx={{
                                        width: '100%',
                                        fontSize: '16px'

                                    }}
                                >
                                    <MenuItem value="Año" disabled sx={{ visibility: 'hidden', height: '0px' }}>
                                        Año
                                    </MenuItem>
                                    {años.map((año) => (
                                        <MenuItem value={año}>{año}</MenuItem>
                                    ))}
                                </Select>


                            </FormControl>
                        </div>
                    </div>

                    <FormControl variant="standard" style={{ width: '100%' }}>
                        <InputLabel
                            id="select-label"
                            sx={{
                                fontSize:'15px',
                                transform: nacionalidad ? 'translate(14px, 20px) scale(0.85)' : 'translate(18px, 30px) scale(1.1)',
                                color: nacionalidad ? 'YellowGreen' : 'black',
                                fontWeight: nacionalidad ? 'bold' : 'normal',
                                '&.Mui-focused': {
                                    marginBottom: '5px',
                                    transform: 'translate(14px, 20px) scale(0.85)',
                                    color: 'YellowGreen',
                                    fontWeight: 'bold',
                                },
                                '&:not(.Mui-focused)': {
                                    color: 'black', // Texto en negro cuando no está enfocado
                                    fontWeight: 'normal',

                                },
                            }}
                        >
                            Nacionalidad*
                        </InputLabel>
                        <Select
                            labelId="select-label"
                            id="demo-simple-select"
                            value={nacionalidad}
                            onChange={changeNacionalidad}

                            disableUnderline

                            MenuProps={{
                                disableScrollLock: true, // Permite que el scroll de la página continúe
                                PaperProps: {
                                    sx: {
                                        maxHeight: 100,
                                        overflow: 'auto',
                                    },
                                },
                            }}

                            sx={{
                                fontSize: '15px',
                                width: '100%',
                                border: '1px solid rgba(0, 0, 0, 0.527)', // Color del borde inicial
                                borderRadius: '4px', // Bordes redondeados
                                padding: '5px 5px', // Ajusta el padding del select
                                '&:hover': {
                                    borderColor: 'rgb(9, 197, 9)', // Color del borde al hacer hover
                                },
                                '&.Mui-focused': {
                                    borderColor: 'rgb(9, 197, 9)', // Color del borde al hacer focus
                                    color: 'black',
                                    fontWeight: 'bold',
                                },
                                '& .MuiSelect-select': {
                                    padding: '12px', // Ajusta el padding del select
                                    fontWeight: 'bold', // Texto en negrita cuando hay contenido
                                    color: 'black', // Texto en negro cuando tiene contenido
                                },
                            }}
                        >

                            {codigosPaises.map((pais, index) => (
                                <MenuItem key={index} value={`${pais.nombre}`}

                                    sx={{
                                        '&:hover': {
                                            color: 'black', // Cambiar el color de la letra al pasar el cursor
                                        }
                                    }}

                                >
                                    {`${pais.nombre}`}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                </div>

            </div>

            <div className="textoReserva" >
                <label className='label_pasajero' >Titular de la reserva</label><br />
                <label>El correo ingresado se registrará como el del titular de la reserva y se utilizará para informarte sobre tu reservación, administrar cambios y reembolsos.</label><br />
            </div>
            <div className="div_reserva">
                <FormControl variant="standard" style={{ marginTop: '-1px', marginRight: '15px' }}>
                    <InputLabel
                        id="select-label"
                        sx={{
                            transform: genero ? 'translate(14px, 20px) scale(0.85)' : 'translate(18px, 30px) scale(1.1)',
                            color: genero ? 'YellowGreen' : 'black',
                            fontWeight: genero ? 'bold' : 'normal',
                            '&.Mui-focused': {
                                marginBottom: '5px',
                                transform: 'translate(14px, 20px) scale(0.85)',
                                color: 'YellowGreen',
                                fontWeight: 'bold',
                            },
                            '&:not(.Mui-focused)': {
                                color: 'black', // Texto en negro cuando no está enfocado
                                fontWeight: 'normal',
                            },
                        }}
                    >
                        Prefijo*
                    </InputLabel>
                    <Select
                        labelId="select-label"
                        id="demo-simple-select"
                        value={prefijo}
                        onChange={changePrefijo}

                        disableUnderline

                        MenuProps={{
                            disableScrollLock: true, // Permite que el scroll de la página continúe
                            PaperProps: {
                                sx: {
                                    maxHeight: 200,
                                    overflow: 'auto',
                                },
                            },
                        }}

                        sx={{
                            width: '150px',
                            border: '1px solid rgba(0, 0, 0, 0.527)', // Color del borde inicial
                            borderRadius: '4px', // Bordes redondeados
                            padding: '5px 5px', // Ajusta el padding del select
                            '&:hover': {
                                borderColor: 'rgb(9, 197, 9)', // Color del borde al hacer hover
                            },
                            '&.Mui-focused': {
                                borderColor: 'rgb(9, 197, 9)', // Color del borde al hacer focus
                                color: 'black',
                                fontWeight: 'bold',
                            },
                            '& .MuiSelect-select': {
                                padding: '12px', // Ajusta el padding del select
                                fontWeight: 'bold', // Texto en negrita cuando hay contenido
                                color: 'black', // Texto en negro cuando tiene contenido
                            },
                        }}
                    >
                        {codigosPaises.map((pais, index) => (
                            <MenuItem key={index} value={`${pais.nombre} (${pais.código})`}

                                sx={{
                                    '&:hover': {
                                        color: 'black', // Cambiar el color de la letra al pasar el cursor
                                    }
                                }}

                            >
                                {`${pais.nombre} (${pais.código})`}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <TextField
                    label="Telefono*"
                    variant="standard"
                    onChange={changeTelefono}
                    value={telefono}
                    InputProps={{
                        disableUnderline: true, // Elimina la línea inferior
                        sx: {
                            border: '1px solid', // Añade un borde alrededor
                            borderColor: 'rgba(0, 0, 0, 0.527)', // Color del borde inicial
                            borderRadius: '4px', // Bordes redondeados
                            padding: '12px 12px', // Ajusta el padding del input
                            '&:hover': {
                                borderColor: 'rgb(9, 197, 9)', // Color del borde al hacer hover
                            },
                            '&.Mui-focused': {
                                border: '2px solid rgb(9, 197, 9)',
                                borderColor: 'rgb(9, 197, 9)', // Color del borde al hacer focus
                                color: 'black',
                                fontWeight: 'bold',
                            },

                        },
                    }}
                    InputLabelProps={{
                        sx: {
                            transform: 'translate(18px, 30px) scale(1.1)', // Posición inicial del label
                            color: 'black', // Color del label
                            '&.Mui-focused': {
                                marginBottom: '5px',
                                transform: 'translate(14px, 20px) scale(0.85)', // Mantiene el label dentro del borde al enfocar
                                color: 'YellowGreen', // Cambia el color del label cuando está enfocado
                                fontWeight: 'bold'
                            },
                            // Mantiene el label en la posición escalada si hay texto
                            '&.MuiFormLabel-filled': {
                                transform: 'translate(14px, 20px) scale(0.85)', // Mantiene el label arriba si hay texto
                                color: 'YellowGreen', // Color cuando está lleno
                            },
                            '&:not(.Mui-focused)': {
                                color: 'black', // Texto en negro cuando no está enfocado

                            },
                        },
                    }}

                    sx={{
                        width: '440px',
                        marginRight: '15px',
                        '&.Mui-focused .MuiInputBase-input': {
                            color: 'black', // Texto en negro cuando se pierde el foco
                            fontWeight: 'bold',
                        },
                        '&.Mui-filled .MuiInputBase-input': {
                            fontWeight: 'bold', // Texto en negrita cuando hay contenido
                            color: 'black', // Texto en negro
                        },
                        '&:not(.Mui-focused) .MuiInputBase-input': {
                            color: 'black', // Texto en negro cuando no está enfocado
                            fontWeight: 'bold',
                        },
                    }}
                />


                <TextField
                    label="Correo electronico"
                    variant="standard"
                    value={correo}
                    onChange={changeCorreo}
                    InputProps={{
                        disableUnderline: true, // Elimina la línea inferior
                        sx: {
                            border: '1px solid', // Añade un borde alrededor
                            borderColor: 'rgba(0, 0, 0, 0.527)', // Color del borde inicial
                            borderRadius: '4px', // Bordes redondeados
                            padding: '12px 12px', // Ajusta el padding del input
                            '&:hover': {
                                borderColor: 'rgb(9, 197, 9)', // Color del borde al hacer hover
                            },
                            '&.Mui-focused': {
                                border: '2px solid rgb(9, 197, 9)',
                                borderColor: 'rgb(9, 197, 9)', // Color del borde al hacer focus
                                color: 'black',
                                fontWeight: 'bold',
                            },

                        },
                    }}
                    InputLabelProps={{
                        sx: {
                            transform: 'translate(18px, 30px) scale(1.1)', // Posición inicial del label
                            color: 'black', // Color del label
                            '&.Mui-focused': {
                                marginBottom: '5px',
                                transform: 'translate(14px, 20px) scale(0.85)', // Mantiene el label dentro del borde al enfocar
                                color: 'YellowGreen', // Cambia el color del label cuando está enfocado
                                fontWeight: 'bold'
                            },
                            // Mantiene el label en la posición escalada si hay texto
                            '&.MuiFormLabel-filled': {
                                transform: 'translate(14px, 20px) scale(0.85)', // Mantiene el label arriba si hay texto
                                color: 'YellowGreen', // Color cuando está lleno
                            },
                            '&:not(.Mui-focused)': {
                                color: 'black', // Texto en negro cuando no está enfocado

                            },
                        },
                    }}

                    sx={{
                        width: '440px',
                        '&.Mui-focused .MuiInputBase-input': {
                            color: 'black', // Texto en negro cuando se pierde el foco
                            fontWeight: 'bold',
                        },
                        '&.Mui-filled .MuiInputBase-input': {
                            fontWeight: 'bold', // Texto en negrita cuando hay contenido
                            color: 'black', // Texto en negro
                        },
                        '&:not(.Mui-focused) .MuiInputBase-input': {
                            color: 'black', // Texto en negro cuando no está enfocado
                            fontWeight: 'bold',
                        },
                    }}
                />

            </div>

            <div className="div_reservaMovil">
                <div className="div_prefijoTelefono">
                    <FormControl variant="standard" style={{ marginTop: '-1px', marginRight: '15px', width: '100%' }}>



                        <InputLabel
                            id="select-label"
                            sx={{
                                fontSize:'15px',
                                transform: genero ? 'translate(14px, 20px) scale(0.85)' : 'translate(18px, 30px) scale(1.1)',
                                color: genero ? 'YellowGreen' : 'black',
                                fontWeight: genero ? 'bold' : 'normal',
                                '&.Mui-focused': {
                                    marginBottom: '5px',
                                    transform: 'translate(14px, 20px) scale(0.85)',
                                    color: 'YellowGreen',
                                    fontWeight: 'bold',
                                },
                                '&:not(.Mui-focused)': {
                                    color: 'black', // Texto en negro cuando no está enfocado
                                    fontWeight: 'normal',

                                },
                            }}
                        >
                            Prefijo*
                        </InputLabel>
                        <Select
                            labelId="select-label"
                            id="demo-simple-select"
                            value={prefijo}
                            onChange={changePrefijo}

                            disableUnderline

                            MenuProps={{
                                disableScrollLock: true, // Permite que el scroll de la página continúe
                                PaperProps: {
                                    sx: {
                                        maxHeight: 100,
                                        overflow: 'auto',
                                    },
                                },
                            }}

                            sx={{
                                width: '100%',
                                fontSize: '15px',
                                border: '1px solid rgba(0, 0, 0, 0.527)', // Color del borde inicial
                                borderRadius: '4px', // Bordes redondeados
                                padding: '6px 6px', // Ajusta el padding del select
                                '&:hover': {
                                    borderColor: 'rgb(9, 197, 9)', // Color del borde al hacer hover
                                },
                                '&.Mui-focused': {
                                    borderColor: 'rgb(9, 197, 9)', // Color del borde al hacer focus
                                    color: 'black',
                                    fontWeight: 'bold',
                                },
                                '& .MuiSelect-select': {
                                    padding: '9px', // Ajusta el padding del select
                                    fontWeight: 'bold', // Texto en negrita cuando hay contenido
                                    color: 'black', // Texto en negro cuando tiene contenido
                                },
                            }}
                        >
                            {codigosPaises.map((pais, index) => (
                                <MenuItem key={index} value={`${pais.nombre} (${pais.código})`}

                                    sx={{
                                        '&:hover': {
                                            color: 'black', // Cambiar el color de la letra al pasar el cursor
                                        }
                                    }}

                                >
                                    {`${pais.nombre} (${pais.código})`}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <TextField
                        label="Telefono*"
                        variant="standard"
                        onChange={changeTelefono}
                        value={telefono}
                        InputProps={{
                            disableUnderline: true, // Elimina la línea inferior
                            sx: {
                                fontSize:'15px',
                                border: '1px solid', // Añade un borde alrededor
                                borderColor: 'rgba(0, 0, 0, 0.527)', // Color del borde inicial
                                borderRadius: '4px', // Bordes redondeados
                                padding: '9px 9px', // Ajusta el padding del input
                                '&:hover': {
                                    borderColor: 'rgb(9, 197, 9)', // Color del borde al hacer hover
                                },
                                '&.Mui-focused': {
                                    border: '2px solid rgb(9, 197, 9)',
                                    borderColor: 'rgb(9, 197, 9)', // Color del borde al hacer focus
                                    color: 'black',
                                    fontWeight: 'bold',
                                },

                            },
                        }}
                        InputLabelProps={{
                            sx: {
                                fontSize:'15px',
                                transform: 'translate(18px, 30px) scale(1.1)', // Posición inicial del label
                                color: 'black', // Color del label
                                '&.Mui-focused': {
                                    marginBottom: '5px',
                                    transform: 'translate(14px, 20px) scale(0.85)', // Mantiene el label dentro del borde al enfocar
                                    color: 'YellowGreen', // Cambia el color del label cuando está enfocado
                                    fontWeight: 'bold'
                                },
                                // Mantiene el label en la posición escalada si hay texto
                                '&.MuiFormLabel-filled': {
                                    transform: 'translate(14px, 20px) scale(0.85)', // Mantiene el label arriba si hay texto
                                    color: 'YellowGreen', // Color cuando está lleno
                                },
                                '&:not(.Mui-focused)': {
                                    color: 'black', // Texto en negro cuando no está enfocado

                                },
                            },
                        }}

                        sx={{
                            width: '100%',
                            fontSize: '15px',
                            marginRight: '15px',
                            '&.Mui-focused .MuiInputBase-input': {
                                color: 'black', // Texto en negro cuando se pierde el foco
                                fontWeight: 'bold',
                            },
                            '&.Mui-filled .MuiInputBase-input': {
                                fontWeight: 'bold', // Texto en negrita cuando hay contenido
                                color: 'black', // Texto en negro
                            },
                            '&:not(.Mui-focused) .MuiInputBase-input': {
                                color: 'black', // Texto en negro cuando no está enfocado
                                fontWeight: 'bold',
                            },
                        }}
                    /><br />

                </div>
                <TextField
                    label="Correo electronico"
                    variant="standard"
                    value={correo}
                    onChange={changeCorreo}
                    InputProps={{
                        disableUnderline: true, // Elimina la línea inferior
                        sx: {
                            fontSize:'15px',
                            border: '1px solid', // Añade un borde alrededor
                            borderColor: 'rgba(0, 0, 0, 0.527)', // Color del borde inicial
                            borderRadius: '4px', // Bordes redondeados
                            padding: '9px 9px', // Ajusta el padding del input
                            '&:hover': {
                                borderColor: 'rgb(9, 197, 9)', // Color del borde al hacer hover
                            },
                            '&.Mui-focused': {
                                border: '2px solid rgb(9, 197, 9)',
                                borderColor: 'rgb(9, 197, 9)', // Color del borde al hacer focus
                                color: 'black',
                                fontWeight: 'bold',
                            },

                        },
                    }}
                    InputLabelProps={{
                        sx: {
                            fontSize:'15px',
                            transform: 'translate(18px, 30px) scale(1.1)', // Posición inicial del label
                            color: 'black', // Color del label
                            '&.Mui-focused': {
                                marginBottom: '5px',
                                transform: 'translate(14px, 20px) scale(0.85)', // Mantiene el label dentro del borde al enfocar
                                color: 'YellowGreen', // Cambia el color del label cuando está enfocado
                                fontWeight: 'bold'
                            },
                            // Mantiene el label en la posición escalada si hay texto
                            '&.MuiFormLabel-filled': {
                                transform: 'translate(14px, 20px) scale(0.85)', // Mantiene el label arriba si hay texto
                                color: 'YellowGreen', // Color cuando está lleno
                            },
                            '&:not(.Mui-focused)': {
                                color: 'black', // Texto en negro cuando no está enfocado

                            },
                        },
                    }}

                    sx={{
                        fontSize:'15px',
                        width: '100%',
                        '&.Mui-focused .MuiInputBase-input': {
                            color: 'black', // Texto en negro cuando se pierde el foco
                            fontWeight: 'bold',
                        },
                        '&.Mui-filled .MuiInputBase-input': {
                            fontWeight: 'bold', // Texto en negrita cuando hay contenido
                            color: 'black', // Texto en negro
                        },
                        '&:not(.Mui-focused) .MuiInputBase-input': {
                            color: 'black', // Texto en negro cuando no está enfocado
                            fontWeight: 'bold',
                        },
                    }}
                />

            </div>


            <div>

                <div className="div_check">
                    <FormControlLabel control={<Checkbox

                        sx={{
                            color: 'gray',
                            '&.Mui-checked': {
                                color: 'limegreen',
                            },
                        }}

                        checked={checkAceptar}
                        onChange={changeCheckAceptar}

                    />} label="Autorizo el tratamiento de mis datos personales conforme a la Política de Privacidad."

                        sx={{

                            '& .MuiFormControlLabel-label': {
                                fontSize: '17px', // Cambia el tamaño del label aquí
                            }
                        }}

                    /><br />
                    <FormControlLabel control={<Checkbox

                        sx={{
                            color: 'gray',
                            '&.Mui-checked': {
                                color: 'limegreen',
                            },
                        }}

                        checked={checkRecibir}
                        onChange={changeCheckRecibir}

                    />} label="Acepto el uso de mis datos personales para recibir promociones, ofertas y novedades que avianca tiene para mí."

                        sx={{

                            '& .MuiFormControlLabel-label': {
                                fontSize: '17px', // Cambia el tamaño del label aquí
                            }
                        }}

                    />


                </div>
            </div>


            <button className="boton_infoContacto" onClick={enviar} style={{ backgroundColor: 'black' }}>Continuar</button>

        </div >
            <PiePagina />
        </>
    );
}

export default Pasos2;