export function getAppointmentsForDay(state, day) {
  const selectedDay = state.days.filter(dayItem => dayItem.name === day);
  if (selectedDay.length === 0) return [];
  const appointmentIDs = selectedDay[0].appointments
  return appointmentIDs ? appointmentIDs.map((id) => state.appointments[id]) : [];
};

export function getInterview(state, interview) {
  if (!interview) return null;
  const interviewer = state.interviewers[interview.interviewer];
  const rebuildInterview = {...interview};
  rebuildInterview.interviewer = interviewer;
  return rebuildInterview;
};

export function getInterviewersForDay(state, day) {
  const selectedDay = state.days.filter(dayItem => dayItem.name === day);
  if (selectedDay.length === 0) return [];
  const interviewersIDs = selectedDay[0].interviewers
  return interviewersIDs ? interviewersIDs.map((id) => state.interviewers[id]) : [];
};