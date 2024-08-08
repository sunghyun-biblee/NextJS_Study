import Navigation from "../../components/navigation";
import { Avatar } from "./components/Avatar";

export default function page() {
  return (
    <div>
      <Navigation></Navigation>
      <h1>
        About Us <Avatar />
      </h1>
    </div>
  );
}
