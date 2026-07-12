"use client";

import MessageError from "./components/MessageError";

export default function Error({ error, reset }) {
  return (
    <div>
      <MessageError error={error} reset={reset} />
    </div>
  );
}
