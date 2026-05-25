interface SectionLabelProps {
  children: React.ReactNode;
}

export default function SectionLabel({ children }: SectionLabelProps) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <p className="text-m font-bold uppercase tracking-wider text-[#F3811F] shrink-0">
        {children}
      </p>
      <div className="flex-1 border-t border-white/10" />
    </div>
  );
}
