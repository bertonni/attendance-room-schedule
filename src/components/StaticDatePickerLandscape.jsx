import { useEffect, useState } from "react";
import brLocale from "date-fns/locale/pt-BR";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import TextField from "@mui/material/TextField";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import StaticDatePicker from "@mui/lab/StaticDatePicker";
import { Box, Button, Snackbar, Alert, Typography } from "@mui/material";
import { Temporal } from "@js-temporal/polyfill";
import TimeSelect from "./TimeSelect";
// import LabSelect from "./LabSelect";
import { PickersDay, pickersDayClasses } from "@mui/lab";
import { useAuth } from "../contexts/AuthContext";
import { useSchedule } from "../contexts/ScheduleContext";

export default function StaticDatePickerLandscape() {
  const [value, setValue] = useState(new Date());
  const [startTime, setStartTime] = useState("");
  const [selectedRoom] = useState("SLA-16");
  const [endTime, setEndTime] = useState("");
  const [minDate, setMinDate] = useState(Temporal.Now.plainDateISO().add({ days: 1 }));
  const [maxDate] = useState(Temporal.Now.plainDateISO().add({ days: 21 }));
  const [open, setOpen] = useState(false);

  const { user } = useAuth();
  const { makeReservation } = useSchedule();

  const [scheduling, setScheduling] = useState({
    user: {
      id: user.uid,
      name: user.displayName,
      email: user.email,
    },
    room: "",
    date: "",
    start: "",
    end: "",
  });

  const handleClose = () => {
    setOpen(false);
  };

  const isNotAvailable = (date) => {
    const formatted = new Temporal.PlainDate(
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate()
    );
    if (Temporal.PlainDate.compare(formatted, maxDate) === 1) return true;
    if (Temporal.PlainDate.compare(formatted, minDate) === -1) return true;
    if (date.getDay() === 0 || date.getDay() === 6) return true;
    return false;
  };

  const handleSchedule = () => {
    setOpen(true);
    const date = Temporal.PlainDate.from({
      year: value.getFullYear(),
      month: value.getMonth() + 1,
      day: value.getDate(),
    });

    scheduling.room = selectedRoom;
    scheduling.date = date.toString();
    scheduling.start = startTime;
    scheduling.end = endTime;

    setScheduling(scheduling);

    makeReservation(scheduling);
    setStartTime("");
    setEndTime("");
  };

  const renderWeekPickerDay = (date, selectedDates, pickersDayProps) => {
    return (
      <PickersDay
        {...pickersDayProps}
        sx={{
          [`&&.${pickersDayClasses.root}`]: {
            backgroundColor: 'transparent'
          },
          [`&&.${pickersDayClasses.selected}`]: {
            backgroundColor: "#349A46",
          },
          [`&&.${pickersDayClasses.today}`]: {
            borderColor: "#349A46",
          },
        }}
      />
    );
  };

  const getFormattedDate = (date) => {
    const [year, month, day] = date.split("-");

    return `${day}/${month}/${year}`;
  };

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
        mt: 4
      }}
    >
      {/* <LabSelect /> */}
      <LocalizationProvider dateAdapter={AdapterDateFns} locale={brLocale}>
        <Box
          minHeight={300}
          sx={{
            width: "100%",
            maxWidth: "500px",
          }}
        >
          <StaticDatePicker
            orientation="portrait"
            openTo="day"
            value={value}
            showDaysOutsideCurrentMonth
            displayStaticWrapperAs="desktop"
            renderDay={renderWeekPickerDay}
            shouldDisableDate={isNotAvailable}
            toolbarTitle="Selecione a data"
            toolbarFormat="dd 'de' MMMM"
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                helperText={`A data precisa estar entre ${getFormattedDate(
                  minDate.toString()
                )}
               e ${getFormattedDate(maxDate.toString())}`}
              />
            )}
          />
        </Box>
        <TimeSelect
          lab={selectedRoom}
          date={Temporal.PlainDate.from({
            year: value.getFullYear(),
            month: value.getMonth() + 1,
            day: value.getDate(),
          }).toString()}
          startTime={startTime}
          setStartTime={setStartTime}
          endTime={endTime}
          setEndTime={setEndTime}
        />
        <Button
          disabled={startTime === "" || endTime === "" || selectedRoom === ""}
          variant="contained"
          sx={{ my: 2 }}
          color="ifgreen"
          onClick={handleSchedule}
        >
          Reservar
        </Button>
      </LocalizationProvider>
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <Alert severity="success" onClose={handleClose}>
          <Typography textAlign={"center"}>
            Agendamento realizado para o dia{" "}
            <b>
              {getFormattedDate(
                Temporal.PlainDate.from({
                  year: value.getFullYear(),
                  month: value.getMonth() + 1,
                  day: value.getDate(),
                }).toString()
              )}
            </b>{" "}
            das{" "}
            <b>
              {scheduling.start < 10
                ? "0" + scheduling.start
                : scheduling.start}
              :00
            </b>{" "}
            às{" "}
            <b>
              {scheduling.end < 10 ? "0" + scheduling.end : scheduling.end}:00
            </b>
          </Typography>
        </Alert>
      </Snackbar>
    </Box>
  );
}
