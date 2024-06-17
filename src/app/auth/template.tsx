import { TChildren } from "@/components/types";

const AuthTemplate = ({ children }: TChildren) => {
  return <div className="w-11/12 max-w-lg mx-auto space-y-6">{children}</div>;
};

export default AuthTemplate;
