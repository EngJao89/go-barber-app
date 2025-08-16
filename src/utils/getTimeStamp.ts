export const getCurrentDate = () => {
  const today = new Date();
  const day = today.getDate();
  const weekdays = [
    'Domingo', 'Segunda feira', 'Terça feira', 'Quarta feira', 
    'Quinta feira', 'Sexta feira', 'Sábado'
  ];
  const weekday = weekdays[today.getDay()];

  return {
    day: day.toString().padStart(2, '0'),
    weekday: weekday
  };
};
