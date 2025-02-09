import { Metadata } from 'next'

import UserForm from 'app/components/UserForm/UserForm'

export const metadata: Metadata = {
  title: 'El Kiosco - Inicia sesión',
}

const page = () => (
  <div>
    <UserForm isLogin/>
  </div>
)

export default page
