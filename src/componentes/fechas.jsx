const dias = Array.from({ length: 31 }, (_, i) => i + 1);
const meses = Array.from({ length: 12 }, (_, i) => i + 1);
const años = Array.from({ length: 2009 - 1906 + 1 }, (_, i) => 2009 - i);

const fechas = {
  dias: dias.map(dia => ({ nombre: `${dia}`, código: dia })),
  meses: meses.map(mes => ({ nombre: `${mes}`, código: mes })),
  años: años.map(año => ({ nombre: `${año}`, código: año })),
};

export default fechas;
