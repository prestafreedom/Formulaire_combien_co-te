"use client";
import { createClient } from '@supabase/supabase-js';
import { useForm } from 'react-hook-form';
import { useformState } from "./FormContext";
import { useState } from "react";
import React from "react";
import { Modal } from "reactstrap";
import Link from "next/link";

type TFormValues = {
  email: string;
  Casaccident: boolean;
  coutPTM: number;
  radiochoice2: string;
  radiochoice1: string;
  coutPTH: number;
  coutTP: number;
  coutOndemande: number;
};
export default function Casaccident() {
  const [modalOpen, setModalOpen] = React.useState(false);
  const supabase = createClient('https://aircrqmfhskltskuuzfs.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpcmNycW1maHNrbHRza3V1emZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk2MDE1NzcsImV4cCI6MjAwNTE3NzU3N30.jNOkALDaV8hxb4gdx9cOZ0V14c_jWwn3a-w5t723Fc8');
  const {Back, setFormData, formData } = useformState();
  const { register, handleSubmit } = useForm<TFormValues>({
    defaultValues: formData,
  });
  const [coutPTM, setCoutPTM] = useState(formData.coutPTM);
  const [coutPTH, setCoutPTH] = useState(formData.coutPTH);
  const [coutTP, setcoutTP] = useState(formData.coutTP);
  const [coutOndemande, setcoutOndemande] = useState(formData.coutOndemande);
  const [radio, setradio] = useState(formData.radiochoice2);
  const [radio1, setradio1] = useState(formData.radiochoice1);
  const [rP, setRP] = useState(true);
  async function onHandleFormSubmit(data: TFormValues) {
    setFormData(prevFormData => ({ ...prevFormData, ...data, RP }));
    const RP = data.Casaccident;
    const EmailForUpdate = data.email;
    let cout;
    if (data.radiochoice2 === "Mensuel") {
      cout = data.coutPTM;
    } else if (data.radiochoice2 === "Hebdomadaire") {
      cout = data.coutPTH;
    } else if (data.radiochoice1 === "on-demand") {
      cout = data.coutTP;
    }
    else if (data.radiochoice1 === "part-time") {
      cout = data.coutOndemande;
    }
    if (rP == true) {
      const { data: existingData, error: existingError } = await supabase
        .from('Leads')
        .select('Cout')
        .eq('email', EmailForUpdate);
      if (existingError) {
        console.error(existingError);
        // Handle the error
      } else {
        // Calculate the new value of Cout by adding 120 to the existing value
        cout = (existingData[0]?.Cout || 0) + 0;
        setCoutPTM((existingData[0]?.Cout || 0) + 0);
        setCoutPTH((existingData[0]?.Cout || 0) + 0);
        setcoutTP((existingData[0]?.Cout || 0) + 0);
        setcoutOndemande((existingData[0]?.Cout || 0) + 0);

        // Update the database with the new value of Cout
        const { data: insertedData, error } = await supabase
          .from('Leads')
          .update({ Casaccident: true, Cout: cout })
          .eq('email', EmailForUpdate);
        console.log(data.coutOndemande)
      }
    } else if (rP == false) {
      const { data: insertedData, error } = await supabase
        .from('Leads')
        .update({ Casaccident: false })
        .eq('email', EmailForUpdate)// Use a different property name
      console.log(rP);
      // Next(1);
    }
    const { data: insertedData, error } = await supabase
      .from('Leads')
      .select('Cout')
      .eq('email', EmailForUpdate)// Use a different property name
    console.log(rP);
  }
  return (
    <>
      <form className="py-12 px-12 bg-white rounded-2xl shadow-xl z-20" onSubmit={handleSubmit(onHandleFormSubmit)}>
        <div>
          <div className="flex items-center justify-center">
            <div className="rounded-full h-32 w-32 overflow-hidden">
              <img src="Logo.png" alt="Circle" className="  object-cover" />
            </div>
          </div>
          <p className="w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-pointer">En cas d'accident au travail,êtes-vous responsable ?</p>
        </div>
        <div className="space-y-4 ">

          <div className="text-center  flex items-center  	 flex-col ">
            <button
              {...register('Casaccident')}
              onClick={() => {
                // Set RP to true when "Oui" is clicked
                setRP(true);
              }}
              className="text-l border border-indigo-950 my-4 hover:text-white hover:border-white bg-gray-200 rounded-xl hover:bg-blue-600 text-black font-semibold py-2 px-4"
            >
              Oui
            </button>
            <button
              {...register('Casaccident')}
              onClick={() => {
                // Set RP to false when "Non" is clicked
                setRP(false);
              }}
              className="text-l border border-indigo-950 text-black bg-gray-200 hover:border-white rounded-xl hover:text-white hover:bg-blue-600 font-semibold py-2 px-4"
            >
              Non
            </button> </div>
        </div>
        <div className="text-center mt-6 flex justify-evenly ">
          <button type="button" onClick={() => Back(1)} className="text-l  text-white bg-sky-600 rounded-2xl hover:bg-blue-600 font-semibold py-2 px-4">Back</button>
          <button type="submit" onClick={() => setModalOpen(!modalOpen)} className="text-l text-white bg-sky-600 rounded-2xl hover:bg-blue-600 font-semibold py-2 px-4">Next</button>
        </div>
        <Modal
          className="fixed    inset-0 flex items-center justify-center z-50 overflow-x-hidden overflow-y-auto outline-none focus:outline-none"
          isOpen={modalOpen}
          toggle={() => setModalOpen(!modalOpen)}
        >
          <div className="  relative w-auto my-6 mx-auto max-w-3xl">
            {/*content*/}
            <div className=" popup relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
              {/*header*/}
              <div className="flex  text-center  justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                <h3 className="text-3xl  text-white font-semibold">
                  {coutPTM !== 0 && radio === "Mensuel" && <p> {coutPTM} : DH</p>}
                  {coutPTH !== 0 && radio === "Hebdomadaire" && <p> {coutPTH} : DH</p>}
                  {coutTP !== 0 && radio1 === "part-time" && <p> {coutTP} : DH</p>}
                  {coutOndemande !== 0 && radio1 === "on-demand" && <p> {coutOndemande} : DH</p>}
                </h3>
              </div>
              {/*body*/}
              <div className=" text-white relative p-6  flex   flex-col  justify-evenly  flex-auto">
                {/* Add your modal content here */}
                <p className=" font-bold  ">C'est le coût réel que vous payez pour le service de ménage mensuel</p>
                <h1 className="text-white" >Si vous souhaitez économiser votre argent avec un très bon Qualité de ménage avec un service professionnel, essayez de remplir le formulaire ci-dessous pour profiter du test gratuit.</h1>
                <span> <Link href="https://prestafreedom.com/devis ">https://prestafreedom.com/devis</Link> </span>

              </div>
            </div>
          </div>
        </Modal>
      </form>
    </>
  )
}
