import React from 'react';

// 1. Define the Interface based on your data structure
interface TechItem {
  id: string;
  icon: string; // Assuming image URL or imported asset path
  title: string;
  desc: string;
  color: string;
  link: string;
}

// 2. The Reusable Card Component
const TechCard: React.FC<{ tech: TechItem }> = ({ tech }) => {
  return (
    <a
      href={tech.link}
      className="group relative flex flex-col justify-between overflow-hidden rounded-xl bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-slate-900 border border-slate-100 dark:border-slate-800"
    >
      {/* Dynamic Colored Border/Glow on Hover */}
      <div
        className="absolute top-0 left-0 h-1 w-full transition-all duration-300 group-hover:h-1.5"
        style={{ backgroundColor: tech.color }}
      />

      {/* Icon and Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="gap-6 flex items-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-50 dark:bg-slate-800 p-2 ">
            {/* Render the icon (assuming it's an image path) */}
            <img
              src={tech.icon}
              alt={`${tech.title} icon`}
              className="h-full w-full object-contain"
            />
          </div>
          <h3 className="mb-2 text-lg font-bold text-white dark:text-white">{tech.title}</h3>
        </div>
      </div>

      {/* Content */}
      <div className="flex-0 ">
        <p className="text-sm text-white dark:text-white  text-wrap ">{tech.desc}</p>
      </div>

      {/* Subtle background glow based on brand color */}
      <div
        className="absolute -right-6 -bottom-6 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-10"
        style={{ backgroundColor: tech.color }}
      />
    </a>
  );
};

export default TechCard;
