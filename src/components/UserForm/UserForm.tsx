"use client"
import Image from 'next/image'
import { useActionState, useEffect, useMemo } from 'react'
import { loginAction, signinAction } from './actions'
import { redirect } from 'next/navigation'

const UserForm = ({ isLogin }: { isLogin: boolean }) => {

  const texts = useMemo(() => ({
    main: isLogin
      ? '¡Bienvenido de vuelta al Kiosco!'
      : '¡Estás a un paso de entrar al Kiosco!',
    button: isLogin ? 'Iniciar sesión' : 'Registrarse',
    alternativeText: isLogin ? '¿Aún no tienes cuenta?' : '¿Ya tienes cuenta?',
    textLink: isLogin ? 'Crea una cuenta ahora!' : 'Inicia sesión aquí!',
    link: isLogin ? '/signin' : '/login',
    imageLink: isLogin
      ? 'https://www.iue.edu.co/wp-content/uploads/2022/11/Fondo-teams-2-04-scaled.jpg'
      : 'https://www.iue.edu.co/wp-content/uploads/2022/11/Fondo-teams-2-01-scaled.jpg'
  }), [isLogin])

  const actionFunction = useMemo(() => (isLogin ? loginAction : signinAction), [isLogin]);
  const initialState = { message: "", success: false };
  const [state, formAction, isPending] = useActionState(actionFunction, initialState)

  useEffect(() => {
    if (state.success) {
      redirect("/")
    }
  }, [state])

  return (
    <div className={`flex font-sans min-h-screen ${isLogin ? 'flex-row-reverse' : ''}`}>
      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image
            alt="IUE Logo"
            src="https://www.iue.edu.co/wp-content/uploads/2023/08/logo-iue-envigado.svg"
            width={170}
            height={170}
            className="mx-auto"
          />
          <h2 className="mt-4 font-serif text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            {texts.main}
          </h2>
        </div>

        <div className="mt-3 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action={formAction} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                Nombre de usuario
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                  Contraseña
                </label>
              </div>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
              {state.message && <p className='text-xs font-semibold text-left p-1 text-error-color'>{state.message}</p> }
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {isPending ? <span className="loading loading-dots loading-xs"></span> : texts.button}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            {texts.alternativeText}{' '}
            <a href={texts.link} className="font-semibold text-primary hover:opacity-80">
              {texts.textLink}
            </a>
          </p>
        </div>
      </div>

      <div className="hidden lg:flex lg:flex-1 relative w-full h-screen">
        <Image
          alt="IUE fondo"
          src={texts.imageLink}
          fill
          className="object-cover"
          priority
        />
      </div>
    </div >
  )
}

export default UserForm
