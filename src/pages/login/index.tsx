import { useState, type FormEvent } from 'react'
import { Button } from '../../components/button'
import { Lock, Mail } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { api } from '../../lib/axios'


export function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  async function AuthParticipant(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    
    
    await api.post('/participant/auth', {
      email,
      password,
    })


    navigate(`/trips/`)
  }
  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <div className='flex flex-col items-center gap-3'>
          <img src="/logo.svg" alt="plann.er" />
          <h1 className="text-zinc-300 text-lg">Acesse a plataforma</h1>
          <p className="text-zinc-300 text-lg">Faça login para conseguir realizar o gerenciamento de suas viagens!</p>
        </div>

        <form onSubmit={AuthParticipant} className=" px-4 py-4 flex flex-col items-center shadow-shape gap-3 rounded-xl">
          <div className="w-full  mb-4 ">
            <label htmlFor="email" className="block text-sm align text-zinc-400 text-left my-1">Email</label>
            <div className="flex items-center bg-zinc-800 rounded-md p-2">
              <Mail className="text-zinc-400 mr-2" />
              <input
                type="text"
                name="email"
                placeholder="Digite seu email"
                className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
                onChange={event => setEmail(event.target.value)}
              />
            </div>
          </div>

          <div className="w-full  mb-4">
            <label htmlFor="senha" className="block text-sm text-zinc-400 text-left my-1">Senha</label>
            <div className="flex items-center bg-zinc-800 rounded-md p-2">
              <Lock className="text-zinc-400 mr-2" />
              <input
                type="password"
                name="senha"
                placeholder="Digite sua senha"
                className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
                onChange={event => setPassword(event.target.value)}
              />
            </div>
          </div>
          <Button variant='secondary'size='full'>Entrar</Button>
        </form>

        <p className="text-lg text-zinc-500 font-medium py-12">
          Ainda não tem uma conta? <a className="text-zinc-300 underline" href="http://localhost:5173/participant/register">Inscreva-se</a> </p>
      </div>

    </div>
  )

}



