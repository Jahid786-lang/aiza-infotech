// import { motion } from "framer-motion";

import { styles } from "../constants/styles";

// interface Props {
//   Component: React.ElementType;
//   idName: string;
// }

// const SectionWrapper = (
//   Component: Props["Component"],
//   idName: Props["idName"]
// ) =>
//   function HOC() {
//     return (
//       <motion.section
//         initial="hidden"
//         whileInView="show"
//         viewport={{ once: true, amount: 0.25 }}
//         className={`${styles.padding} relative z-0 mx-auto max-w-7xl`}
//         id={idName}
//       >
//         <span className="hash-span">&nbsp;</span>

//         <Component />
//       </motion.section>
//     );
//   };

// export default SectionWrapper;

import React, { ComponentType } from "react";
import { motion } from "motion/react";

const SectionWrapper = <P extends object>(
  Component: ComponentType<P>,
  idName: string
) => {
  const HOC: React.FC<P> = (props) => (
    <motion.section id={idName}
     initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className={`${styles.padding} relative z-0 mx-auto max-w-7xl`}
    >
      {/* saare props aage forward karo */}
      <Component {...props} />
    </motion.section>
  );

  return HOC;
};

export default SectionWrapper;