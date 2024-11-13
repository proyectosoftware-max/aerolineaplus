import { Container, Navbar, Nav, Card,Accordion, Modal } from 'react-bootstrap';
import ProgressBar from 'react-bootstrap/ProgressBar';
import React, { useState, useEffect, useRef, useContext } from 'react';
import logo from '../material/logo-avianca.png';
import data from './data.json';
import RadioButton from './radio.jsx';
import { FaChevronDown } from 'react-icons/fa';
import { DataContext } from './Context.jsx';

/* https://www.avianca.com/es/booking/select/?origin1=BAQ&destination1=MDE&departure1=2024-09-02&adt1=1&tng1=0&chd1=0&inf1=0&currency=COP&posCode=CO */

const MenuNavBarPaso2 = ()=> {

  const [lgShow, setLgShow] = useState(false);
  const [ciudadOrigen,setCiudadOrigen] = useState("Barranquilla");
  const [ciudadDestino,setCiudadDestino] = useState("Medellín");
  const [scrolled, setScrolled] = useState(false);
  const { sharedData, setOrigen, setDestino, precio } = useContext(DataContext);

 
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  
      useEffect(()=>{
        localStorage.setItem('origen', setOrigen(ciudadOrigen));
    },[ciudadOrigen]);

    
    useEffect(()=>{
      localStorage.setItem('destino', setDestino(ciudadDestino));
  },[ciudadDestino]);

  return (
    <>



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
                  <Navbar.Text className='fecha'>{sharedData}</Navbar.Text>
                  <Navbar.Text className='fecha' style={{display:'none'}} >{'Dom 3 Ago.'}</Navbar.Text>
                  <Navbar.Text className='adulto' >1 Adulto</Navbar.Text>
                </Nav>
              </div>
            </Nav>
          </Navbar.Collapse>


        </Container>

        <Container className='container2'>
          <Navbar.Collapse id="bascic navbar-nav">
            <Nav className='flex-column'>
              <div className='pasos' >
                <Navbar.Text>Paso 2 de 5</Navbar.Text>
              </div>
              <div className="barra" >
                <ProgressBar now={40} className='BarraProgreso' style={{ height: '10px' }} />
              </div>
            </Nav>
            <button className="boton_cop" >
              COP <label className='label_cero'>{precio}</label>
            </button>
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
                  <Navbar.Text className='fecha'>{sharedData}</Navbar.Text>
                  <Navbar.Text className='adulto' >1 Adulto</Navbar.Text>
                  <Nav.Link className='letra_editar' onClick={() => setLgShow(true)}>Editar</Nav.Link>
                </Nav>
              </div>
            </Nav>
          </Navbar.Collapse>


        </Container>

        <Container className='container2'>
          <Navbar.Collapse id="bascic navbar-nav">
            <Nav className='flex-column'>
              <div className='pasos' >
                <Navbar.Text>Paso 2 de 5</Navbar.Text>
              </div>
              <div className="barra" >
                <ProgressBar now={40} className='BarraProgreso' style={{ height: '10px' }} />
              </div>
            </Nav>
            <button className="boton_cop" >
              COP <label className='label_cero'>{precio}</label>
            </button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

    </>
  );
}

export default MenuNavBarPaso2;

