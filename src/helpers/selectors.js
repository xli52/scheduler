export function getAppointmentsForDay(state, day) {
  const selectedDay = state.days.filter(dayItem => dayItem.name === day);
  if (selectedDay.length === 0) return [];
  const appointmentIDs = selectedDay[0].appointments
  return appointmentIDs ? appointmentIDs.map((id) => state.appointments[id]) : [];
};