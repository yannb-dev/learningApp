"use client";

import MessageError from "./components/MessageError";

export default function Error({
  error,
  reset,
}: {
  error: React.ReactNode;
  reset: () => void;
}) {
  return (
    <div>
      <MessageError error={error} reset={reset} />
    </div>
  );
}
