import type { Metadata } from "next";
import { Suspense } from "react";
import ConfirmationClient from "../confirmation-client";

export const metadata: Metadata = { title: "ZRH Airport Taxi", robots: { index: false, follow: false } };

export default function Page() {
  return (
    <Suspense fallback={null}>
      <ConfirmationClient mode="confirmed" />
    </Suspense>
  );
}
