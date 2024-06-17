import "mapbox-gl/dist/mapbox-gl.css";
import Map, { GeolocateControl, Marker, Popup } from "react-map-gl";
import { useTheme } from "next-themes";
import { TProperty } from "../types";
import { getCenter } from "geolib";
import { useState } from "react";
import Button from "../ui/button";
import PropertyDetail from "../merchant/properties/property";
import Carousel from "../ui/carousel";
import { X } from "lucide-react";

const MapWithData = ({ data }: { data: TProperty[] }) => {
  const [selected, setSelected] = useState({ latitude: "", longitude: "" });
  const { theme } = useTheme();
  const coordinates = data.map((field) => ({
    longitude: parseFloat(field.longitude),
    latitude: parseFloat(field.latitude),
  }));
  let center = getCenter(coordinates);
  if (!center) {
    center = {
      latitude: 13.0827,
      longitude: 80.2707,
    };
  }
  return (
    <>
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAP_KEY}
        initialViewState={{
          longitude: center.longitude,
          latitude: center.latitude,
          zoom: 7,
        }}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: ".5rem",
        }}
        mapStyle={
          theme === "dark"
            ? "mapbox://styles/mapbox/dark-v11"
            : "mapbox://styles/mapbox/streets-v11"
        }
      >
        {data.map((field) => (
          <div key={field.id}>
            <Marker
              latitude={parseFloat(field.latitude)}
              longitude={parseFloat(field.longitude)}
            >
              <Button
                onClick={() => {
                  setSelected(field);
                }}
              >
                {field.name}
              </Button>
            </Marker>
            {selected.latitude === field.latitude && (
              <Popup
                closeButton={false}
                closeOnClick={false}
                latitude={parseFloat(field.latitude)}
                longitude={parseFloat(field.longitude)}
              >
                <div className="relative bg-background text-foreground px-2 py-2 rounded-lg ">
                  <Button
                    size="btn-icon"
                    className="absolute rounded-full -top-4 -right-4"
                    onClick={() => {
                      setSelected({ latitude: "", longitude: "" });
                    }}
                  >
                    <X />
                  </Button>
                  {field.photos.length>0 && <Carousel
                      photo={field.photos}
                      play
                      className="min-w-44 min-h-56  max-h-56"
                    />}
                  

                  <div className=" ">
                    <PropertyDetail field={field} link="/f" />
                  </div>
                </div>
              </Popup>
            )}
          </div>
        ))}
      </Map>
    </>
  );
};

export default MapWithData;

// {
//   selected && selected.latitude === field.latitude ? (
//     <>
//       <Popup
//         closeButton={false}
//         className="bg-red-500 absolute z-50"
//         latitude={parseFloat(selected.latitude)}
//         longitude={parseFloat(selected.longitude)}
//       >
//         <div className="bg-background text-foreground  absolute z-50">
//           <PropertyDetail field={field} />
//         </div>
//       </Popup>
//     </>
//   ) : (
//     <>
//       <p className="z-50 absolute">jjk</p>
//     </>
//   );
// }

//  {
//    selected.latitude === field.latitude ? (
//      <Popup
//        latitude={parseFloat(selected.latitude)}
//        longitude={parseFloat(selected.longitude)}
//      >
//        <div className="absolute top-0 z-50">
//          <PropertyDetail field={field} />
//        </div>
//      </Popup>
//    ) : (
//      <>
//        <p className="z-50">no</p>
//      </>
//    );
//  }
