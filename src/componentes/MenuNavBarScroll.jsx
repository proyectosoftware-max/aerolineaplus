/*import {Container, Navbar, Nav} from 'react-bootstrap';
import ProgressBar from 'react-bootstrap/ProgressBar';
import logo from '../material/logo-avianca.png';

function MenuNavBar() {

  const ciudad1 = 'Barranquilla';
  const ciudad2 = 'Medellín';
  const fecha = 'Dom.25 Ago. 2024';

  return (
    <Navbar className='navbarEscritorio' expand="lg" fixed='top'>
      <Container className='container1'>
      <Navbar.Brand href="" className='navbar-brand'>
            <img src={logo} width='170' height='40' className="d-inline-block align-top"/>
        </Navbar.Brand>
        <Navbar.Collapse id="bascic navbar-nav">
          <Nav className='flex-column'>
          <div className="nav1" >
            <Navbar.Text className='ciudad1'>{ciudad1}</Navbar.Text>
            <Navbar.Text className='a' >a</Navbar.Text>
            <Navbar.Text className='ciudad2'>{ciudad2}</Navbar.Text>
          </div>
          <div className="nav2" >
            <Nav>
            <Navbar.Text className='fecha'>{fecha}</Navbar.Text>
            <Navbar.Text className='adulto' >1 Adulto</Navbar.Text>
            <Nav.Link className='letra_editar'>Editar</Nav.Link>
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
          <ProgressBar now={20} className='BarraProgreso' style={{height:'10px'}}/>
          </div>
          </Nav>
          <button className="boton_cop" >
            COP <label className='label_cero'>O</label>
          </button>
        </Navbar.Collapse>
      </Container>

      
  
    </Navbar>
  );
}

export default MenuNavBar;*/

import React, { useState, useEffect } from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import ProgressBar from 'react-bootstrap/ProgressBar';
import logo from '../material/logo-avianca.png';

function MenuNavBarScroll() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  const ciudad1 = 'Barranquilla';
  const ciudad2 = 'Medellín';
  const fecha = 'Dom.25 Ago. 2024';

  return (
    <Navbar className={`navbarEscritorioScroll ${scrolled ? 'scrolled' : ''}`} expand="lg" fixed='top'>
      <Container className='container1'>
      <Navbar.Brand href="" className='navbar-brand'>
            <img src={logo} width='170' height='40' className="d-inline-block align-top"/>
        </Navbar.Brand>
        <Navbar.Collapse id="bascic navbar-nav">
          <Nav className='flex-column'>
          <div className="nav1" >
            <Navbar.Text className='ciudad1'>{ciudad1}</Navbar.Text>
            <Navbar.Text className='a' >a</Navbar.Text>
            <Navbar.Text className='ciudad2'>{ciudad2}</Navbar.Text>
          </div>
          <div className="nav2" >
            <Nav>
            <Navbar.Text className='fecha'>{fecha}</Navbar.Text>
            <Navbar.Text className='adulto' >1 Adulto</Navbar.Text>
            <Nav.Link className='letra_editar'>Editar</Nav.Link>
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
          <ProgressBar now={20} className='BarraProgreso' style={{height:'10px'}}/>
          </div>
          </Nav>
          <button className="boton_cop" >
            COP <label className='label_cero'>O</label>
          </button>
        </Navbar.Collapse>
      </Container>

      
  
    </Navbar>
  );

  return (
    <Navbar className={`navbar ${scrolled ? 'scrolled' : ''}`} fixed="top" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Logo</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="#acerca">Acerca de mí</Nav.Link>
            <Nav.Link href="#proyectos">Proyectos</Nav.Link>
            <Nav.Link href="#contacto">Contacto</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MenuNavBar;
