import { TPropertyField } from "../../types";
import { z } from "zod";

export const PropertyField: TPropertyField[] = [
  { name: "city", type: "text", label: "City" },
  { name: "state", type: "text", label: "State" },
  { name: "longitude", type: "text", label: "Longitude" },
  { name: "latitude", type: "text", label: "Latitude" },
];

export const propertyRegex = /^(?=.*[a-zA-Z])[a-zA-Z0-9_.\- ]{4,30}$/;

export const propertySchema = z.object({
  name: z.string().regex(propertyRegex, {
    message: "Name must contain only alphabetic characters",
  }),
  city: z.string(),
  state: z.string(),
  latitude: z.number(),
  longitude: z.number(),
});
