import { motion } from 'framer-motion';

import { styles } from '../../constants/styles';
import { config } from '../../constants/config';
import InfiniteCarousel from '../layout/Carousel';
import TechCard3D from './TechCard3D';
import {
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
} from '../../assets';
const techs = [
  {
    id: 'react-native',
    icon: redux,
    title: 'React Native',
    desc: 'Build cross-platform mobile apps using JavaScript and React.',
    color: '#61DAFB',
    link: '/rn',
  },
  {
    id: 'react',
    icon: reactjs,
    title: 'React',
    desc: 'A JavaScript library for building modern and interactive UIs.',
    color: '#61DAFB',
    link: '/react',
  },
  {
    id: 'mongodb',
    icon: mongodb,
    title: 'MongoDB',
    desc: 'A NoSQL document database designed for scalability and flexibility.',
    color: '#47A248',
    link: '/mongo',
  },
  {
    id: 'node',
    icon: nodejs,
    title: 'Node.js',
    desc: 'A high-performance JavaScript runtime for server-side applications.',
    color: '#539E43',
    link: '/node',
  },
  {
    id: 'typescript',
    icon: typescript,
    title: 'TypeScript',
    desc: 'A strongly typed superset of JavaScript for building scalable applications.',
    color: '#3178C6',
    link: '/typescript',
  },
  {
    id: 'express',
    icon: nodejs,
    title: 'Express.js',
    desc: 'A minimal and flexible Node.js web framework for server APIs.',
    color: '#000000',
    link: '/express',
  },
  {
    id: 'javascript',
    icon: javascript,
    title: 'JavaScript',
    desc: 'The programming language of the web used for dynamic functionality.',
    color: '#F7DF1E',
    link: '/javascript',
  },
  {
    id: 'html',
    icon: html,
    title: 'HTML5',
    desc: 'The standard markup language for building web page structures.',
    color: '#E34F26',
    link: '/html',
  },
  {
    id: 'css',
    icon: css,
    title: 'CSS3',
    desc: 'A stylesheet language used to design beautiful and responsive layouts.',
    color: '#1572B6',
    link: '/css',
  },
  {
    id: 'tailwind',
    icon: tailwind,
    title: 'Tailwind CSS',
    desc: 'A utility-first CSS framework for rapid and modern UI development.',
    color: '#38BDF8',
    link: '/tailwind',
  },
  {
    id: 'git',
    icon: git,
    title: 'Git',
    desc: 'A distributed version control system for tracking code changes.',
    color: '#F05032',
    link: '/git',
  },
];

const Hero = () => {
  return (
    <section className="relative mx-auto h-screen w-full overflow-hidden">
      <div
        className={` inset-0 mt-[120px] mx-auto max-w-7xl ${styles.paddingX} flex flex-row items-start gap-5`}
      >
        <div className="mt-5 flex flex-col items-center justify-center">
          <div className="h-5 w-5 rounded-full bg-[#8d09f4]" />
          <div className="violet-gradient h-40 w-1 sm:h-80" />
        </div>

        <div>
          <h1 className={`${styles.heroHeadText} text-white`}>
            Hi, I'm <span className="text-[#8d09f4]">{config.hero.name}</span>
          </h1>
          <p className={`${styles.heroSubText} text-white-100 mt-2`}>
            {config.hero.p[0]} <br className="hidden sm:block" />
            {config.hero.p[1]}
          </p>
        </div>
      </div>

      <div className="object-cover -z-10 overflow-hidden">
        <InfiniteCarousel
          items={techs.map(t => (
            <div key={t.id} className="w-[20rem]">
              <TechCard3D tech={t} />
            </div>
          ))}
          duration={20}
        />
      </div>
      <div className="xs:bottom-10  mt-8 flex w-full items-center justify-center">
        <a href="#about">
          <div className="border-secondary flex h-[64px] w-[35px] items-start justify-center rounded-3xl border-4 p-2">
            <motion.div
              animate={{ y: [0, 24, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: 'loop' }}
              className="bg-secondary mb-1 h-3 w-3 rounded-full"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
