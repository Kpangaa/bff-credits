export const formatDate = (date: string): string => {
  if (date.length > 8) {
    const cleanedDate = date.replace(/-/g, '').replace(/\s/g, '');
    const datePart = cleanedDate.substring(0, 8);

    const year = datePart.substring(0, 4);
    const month = datePart.substring(4, 6);
    const day = datePart.substring(6, 8);
    return `${day}/${month}/${year}`;
  }

  const year = date.substring(0, 4);
  const month = date.substring(4, 6);
  const day = date.substring(6, 8);

  return `${day}/${month}/${year}`;
};

export const formatDateValidate = (dias: number): string => {
  const date = new Date();
  const nuevaFecha = new Date(date);
  nuevaFecha.setDate(nuevaFecha.getDate() + dias);

  const dia = String(nuevaFecha.getDate()).padStart(2, '0');
  const mes = String(nuevaFecha.getMonth() + 1).padStart(2, '0');
  const año = nuevaFecha.getFullYear();

  const fechaFormateada = `${dia}/${mes}/${año}`;
  return fechaFormateada;
};
