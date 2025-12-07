import { experiences } from "../../constants";
import { SectionWrapper } from "../../hoc";
import { Header } from "../atoms/Header";
import { config } from "../../constants/config";
import { motion } from "framer-motion";

function fadeInVariant(delay:number) {
  return {
    hidden: { opacity: 0, y: 80 },
    visible: { opacity: 1, y: 0, transition: { delay, duration: .6, type: "spring" as const } },
  };
}

const ExperienceCard = ({ exp, idx }: { exp: any; idx: number }) => (
  <motion.div
    variants={fadeInVariant(idx * 0.15)}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.3 }}
    className="relative mx-auto mb-12 w-full max-w-xl rounded-xl bg-gradient-to-b from-indigo-900/80 to-purple-900/80 shadow-2xl p-7 flex flex-col border-l-4 border-indigo-500"
  >
    <span className="absolute -left-6 top-8 flex h-12 w-12 items-center justify-center rounded-full border-4 border-indigo-500 bg-white shadow-md">
      <img src={exp.icon} alt={exp.companyName} className="object-contain h-8 w-8"/>
    </span>
    <div className="ml-8">
      <h3 className="text-lg md:text-xl font-bold text-indigo-100">{exp.title}</h3>
      <div className="text-base text-indigo-300 font-semibold mb-1">{exp.companyName}</div>
      <div className="text-sm text-indigo-400 mb-4 italic">{exp.date}</div>
      <ul className="text-indigo-100 pl-4 list-disc space-y-1">
        {exp.points.map((point:string, i:number) => (
          <li key={i}>{point}</li>
        ))}
      </ul>
    </div>
  </motion.div>
);

const Experience = () => (
  <>
    <Header useMotion={true} {...config.sections.experience} />
    <div className="mt-10 w-full flex flex-col items-center">
      <div
       className="w-full flex flex-row gap-8"
      >
        {experiences.map((exp, idx) => <ExperienceCard exp={exp} idx={idx} key={idx} />)}
      </div>
    </div>
  </>
);

export default SectionWrapper(Experience, "work");
