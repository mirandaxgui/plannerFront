import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import type { FormEvent } from "react";
import { AtSign, UserRoundPlus, X } from "lucide-react";
import { Button } from "../../components/button";

interface CreateGuestsModalProps {
  closeCreateGuestsModal: () => void
}

export function CreateGuestsModal({
  closeCreateGuestsModal
}: CreateGuestsModalProps) {
  const { tripId } = useParams()

  async function CreateGuests(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)

    const name = data.get('name')?.toString()
    const email = data.get('email')?.toString()

    await api.post(`/trips/${tripId}/invite`, {
      name,
      email,
    })

    window.document.location.reload()
  }
  return (
    <div className="inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold">Convidar um novo participante</h2>
            <button type="button" onClick={closeCreateGuestsModal}> 
              <X className="size-5 text-zinc-400" />
            </button>
          </div>
          <p className="text-sm text-zinc-400">
            Adicione participantes a sua viagem.
          </p>
        </div>

        <form onSubmit={CreateGuests} className="space-y-3">
          <div className='h-14 px-4 bg-zinc-950 border-zinc-800 rounded-lg flex items-center gap-2'>
            <UserRoundPlus className='text-zinc-400 size-5' />
            <input
              name="title"
              placeholder="Insira o nome do convidado"
              className="flex-1 bg-transparent text-base placeholder-zinc-400 outline-none "
            />
          </div>

          <div className='h-14 flex-1 px-4 bg-zinc-950 border-zinc-800 rounded-lg flex items-center gap-2'>
            <AtSign className='text-zinc-400 size-5' />
            <input
              type="email"
              name="email"
              placeholder="Insira o email do convidado"
              className=" bg-transparent text-base placeholder-zinc-400 outline-none flex-1"
            />
          </div>

          <Button variant="primary" size="full">
            Adicionar convidado
          </Button>
        </form>
        
      </div>
    </div>
  )
}