export default function SectionTitle({ children, as: Tag = 'h2', className = '' }) {
  return (
    <Tag className={`m-0 font-heading tracking-[-0.03em] uppercase ${className}`}>
      {children}
    </Tag>
  );
}
