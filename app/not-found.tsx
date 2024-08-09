import { Metadata } from "next";
import Navigation from "./../components/navigation";
export const metadata: Metadata = {
  title: "Not found",
};

export default function Notfound() {
  return (
    <div>
      <h1>Not Found!</h1>
    </div>
  );
}
