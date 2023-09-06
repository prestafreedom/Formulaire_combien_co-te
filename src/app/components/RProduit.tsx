"use client";
import { type } from "os";
import { createClient } from '@supabase/supabase-js';
import { useForm} from 'react-hook-form';
import {useformState } from "./FormContext";
import { useState } from "react";
 type TFormValues = {
  email:string;
   radiochoice1:string;
   rProduits:boolean;
 };
export default function PTP(){
  const supabase = createClient('https://aircrqmfhskltskuuzfs.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpcmNycW1maHNrbHRza3V1emZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk2MDE1NzcsImV4cCI6MjAwNTE3NzU3N30.jNOkALDaV8hxb4gdx9cOZ0V14c_jWwn3a-w5t723Fc8');
  const {Next,Back,setFormData,formData} = useformState();
  const { register,handleSubmit} =useForm<TFormValues>({
    defaultValues:formData,
  });
  const [rP,setRP]=useState(true);
  async function onHandleFormSubmit(data:TFormValues)
{
  setFormData(prevFormData => ({ ...prevFormData,...data, RP }));
  const RP=data.rProduits;
  const EmailForUpdate =  data.email;
  const CHois=data.radiochoice1;
  if(rP==true){
    const { data: insertedData, error } = await supabase
    .from('Leads')
    .update({Prooutils:true})
    .eq('email',EmailForUpdate)// Use a different property name
   console.log({CHois})
    Next(1);
  }else if(rP==false)
  {
    const { data: insertedData, error } = await supabase
    .from('Leads')
    .update({Prooutils:false})
    .eq('email',EmailForUpdate)// Use a different property name
    console.log(rP);
    Next(1);
  }
}
function handleBackButtonClick(data: TFormValues) {
  return (event: React.MouseEvent<HTMLButtonElement>) => {
    if (data.radiochoice1 === "full-time") {
      Back(6);
    }else if(data.radiochoice1 === "part-time"){
      Back(3);
    }
    else if(data.radiochoice1 === "on-demand"){
      Back(1);
    }
  };
}
//  isCreated ? (
//   <div>
//     <h1>Account created successfully</h1>
//     <pre>{JSON.stringify(formData)}</pre>
//   </div>
//  ):
 return(
  <>
<form className="py-12 px-12 bg-white rounded-2xl shadow-xl z-20" onSubmit={handleSubmit(onHandleFormSubmit)}>
  <div>
      <div className="flex items-center justify-center">
<div className="rounded-full h-32 w-32 overflow-hidden">
  <img src="Logo.png" alt="Circle" className="  object-cover" />
</div>
</div>			
    <p className="w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-pointer">Est-ce quelle ramène les outils et les produits de nèttoyage ? </p>
  </div>
  <div className="space-y-4 ">

  <div className="text-center  flex items-center  	 flex-col ">
  <button
  {...register('rProduits')}
  onClick={() => {
    // Set RP to true when "Oui" is clicked
    setRP(true);
  }}
  className="text-l border border-indigo-950 my-4 hover:text-white hover:border-white text-zinc-600 bg-gray-200 rounded-xl hover:bg-blue-600 text-white font-semibold py-2 px-4"
>
  Oui
</button>
<button
  {...register('rProduits')}
  onClick={() => {
    // Set RP to false when "Non" is clicked
    setRP(false);
  }}
  className="text-l border border-indigo-950 text-white bg-gray-200 hover:border-white rounded-xl hover:text-white hover:bg-blue-600 text-zinc-600 font-semibold py-2 px-4"
>
  Non
</button> </div>
  </div>
  <div className="text-center mt-6 flex justify-evenly ">
    <button type="button" onClick={handleBackButtonClick(formData)} className="text-l  text-white bg-sky-600 rounded-2xl hover:bg-blue-600 text-white font-semibold py-2 px-4">Back</button>
    <button type="submit" className="text-l text-white bg-sky-600 rounded-2xl hover:bg-blue-600 text-white font-semibold py-2 px-4">Next</button>
  </div>
</form>
</>
 )   
}
