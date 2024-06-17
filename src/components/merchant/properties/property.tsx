import Link from "next/link";
import { TProperty } from "../../types";

type TProps = {
  field: TProperty;
  link?: string;
};
const PropertyDetail = ({ field, link }: TProps) => {
  return (
    <>
      {link ? (
        <Link className="link" href={link}>
          {field.name}
        </Link>
      ) : (
        <p>{field.name}</p>
      )}

      <div className="flex space-x-2 text-sm">
        <p>{field.city},</p>
        <p>{field.state}</p>
      </div>
    </>
  );
};

export default PropertyDetail;
