"use client";
import { createClient } from '@supabase/supabase-js';
import { useForm} from 'react-hook-form';
import {useformState } from "./FormContext";
 type TFormValues = {
  email:string;
  combChaqF:string;
  onDravailfois:string;
 };
export default function PartT_combienchaquefois(){
  const supabase = createClient('https://aircrqmfhskltskuuzfs.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpcmNycW1maHNrbHRza3V1emZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk2MDE1NzcsImV4cCI6MjAwNTE3NzU3N30.jNOkALDaV8hxb4gdx9cOZ0V14c_jWwn3a-w5t723Fc8');
  const {Next,Back,setFormData,formData} = useformState();
  const { register,handleSubmit} =useForm<TFormValues>({
    defaultValues:formData,
  });
  async function onHandleFormSubmit(data:TFormValues)
{
  setFormData(prevFormData => ({ ...prevFormData,...data, CombChaqF }));
  const CombChaqF = data.combChaqF;
  const EmailForUpdate =  data.email;
  const TRfois=data.onDravailfois;
  let cout;
  const { data: existingData, error: existingError } = await supabase
  .from('Leads')
  .select('Cout , OndemandFoiPM') 
  .eq('email', EmailForUpdate);
if (existingError) {
  console.error(existingError);
  // Handle the error
} else {
  // Calculate the new value of Cout by adding 120 to the existing value
  console.log(CombChaqF)
  cout =parseFloat(CombChaqF) * (existingData[0]?.OndemandFoiPM ) ;
   const { data: insertedData, error } = await supabase
   .from('Leads')
   .update({ComChaqF:CombChaqF,Cout:cout})
   .eq('email',EmailForUpdate)// Use a different property name
   console.log(existingData[0]?.OndemandFoiPM);
   Next(1);
}}
 return(
  <>
<form className="py-12 px-12 bg-white rounded-2xl shadow-xl z-20" onSubmit={handleSubmit(onHandleFormSubmit)}>
  <div>
      <div className="flex items-center justify-center">
<div className="rounded-full h-32 w-32 overflow-hidden">
  <img src="Logo.png" alt="Circle" className="  object-cover" />
</div>
</div>			
    <p className="w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-pointer"> Combien vous payez à chaque fois ?</p>
  </div>
  <div className="space-y-4">
 
<div className="text-center flex justify-space-between py-2">
  <label className="radio-label"> 
    <input  required  {...register('combChaqF')} type="text" placeholder="Salaire par semaine" className="block text-sm py-3 px-4 rounded-lg w-full border outline-none" />
  
  </label>
</div>
  </div>
  <div className="text-center mt-6 flex justify-evenly ">
    <button type="button" onClick={() => Back(1)} className="text-l text-white bg-sky-600 rounded-2xl hover:bg-blue-600 font-semibold py-2 px-4">Back</button>
    <button type="submit" className="text-l text-white bg-sky-600 rounded-2xl hover:bg-blue-600 font-semibold py-2 px-4">Next</button>
  </div>
</form>
</>
 )   
}
