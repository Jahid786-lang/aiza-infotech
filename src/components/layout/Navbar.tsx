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
      setScrolled(scrollTop > 100);
      if (scrollTop <= 100) setActive('');
    };
    window.addEventListener('scroll', handleScroll);
    const navbarHighlighter = () => {
      const sections = document.querySelectorAll('section[id]');
      sections.forEach(current => {
        const sectionId = current.getAttribute('id');
        // @ts-ignore
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.getBoundingClientRect().top - sectionHeight * 0.2;
        if (sectionTop < 0 && sectionTop + sectionHeight > 0) setActive(sectionId);
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
    link.href = '/Jahid_Khan_Resume.pdf';
    link.download = 'Jahid-Khan-Resume.pdf';
    link.click();
  };
  return (
    <nav
      className={`${styles.paddingX} fixed top-0 z-20 flex w-full justify-center items-center ${
        scrolled ? 'bg-[#01032d]' : 'bg-transparent'
      }`}
    >
      {/* bg-gradient-to-r from-[#090b3c] via-[#01021d] to-[#050ba0] */}
      <div className="mx-auto flex w-full  items-center justify-between">
        <Link to="/" className="flex items-center gap-2" onClick={() => window.scrollTo(0, 0)}>
          <img src={logo} alt="logo" className="h-22 w-22 object-contain" />
          <p className="flex cursor-pointer text-[18px] font-bold text-white ">
            {config.html.title}
          </p>
        </Link>
        <ul className="hidden list-none flex-row gap-8 sm:flex pr-2.5">
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
          <button
            onClick={downloadResume}
            className="group inline-flex items-center gap-2 rounded-full bg-linear-to-r from-sky-500 via-[#2241dd] to-[#050ba0] px-3 py-1 text-sm font-semibold text-white shadow-lg shadow-sky-500/40 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:from-indigo-400 hover:via-sky-400 hover:to-emerald-300 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-primary"
          >
            <span className="uppercase tracking-wide text-xs sm:text-sm">Download CV</span>

            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/20 backdrop-blur animate-pulse group-hover:animate-none">
              <span className="text-base">📄</span>
            </span>
          </button>
        </ul>
        <div className="flex flex-1 items-center justify-end sm:hidden">
          <div className="h-6 w-6 rounded-full bg-gray-400 flex items-center justify-center">
            <img
              src={toggle ? closeIcon : menuDot}
              alt="menu"
              className="h-[1.2rem] w-[1.2rem] object-contain self-center p-1"
              onClick={() => setToggle(!toggle)}
            />
          </div>
          <div
            className={`${
              !toggle ? 'hidden' : 'flex'
            } bg-indigo-950/95 absolute right-5 top-14 z-10 mx-4 my-2 min-w-[140px] rounded-xl p-6`}
          >
            <ul className="flex flex-1 list-none flex-col items-start justify-end gap-4">
              {navLinks.map(nav => (
                <li
                  key={nav.id}
                  className={`font-poppins cursor-pointer text-[16px] font-medium ${
                    active === nav.id ? 'text-white' : 'text-secondary'
                  }`}
                  onClick={() => setToggle(!toggle)}
                >
                  <a href={`#${nav.id}`}>{nav.title}</a>
                </li>
              ))}
              {/* Download CV button - MOBILE */}
              <button
                onClick={() => {
                  setToggle(false);
                  downloadResume();
                }}
                className="
        group mt-2 w-full
        inline-flex items-center justify-center gap-2
        rounded-full bg-linear-to-r from-indigo-500 via-sky-500 to-emerald-400
        px-2 py-1 text-sm font-semibold text-white
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
