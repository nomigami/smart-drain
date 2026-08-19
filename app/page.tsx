"use client";

import Link from "next/link";
import {
  ArrowRight,
  CloudRain,
  Droplets,
  DoorOpen,
  ShieldCheck,
  Waves,
  Zap,
} from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">

      {/* =========================================================
          NAVBAR
      ========================================================= */}

      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">

        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

          {/* LOGO */}

          <Link
            href="/"
            className="flex items-center gap-3"
          >

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 shadow-lg shadow-blue-600/30">

              <Droplets size={24} />

            </div>

            <div>

              <h1 className="font-bold">
                Smart Drain
              </h1>

              <p className="text-xs text-slate-400">
                Monitoring System
              </p>

            </div>

          </Link>


          {/* MENU DESKTOP */}

          <div className="hidden items-center gap-8 md:flex">

            <a
              href="#home"
              className="text-sm text-white transition hover:text-blue-400"
            >
              Home
            </a>

            <Link
              href="/dashboard"
              className="text-sm text-slate-400 transition hover:text-white"
            >
              Dashboard
            </Link>

            <a
              href="#about"
              className="text-sm text-slate-400 transition hover:text-white"
            >
              About
            </a>

            <a
              href="#team"
              className="text-sm text-slate-400 transition hover:text-white"
            >
              Team
            </a>

          </div>


          {/* DASHBOARD BUTTON */}

          <Link
            href="/dashboard"
            className="hidden items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold transition hover:bg-blue-500 sm:flex"
          >

            Dashboard

            <ArrowRight size={16} />

          </Link>

        </div>

      </nav>


      {/* =========================================================
          HERO
      ========================================================= */}

      <section
        id="home"
        className="relative flex min-h-screen items-center overflow-hidden"
      >

        {/* BACKGROUND EFFECT */}

        <div className="absolute inset-0">

          <div className="absolute left-1/2 top-1/4 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-blue-600/20 blur-[150px]" />

          <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-[120px]" />

          <div className="absolute left-0 top-1/2 h-[300px] w-[300px] rounded-full bg-blue-500/10 blur-[100px]" />

        </div>


        {/* CONTENT */}

        <div className="relative mx-auto w-full max-w-7xl px-6 pt-24">

          {/* EVENT BADGE */}

          <div className="mb-7 flex flex-wrap items-center gap-3">

            <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-sm text-blue-300">

              <span className="h-2 w-2 animate-pulse rounded-full bg-blue-400" />

              IoT Early Warning System

            </div>


            <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">

              Crescsenta 2026

            </div>

          </div>


          {/* TITLE */}

          <h2 className="max-w-4xl text-5xl font-bold leading-tight tracking-tight md:text-7xl">

            Smart Drain

            <span className="block text-blue-500">
              System
            </span>

          </h2>


          {/* DESCRIPTION */}

          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-slate-400 md:text-xl">

            Sistem monitoring ketinggian air dan kondisi
            hujan berbasis Internet of Things untuk
            memberikan peringatan dini terhadap potensi
            luapan air secara cepat dan informatif.

          </p>


          {/* TEAM INFORMATION */}

          <div
            id="team"
            className="mt-7 border-l-2 border-blue-500 pl-5"
          >

            <p className="text-sm font-medium uppercase tracking-wider text-slate-500">
              Tim Inovasi
            </p>


            <p className="mt-2 text-lg font-semibold text-white">
              Syauqina Cheryl Athifazahra
            </p>


            <p className="text-lg font-semibold text-white">
              Khansa Salsabila Balqis
            </p>


            <p className="mt-2 text-sm font-medium text-blue-400">
              MTs Negeri 4 Klaten
            </p>

          </div>


          {/* BUTTON */}

          <div className="mt-9 flex flex-wrap gap-4">

            <Link
              href="/dashboard"
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 font-semibold shadow-lg shadow-blue-600/20 transition hover:bg-blue-500"
            >

              Mulai Monitoring

              <ArrowRight size={18} />

            </Link>


            <a
              href="#about"
              className="rounded-xl border border-white/10 px-6 py-3.5 font-semibold transition hover:bg-white/5"
            >

              Pelajari Sistem

            </a>

          </div>


          {/* QUICK DATA */}

          <div className="mt-16 grid max-w-5xl grid-cols-2 gap-4 md:grid-cols-4">

            <QuickStat
              icon={<Droplets size={19} />}
              title="Water Level"
              value="42 cm"
            />


            <QuickStat
              icon={<CloudRain size={19} />}
              title="Rain Sensor"
              value="HUJAN"
            />


            <QuickStat
              icon={<DoorOpen size={19} />}
              title="Flood Gate"
              value="45°"
            />


            <QuickStat
              icon={<ShieldCheck size={19} />}
              title="System"
              value="SIAGA"
            />

          </div>

        </div>

      </section>


      {/* =========================================================
          ABOUT SMART DRAIN
      ========================================================= */}

      <section
        id="about"
        className="bg-white py-24 text-slate-900"
      >

        <div className="mx-auto max-w-7xl px-6">

          <div className="grid items-center gap-16 lg:grid-cols-2">

            {/* TEXT */}

            <div>

              <p className="text-sm font-semibold text-blue-600">
                ABOUT SMART DRAIN
              </p>


              <h2 className="mt-3 text-4xl font-bold leading-tight md:text-5xl">

                Teknologi untuk

                <span className="text-blue-600">
                  {" "}peringatan dini
                </span>

              </h2>


              <p className="mt-6 leading-relaxed text-slate-500">

                Smart Drain System merupakan sistem
                monitoring berbasis Internet of Things
                yang dirancang untuk memantau ketinggian
                air dan kondisi hujan secara real-time.

              </p>


              <p className="mt-4 leading-relaxed text-slate-500">

                Sistem menggunakan ESP32 sebagai
                mikrokontroler untuk membaca sensor,
                mengolah data, serta mengendalikan pintu
                bendungan secara otomatis ketika
                ketinggian air mencapai batas tertentu.

              </p>


              {/* FEATURES */}

              <div className="mt-8 grid grid-cols-2 gap-4">

                <Feature
                  title="Real-time"
                  text="Data diperbarui secara langsung"
                />


                <Feature
                  title="Automatic"
                  text="Pintu bendungan otomatis"
                />


                <Feature
                  title="IoT Based"
                  text="Terhubung melalui internet"
                />


                <Feature
                  title="Early Warning"
                  text="Peringatan kondisi air"
                />

              </div>

            </div>


            {/* VISUAL */}

            <div className="relative">

              <div className="relative mx-auto flex aspect-square max-w-md items-center justify-center overflow-hidden rounded-[2rem] bg-slate-950 shadow-2xl">

                {/* GLOW */}

                <div className="absolute h-72 w-72 rounded-full bg-blue-600/20 blur-3xl" />


                {/* WATER */}

                <div className="relative">

                  <Waves
                    size={180}
                    strokeWidth={1}
                    className="text-blue-500"
                  />


                  <div className="absolute inset-0 flex items-center justify-center">

                    <Droplets
                      size={60}
                      className="text-white"
                    />

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
          HOW IT WORKS
      ========================================================= */}

      <section className="bg-slate-50 py-24 text-slate-900">

        <div className="mx-auto max-w-7xl px-6">

          <div className="mx-auto max-w-2xl text-center">

            <p className="text-sm font-semibold text-blue-600">
              HOW IT WORKS
            </p>

            <h2 className="mt-3 text-4xl font-bold">
              Cara Kerja Smart Drain
            </h2>

            <p className="mt-4 text-slate-500">
              Sistem bekerja secara otomatis untuk
              memantau kondisi bendungan.
            </p>

          </div>


          {/* STEPS */}

          <div className="mt-14 grid gap-6 md:grid-cols-4">

            <WorkStep
              number="01"
              title="Sensor"
              text="Sensor mendeteksi curah hujan dan ketinggian air."
            />


            <WorkStep
              number="02"
              title="ESP32"
              text="ESP32 mengolah data yang diperoleh dari sensor."
            />


            <WorkStep
              number="03"
              title="Monitoring"
              text="Data dikirim dan ditampilkan pada dashboard."
            />


            <WorkStep
              number="04"
              title="Automatic Gate"
              text="Servo membuka pintu bendungan saat air meluap."
            />

          </div>

        </div>

      </section>


      {/* =========================================================
          CTA
      ========================================================= */}

      <section className="bg-blue-600 py-20">

        <div className="mx-auto max-w-5xl px-6 text-center">

          <Zap
            size={40}
            className="mx-auto mb-5"
          />


          <h2 className="text-3xl font-bold md:text-4xl">

            Pantau kondisi bendungan
            secara real-time.

          </h2>


          <p className="mx-auto mt-4 max-w-xl text-blue-100">

            Smart Drain membantu memberikan informasi
            lebih cepat ketika kondisi air mengalami
            peningkatan.

          </p>


          <Link
            href="/dashboard"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-blue-600 transition hover:bg-blue-50"
          >

            Buka Dashboard

            <ArrowRight size={18} />

          </Link>

        </div>

      </section>


      {/* =========================================================
          FOOTER
      ========================================================= */}

      <footer className="bg-slate-950 py-10">

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 md:flex-row">

          {/* TEAM */}

          <div className="text-center md:text-left">

            <p className="font-bold text-white">
              Smart Drain System
            </p>


            <p className="mt-1 text-sm text-slate-500">
              MTs Negeri 4 Klaten
            </p>


            <p className="mt-2 text-xs text-slate-600">
              Syauqina Cheryl Athifazahra
              {" • "}
              Khansa Salsabila Balqis
            </p>

          </div>


          {/* EVENT */}

          <div className="text-center md:text-right">

            <p className="text-sm font-medium text-slate-400">
              Crescsenta 2026
            </p>


            <p className="mt-1 text-xs text-slate-600">
              Innovation • Technology • Solution
            </p>

          </div>

        </div>

      </footer>

    </main>
  );
}


/* =========================================================
   QUICK STAT COMPONENT
========================================================= */

function QuickStat({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {

  return (

    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl transition hover:bg-white/10">

      <div className="flex items-center gap-3">

        <div className="text-blue-400">
          {icon}
        </div>


        <div>

          <p className="text-xs text-slate-500">
            {title}
          </p>


          <p className="mt-0.5 font-semibold">
            {value}
          </p>

        </div>

      </div>

    </div>

  );
}


/* =========================================================
   FEATURE COMPONENT
========================================================= */

function Feature({
  title,
  text,
}: {
  title: string;
  text: string;
}) {

  return (

    <div className="rounded-xl border border-slate-200 bg-white p-4 transition hover:border-blue-200 hover:shadow-sm">

      <p className="font-semibold">
        {title}
      </p>


      <p className="mt-1 text-sm text-slate-500">
        {text}
      </p>

    </div>

  );
}


/* =========================================================
   WORK STEP COMPONENT
========================================================= */

function WorkStep({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {

  return (

    <div className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-sm font-bold text-white">

        {number}

      </div>


      <h3 className="mt-5 text-xl font-bold">
        {title}
      </h3>


      <p className="mt-3 text-sm leading-relaxed text-slate-500">
        {text}
      </p>

    </div>

  );
}