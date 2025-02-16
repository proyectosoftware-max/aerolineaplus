import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


const ModalPiePagina = () =>{
  <>
  <React.Fragment>

<Dialog
    open={abrirPiePagina}
    onClose={CerraModalPiePagina}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
    sx={{
        zIndex: 1301,
    }}
>

    <DialogContent
    >
Hola

</DialogContent>
</Dialog>
</React.Fragment>
  </>
}

export default ModalPiePagina;

