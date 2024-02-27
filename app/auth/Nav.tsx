// Doing server side authentification

import Link from "next/link";
import Login from "./Login";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

export default async function Nav() {
  const sessionInfo = await getServerSession(authOptions);
  console.log(sessionInfo);
  return (
    // client component here
    <nav className="flex justify-between items-center py-8">
      <Link href={"/"}>
        <h1 className="font-bold text-lg"> Send it. </h1>
      </Link>
      <ul className="flex items-center gap-6">
        {!sessionInfo?.user && <Login />}
        {sessionInfo?.user && <h1> {sessionInfo.user.name}</h1>}
      </ul>
    </nav>
  );
}
