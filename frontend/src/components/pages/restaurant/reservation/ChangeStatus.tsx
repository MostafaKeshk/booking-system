import { FormControl, InputLabel, Select, MenuItem, Chip } from "@mui/material";
import { reservationStatus } from "../../../../utils/constants";

type IProps = {
  onChange: any;
  selectedStatus: string;
  label: string;
};

const ChangeStatus: React.FC<IProps> = ({
  onChange,
  selectedStatus,
  label,
}) => {
  if (selectedStatus === reservationStatus.cancelled)
    return <Chip label="Cancelled" color="error" />;

  if (selectedStatus === reservationStatus.done)
    return <Chip label="Done" color="success" />;

  return (
    <FormControl sx={{ minWidth: "150px" }} size="small">
      <InputLabel>{label}</InputLabel>
      <Select label={label} onChange={onChange} value={selectedStatus}>
        {/* adding <></> for 2 items in select will make them as 1 child and wont render at start if it has the value. */}

        {selectedStatus !== reservationStatus.accepted && (
          <MenuItem value={reservationStatus.cancelled}>Cancel</MenuItem>
        )}
        {selectedStatus !== reservationStatus.accepted && (
          <MenuItem value={reservationStatus.pending}>Pending</MenuItem>
        )}
        <MenuItem value={reservationStatus.accepted}>Accept</MenuItem>

        {selectedStatus === reservationStatus.accepted && (
          <MenuItem value={reservationStatus.done}>Done</MenuItem>
        )}
      </Select>
    </FormControl>
  );
};

export default ChangeStatus;
