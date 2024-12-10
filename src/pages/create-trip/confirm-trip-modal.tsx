import { User, X } from "lucide-react"
import type { FormEvent } from "react"
import { Button } from "../../components/button"

interface ConfirmTripModalProps {
  closeConfirmTripModal: () => void
  createTrip: (event: FormEvent<HTMLFormElement>) => void
  setOwnerName: (name: string) => void
  setOwnerEmail: (email: string) => void

}

export function ConfirmTripModal({
  closeConfirmTripModal,
  createTrip,
  setOwnerName,
  setOwnerEmail,
}: ConfirmTripModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Confirmar criação de viagem</h2>
            <button type="button" onClick={closeConfirmTripModal}>
              <X className="size-5 text-zinc-400" />
            </button>
          </div>
          <p className="textsm text-zinc-400">
            Para concluir a criação da viagem, preencha seus dados abaixo.
          </p>
        </div>

        <form onSubmit={createTrip} className="space-y-3">
          <div className='h-14 px-4 bg-zinc-950 border-zinc-800 rounded-lg flex items-center gap-2'>
            <User className='text-zinc-400 size-5' />
            <input
              name="name"
              placeholder="Seu nome completo"
              className="flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none "
              onChange={event => setOwnerName(event.target.value)}
            />
          </div>

          <div className='h-14 px-4 bg-zinc-950 border-zinc-800 rounded-lg flex items-center gap-2'>
            <User className='text-zinc-400 size-5' />
            <input type="email"
              name="email"
              placeholder="Seu e-mail pessoal"
              className="flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none "
              onChange={event => setOwnerEmail(event.target.value)}
            />
          </div>
          <Button type='submit' variant="primary" size="full">
            Confirmar criação da viagem
          </Button>
        </form>

      </div>
    </div>
  )
}