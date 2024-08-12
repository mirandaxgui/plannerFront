import { CheckCircle2, CircleDashed, UserCog, X } from "lucide-react";
import { Button } from "../../components/button";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";
import { CreateGuestsModal } from "./create-guests-modal";

interface Participant {
  id: string
  name: string | null
  email: string
  isConfirmed: boolean
}

export function Guests() {
  const { tripId } = useParams()
  const [participants, setParticipants] = useState<Participant[]>([])
  const [isCreateGuestsModalOpen, setIsCreateGuestsModalOpen] = useState(false)

  function openCreateGuestsModal() {
    setIsCreateGuestsModalOpen(true)
  }

  function closeCreateGuestsModal() {
    setIsCreateGuestsModalOpen(false)
  }


  useEffect(() => {
    api.get(`trips/${tripId}/participants`).then(response => setParticipants(response.data))
  }, [tripId])
    
  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Convidados</h2>

      <Button onClick={openCreateGuestsModal} variant="secondary" size="full">
        <UserCog className="size-5" />
        Adicionar convidados
      </Button>

      {isCreateGuestsModalOpen && (
        < CreateGuestsModal closeCreateGuestsModal={closeCreateGuestsModal} />
      )}
      <div className="space-y-5">
        {participants.map((participant, index) => {
          return (
            <div key={participant.id} className="flex items-center justify-between">
              <div className="space-y-1.5">
                <span className="flex gap-2 font-medium text-zinc-100">{participant.name ?? `Convidado ${index + 1}`}
                  {participant.isConfirmed ? (
                    <CheckCircle2 className="size-5 shrink-0 text-green-400" />
                  ) : (
                    <CircleDashed className="text-zinc-400 size-5 shrink-0" />
                  )}
                  {participant.isConfirmed ? (
                    ""
                  ) : (
                    <button className='rounded-lg bg-lime-300 text-lime-950 hover:bg-lime-400 font-medium px-1' onClick={() => api.post(`participants/${participant.id}/confirm`, {
                      name: "Gui Miranda"
                     },    
                 ).then(response => {console.log("Participante confirmado: ", response.data);
                   api.get(`trips/${tripId}/participants`).then(response => setParticipants(response.data));
                 })
                 }>Confirmar</button>
                  )}
                </span>
                <span className="block text-sm text-zinc-400 truncate">
                  {participant.email}
                </span>
              </div>         
              <button onClick={() => api.delete(`participants/${participant.id}`
              ).then(response => {console.log('Participante removido: ', response.data);
                setParticipants(participants.filter(p => p.id !== participant.id));
              })
              }>
                < X className="size-5 text-zinc-400" />
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}