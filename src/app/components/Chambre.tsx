"use client";
import { type } from "os";
import { createClient } from '@supabase/supabase-js';
import { useForm} from 'react-hook-form';
import {useFormState } from "./FormContext";
import { useState } from "react";
 type TFormValues = {
  email:string;
  chambre:boolean;
  coutPTM:number;
 };
export default function Chambre(){
  const supabase = createClient('https://aircrqmfhskltskuuzfs.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpcmNycW1maHNrbHRza3V1emZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk2MDE1NzcsImV4cCI6MjAwNTE3NzU3N30.jNOkALDaV8hxb4gdx9cOZ0V14c_jWwn3a-w5t723Fc8');
  const {Next,Back,setFormData,formData} = useFormState();
  const { register,handleSubmit} =useForm<TFormValues>({
    defaultValues:formData,
  });
  const [rP,setRP]=useState(true);
  async function onHandleFormSubmit(data:TFormValues)
{
  setFormData(prevFormData => ({ ...prevFormData,...data, RP }));
  const RP=data.chambre;
  const EmailForUpdate =  data.email;
  let cout =data.coutPTM;
  if(rP==true){
    // Retrieve the current value of Cout from the database
    const { data: existingData, error: existingError } = await supabase
      .from('Leads')
      .select('Cout')
      .eq('email', EmailForUpdate);
    if (existingError) {
      console.error(existingError);
      // Handle the error
    } else {
      // Calculate the new value of Cout by adding 120 to the existing value
      cout = (existingData[0]?.Cout || 0) + 120;

      // Update the database with the new value of Cout
      const { data: insertedData, error } = await supabase
        .from('Leads')
        .update({Chambre:true,Cout:cout})
        .eq('email', EmailForUpdate);

      if (error) {
        console.error(error);
        // Handle the error
      } else {
        Next(1);
      }
    }
  }else if(rP==false)
  {
    const { data: insertedData, error } = await supabase
    .from('Leads')
    .update({Chambre:false})
    .eq('email',EmailForUpdate)// Use a different property name
    console.log(rP);
    Next(1);
  }
}
 return(
  <>
<form className="py-12 px-12 bg-white rounded-2xl shadow-xl z-20" onSubmit={handleSubmit(onHandleFormSubmit)}>
  <div>
      <div className="flex items-center justify-center">
<div className="rounded-full h-32 w-32 overflow-hidden">
  <img src="Logo.png" alt="Circle" className="  object-cover" />
</div>
</div>			
    <p className="w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-pointer">A-t-elle sa propre chambre  ? </p>
  </div>
  <div className="space-y-4 ">

  <div className="text-center  flex items-center  	 flex-col ">
  <button
  {...register('chambre')}
  onClick={() => {
    // Set RP to true when "Oui" is clicked
    setRP(true);
  }}
  className="text-l border border-indigo-950 my-4 hover:text-white hover:border-white text-zinc-600 bg-gray-200 rounded-xl hover:bg-blue-600 font-semibold py-2 px-4"
>
  Oui
</button>
<button
  {...register('chambre')}
  onClick={() => {
    // Set RP to false when "Non" is clicked
    setRP(false);
  }}
  className="text-l border border-indigo-950 my-4 hover:text-white hover:border-white bg-gray-200 rounded-xl hover:bg-blue-600 text-black font-semibold py-2 px-4"
>
  Non
</button> </div>
  </div>
  <div className="text-center mt-6 flex justify-evenly ">
    <button type="button" onClick={() => Back(1)} className="text-l  text-white bg-sky-600 rounded-2xl hover:bg-blue-600 font-semibold py-2 px-4">Back</button>
    <button type="submit" className="text-l text-white bg-sky-600 rounded-2xl hover:bg-blue-600 font-semibold py-2 px-4">Next</button>
  </div>
</form>
</>
 )   
}
