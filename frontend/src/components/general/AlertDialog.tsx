import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { Box, CircularProgress, Typography, useTheme } from "@mui/material";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type IProps = {
  open: any;
  handleClose: any;
  onAgree: any;
  agreeText: any;
  disagreeText: any;
  loading?: boolean;
  description?: any;
  title?: any;
};

const AlertDialog: React.FC<IProps> = ({
  open,
  handleClose,
  onAgree,
  agreeText,
  disagreeText,
  loading = false,
  description = "",
  title,
}) => {
  const theme = useTheme();

  const classes = {
    dark: {
      "& .MuiDialog-paper": {
        overflowY: "initial",
        width: "75%",
        minWidth: "250px",
        pb: 1,
      },
    },

    disagreeStatus: {
      background: theme.palette.background.default,
      "&:hover": {
        background: theme.palette.background.default,
      },
      color: "primary.main",
    },

    container: {
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
    },
    inner: {
      width: "80%",
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      alignItems: "center",
      minWidth: "250px",
    },
    description: {
      fontWeight: "700",
      mb: 2,
    },
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      sx={classes.dark}
    >
      <DialogTitle sx={{ px: 2, pt: 2, pb: 1 }}>{title || ""}</DialogTitle>
      {description && (
        <DialogContent sx={{ pb: 0, overflowY: "initial" }}>
          <Box sx={classes.container}>
            <Box sx={classes.inner}>
              <Typography sx={classes.description} component="h6">
                {description}
              </Typography>
            </Box>
          </Box>
        </DialogContent>
      )}

      <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          onClick={handleClose}
          sx={classes.disagreeStatus}
        >
          {disagreeText}
        </Button>
        <Button variant="contained" onClick={onAgree} disabled={loading}>
          {loading ? <CircularProgress size={25} /> : agreeText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertDialog;
