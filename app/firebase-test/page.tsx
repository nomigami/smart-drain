"use client";

import { useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";
import { database } from "@/lib/firebase";

type FirebaseData = {
  gate?: {
    servoAngle?: number;
  };
  sensor?: {
    waterLevel?: number;
    rainIntensity?: number;
    timestamp?: number;
  };
  system?: {
    status?: string;
    buzzer?: boolean;
    espOnline?: boolean;
  };
};

export default function FirebaseTestPage() {
  const [data, setData] = useState<FirebaseData | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const databaseRef = ref(database, "/");

    const unsubscribe = onValue(
      databaseRef,
      (snapshot) => {
        setData(snapshot.val() as FirebaseData);
      },
      (error) => {
        console.error(error);
        setError(error.message);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 p-8 text-white">
      <h1 className="mb-6 text-3xl font-bold">
        Firebase Connection Test
      </h1>

      {error && (
        <div className="mb-4 rounded-lg bg-red-500/20 p-4 text-red-400">
          Error: {error}
        </div>
      )}

      {!data && !error && (
        <p className="text-slate-400">
          Mengambil data dari Firebase...
        </p>
      )}

      {data && (
        <pre className="overflow-auto rounded-xl bg-slate-900 p-6 text-sm">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </main>
  );
}