"use client";
import { type } from "os";
import { createClient } from '@supabase/supabase-js';
import { useForm} from 'react-hook-form';
import {useformState } from "./FormContext";
 type TFormValues = {
  email:string;
  combienparmois:string;
  coutPTH:number,
 };
export default function PTP_combienM(){
  const supabase = createClient('https://aircrqmfhskltskuuzfs.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpcmNycW1maHNrbHRza3V1emZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk2MDE1NzcsImV4cCI6MjAwNTE3NzU3N30.jNOkALDaV8hxb4gdx9cOZ0V14c_jWwn3a-w5t723Fc8');
  const {Next,Back,setFormData,formData} = useformState();
  const { register,handleSubmit} =useForm<TFormValues>({
    defaultValues:formData,
  });
  async function onHandleFormSubmit(data:TFormValues)
{
  setFormData(prevFormData => ({ ...prevFormData,...data, SalaireM }));
  const SalaireM = data.combienparmois;
  const EmailForUpdate =  data.email;
  let cout = parseFloat(SalaireM) * 4;
           
    const { data: insertedData, error } = await supabase
    .from('Leads')
    .update({CM:SalaireM,Cout:cout })
    .eq('email',EmailForUpdate)// Use a different property name
    console.log(cout);
    Next(1);
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
    <p className="w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-pointer"> Combien reçoit-elle hebdomadaiement ?</p>
  </div>
  <div className="space-y-4">
 
<div className="text-center flex justify-space-between py-2">
  <label className="radio-label"> 
    <input  required  {...register('combienparmois')} type="text" placeholder="Salaire Hebdomadaire" className="block text-sm py-3 px-4 rounded-lg w-full border outline-none" />
  
  </label>
</div>

  </div>
  <div className="text-center mt-6 flex justify-evenly ">
    <button type="button" onClick={() => Back(2)}className="text-l text-white bg-sky-600 rounded-2xl hover:bg-blue-600 text-white font-semibold py-2 px-4">Back</button>
    <button type="submit" className="text-l text-white bg-sky-600 rounded-2xl hover:bg-blue-600 text-white font-semibold py-2 px-4">Next</button>
  </div>
</form>
</>
 )   
}
