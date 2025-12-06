import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { styles } from '../../constants/styles';
import { navLinks } from '../../constants';
import { logo, closeIcon, menuDot } from '../../assets';
import { config } from '../../constants/config';

const Navbar = () => {
  const [active, setActive] = useState<string | null>();
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
        setActive('');
      }
    };

    window.addEventListener('scroll', handleScroll);

    const navbarHighlighter = () => {
      const sections = document.querySelectorAll('section[id]');

      sections.forEach(current => {
        const sectionId = current.getAttribute('id');
        // @ts-ignore
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.getBoundingClientRect().top - sectionHeight * 0.2;

        if (sectionTop < 0 && sectionTop + sectionHeight > 0) {
          setActive(sectionId);
        }
      });
    };

    window.addEventListener('scroll', navbarHighlighter);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', navbarHighlighter);
    };
  }, []);
  const downloadResume = () => {
    const link = document.createElement('a');
    link.href = '/Jahid_Khan_Resume.pdf'; // file inside public folder
    link.download = 'Jahid-Khan-Resume.pdf'; // filename for download
    link.click();
  };
  return (
    <nav
      className={`${styles.paddingX} fixed top-0 z-20 flex w-full items-center py-1 ${
        scrolled ? 'bg-primary' : 'bg-transparent'
      }`}
    >
      {/* bg-gradient-to-r from-[#090b3c] via-[#01021d] to-[#050ba0] */}
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          <img src={logo} alt="logo" className="h-[5.5rem] w-[5.5rem] object-contain" />
          <p className="flex cursor-pointer text-[18px] font-bold text-white ">
            {config.html.title}
          </p>
        </Link>

        <ul className="hidden list-none flex-row gap-10 sm:flex">
          {navLinks.map(nav => (
            <li
              key={nav.id}
              className={`${
                active === nav.id ? 'text-white' : 'text-secondary'
              } cursor-pointer text-[18px] font-medium hover:text-white`}
            >
              <a href={`#${nav.id}`}>{nav.title}</a>
            </li>
          ))}
          {/* <button className="bg-gray-400 flex-row item-center gap-3 p-2 rounded-md" onClick={downloadResume}>
            Download CV{' '}📄
          </button> */}
          <button
            onClick={downloadResume}
            className="
      group inline-flex items-center gap-2
      rounded-full bg-gradient-to-r from-sky-500 via-[#2241dd] to-[#050ba0]
      px-4 py-2 text-sm font-semibold text-white
      shadow-lg shadow-sky-500/40
      transition-all duration-300
      hover:-translate-y-0.5 hover:shadow-xl
      hover:from-indigo-400 hover:via-sky-400 hover:to-emerald-300
      focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-primary
    "
          >
            <span className="uppercase tracking-wide text-xs sm:text-sm">Download CV</span>

            <span
              className="
        inline-flex h-7 w-7 items-center justify-center
        rounded-full bg-white/20 backdrop-blur
        animate-pulse group-hover:animate-none
      "
            >
              <span className="text-base">📄</span>
            </span>
          </button>
        </ul>
        <div className="flex flex-1 items-center justify-end sm:hidden">
          <img
            src={toggle ? closeIcon : menuDot}
            alt="menu"
            className="h-[2rem] w-[2rem] object-contain bg-gray-400 p-2 rounded-full"
            onClick={() => setToggle(!toggle)}
          />

          <div
            className={`${
              !toggle ? 'hidden' : 'flex'
            } black-gradient absolute right-0 top-20 z-10 mx-4 my-2 min-w-[140px] rounded-xl p-6`}
          >
            <ul className="flex flex-1 list-none flex-col items-start justify-end gap-4">
              {navLinks.map(nav => (
                <li
                  key={nav.id}
                  className={`font-poppins cursor-pointer text-[16px] font-medium ${
                    active === nav.id ? 'text-white' : 'text-secondary'
                  }`}
                  onClick={() => {
                    setToggle(!toggle);
                  }}
                >
                  <a href={`#${nav.id}`}>{nav.title}</a>
                </li>
              ))}
              {/* <button className="bg-white-100">
                Download CV{' '}📄
              </button> */}
              {/* Download CV button - MOBILE */}
              <button
                onClick={() => {
                  setToggle(false);
                  downloadResume();
                }}
                className="
        group mt-2 w-full
        inline-flex items-center justify-center gap-2
        rounded-full bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400
        px-4 py-2 text-sm font-semibold text-white
        shadow-md shadow-sky-500/40
        transition-all duration-300
        active:scale-95
      "
              >
                <span className="uppercase tracking-wide text-xs">Download CV</span>
                <span
                  className="
          inline-flex h-6 w-6 items-center justify-center
          rounded-full bg-white/20 backdrop-blur
          animate-pulse group-hover:animate-none
        "
                >
                  <span className="text-sm">📄</span>
                </span>
              </button>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
