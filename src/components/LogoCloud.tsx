const LOGOS = [
  { src: "/media/elpazio-logo.png", name: "Elpazio", scale: 1.6 },
  { src: "/media/kadtech-logo.png", name: "Kadtech Solutions" },
  { src: "/media/space-spectrum-logo.png", name: "Space Spectrum" },
  { src: "/media/hubconnect-logo.png", name: "Hub Connect" },
  { src: "/media/geycci-logo.png", name: "Geycci Beauty & Spa" },
  { src: "/media/goodland-logo.png", name: "Goodland Xclusive" },
  { src: "/media/alabastore-logo.png", name: "AlabaStore" },
  { src: "/media/clients/blo-logo.png", name: "Black Lives Online TV" },
  { src: "/media/clients/zenit-chapel-logo.png", name: "Zenit Chapel International" },
  { src: "/media/clients/danbridge-logo.png", name: "Danbridge Global Resources" },
  { src: "/media/clients/ilink-on-logo.png", name: "iLink On" },
  { src: "/media/clients/cheapmove-logo.png", name: "CheapMove.ng" },
  { src: "/media/clients/up-mark-logo.png", name: "UP" },
  { src: "/media/clients/piib-symbiotic-logo.png", name: "PIIB Symbiotic" },
  { src: "/media/clients/bridge-icon-logo.png", name: "Client" },
];

function LogoChip({ logo }: { logo: (typeof LOGOS)[number] }) {
  return (
    <div
      title={logo.name}
      className="flex-shrink-0 w-40 h-24 sm:w-52 sm:h-28 rounded-xl bg-white border border-black/10 flex items-center justify-center p-3"
    >
      <img
        src={logo.src}
        alt={logo.name}
        className="max-w-full max-h-full object-contain"
        style={logo.scale ? { transform: `scale(${logo.scale})` } : undefined}
      />
    </div>
  );
}

export default function LogoCloud() {
  // duplicated once so animating exactly -50% loops seamlessly, forever
  const track = [...LOGOS, ...LOGOS];

  return (
    <section className="py-16 md:py-20">
      <p className="text-center text-xs uppercase tracking-widest text-white/40 mb-10 px-5">
        Real businesses running on systems we built
      </p>
      <div
        className="relative overflow-hidden"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <div className="logo-marquee-track flex items-center gap-5 w-max">
          {track.map((logo, i) => (
            <LogoChip key={`${logo.name}-${i}`} logo={logo} />
          ))}
        </div>
      </div>
    </section>
  );
}
