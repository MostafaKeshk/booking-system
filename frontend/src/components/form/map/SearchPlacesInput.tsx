import {
  Autocomplete,
  TextField,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from "@mui/material";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

type IProps = {
  setCenter: any;
  setZoom: any;
  onSelect: any;
  sx?: any;
};

const SearchPlacesInput: React.FC<IProps> = ({
  setCenter,
  setZoom,
  onSelect,
  sx = {},
}) => {
  const {
    ready,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (address: any) => {
    clearSuggestions();
    const results = await getGeocode({ address: address.description });

    const { lat, lng } = await getLatLng(results[0]);
    setCenter({ lat, lng });
    setValue("");
    onSelect(lat, lng, address.description);
    setZoom(10);
  };

  const classes = {
    input: {
      "&:after": {
        position: "absolute",
        content: `""`,
        top: "50%",
        transform: "translateY(-50%)",
        right: 15,
        width: "0",
        height: "0",
        borderLeft: "7.5px solid transparent",
        borderRight: "7.5px solid transparent",
        borderTop: `7.5px solid #616160`,
      },
    },
  };

  return (
    <Autocomplete
      sx={sx}
      getOptionLabel={(option: any) => option.description}
      options={data}
      disableClearable
      freeSolo
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          placeholder="Search..."
          fullWidth
          sx={classes.input}
          disabled={!ready}
          onChange={(event: any) => setValue(event.target.value)}
        />
      )}
      renderOption={() => {
        return (
          <>
            {status === "OK" &&
              data.map(({ description }: any, index: any) => (
                <ListItemButton
                  onClick={() => handleSelect(data[index])}
                  key={index}
                >
                  <ListItemIcon>
                    <LocationOnIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary={description} />
                </ListItemButton>
              ))}
          </>
        );
      }}
    />
  );
};

export default SearchPlacesInput;
