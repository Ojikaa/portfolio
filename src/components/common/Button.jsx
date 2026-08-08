export default function Button({ href, variant = 'solid', download, children }) {
  return (
    <a
      href={href}
      download={download}
      className={`inline-flex items-center gap-3 px-6.5 py-3.75 rounded-full text-[15px] font-semibold no-underline border transition-[transform,border-color] duration-200 hover:-translate-y-0.5 whitespace-nowrap max-[420px]:px-4 max-[420px]:py-2.5 max-[420px]:text-[13px] ${
        variant === 'outline'
          ? 'bg-transparent text-ink border-rule hover:border-ink'
          : 'bg-accent text-white border-transparent'
      }`}
    >
      {children}
    </a>
  );
}
