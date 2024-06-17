import Image from "next/image";
import { TPropertyPhoto } from "../../types";

const PropertyPhotos = ({ field }: { field: TPropertyPhoto }) => {
  return (
    <>
      <Image
        key={field.id}
        src={field.photo}
        alt={`property image ${field.id}`}
        priority
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius:'.7rem'
        }}
        width={720}
        height={1080}
      />
    </>
  );
};

export default PropertyPhotos;
// import { TPropertyPhoto } from "../../types";

// const PropertyPhotos = ({ field }: { field: TPropertyPhoto }) => {
//   return (
//     <>
//       <img
//         key={field.id}
//         src={field.photo}
//         alt=""
//         className="w-full h-full object-cover"
//       />
//     </>
//   );
// };

// export default PropertyPhotos;