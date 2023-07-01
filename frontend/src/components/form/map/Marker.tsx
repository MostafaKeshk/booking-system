import { Marker as GoogleMarker, InfoWindow } from "@react-google-maps/api";
import { useState } from "react";

type IProps = {
  position: any;
  icon: any;
  info: any;
  draggable?: boolean;
  handleMarker?: any;
  InfoComponent?: any;
};

const Marker: React.FC<IProps> = ({
  position,
  icon,
  info,
  draggable = false,
  handleMarker = () => {},
  InfoComponent,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <GoogleMarker
      position={position}
      icon={icon}
      onMouseOver={() => {
        setOpen(true);
      }}
      onMouseOut={() => {
        setOpen(false);
      }}
      draggable={draggable}
      onDragEnd={handleMarker}
    >
      {info && open && (
        <InfoWindow>
          <InfoComponent info={info} />
        </InfoWindow>
      )}
    </GoogleMarker>
  );
};

export default Marker;
