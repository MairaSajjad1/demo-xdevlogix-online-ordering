import { authOptions } from "@/lib/auth";
import Login from "@/views/login";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/dashboard");
  }
  return <Login />;
};

export default page;
