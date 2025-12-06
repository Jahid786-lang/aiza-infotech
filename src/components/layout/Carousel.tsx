export default function InfiniteCarousel({
  items = [],
  duration = 18, // seconds for a full cycle
  className = '',
  itemClassName = '',
}: {
  items: React.ReactNode[];
  duration?: number;
  className?: string;
  itemClassName?: string;
}) {
  // If there's 0 or 1 item just render them without animation
  if (!items || items.length === 0) return null;

  // We'll duplicate the items so the animation can loop seamlessly.
  const slides = [...items];

  // Inline style for the CSS animation duration so it can be dynamic.
  const trackStyle = {
    animationDuration: `${duration}s`,
  };

  return (
    <div
      className={`w-[full] overflow-hidden relative ${className}`}
      aria-roledescription="carousel"
    >
      {/* Visually hidden label for screen readers */}
      <span className="sr-only">Infinite carousel — autoplaying content</span>

      {/* The animated track */}
      <div className="flex whitespace-nowrap will-change-transform" style={trackStyle}>
        {/* We wrap the track in a container that applies animation via a nested div */}
        <div className="flex items-center animate-marquee hover:pause-marquee" style={trackStyle}>
          {slides.map((child, idx) => (
            <div
              key={idx}
              className={`flex-shrink-0 mx-3 ${itemClassName}`}
              role="group"
              aria-roledescription="slide"
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* Inline styles for the marquee keyframes. Tailwind doesn't ship user's
          custom keyframes automatically, so we include small style block here.
          If you prefer, move these keyframes to your global CSS or tailwind
          config as a custom animation. */}
      <style>{`
        /* marquee animation: move left by 50% (the duplicated set) */
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* Utility class to start the animation */
        .animate-marquee {
          display: flex;
          animation-name: marquee;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }

        /* Pause on hover using Tailwind's hover: variant won't affect inline keyframes,
           so we add a small helper class that Tailwind can toggle on hover */
        .pause-marquee:hover, .pause-marquee:focus {
          animation-play-state: paused;
        }

        /* Provide an accessible pause class for the outer container */
        .hover\\:pause-marquee:hover {
          animation-play-state: paused;
        }

        /* Ensures the duplicated content fits exactly half width so translateX(-50%) works.
           This relies on the duplicated content being identical in length. */
        .animate-marquee > * {
          /* nothing needed here — keeping default sizing so flex children sit inline */
        }

        /* Small responsive tweak: reduce gap on small screens */
        @media (max-width: 640px) {
          .animate-marquee > * {
            margin-left: 0.5rem;
            margin-right: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
}
