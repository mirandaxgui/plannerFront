import { useState, type FormEvent } from 'react';
import { Button } from '../../components/button';
import { Lock, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../lib/axios';
import Cookies from 'js-cookie';

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  async function AuthParticipant(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      // Envia a requisição de autenticação para o backend
      await api.post('/participant/auth', {
        email,
        password,
        isConfirmed: true,
      });

      // Depois que a requisição for bem-sucedida, o token estará no cookie.
      const token = Cookies.get('token'); // Captura o token diretamente do cookie

      if (token) {
        // Armazenar o token no cookie (se necessário, embora já esteja no cookie)
        Cookies.set('token', token, { expires: 1 }); // Exemplo de expiração (1 dia)
        
        // Redireciona para a tela de viagens
        navigate('/trips/');
      } else {
        setError('Token não encontrado no cookie.');
      }
    } catch (error) {
      setError('Credenciais incorretas. Tente novamente.');
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <div className='flex flex-col items-center gap-3'>
          <img src={`${import.meta.env.BASE_URL}assets/logo-DNBcyZYp.svg`} alt="plann.er" />
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
          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
          <Button variant='secondary' size='full'>Entrar</Button>
        </form>

        <p className="text-lg text-zinc-500 font-medium py-12">
          Ainda não tem uma conta? <a className="text-zinc-300 underline" href="https://planner-front-gold.vercel.app/participant/register">Inscreva-se</a> </p>
      </div>
    </div>
  );
}
