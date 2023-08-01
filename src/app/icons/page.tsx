import { Icon } from "@/components/ui/icon";
import { icons } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-wrap">
      {Object.keys(icons).map((key: any, index) => (
        <div className=" m-4 p-4 rounded-full" key={index}>
          <Icon name={key} />
        </div>
      ))}
    </div>
  );
}
