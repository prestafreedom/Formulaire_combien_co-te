"use client";
import { type } from "os";
import { createClient } from '@supabase/supabase-js';
import { useForm} from 'react-hook-form';

import {useformState } from "./FormContext";
 type TFormValues = {
  email:string;
   radiochoice1:string;
 };
export default function Page3(){
  const supabase = createClient('https://aircrqmfhskltskuuzfs.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpcmNycW1maHNrbHRza3V1emZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk2MDE1NzcsImV4cCI6MjAwNTE3NzU3N30.jNOkALDaV8hxb4gdx9cOZ0V14c_jWwn3a-w5t723Fc8');
  const {Back,Next,setFormData,formData} = useformState();
  const { register,handleSubmit} =useForm<TFormValues>({
    defaultValues:formData,
  }); 
  async function onHandleFormSubmit(data:TFormValues)
{ 
  setFormData(prevFormData => ({ ...prevFormData,...data, selectedChoice }));
  const selectedChoice = data.radiochoice1;
  const EmailForUpdate =  data.email;
  if(selectedChoice=="full-time"){
   const { data: insertedData, error } = await supabase
    .from('Leads')
    .update({FMT:selectedChoice})
    .eq('email',EmailForUpdate)// Use a different property name
    console.log(selectedChoice);
    Next(1);
  }else if(selectedChoice=="part-time")
  {
    const { data: insertedData, error } = await supabase
    .from('Leads')
    .update({FMT:selectedChoice})
    .eq('email',EmailForUpdate)// Use a different property name
    console.log(selectedChoice);
    Next(10);
  }
  else if(selectedChoice=="on-demand")
  {
    const { data: insertedData, error } = await supabase
    .from('Leads')
    .update({FMT:selectedChoice})
    .eq('email',EmailForUpdate)// Use a different property name
    console.log(selectedChoice);
    Next(12);
  }
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
    <p className="w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-pointer">Votre femme de ménage travail :</p>
  </div>
  <div className="space-y-4">
 
  <div className="text-center flex justify-space-between py-2 ">
  <label className="radio-label">
    <input required type="radio" {...register('radiochoice1')} value="full-time" name="radiochoice1" className="radio-button" />
    <span>Plein Temps</span>
  </label>
</div>
<div className="text-center flex justify-space-between py-2">
  <label className="radio-label"> 
    <input required type="radio" {...register('radiochoice1')}  value="part-time" name="radiochoice1" className="radio-button" />
    <span>Temps Parriel</span>
  </label>
</div>
    
<div className="text-center flex justify-space-between py-2">
  <label className="radio-label">
    <input required type="radio" {...register('radiochoice1')}  value="on-demand" name="radiochoice1" className="radio-button" />
    <span>à la demmande </span>
  </label>
</div>
  </div>
  <div className="text-center mt-6 flex justify-evenly ">
    <button type="button" onClick={() => Back(1)} className="text-l text-white bg-sky-600 rounded-2xl hover:bg-blue-600 text-white font-semibold py-2 px-4">Back</button>
    <button type="submit" className="text-l text-white bg-sky-600 rounded-2xl hover:bg-blue-600 text-white font-semibold py-2 px-4">Next</button>
  </div>
</form>
</>
 )   
}
