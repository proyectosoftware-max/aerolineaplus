import React, { useState, useEffect} from 'react';
import { Modal } from 'react-bootstrap';

const PiePagina = () =>{

    const [abrirPiePagina, setAbrirPiePagina] = useState(false);
    const [show, setShow] = useState(false);

  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden"; // Bloquea el scroll del fondo
    } else {
      document.body.style.overflow = "auto"; // Restaura el scroll cuando se cierra
    }

    return () => {
      document.body.style.overflow = "auto"; // Limpieza al desmontar
    };
  }, [show]);


    return(
        <>
       <Modal
          size="xl"
          show={abrirPiePagina}
          onHide={() => setAbrirPiePagina(false)}
          aria-labelledby="example-modal-sizes-title-lg"
          closeButton
          className='modalPiePagina'
          dialogClassName="custom-modal-size"
          sx={{
            zIndex: 1301,
          }}
        >
          <Modal.Header className='header'
            closeButton style={{ borderBottom: 'none', paddingBottom: '0' }} >

          </Modal.Header>
          <Modal.Body className='modalBodyPiePagina'>
            <p><label className='tituloModalPiePagina'>Terminos y condiciones de uso</label></p>
          <b>1-</b>Esta página de prueba está desarollada con el framework React + Vite <br/>
          <b>2-</b>Disfruta del diseño de esta página que ha sido sido un gran reto tanto en el desarrollo front-end como back-end<br/>
          <b>3-</b>Al navegar por la página estas aceptando nuestros terminos y condiciones que establecen que aunque <br/> 
          la página sea similar a la original no es posible adquirir tiquetes de vuelos y tampoco realizar algún tipo de transacción de dinero,esa es la razón por la cual no puedes tener ninguna interacción de facturación<br/>
          
          <b>4-</b>Debes de buscar el sitio web oficial de la compañia Avianca para poder abordar en uno de sus aviones a tu destino favorito<br/>
            
          </Modal.Body>
       
        </Modal>

     <div className="div_piePagina">
        <label className="label_piePagina1" onClick={() => setAbrirPiePagina(true)} >Consulta todas las condiciones de <a href="/">retracto y desistimiento </a> aplicables para Colombia.</label >
        <label className="label_piePagina2">Copyright © Avianca 2024</label>
     </div>
    </>
    );

    
}

export default PiePagina;