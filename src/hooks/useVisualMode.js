import { useState } from "react";

export default function useVisualMode(initialMode) {
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);
  const transition = function(newMode, replace = false) {
    setMode(newMode);
    if (!replace) {
      setHistory(prev => ([...prev, newMode]));
    }
  };
  const back = function() {
    if (history.length <= 1) return;
    setMode(history[history.length - 2]);
    setHistory(prev => {
      const prevHistory = [...prev];
      prevHistory.pop();
      return prevHistory;
    })
  };
  
  return { mode, transition, back };
};