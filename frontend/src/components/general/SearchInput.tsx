import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import { TextField } from "@mui/material";
import { useTheme } from "@emotion/react";

type IProps = {
  searchValue: string;
  handleSearch: any;
  fullWidth?: boolean;
  placeholder?: string;
};

const SearchInput: React.FC<IProps> = ({
  searchValue,
  handleSearch,
  fullWidth = false,
  placeholder = "Search...",
}) => {
  const theme: any = useTheme();
  console.log(theme);
  return (
    <TextField
      sx={{ backgroundColor: theme.palette.background.paper }}
      size="small"
      fullWidth={fullWidth}
      variant="outlined"
      value={searchValue}
      placeholder={placeholder}
      onChange={(e: any) => handleSearch(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchInput;
