// import Tilt from "react-parallax-tilt";
// import { motion } from "framer-motion";

// import { github } from "../../assets";
// import { SectionWrapper } from "../../hoc";
// import { projects } from "../../constants";
// import { fadeIn } from "../../utils/motion";
// import { config } from "../../constants/config";
// import { Header } from "../atoms/Header";
// import { TProject } from "../../types";

// const ProjectCard: React.FC<{ index: number } & TProject> = ({
//   index,
//   name,
//   description,
//   tags,
//   image,
//   sourceCodeLink,
// }) => {
//   return (
//     <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
//       <Tilt
//         glareEnable
//         tiltEnable
//         tiltMaxAngleX={30}
//         tiltMaxAngleY={30}
//         glareColor="#aaa6c3"
//       >
//         <div className="bg-tertiary w-full rounded-2xl p-5 sm:w-[300px]">
//           <div className="relative h-[230px] w-full">
//             <img
//               src={image}
//               alt={name}
//               className="h-full w-full rounded-2xl object-cover"
//             />
//             <div className="card-img_hover absolute inset-0 m-3 flex justify-end">
//               <div
//                 onClick={() => window.open(sourceCodeLink, "_blank")}
//                 className="black-gradient flex h-10 w-10 cursor-pointer items-center justify-center rounded-full"
//               >
//                 <img
//                   src={github}
//                   alt="github"
//                   className="h-1/2 w-1/2 object-contain"
//                 />
//               </div>
//             </div>
//           </div>
//           <div className="mt-5">
//             <h3 className="text-[24px] font-bold text-white">{name}</h3>
//             <p className="text-secondary mt-2 text-[14px]">{description}</p>
//           </div>
//           <div className="mt-4 flex flex-wrap gap-2">
//             {tags.map((tag) => (
//               <p key={tag.name} className={`text-[12px] ${tag.color}`}>
//                 #{tag.name}
//               </p>
//             ))}
//           </div>
//         </div>
//       </Tilt>
//     </motion.div>
//   );
// };

// const Works = () => {
//   return (
//     <>
//       <Header useMotion={true} {...config.sections.works} />

//       <div className="flex w-full">
//         <motion.p
//           variants={fadeIn("", "", 0.1, 1)}
//           className="text-secondary mt-3 max-w-3xl text-[17px] leading-[30px]"
//         >
//           {config.sections.works.content}
//         </motion.p>
//       </div>

//       <div className="mt-20 flex flex-wrap gap-7">
//         {projects.map((project, index) => (
//           <ProjectCard key={`project-${index}`} index={index} {...project} />
//         ))}
//       </div>
//     </>
//   );
// };

// export default SectionWrapper(Works, "");

import React, { useEffect, useRef, useState } from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

import { playstore } from "../../assets";
import { SectionWrapper } from "../../hoc";
import { projects } from "../../constants";
import { fadeIn } from "../../utils/motion";
import { config } from "../../constants/config";
import { Header } from "../atoms/Header";
import { TProject } from "../../types";

const ProjectCard: React.FC<{ index: number } & TProject> = ({
  index,
  name,
  description,
  tags,
  image,
  sourceCodeLink,
}) => {
  const descRef = useRef<HTMLParagraphElement | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [showToggle, setShowToggle] = useState(false);
  const [measured, setMeasured] = useState(false); // used to avoid flicker

  useEffect(() => {
    if (!descRef.current) return;

    const el = descRef.current;
    const computed = window.getComputedStyle(el);

    // try to get a usable line-height; fallback to font-size * 1.2
    let lineHeight = parseFloat(computed.lineHeight);
    if (!lineHeight || Number.isNaN(lineHeight)) {
      const fontSize = parseFloat(computed.fontSize) || 16;
      lineHeight = fontSize * 1.2;
    }

    // scrollHeight gives full content height. Divide by lineHeight to estimate line count.
    const lines = Math.round(el.scrollHeight / lineHeight);

    setShowToggle(lines > 3);
    setMeasured(true);
    // we only need to measure once (description text won't change in this card)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // clamp style for 3 lines using -webkit-line-clamp
  const clampStyle: React.CSSProperties = {
    display: "-webkit-box",
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  };

  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
      <Tilt
        glareEnable
        tiltEnable
        tiltMaxAngleX={30}
        tiltMaxAngleY={30}
        glareColor="#aaa6c3"
      >
        <div className="bg-tertiary w-full rounded-2xl p-2 sm:w-[300px]">
          <div className="relative h-[230px] w-full">
            <img
              src={image}
              alt={name}
              className="h-full w-full rounded-2xl "
            />
            <div className="card-img_hover absolute inset-0 m-3 flex justify-end">
              <div
                onClick={() => window.open(sourceCodeLink, "_blank")}
                className="black-gradient flex h-10 w-10 cursor-pointer items-center justify-center rounded-full"
              >
                <img
                  src={playstore}
                  alt="playstore"
                  className="h-6 w-6 object-contain"
                />
              </div>
            </div>
          </div>

          <div className="mt-5">
            <h3 className="text-[24px] font-bold text-white">{name}</h3>

            {/* Description: hide until measured to prevent flicker */}
            <p
              ref={descRef}
              // If measured and not expanded and toggle needed -> clamp
              style={{
                ...(measured && !expanded && showToggle ? clampStyle : {}),
                // hide until measured so we don't flash full text then clamp
                visibility: measured ? "visible" : "hidden",
              }}
              className="text-secondary mt-2 text-[14px] leading-[22px]"
            >
              {description}
            </p>

            {/* Toggle button (only show if measured and there are >3 lines) */}
            {measured && showToggle && (
              <button
                onClick={() => setExpanded((s) => !s)}
                className="mt-2 text-sm font-medium underline underline-offset-2 text-white/80"
                aria-expanded={expanded}
              >
                {expanded ? "Read less" : "Read more"}
              </button>
            )}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <p key={tag.name} className={`text-[12px] ${tag.color}`}>
                #{tag.name}
              </p>
            ))}
          </div>
        </div>
      </Tilt>
    </motion.div>
  );
};

const Works = () => {
  return (
    <>
      <Header useMotion={true} {...config.sections.works} />

      <div className="flex w-full">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="text-secondary mt-3 max-w-3xl text-[17px] leading-[30px]"
        >
          {config.sections.works.content}
        </motion.p>
      </div>

      <div className="mt-20 flex flex-wrap gap-7">
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Works, "");
