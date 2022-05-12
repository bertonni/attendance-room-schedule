import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@mui/material";
import { forwardRef } from "react";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { useSchedule } from "../contexts/ScheduleContext";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function ConfirmBox({ open, close, confirm, schedule }) {
  const { removeReservation, error, setError } = useSchedule();

  if (Object.keys(schedule).length === 0) return null;

  const handleCancel = () => {
    confirm(false);
    close();
  };

  const handleConfirm = () => {
    removeReservation(schedule);
    // if (error !== "")
    confirm(true);
    close();
  };

  if (error !== "") {
    console.log('error while remove schedule');
    setError("");
  }

  const formattedDate = (date) => {
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  }

  return (
    <Dialog
      // maxWidth="xs"
      TransitionComponent={Transition}
      open={open}
      onClose={() => close()}
      PaperProps={{
        sx: {
          alignSelf: "self-start",
        },
      }}
    >
      <DialogTitle sx={{ fontSize: "1.45rem" }}>
        Remover Agendamento
      </DialogTitle>
      <DialogContent>
        <DialogContentText textAlign={"justify"}>
          Você tem certeza que deseja remover este agendamento?
        </DialogContentText>
        <DialogContentText fontWeight={600}>
          {formattedDate(schedule.date)} -{" "}
          {schedule.start < 10 ? "0" + schedule.start : schedule.start}h às{" "}
          {schedule.end < 10 ? "0" + schedule.end : schedule.end}h
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ px: 0, pb: 2, mx: 2 }}>
        <Button
          color="error"
          variant="contained"
          onClick={handleCancel}
          endIcon={<CloseIcon />}
        >
          Não
        </Button>
        <Button
          color="success"
          variant="contained"
          onClick={handleConfirm}
          endIcon={<CheckIcon />}
        >
          Sim
        </Button>
      </DialogActions>
    </Dialog>
  );
}
