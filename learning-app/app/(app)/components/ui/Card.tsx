export default function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`${className} w-full flex flex-col bg-aside rounded-lg border border-gray-300 mt-8`}
    >
      {children}
    </div>
  );
}
