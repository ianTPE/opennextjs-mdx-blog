import { IconType } from "react-icons";

interface TechStackIconProps {
  name: string;
  version: string;
  icon: IconType;
  color: string;
}

export default function TechStackIcon({
  name,
  version,
  icon: Icon,
  color,
}: TechStackIconProps) {
  return (
    <div className="group relative p-6 bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300 hover:scale-105">
      {/* Icon Container */}
      <div
        className={`w-16 h-16 ${color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
      >
        <Icon className="w-8 h-8 text-white" />
      </div>

      {/* Content */}
      <div>
        <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">
          {name}
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">{version}</p>
      </div>
    </div>
  );
}
