import { CalendarBlank, Clock, CheckCircle, XCircle } from "@phosphor-icons/react/dist/ssr";
import SessionKPICard from "../../../components/reusable/cards/SessionKPICard";

export type SessionFilter = "All" | "Upcoming" | "Completed" | "Cancelled";

interface PTSessionsCardsProps {
  activeFilter: SessionFilter;
  onFilterChange: (filter: SessionFilter) => void;
  stats: {
    total: number;
    upcoming: number;
    completed: number;
    cancelled: number;
  };
}

export default function PTSessionsCards({ activeFilter, onFilterChange, stats }: PTSessionsCardsProps) {
  const cards = [
    {
      id: "All" as SessionFilter,
      title: "Today's Sessions",
      value: stats.total,
      subtitle: "All scheduled",
      icon: <CalendarBlank size={24} weight="regular" />,
      accentColor: "#8B5CF6",
      iconBgColor: "#1A142E",
      iconBorderColor: "#3B2B68",
      iconColor: "#A78BFA",
    },
    {
      id: "Upcoming" as SessionFilter,
      title: "Upcoming",
      value: stats.upcoming,
      subtitle: "Yet to start",
      icon: <Clock size={24} weight="regular" />,
      accentColor: "#F59E0B",
      iconBgColor: "#221A11",
      iconBorderColor: "#483313",
      iconColor: "#F59E0B",
    },
    {
      id: "Completed" as SessionFilter,
      title: "Completed",
      value: stats.completed,
      subtitle: "Sessions done",
      icon: <CheckCircle size={24} weight="regular" />,
      accentColor: "#10B981",
      iconBgColor: "#0E221B",
      iconBorderColor: "#184435",
      iconColor: "#10B981",
    },
    {
      id: "Cancelled" as SessionFilter,
      title: "Cancelled",
      value: stats.cancelled,
      subtitle: "Not happening",
      icon: <XCircle size={24} weight="regular" />,
      accentColor: "#EF4444",
      iconBgColor: "#261214",
      iconBorderColor: "#481C1C",
      iconColor: "#EF4444",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      {cards.map((card) => (
        <SessionKPICard
          key={card.id}
          title={card.title}
          value={card.value}
          subtitle={card.subtitle}
          icon={card.icon}
          accentColor={card.accentColor}
          iconBgColor={card.iconBgColor}
          iconBorderColor={card.iconBorderColor}
          iconColor={card.iconColor}
          isActive={activeFilter === card.id}
          onClick={() => onFilterChange(card.id)}
        />
      ))}
    </div>
  );
}
