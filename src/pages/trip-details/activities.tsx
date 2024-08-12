import { CircleCheck, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";

interface Activity {
  date: string;
  activities: {
    id: string;
    title: string;
    occurs_at: string;
  }[];
}

export function Activities() {
  const { tripId } = useParams();
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    api.get(`trips/${tripId}/activities`).then(response => {
      const groupedActivities = response.data.reduce((acc: Record<string, Activity>, activity: { id: string; title: string; occurs_at: string; }) => {
        const date = activity.occurs_at.split('T')[0]; // Extrair a parte da data

        if (!acc[date]) {
          acc[date] = { date, activities: [] };
        }

        acc[date].activities.push({
          id: activity.id,
          title: activity.title,
          occurs_at: activity.occurs_at,
        });

        return acc;
      }, {});

      const result: Activity[] = Object.values(groupedActivities);
      setActivities(result);
    }).catch(error => {
      console.error('Error fetching activities:', error);
    });
  }, [tripId]);

  return (
    <div className="space-y-8">
      {activities.map(activity => {
        return (
          <div key={activity.date} className="space-y-2.5">
            <div className="flex gap-2 items-baseline">
              <span className="text-xl text-zinc-300 font-semibold">Dia {format(parseISO(activity.date), 'd')}</span>
              <span className="text-xs text-zinc-500">{format(parseISO(activity.date), 'EEEE', { locale: ptBR })}</span>
            </div>
            {activity.activities.length === 0 ? (
              <p className="text-zinc-500 text-sm">Nenhuma atividade cadastrada nesta data.</p>
            ) : (
              activity.activities.map(act => (
                <div key={act.id} className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
                  <CircleCheck className="size-5 text-lime-300" />
                  <span className="text-zinc-100">{act.title}</span>
                  <span className="text-zinc-400 text-sm ml-auto">{format(parseISO(act.occurs_at), 'HH:mm')}h</span>
                  <button onClick={() => api.delete(`trips/${tripId}/activities/${act.id}`)
                    .then(response => {
                      console.log('Atividade removida: ', response.data);
                      setActivities(prevActivities =>
                        prevActivities.map(activityGroup => ({
                          ...activityGroup,
                          activities: activityGroup.activities.filter(activity => activity.id !== act.id)
                        })).filter(activityGroup => activityGroup.activities.length > 0)
                      );
                    })
                  }>
                    <X className="size-5 text-zinc-400" />
                  </button>

                </div>
              ))
            )}
          </div>
        );
      })}
    </div>
  );
}
