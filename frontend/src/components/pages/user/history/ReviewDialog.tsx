import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { LoadingButton } from "@mui/lab";
import { Box, FormHelperText, FormLabel, Rating } from "@mui/material";
import FormikInput from "../../../form/FormikInput";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type IProps = {
  open: boolean;
  setOpen: any;
  formik: any;
  loading: boolean;
};

const ReviewDialog: React.FC<IProps> = ({ open, setOpen, formik, loading }) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => setOpen(false)}
    >
      <DialogTitle sx={{ pb: 1 }}>Review</DialogTitle>
      <DialogContent>
        <Box>
          <FormLabel
            sx={{ display: "block" }}
            error={formik.touched.stars && Boolean(formik.errors.stars)}
          >
            Stars
          </FormLabel>
          <Rating
            name="stars"
            value={formik.values.stars}
            onChange={(event: any, newValue: any) => {
              formik.setFieldValue("stars", newValue);
            }}
          />
          {formik.touched.stars && Boolean(formik.errors.stars) && (
            <FormHelperText error>{formik.errors.stars}</FormHelperText>
          )}
        </Box>
        <FormikInput
          sx={{ mt: 1 }}
          rows={5}
          formik={formik}
          name="comment"
          label="Comment"
        />
      </DialogContent>
      <DialogActions sx={{ display: "flex", justifyContent: "flex-end" }}>
        <LoadingButton
          loading={loading}
          onClick={formik.handleSubmit}
          variant="contained"
        >
          Submit
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default ReviewDialog;
