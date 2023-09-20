import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { createClient } from '@supabase/supabase-js';
import { useForm} from 'react-hook-form';
import {useformState } from "./FormContext";
type TFormValues = {
  email:string;
  Combienmange:number,
  coutPTM:number;
  radiochoice2:string;
  coutPTH:number;
 };
  const Menu: React.FC = (): JSX.Element => {
  const [selectedCity, setSelectedCity] = useState<string>("1 fois par jour");
  const fois = [
    { nombre: 'une fois par jour' ,key:1},
    { nombre: '2 fois par jour',key:2 },
    { nombre: '3 fois par jour',key:3 },
    { nombre: '4 fois par jour',key:4 },
  ]
  const [selected, setSelected] = useState(fois[0])
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
  let cout;
  if(data.radiochoice2==="Mensuel"){
    cout =data.coutPTM;
  }else if(data.radiochoice2==="Hebdomadaire"){
    cout =data.coutPTH;
  
  }

  const { data: existingData, error: existingError } = await supabase
      .from('Leads')
      .select('Cout ')
      .eq('email', EmailForUpdate);
    if (existingError){
      console.error(existingError);
      // Handle the error
    } else {
      // Calculate the new value of Cout by adding 120 to the existing value
      cout = (existingData[0]?.Cout || 0) +  selected.key* 10 ;

      // Update the database with the new value of Cout
      const { data: insertedData, error } = await supabase
        .from('Leads')
        .update({ Combienmange: 2, Cout: cout })
        .eq('email', EmailForUpdate);
console.log(selected.key);
      if (error) {
        console.error(error);
        // Handle the error
      } else {
        Next(1);
      }
    }}
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
  
  <div className="fixed mb-12 w-62">
      <Listbox value={selected}  {...register('Combienmange')} onChange={setSelected} >
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">{selected.nombre}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="relative mt-1  mb-10 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {fois.map((val, personIdx) => (
                <Listbox.Option
                  key={personIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                    }`
                  }
                  value={val}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {val.nombre}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
      </div>
  </div>
  <div className="text-center mt-6 flex justify-evenly ">
    <button type="button" onClick={() => Back(1)} className="text-l  text-white bg-sky-600 rounded-2xl hover:bg-blue-600 font-semibold py-2 px-4">Back</button>
    <button type="submit" className="text-l text-white bg-sky-600 rounded-2xl hover:bg-blue-600 font-semibold py-2 px-4">Next</button>
  </div>
</form>
    </>
  );
};


export default Menu;
