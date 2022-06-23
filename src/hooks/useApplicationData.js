import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({ day: 'Monday', days: [], appointments: {}, interviewers: {} });
  const setDay = day => setState(prev => ({ ...prev, day }));

  const getSpotsForDay = function (newState) {
    const selectedDay = newState.days.find(day => day.name === newState.day);
    const appointmentIDs = selectedDay.appointments;
    const filteredAppointments =
      appointmentIDs
        .map((id) => newState.appointments[id])
        .filter(appointment => !appointment.interview);
    return filteredAppointments.length;
  }

  const updateSpots = function (newState) {
    const spots = getSpotsForDay(newState);
    const dayIndex = newState.days.findIndex(day => day.name === newState.day);
    newState.days[dayIndex].spots = spots;
  }

  const bookInterview = function (id, interview) {
    const newAppointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const newAppointments = {
      ...state.appointments,
      [id]: newAppointment
    };
    const newState = {
      ...state,
      appointments: newAppointments
    };

    updateSpots(newState);
    
    return axios.put(`/api/appointments/${id}`, newAppointment)
      .then(() => {
        setState(newState);
      })
  }

  const cancelInterview = function (id) {
    const newAppointment = {
      ...state.appointments[id],
      interview: null
    };
    const newAppointments = {
      ...state.appointments,
      [id]: newAppointment
    };
    const newState = {
      ...state,
      appointments: newAppointments
    };
    
    updateSpots(newState);

    return axios.delete(`api/appointments/${id}`)
      .then(() => {
        setState(newState);
      })
  };

  useEffect(() => {
    Promise.all([
      axios.get('api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ])
      .then(all => {
        console.log(all[0].data);
        console.log(all[1].data);
        console.log(all[2].data);
        setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
      });
  }, []);

  return { state, setDay, bookInterview, cancelInterview }
};