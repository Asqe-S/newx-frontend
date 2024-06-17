import "mapbox-gl/dist/mapbox-gl.css";
import Map, { GeolocateControl, Marker } from "react-map-gl";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { useTheme } from "next-themes";

type Tprops = { lng: number; lat: number };

const AddPropertyMap = ({ setValue, watch }: { setValue: any; watch: any }) => {
  const { theme } = useTheme();
  const { mutate, isPending } = useMutation({
    mutationFn: async ({ lng, lat }: Tprops) => {
      const { data } = await axios.get(
        `https://api.geoapify.com/v1/geocode/reverse?lat= ${lat}&lon=${lng}&apiKey=${process.env.NEXT_PUBLIC_REVERSE_KEY}`
      );
      return data;
    },
    onSuccess: ({ features }) => {
      const { city, state, lat, lon } = features[0].properties;
      if (state && city) {
        setValue("city", city);
        setValue("state", state);
        setValue("latitude", lat);
        setValue("longitude", lon);
      } else {
        toast.error("Please selecct the proper location");
      }
    },
  });
  return (
    <>
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAP_KEY}
        initialViewState={{
          longitude: watch("longitude"),
          latitude: watch("latitude"),
          zoom: 15,
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
        {!isPending && (
          <>
            <GeolocateControl
              onGeolocate={(e) => {
                const { latitude, longitude } = e.coords;
                mutate({ lng: longitude, lat: latitude });
              }}
            />
            <Marker
              draggable
              onDragEnd={(e) => {
                const { lng, lat } = e.lngLat;
                mutate({ lng, lat });
              }}
              latitude={watch("latitude")}
              longitude={watch("longitude")}
            />
          </>
        )}
      </Map>
    </>
  );
};

export default AddPropertyMap;
