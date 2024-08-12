import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import { useState, type FormEvent } from "react";
import { Calendar, MapPin, X } from "lucide-react";
import { Button } from "../../components/button";
import { DayPicker, DateRange } from "react-day-picker";
import { format } from "date-fns";
import "react-day-picker/dist/style.css";

interface UpdateTripModalProps {
  closeUpdateTripModal: () => void;
  eventStartAndEndDates: DateRange | undefined;
  setEventStartAndEndDates: (dates: DateRange | undefined) => void;
}

export function UpdateTripModal({
  closeUpdateTripModal,
  setEventStartAndEndDates,
  eventStartAndEndDates,
}: UpdateTripModalProps) {
  const { tripId } = useParams();
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  function openDatePicker() {
    setIsDatePickerOpen(true);
  }

  function closeDatePicker() {
    setIsDatePickerOpen(false);
  }

  async function updateTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const destination = data.get("destination")?.toString();
    const starts_at = eventStartAndEndDates?.from?.toISOString(); // Converte a data para ISO
    const ends_at = eventStartAndEndDates?.to?.toISOString(); // Converte a data para ISO

    if (!destination) {
      return
    }

    if(!eventStartAndEndDates?.from || !eventStartAndEndDates.to) {
      return
    }
    
    try {
      await api.put(`/trips/${tripId}`, {
        destination,
        starts_at,
        ends_at,
      });
      window.document.location.reload();
    } catch (error) {
      console.error("Error updating trip:", error);
    }
  }

  const displayedDate =
    eventStartAndEndDates?.from && eventStartAndEndDates?.to
      ? format(eventStartAndEndDates.from, "d' de 'LLL").concat(" até ").concat(format(eventStartAndEndDates.to, "d' de 'LLL"))
      : null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Alterar Viagem</h2>
            <button type="button" onClick={closeUpdateTripModal}>
              <X className="size-5 text-zinc-400" />
            </button>
          </div>
          <p className="textsm text-zinc-400">
            Altere o destino e a data da sua viagem.
          </p>
        </div>

        <form onSubmit={updateTrip} className="space-y-3">
          <div className="h-14 px-4 bg-zinc-950 border-zinc-800 rounded-lg flex items-center gap-2">
            <MapPin className="text-zinc-400 size-5" />
            <input
              name="destination"
              placeholder="Para onde irá"
              className="flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none"
            />
          </div>

          <div className="h-14 px-4 bg-zinc-950 border-zinc-800 rounded-lg flex items-center gap-2">
          <button type="button" onClick={openDatePicker} className="flex items-center gap-2 text-left w-[240px]">
            <Calendar className="size=5 text-zinc-400" />
            <span className="flex-1 text-lg text-zinc-400 w-40">
              {displayedDate || "Quando"}
            </span>
          </button>
          </div>
          {isDatePickerOpen && (
            <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
              <div className="rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Selecione a data</h2>
                    <button type="button" onClick={closeDatePicker}>
                      <X className="size-5 text-zinc-400" />
                    </button>
                  </div>
                </div>
                <DayPicker
                  mode="range"
                  selected={eventStartAndEndDates}
                  onSelect={setEventStartAndEndDates}
                />
              </div>
            </div>
          )}

          <Button variant="primary" size="full">
            Alterar Viagem
          </Button>
        </form>
      </div>
    </div>
  );
}