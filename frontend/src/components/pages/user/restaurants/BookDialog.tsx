import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Box, TextField } from "@mui/material";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type IProps = {
  handleBook: any;
  open: boolean;
  setOpen: any;
  date: any;
  setDate: any;
};

const BookDialog: React.FC<IProps> = ({
  open,
  setOpen,
  handleBook,
  date,
  setDate,
}) => {
  const [loading, setLoading] = useState(false);

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => setOpen(false)}
    >
      <DialogTitle>Book a table</DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 1 }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              onChange={(date: any) => setDate(date)}
              value={date}
              disablePast
              renderInput={({ inputProps, inputRef, InputProps }: any) => (
                <TextField
                  {...inputProps}
                  ref={inputRef}
                  fullWidth
                  label="Pick a time"
                  InputProps={{
                    endAdornment: InputProps?.endAdornment,
                  }}
                />
              )}
            />
          </LocalizationProvider>
        </Box>
      </DialogContent>
      <DialogActions sx={{ display: "flex", justifyContent: "flex-end" }}>
        <LoadingButton
          loading={loading}
          onClick={() => handleBook(setLoading)}
          variant="contained"
        >
          Book
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default BookDialog;
