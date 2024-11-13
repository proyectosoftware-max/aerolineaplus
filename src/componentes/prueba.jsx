import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function ResponsiveDatePicker() {
  // Estado para almacenar la fecha seleccionada
  const [selectedDate, setSelectedDate] = React.useState(dayjs('2022-04-17'));

  // Función para manejar los cambios en la fecha seleccionada
  const handleDateChange = (newDate) => {
    setSelectedDate(newDate); // Actualiza el estado con la nueva fecha
    console.log('Nueva fecha seleccionada:', newDate); // Puedes usar la fecha para lo que necesites
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DemoItem label="DatePicker">
          <DatePicker
            value={selectedDate} // Usa el estado para controlar el valor actual
            onChange={handleDateChange} // Maneja los cambios en la fecha
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}
