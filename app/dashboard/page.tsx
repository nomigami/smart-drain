"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  CloudRain,
  DoorOpen,
  Droplets,
  Gauge,
  Radio,
  ShieldCheck,
  Volume2,
  Waves,
  Wifi,
} from "lucide-react";
import { onValue, ref } from "firebase/database";
import { database } from "@/lib/firebase";

type SmartDrainData = {
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
  gate?: {
    servoAngle?: number;
  };
};

export default function Dashboard() {
  const [firebaseData, setFirebaseData] =
    useState<SmartDrainData | null>(null);

  useEffect(() => {
    const databaseRef = ref(database, "/");

    const unsubscribe = onValue(
      databaseRef,
      (snapshot) => {
        const data = snapshot.val() as SmartDrainData | null;
        setFirebaseData(data);
      },
      (error) => {
        console.error("Firebase error:", error);
      }
    );

    return () => unsubscribe();
  }, []);

  const waterLevel = firebaseData?.sensor?.waterLevel ?? 0;

  const maxWaterLevel = 80;

  const rainIntensity =
    firebaseData?.sensor?.rainIntensity ?? 0;

  const servoAngle =
    firebaseData?.gate?.servoAngle ?? 0;

  const buzzerActive =
    firebaseData?.system?.buzzer ?? false;

  const espOnline =
    firebaseData?.system?.espOnline ?? false;

  const status =
    firebaseData?.system?.status ??
    (waterLevel >= 50
      ? "BAHAYA"
      : waterLevel >= 35
        ? "SIAGA"
        : waterLevel >= 20
          ? "WASPADA"
          : "AMAN");

  let statusColor = "emerald";

  if (status === "BAHAYA") {
    statusColor = "red";
  } else if (status === "SIAGA") {
    statusColor = "orange";
  } else if (status === "WASPADA") {
    statusColor = "yellow";
  }

  const waterPercentage = Math.min(
    (waterLevel / maxWaterLevel) * 100,
    100
  );

  const lastUpdate = firebaseData?.sensor?.timestamp
    ? new Date(
        firebaseData.sensor.timestamp
      ).toLocaleString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    : "Menunggu data...";

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950 text-white shadow-lg">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex h-20 items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-3"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 shadow-lg shadow-blue-600/30">
                <Droplets size={23} />
              </div>

              <div>
                <h1 className="font-bold">
                  Smart Drain
                </h1>

                <p className="text-xs text-slate-400">
                  Real-time Monitoring
                </p>
              </div>
            </Link>

            <div className="flex items-center gap-4">
              <div className="hidden items-center gap-2 sm:flex">
                <span
                  className={`h-2.5 w-2.5 rounded-full ${
                    espOnline
                      ? "animate-pulse bg-emerald-400"
                      : "bg-red-500"
                  }`}
                />

                <span className="text-sm text-slate-300">
                  {espOnline
                    ? "ESP32 Online"
                    : "ESP32 Offline"}
                </span>
              </div>

              <Link
                href="/"
                className="flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm transition hover:bg-white/5"
              >
                <ArrowLeft size={16} />

                <span className="hidden sm:block">
                  Home
                </span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-semibold tracking-wider text-blue-600">
                SMART DRAIN SYSTEM
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">
                Dashboard Monitoring
              </h2>

              <p className="mt-2 text-slate-500">
                Monitoring kondisi bendungan secara real-time.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
              <div className="flex items-center gap-2">
                <Radio
                  size={16}
                  className="text-emerald-500"
                />

                <div>
                  <p className="text-xs text-slate-400">
                    Pembaruan terakhir
                  </p>

                  <p className="text-sm font-semibold text-slate-700">
                    {lastUpdate}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`mb-6 overflow-hidden rounded-3xl border p-6 ${
            statusColor === "red"
              ? "border-red-200 bg-red-50"
              : statusColor === "orange"
                ? "border-orange-200 bg-orange-50"
                : statusColor === "yellow"
                  ? "border-yellow-200 bg-yellow-50"
                  : "border-emerald-200 bg-emerald-50"
          }`}
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div
                className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm ${
                  statusColor === "red"
                    ? "text-red-500"
                    : statusColor === "orange"
                      ? "text-orange-500"
                      : statusColor === "yellow"
                        ? "text-yellow-500"
                        : "text-emerald-500"
                }`}
              >
                {status === "BAHAYA" ? (
                  <AlertTriangle size={32} />
                ) : (
                  <ShieldCheck size={32} />
                )}
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Status Bendungan
                </p>

                <h3
                  className={`text-3xl font-black ${
                    statusColor === "red"
                      ? "text-red-600"
                      : statusColor === "orange"
                        ? "text-orange-600"
                        : statusColor === "yellow"
                          ? "text-yellow-600"
                          : "text-emerald-600"
                  }`}
                >
                  {status}
                </h3>
              </div>
            </div>

            <div className="max-w-md">
              <p className="text-sm leading-relaxed text-slate-600">
                {status === "BAHAYA"
                  ? "Ketinggian air telah mencapai batas bahaya. Pintu bendungan dibuka untuk mengurangi luapan air."
                  : status === "SIAGA"
                    ? "Ketinggian air berada pada kondisi siaga. Sistem mempersiapkan pembukaan pintu bendungan."
                    : status === "WASPADA"
                      ? "Ketinggian air mulai meningkat. Sistem melakukan pemantauan lebih intensif."
                      : "Kondisi bendungan masih aman dan berada dalam batas normal."}
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <SensorCard
            icon={<Droplets />}
            title="Ketinggian Air"
            value={waterLevel.toString()}
            unit="cm"
            description="Permukaan air"
            iconClass="bg-blue-50 text-blue-600"
          />

          <SensorCard
            icon={<CloudRain />}
            title="Intensitas Hujan"
            value={rainIntensity.toString()}
            unit="%"
            description="Intensitas hujan"
            iconClass="bg-cyan-50 text-cyan-600"
          />

          <SensorCard
            icon={<DoorOpen />}
            title="Pintu Bendungan"
            value={servoAngle.toString()}
            unit="°"
            description="Sudut pembukaan servo"
            iconClass="bg-indigo-50 text-indigo-600"
          />

          <SensorCard
            icon={<Volume2 />}
            title="Buzzer"
            value={buzzerActive ? "AKTIF" : "OFF"}
            unit=""
            description={
              buzzerActive
                ? "Peringatan aktif"
                : "Tidak ada peringatan"
            }
            iconClass={
              buzzerActive
                ? "bg-orange-50 text-orange-600"
                : "bg-emerald-50 text-emerald-600"
            }
          />
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Level Air
                </h3>

                <p className="mt-1 text-sm text-slate-400">
                  Kondisi permukaan bendungan
                </p>
              </div>

              <Gauge
                size={22}
                className="text-blue-600"
              />
            </div>

            <div className="mt-8 flex justify-center">
              <div className="relative h-64 w-36 overflow-hidden rounded-b-[2rem] rounded-t-3xl border-4 border-slate-200 bg-slate-50">
                <div
                  className="absolute bottom-0 left-0 right-0 bg-blue-500 transition-all duration-1000"
                  style={{
                    height: `${waterPercentage}%`,
                  }}
                >
                  <div className="absolute -top-2 left-0 h-4 w-full rounded-[50%] bg-blue-400" />

                  <div className="absolute -top-1 left-1/4 h-3 w-1/2 rounded-[50%] bg-blue-300/50" />
                </div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="rounded-2xl bg-slate-950/80 px-5 py-3 text-center text-white backdrop-blur">
                    <p className="text-3xl font-black">
                      {waterLevel}
                    </p>

                    <p className="text-xs text-slate-300">
                      centimeter
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-between text-xs text-slate-400">
              <span>0 cm</span>
              <span>20</span>
              <span>35</span>
              <span>50</span>
              <span>80 cm</span>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm lg:col-span-2">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Riwayat Ketinggian Air
                </h3>

                <p className="mt-1 text-sm text-slate-400">
                  Data monitoring beberapa jam terakhir
                </p>
              </div>

              <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-600">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                LIVE
              </div>
            </div>

            <div className="relative mt-10 h-64">
              <div className="absolute inset-0 flex flex-col justify-between">
                <div className="border-t border-slate-100" />
                <div className="border-t border-slate-100" />
                <div className="border-t border-slate-100" />
                <div className="border-t border-slate-100" />
                <div className="border-t border-slate-100" />
              </div>

              <svg
                viewBox="0 0 800 250"
                className="absolute inset-0 h-full w-full"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient
                    id="waterGradient"
                    x1="0"
                    x2="0"
                    y1="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="#2563eb"
                      stopOpacity="0.25"
                    />

                    <stop
                      offset="100%"
                      stopColor="#2563eb"
                      stopOpacity="0"
                    />
                  </linearGradient>
                </defs>

                <path
                  d="
                    M0 190
                    C60 180 100 160 150 170
                    C210 185 230 135 290 145
                    C350 155 370 115 430 125
                    C490 135 520 90 570 105
                    C630 120 650 70 710 85
                    C750 95 780 70 800 75
                    L800 250
                    L0 250
                    Z
                  "
                  fill="url(#waterGradient)"
                />

                <path
                  d="
                    M0 190
                    C60 180 100 160 150 170
                    C210 185 230 135 290 145
                    C350 155 370 115 430 125
                    C490 135 520 90 570 105
                    C630 120 650 70 710 85
                    C750 95 780 70 800 75
                  "
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <div className="flex justify-between text-xs text-slate-400">
              <span>08:00</span>
              <span>10:00</span>
              <span>12:00</span>
              <span>14:00</span>
              <span>16:00</span>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl bg-slate-950 p-7 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                  <DoorOpen size={24} />
                </div>

                <div>
                  <h3 className="font-bold">
                    Flood Gate
                  </h3>

                  <p className="text-sm text-slate-400">
                    Kendali pintu bendungan
                  </p>
                </div>
              </div>

              <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400">
                AUTO
              </span>
            </div>

            <div className="mt-10">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-sm text-slate-400">
                    Posisi Servo
                  </p>

                  <p className="mt-1 text-5xl font-black">
                    {servoAngle}

                    <span className="text-xl text-slate-400">
                      °
                    </span>
                  </p>
                </div>

                <DoorOpen
                  size={50}
                  strokeWidth={1}
                  className="text-blue-500"
                />
              </div>

              <div className="mt-7">
                <div className="h-3 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-blue-500 transition-all duration-700"
                    style={{
                      width: `${Math.min(
                        Math.max((servoAngle / 90) * 100, 0),
                        100
                      )}%`,
                    }}
                  />
                </div>

                <div className="mt-2 flex justify-between text-xs text-slate-500">
                  <span>
                    Tertutup 0°
                  </span>

                  <span>
                    Terbuka 90°
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-white/10 pt-6">
              <p className="text-sm leading-relaxed text-slate-400">
                Servo akan membuka pintu bendungan
                secara otomatis ketika ketinggian air
                mencapai batas yang telah ditentukan.
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <Activity size={24} />
              </div>

              <div>
                <h3 className="font-bold text-slate-900">
                  System Status
                </h3>

                <p className="text-sm text-slate-400">
                  Kondisi perangkat
                </p>
              </div>
            </div>

            <div className="mt-7 space-y-4">
              <SystemStatus
                icon={<Wifi size={18} />}
                title="ESP32"
                status={
                  espOnline
                    ? "ONLINE"
                    : "OFFLINE"
                }
                active={espOnline}
              />

              <SystemStatus
                icon={<Waves size={18} />}
                title="Water Sensor"
                status="ACTIVE"
                active
              />

              <SystemStatus
                icon={<CloudRain size={18} />}
                title="Rain Sensor"
                status="ACTIVE"
                active
              />

              <SystemStatus
                icon={<Volume2 size={18} />}
                title="Buzzer"
                status={
                  buzzerActive
                    ? "ACTIVE"
                    : "OFF"
                }
                active={buzzerActive}
              />
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
          <div>
            <h3 className="text-xl font-bold text-slate-900">
              Indikator Kondisi Air
            </h3>

            <p className="mt-1 text-sm text-slate-400">
              Kategori berdasarkan ketinggian permukaan air
            </p>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatusLevel
              color="bg-emerald-500"
              title="AMAN"
              level="< 20 cm"
              description="Kondisi normal"
            />

            <StatusLevel
              color="bg-yellow-500"
              title="WASPADA"
              level="20 – 34 cm"
              description="Air mulai meningkat"
            />

            <StatusLevel
              color="bg-orange-500"
              title="SIAGA"
              level="35 – 49 cm"
              description="Siapkan tindakan"
            />

            <StatusLevel
              color="bg-red-500"
              title="BAHAYA"
              level="≥ 50 cm"
              description="Pintu dibuka penuh"
            />
          </div>
        </div>

        <footer className="py-10 text-center">
          <p className="font-semibold text-slate-700">
            Smart Drain System
          </p>

          <p className="mt-1 text-sm text-slate-400">
            MTs Negeri 4 Klaten • Crescsenta 2026
          </p>

          <p className="mt-2 text-xs text-slate-400">
            Syauqina Cheryl Athifazahra • Khansa Salsabila Balqis
          </p>
        </footer>
      </section>
    </main>
  );
}

function SensorCard({
  icon,
  title,
  value,
  unit,
  description,
  iconClass,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  unit: string;
  description: string;
  iconClass: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-center justify-between">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconClass}`}
        >
          {icon}
        </div>

        <span className="flex items-center gap-1 text-xs font-medium text-emerald-500">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          LIVE
        </span>
      </div>

      <p className="mt-5 text-sm text-slate-500">
        {title}
      </p>

      <p className="mt-1 text-3xl font-bold text-slate-900">
        {value}

        {unit && (
          <span className="ml-1 text-base font-medium text-slate-400">
            {unit}
          </span>
        )}
      </p>

      <p className="mt-2 text-xs text-slate-400">
        {description}
      </p>
    </div>
  );
}

function SystemStatus({
  icon,
  title,
  status,
  active,
}: {
  icon: React.ReactNode;
  title: string;
  status: string;
  active: boolean;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-100 p-4">
      <div className="flex items-center gap-3">
        <div className="text-slate-500">
          {icon}
        </div>

        <span className="font-medium text-slate-700">
          {title}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <span
          className={`h-2 w-2 rounded-full ${
            active
              ? "bg-emerald-500"
              : "bg-slate-300"
          }`}
        />

        <span
          className={`text-xs font-semibold ${
            active
              ? "text-emerald-600"
              : "text-slate-400"
          }`}
        >
          {status}
        </span>
      </div>
    </div>
  );
}

function StatusLevel({
  color,
  title,
  level,
  description,
}: {
  color: string;
  title: string;
  level: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-100 p-5">
      <div className="flex items-center gap-3">
        <span
          className={`h-3 w-3 rounded-full ${color}`}
        />

        <p className="font-bold text-slate-800">
          {title}
        </p>
      </div>

      <p className="mt-3 text-lg font-bold text-slate-700">
        {level}
      </p>

      <p className="mt-1 text-sm text-slate-400">
        {description}
      </p>
    </div>
  );
}