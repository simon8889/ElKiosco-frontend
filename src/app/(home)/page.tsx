import { cookies } from "next/headers";

export default async function Page() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value;
  let session = null;

  try {
    session = sessionCookie ? JSON.parse(sessionCookie) : null;
  } catch (error) {
    console.error("Error parsing session cookie:", error);
  }

  return <div>{session?.username || "No hay usuario"}</div>;
}
