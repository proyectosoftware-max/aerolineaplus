import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { DataProvider } from './componentes/Context';
import Principal from './Principal';
import Paso1 from './componentes/Paso1';
import Resumen from './componentes/Resumen';
import Paso2 from './componentes/Paso2';
import Paso3 from './componentes/Paso3';
import Paso4 from './componentes/Paso4';
import Paso5 from './componentes/Paso5';
import Prueba from './componentes/prueba';

function App() {

  return (
    <div>
      <DataProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Principal />} />
          <Route path='/paso1' element={<Paso1 />} />
          <Route path='/resumen/:corigen/:cdestino/:ida/:vuelta/:tiempo/:precio/:salida/:llegada/:colorboton/:contaradulto/:adultopasajero' element={<Resumen/>} />
          <Route path='/paso2/:corigen/:cdestino/:ida/:vuelta/:tiempo/:precio/:salida/:llegada/:colorboton/:contaradulto/:adultopasajero' element={<Paso2 />} />
          <Route path='/paso3/:corigen/:cdestino/:ida/:vuelta/:tiempo/:precio/:salida/:llegada/:nombre/:apellido/:colorboton/:contaradulto/:adultopasajero' element={<Paso3 />} />
          <Route path='/paso4/:corigen/:cdestino/:ida/:vuelta/:tiempo/:precio/:salida/:llegada/:nombre/:apellido/:colorboton/:contaradulto/:adultopasajero' element={<Paso4 />} />
          <Route path='/paso5/:corigen/:cdestino/:ida/:vuelta/:tiempo/:precio/:salida/:llegada/:nombre/:apellido/:colorboton/:contaradulto/:adultopasajero' element={<Paso5 />} />
          <Route path='/prueba' element={<Prueba />} />
        </Routes>
      </BrowserRouter>
      </DataProvider>
    </div>
  );

}

export default App;

