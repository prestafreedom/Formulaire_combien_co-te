"use client";
import UsernameForm from "./components/Page1";
import { useState } from 'react';
import { FormProvider } from './components/FormContext';
import { FormStep } from './components/FormStep';
import ComfoistravPS from './components/PartT_ComfoistravPS';
import Casaccident from './components/Casaccident';
export default function Home() {
    const [step,setstep]=useState(1);
  return (
    <div className="min-h-screen bg-sky-400  flex justify-center items-center">
	<div className="absolute w-60 h-60 rounded-xl bg-sky-600 -top-5 -left-16 z-0 transform rotate-45 hidden md:block">
	</div>
	<div className="absolute w-48 h-48 rounded-xl bg-sky-600 -bottom-6 -right-10 transform rotate-12 hidden md:block">
	</div>
     <FormProvider>
     <FormStep />
     </FormProvider>
     <div className="w-40 h-40 absolute bg-sky-600 rounded-full top-0 right-12 hidden md:block"></div>
		<div
			className="w-20 h-40 absolute bg-sky-600 rounded-full bottom-20 left-10 transform rotate-45 hidden md:block">
		</div>
	</div>
  )
}
