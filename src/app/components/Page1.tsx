"use client";
import { type } from "os";
import { createClient } from '@supabase/supabase-js';
import { useForm } from 'react-hook-form';
import { useformState } from "./FormContext";

 type TFormValues = {
   prenom: string;
   nom: string;
   email: string;
 };
export default function Page1(){
  const supabase = createClient('https://aircrqmfhskltskuuzfs.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpcmNycW1maHNrbHRza3V1emZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk2MDE1NzcsImV4cCI6MjAwNTE3NzU3N30.jNOkALDaV8hxb4gdx9cOZ0V14c_jWwn3a-w5t723Fc8');
  const {Next,setFormData,formData}=useformState();
    const { register,handleSubmit} =useForm<TFormValues>({

      defaultValues :formData,
    });
    
    async function onHandleFormSubmit(data: TFormValues) {
      setFormData(prevFormData => ({ ...prevFormData, ...data}));
      const insertionData = [{ Prenom: data.prenom, Nom: data.nom, email: data.email}];

      const { data: insertedData, error } = await supabase
      .from('Leads')
      .insert(insertionData)
      // Use a different property name
      Next(1);
    }

 return(
<form onSubmit={handleSubmit(onHandleFormSubmit)}>
	<div className="py-12 px-12 bg-white rounded-2xl shadow-xl z-20">
		<div>
        <div className="flex items-center justify-center">
  <div className="rounded-full h-32 w-32 overflow-hidden">
    <img src="Logo.png" alt="Circle" className="  object-cover" />
  </div>
</div>			
			<p className="w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-pointer"></p>
		</div>
		<div className="space-y-4">
			<input required  {...register('prenom')} type="text" placeholder="Prènom " className="block text-sm py-3 px-4 rounded-lg w-full border outline-none" />
			<input required {...register('nom')} type="text" placeholder="Nom" className="block text-sm py-3 px-4 rounded-lg w-full border outline-none" />
			<input required {...register('email')} type="text" placeholder="email" className="block text-sm py-3 px-4 rounded-lg w-full border outline-none" />
    </div>
			<div className="text-center mt-6">
        
				<button  className="text-l text-white bg-sky-600 rounded-2xl hover:bg-blue-600 text-white font-semibold py-2 px-4">Suivant</button>
			</div>
		</div>
        </form>
 )   
}
