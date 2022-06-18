export function getAppointmentsForDay(state, day) {
  const selectedDay = state.days.filter(dayItem => dayItem.name === day);
  if (selectedDay.length === 0) return [];
  const appointmentIDs = selectedDay[0].appointments
  return appointmentIDs ? appointmentIDs.map((id) => state.appointments[id]) : [];
};

export function getInterview(state, interview) {
  if (!interview) return null;
  const interviewer = state.interviewers[interview.interviewer.toString()];
  interview.interviewer = interviewer;
  console.log(interview);
  return interview;
};