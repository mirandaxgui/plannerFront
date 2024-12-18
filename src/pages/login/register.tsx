
import "react-day-picker/dist/style.css";
import { Button } from "../../components/button";
import { Mail, Lock, User } from "lucide-react";
import { api } from "../../lib/axios";
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";



export function RegisterStep() {
  const navigate = useNavigate()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
  async function RegisterParticipant(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    
    
    await api.post('/participant/register', {
      name,
      email,
      password
    })


    navigate(`/login`)
  }
return (
  <div className="h-screen flex items-center justify-center bg-pattern bg-center">
    <div className="max-w-3xl w-full px-6 py-6 text-center space-y-10 rounded-xl shadow-shape">
      <div className='flex flex-col items-center gap-3'>
        <img src="/logo.svg" alt="plann.er" />
        <h1 className="text-zinc-300 text-lg">Acesse a plataforma</h1>
        <p className="text-zinc-300 text-lg">Registre-se para conseguir realizar o gerenciamento de suas viagens!</p>
      </div>

      <form onSubmit={RegisterParticipant} className="h-72 px-4 py-4 flex flex-col items-center gap-3 ">
        <div className="w-full  mb-4 ">
          <label htmlFor="Nome Completo" className="block text-sm align text-zinc-400 text-left my-1">Nome Completo</label>
          <div className="flex items-center bg-zinc-800 rounded-md p-2">
            <User className="text-zinc-400 mr-2" />
            <input
              type="text"
              name="nome"
              placeholder="Digite seu nome completo"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
              onChange={event => setName(event.target.value)}
            />
          </div>
        </div>

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
        
        <Button variant='secondary'>Registre-se</Button>
      </form> 

      <p className="text-lg text-zinc-500 font-medium pt-12">
        Registre-se para obter acesso aos recursos do <span className="text-zinc-300 underline">plann.er</span> </p>
    </div>

  </div>
)
}
