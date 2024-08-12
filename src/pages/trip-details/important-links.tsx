import { Link2, Plus, X } from "lucide-react";
import { Button } from "../../components/button";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";
import { CreateLinkModal } from "./create-link-modal";

interface Link {
  id: string
  title: string
  url: string
}

export function ImportantLinks() {
  const { tripId } = useParams()
  const [links, setLinks] = useState<Link[]>([])
  const [isCreateLinkModalOpen, setIsCreateLinkModalOpen] = useState(false)

  function openCreateLinkModal() {
    setIsCreateLinkModalOpen(true)
  }

  function closeCreateLinkModal() {
    setIsCreateLinkModalOpen(false)
  }

  useEffect(() => {
    api.get(`trips/${tripId}/links`).then(response => setLinks(response.data))
  }, [tripId])

  return (
    <div className="space-y-3">
      <h2 className="font-semibold text-xl">Links importantes</h2>
      <div className="space-y-5 flex-row">
        <div className="flex-row items-center justify-between gap-4">
          {links.map((link, index) => {
            return (
              <div key={link.title} className="space-y-1.5 py-1 flex-row justify-between">
                <div className="flex justify-between">
                  <span className="block font-medium text-zinc-100">{link.title ?? `Link ${index}`}</span>
                  <button onClick={() => api.delete(`trips/${tripId}/links/${link.id}`
                  ).then(response => {
                    console.log('Link removido!');
                    setLinks(links.filter(p => p.id !== link.id));
                  })
                  }>
                    < X className="size-5 text-zinc-400" />
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <a href="#" className="block text-xs text-zinc-400 truncate hover:text-zinc-200">
                    {link.url}
                  </a>
                  <Link2 className="text-zinc-400 size-5 shrink-0" />
                </div>
              </div>
            )
          })
          }
        </div>

      </div>
      <Button onClick={openCreateLinkModal} variant="secondary" size="full">
        <Plus className="size-5" />
        Adicionar novo link
      </Button>

      {isCreateLinkModalOpen && (
        < CreateLinkModal closeCreateLinkModal={closeCreateLinkModal} />
      )}
    </div>
  )
}
