import Properties from "@/components/merchant/properties";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "properties",
};

const MerchantProperties = () => {
  return (
    <>
      <Properties />
    </>
  );
};

export default MerchantProperties;
