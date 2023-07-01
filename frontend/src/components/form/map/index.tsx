import { Box } from "@mui/material";
import { Circle, GoogleMap, useLoadScript } from "@react-google-maps/api";

import Loading from "../../general/Loading";
import Marker from "./Marker";
import SearchPlacesInput from "./SearchPlacesInput";

type googleType = { googleMapsApiKey: any };

type IProps = {
  center: any;
  zoom: any;
  markers: any[];
  setCenter?: any;
  setZoom?: any;
  draggable?: boolean;
  handleMarker?: any;
  handleSearch?: any;
  InfoComponent?: any;
  sx?: any;
};
const libraries = ["places"];

const FormikMap: React.FC<IProps> = ({
  center,
  zoom,
  markers,
  setCenter,
  setZoom,
  draggable = true,
  handleMarker,
  handleSearch,
  InfoComponent,
  sx,
}) => {
  const { isLoaded } = useLoadScript({
    id: "google-map-script",
    googleMapsApiKey: `${process.env.REACT_APP_GOOGLE_TOKEN}`,
    libraries,
  } as googleType);

  return (
    <>
      {!isLoaded ? (
        <Loading />
      ) : (
        <>
          {handleSearch && setZoom && setCenter && (
            <SearchPlacesInput
              setCenter={setCenter}
              setZoom={setZoom}
              onSelect={handleSearch}
              sx={{ mb: 2 }}
            />
          )}
          <Box sx={{ height: "400px" }}>
            <GoogleMap
              zoom={zoom}
              center={center}
              mapContainerClassName="map-container"
              onClick={handleMarker}
            >
              {markers.map((marker: any, index: any) => (
                <Box key={index}>
                  <Marker
                    position={marker.pos}
                    icon={marker.icon}
                    info={marker.info}
                    draggable={draggable}
                    handleMarker={handleMarker}
                    InfoComponent={InfoComponent}
                  />
                  <Circle center={marker.pos} />
                </Box>
              ))}
            </GoogleMap>
          </Box>
        </>
      )}
    </>
  );
};

export default FormikMap;
