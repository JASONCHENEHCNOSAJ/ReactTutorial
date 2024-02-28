import Image from "next/image";
import AddPost from "./components/AddPost";

export default function Home() {
  return (
    <main>
      <h1 className=""> Hello World!</h1>
      <AddPost />
    </main>
  );
}
