import React, { useState } from "react";
import DropDown from "./DropDown";
import { type } from "os";
import { createClient } from '@supabase/supabase-js';
import { useForm} from 'react-hook-form';
import {useformState } from "./FormContext";
type TFormValues = {
  email:string;
  Combienmange:string,
 };
const Menu: React.FC = (): JSX.Element => {
  const [showDropDown, setShowDropDown] = useState<boolean>(true);
  const [selectedCity, setSelectedCity] = useState<string>("1 fois par jour");

  const cities = () => {
    return ["1 fois par jour", "2 fois par jour", "3 fois par jour",
     "4  fois par jour","5 fois par jour",];
  };
  /**
   * Toggle the drop down menu
   */
  const toggleDropDown = () => {
    setShowDropDown(!showDropDown);
  };
  /**
   * Hide the drop down menu if click occurs
   * outside of the drop-down element.
   *
   * @param event  The mouse event
   */
  
  /**
   * Callback function to consume the
   * city name from the child component
   *
   * @param city  The selected city
   */
  // const citySelection = (city: string): void => {
  //   setSelectCity(city);
  //   console.log(city);  
  // };
  const supabase = createClient('https://aircrqmfhskltskuuzfs.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpcmNycW1maHNrbHRza3V1emZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk2MDE1NzcsImV4cCI6MjAwNTE3NzU3N30.jNOkALDaV8hxb4gdx9cOZ0V14c_jWwn3a-w5t723Fc8');
  const {Next,Back,setFormData,formData} = useformState();
  const { register,handleSubmit} =useForm<TFormValues>({
    defaultValues:formData,
  });
  const [rP,setRP]=useState(true);
  async function onHandleFormSubmit(data:TFormValues)
{
  setFormData(prevFormData => ({ ...prevFormData,...data, Travailfois: selectedCity  }));
  const RP=data.Combienmange;
  const EmailForUpdate =  data.email;

  const { data: insertedData, error } = await supabase
  .from('Leads')
  .update({ Combienmange: selectedCity })
  .eq('email', EmailForUpdate);// Use a different property name
    Next(1);
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
    <p className="w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-pointer">Combien de fois mange-t-elle chez vous ?</p>
  </div>
  <div className="space-y-4 ">

  <div className="text-center  flex items-center  drop flex-col  " >
  
      <button type="button"
    {...register('Combienmange')} 
      >
        <button className="bg-blue-600 text-white " >{selectedCity ?  selectedCity :selectedCity } </button>
        {showDropDown && (
          <DropDown
  cities={cities()}
  showDropDown={showDropDown}
  toggleDropDown={toggleDropDown}
  citySelection={(city: string) => setSelectedCity(city)} 
/>
        )}
      </button>
      </div>
  </div>
  <div className="text-center mt-6 flex justify-evenly ">
    <button type="button" onClick={() => Back(1)} className="text-l  text-white bg-sky-600 rounded-2xl hover:bg-blue-600 text-white font-semibold py-2 px-4">Back</button>
    <button type="submit" className="text-l text-white bg-sky-600 rounded-2xl hover:bg-blue-600 text-white font-semibold py-2 px-4">Next</button>
  </div>
</form>
    </>
  );
};

export default Menu;
