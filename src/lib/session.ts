"use server"
import { cookies } from "next/headers"
import { redirect } from 'next/navigation'

const cookie = {
	name: "session",
	duration: 24 * 60 * 60 * 1000
}

export const createSession = async (token: string, username: string) => {
	const session = { token, username }
	const expiresAt = new Date(Date.now() + cookie.duration)
	const cookieStore = await cookies();

	cookieStore.set(cookie.name, JSON.stringify(session), {
		secure: true,
		expires: expiresAt,
		sameSite: 'lax',
		path: '/',
	})
}

export const verifySession = async () => {
	const cookieStore = await cookies();
	const sessionCookie = cookieStore.get(cookie.name)?.value;
	
	if (!sessionCookie) {
		redirect("/login")
	}
	
	const session = JSON.parse(sessionCookie);
	if (!(session.token && session.username)){
		redirect("login")
	}
	
	return session.username;
};

export const deleteSession = async () => {
	const cookieStore = await cookies()
	cookieStore.delete('session')
	redirect("/login")
}