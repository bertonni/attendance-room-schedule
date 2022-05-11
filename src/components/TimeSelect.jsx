import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import { useSchedule } from "../contexts/ScheduleContext";

const options = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

export default function TimeSelect({
  lab,
  date,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
}) {
  const { schedules, schedulesCount } = useSchedule();
  const [unavailableStartTimes, setUnavailableStartTimes] = useState([]);
  const [unavailableEndTimes, setUnavailableEndTimes] = useState([]);
  const [startTimes, setStartTimes] = useState([]);

  useEffect(() => {
    setStartTime("");
    setEndTime("");
  }, [date]);

  useEffect(() => {
    const data = schedules.filter((value) => value.date === date);
    const unavailableStart = [];
    const unavailableEnd = [];
    const startValues = [];

    if (data.length === 0) {
      setStartTimes([]);
      setUnavailableStartTimes([]);
      setUnavailableEndTimes([]);
      return;
    }

    const timesTooked = data.map(({ start, end }) => start + "-" + end);

    for (let i = 0; i < timesTooked.length; i++) {
      startValues.push(parseInt(timesTooked[i].split("-")[0]));
    }

    setStartTimes(startValues);

    for (let i = 0; i < timesTooked.length; i++) {
      const [start, end] = timesTooked[i].split("-");
      for (let j = parseInt(start); j < parseInt(end); j++) {
        unavailableStart.push(j);
      }
    }
    setUnavailableStartTimes(unavailableStart);

    for (let i = 0; i < timesTooked.length; i++) {
      const [start, end] = timesTooked[i].split("-");
      for (let j = parseInt(start) + 1; j <= parseInt(end); j++) {
        unavailableEnd.push(j);
      }
    }
    setUnavailableEndTimes(unavailableEnd);
  }, [date, startTime, endTime, lab, schedulesCount]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        width: "100%",
        maxWidth: "500px",
      }}
    >
      <FormControl fullWidth disabled={lab === ""}>
        <InputLabel id="start-time">Início *</InputLabel>
        <Select
          required
          labelId="start-time"
          id="start-time-select"
          value={startTime}
          label="Início"
          onChange={(e) => {
            if (e.target.value === "") {
              setEndTime("");
            }
            setStartTime(e.target.value);
          }}
        >
          <MenuItem value="">
            <em>Nenhum</em>
          </MenuItem>
          {options.map((option, index) => (
            <MenuItem
              key={index}
              disabled={
                (option >= endTime && endTime != "") ||
                unavailableStartTimes.includes(option) || index === options.length -1
              }
              value={option}
            >
              {option < 10 ? `0${option}` : option}:00
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth disabled={startTime === ""}>
        <InputLabel id="end-time">Término *</InputLabel>
        <Select
          required
          labelId="end-time"
          id="end-time-select"
          value={endTime}
          label="Término"
          onChange={(e) => setEndTime(e.target.value)}
        >
          <MenuItem value="">
            <em>Nenhum</em>
          </MenuItem>
          {options.map((option, index) => (
            <MenuItem
              disabled={
                option <= startTime ||
                unavailableEndTimes.includes(option) ||
                (startTime < unavailableEndTimes[0] &&
                  option >= unavailableEndTimes[0])
              }
              key={index}
              value={option}
            >
              {option < 10 ? `0${option}` : option}:00
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
