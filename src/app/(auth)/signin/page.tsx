import { Metadata } from 'next'

import UserForm from 'app/components/UserForm/UserForm'

export const metadata: Metadata = {
  title: 'El Kiosco - Registrate',
}

const page = () => (
  <div>
    <UserForm isLogin={false} />
  </div>
)

export default page
