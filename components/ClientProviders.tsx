// "use client";

// import { SessionProvider } from "next-auth/react";

// export default function ClientProviders({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return <SessionProvider>{children}</SessionProvider>;
// }
"use client";

import { SessionProvider } from "next-auth/react";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SessionProvider>{children}</SessionProvider>;
}
