import {
  Box,
  Grid,
  IconButton,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useAuth } from "../contexts/AuthContext";
import ConfirmBox from "./ConfirmBox";
import { useSchedule } from "../contexts/ScheduleContext";

export default function DisplayReservationsPerDayAndLab({
  reservations,
  date,
}) {
  const [schedulesForSelectedLab, setSchedulesForSelectedLab] = useState([]);
  const [showConfirmBox, setShowConfirmBox] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState({});
  const [confirmation, setConfirmation] = useState(false);

  const { user } = useAuth();
  const { schedulesCount, error } = useSchedule();

  useEffect(() => {
    setConfirmation(false);
    const filtered = reservations.filter(
      (schedule) => schedule.date === date
    );
    setSchedulesForSelectedLab(filtered);
  }, [date, reservations, schedulesCount]);

  useEffect(() => {
    if (error.length === 0) {
      const updated = schedulesForSelectedLab.filter((schedule) => JSON.stringify(schedule) !== JSON.stringify(selectedSchedule));
      setSchedulesForSelectedLab(updated);
    }
  }, [confirmation]);

  const removeSchedule = (sched) => {
    setSelectedSchedule(sched);
    setShowConfirmBox(true);
  };

  const closeConfirmBox = () => {
    setShowConfirmBox(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
        marginBottom: "4rem",
      }}
    >
      <ConfirmBox
        open={showConfirmBox}
        close={closeConfirmBox}
        confirm={setConfirmation}
        schedule={selectedSchedule}
      />
      {schedulesForSelectedLab.length === 0 ? (
        <Typography mt={2}>Não há reservas para este dia =)</Typography>
      ) : (
        <Grid
          container
          spacing={1}
          pr={1}
          mt={2}
          alignItems={"center"}
          justifyContent="center"
          sx={{
            width: { xs: "90vw", md: "55vw", lg: "40vw" },
            borderBottom: "1px solid #777",
          }}
        >
          <Grid item xs={6}>
            <Typography fontWeight={600}>Solicitante</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography textAlign={"right"} fontWeight={600}>
              Horário
            </Typography>
          </Grid>
          <Grid xs={2} item>
            <Typography textAlign={"right"} fontWeight={600}>
              Ações
            </Typography>
          </Grid>
        </Grid>
      )}
      {schedulesForSelectedLab.map((schedule, index) => {
        const splittedName = schedule.user.name.split(" ");
        const username =
          splittedName[0] + " " + splittedName[splittedName.length - 1];
        return (
          <Grid
            container
            key={index}
            spacing={1}
            pr={1}
            alignItems={"center"}
            justifyContent="center"
            sx={{
              width: { xs: "90vw", md: "55vw", lg: "40vw" },
              borderTop: "1px solid #777",

              "&:last-child": {
                borderBottom: "1px solid #777",
              },

              "&:hover": {
                backgroundColor: "#efefef",
                // boxShadow: '5px 5px 5px #dcdcdc'
              },
            }}
          >
            <Grid item xs={6}>
              <ListItem dense sx={{ pl: 0 }}>
                <ListItemText
                  primary={username}
                  secondary={schedule.user.email}
                />
              </ListItem>
            </Grid>
            <Grid item xs={4}>
              <Typography textAlign={"right"} fontSize={14} fontWeight={400}>
                {schedule.start < 10 ? "0" + schedule.start : schedule.start}h -{" "}
                {schedule.end < 10 ? "0" + schedule.end : schedule.end}h
              </Typography>
            </Grid>
            <Grid xs={2} item>
              {user.email === schedule.user.email ? (
                <Typography textAlign={"right"} fontSize={14} fontWeight={400}>
                  <IconButton onClick={() => removeSchedule(schedule)}>
                    <DeleteForeverIcon color="error" />
                  </IconButton>
                </Typography>
              ) : (
                <></>
              )}
            </Grid>
          </Grid>
        );
      })}
    </Box>
  );
}
