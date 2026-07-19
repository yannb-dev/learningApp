export default function DivAmber({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`p-2 bg-amber-600 text-white font-bold rounded-sm ${className}`}
    >
      {children}
    </div>
  );
}
