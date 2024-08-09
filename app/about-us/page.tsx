import Navigation from "../../components/navigation";
import { Avatar } from "./components/Avatar";

export const metadata = {
  title: "About-us",
};
export default function page() {
  return (
    <div>
      <h1>
        About Us <Avatar />
      </h1>
    </div>
  );
}
