import Property from "@/components/merchant/property";
import { TParams } from "@/components/types";

const MerchantProperty = ({ params: { id } }: TParams) => {
  return (
    <>
      <Property id={id} />
    </>
  );
};

export default MerchantProperty;
