import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({ day: 'Monday', days: [], appointments: {}, interviewers: {} });
  const setDay = day => setState(prev => ({ ...prev, day }));

  const getSpotsForDay = function (state, day, appointments) {
    const selectedDay = state.days.filter(dayItem => dayItem.name === day);
    if (selectedDay.length === 0) return 0;
    const appointmentIDs = selectedDay[0].appointments;
    const filteredAppointments = appointmentIDs ?
      appointmentIDs.map((id) => appointments[id]).filter(appointment => !appointment.interview) :
      [];
    return filteredAppointments.length;
  }

  const getUpdatedDays = function (state, appointments) {
    const spots = getSpotsForDay(state, state.day, appointments);
    const days = [...state.days];
    for (const day of days) {
      if (day.name === state.day) {
        day.spots = spots;
      }
    }
    return days
  }

  const bookInterview = function (id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`/api/appointments/${id}`, appointment)
      .then(() => {
        setState(prev => {
          const days = getUpdatedDays(prev, appointments);
          return { ...prev, days, appointments };
        });
      })
  }

  const cancelInterview = function (id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.delete(`api/appointments/${id}`)
      .then(() => {
        setState(prev => {
          const days = getUpdatedDays(prev, appointments);
          return { ...prev, days, appointments };
        });
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