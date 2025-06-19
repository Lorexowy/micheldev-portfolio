'use client';
import Hero from '@/components/sections/Hero';
import Uslugi from '@/components/sections/Uslugi';
import Projekty from '@/components/sections/Projekty';
import Wspolpraca from '@/components/sections/Wspolpraca';
import DlaczegoJa from '@/components/sections/DlaczegoJa';
import Kontakt from '@/components/sections/Kontakt';

export default function Home() {
  return (
    <>
      <Hero />
      <Uslugi />
      <Projekty />
      <Wspolpraca />
      <DlaczegoJa />
      <Kontakt />
    </>
  );
}