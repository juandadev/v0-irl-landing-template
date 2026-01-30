"use client";

import { Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import LanyardWithControls from "@/components/lanyard-with-controls";
import { decryptUsername } from "@/lib/utils";

function LanyardContent() {
  const searchParams = useSearchParams();
  
  // Decrypt username from URL params if present
  const defaultName = useMemo(() => {
    const encryptedName = searchParams.get("u");
    if (encryptedName) {
      const decrypted = decryptUsername(encryptedName);
      return decrypted ?? "";
    }
    return "";
  }, [searchParams]);

  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center">
      <div className="relative w-full max-w-2xl">
        <LanyardWithControls
          position={[0, 0, 18]}
          containerClassName="relative aspect-square w-full h-screen"
          defaultName={defaultName}
        />
      </div>
    </main>
  );
}

export default function LanyardPage() {
  return (
    <Suspense fallback={
      <main className="relative flex min-h-dvh flex-col items-center justify-center">
        <div className="relative w-full max-w-2xl">
          <div className="flex h-screen items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        </div>
      </main>
    }>
      <LanyardContent />
    </Suspense>
  );
}
