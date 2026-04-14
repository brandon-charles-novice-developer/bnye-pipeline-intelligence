export default function SectionLabel({ children, right, className = '' }) {
  return (
    <div className={`flex items-center justify-between mb-6 ${className}`}>
      <span
        className="text-[11px] uppercase tracking-widest font-semibold"
        style={{ color: '#FFFFFF' }}
      >
        {children}
      </span>
      {right && <div>{right}</div>}
    </div>
  )
}
