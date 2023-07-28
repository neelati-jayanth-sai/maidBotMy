import * as Icons from "lucide-react";
import { FC } from "react";

interface IconProps extends Icons.LucideProps {
  name: keyof typeof Icons.icons;
}
<Icons.Camera />;
export const Icon: FC<IconProps> = (props) => {
  const { name, ...rest } = props;
  const Comp = Icons.icons[name];
  return <Comp {...rest} />;
};
