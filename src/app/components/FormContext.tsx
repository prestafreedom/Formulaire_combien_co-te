import { Dispatch, ReactNode ,SetStateAction,createContext, useContext, useState } from "react";
interface IFormData{
    prenom:string;
    email:string;
    nom:string;
    quartier:string,
    superficie:string,
    tele:string,
    radiochoice1:string,
    radiochoice2:string,
    combienparmois:string,
    rProduits:boolean;
    dor:boolean;
    chambre:boolean;
    electricite:boolean;
    clima:boolean;
    douche:boolean;
    Travailfois:string;
    partTSalPS:string;
    onDravailfois:string;
    combChaqF:string;
    Combienmange:string;
    Casaccident:boolean;
    ChangeHousemade:boolean;
}
interface IFormContext{
    Next: (StepNumber: number) => void;
    Back: (StepNumber: number) => void;
    
    step:number;
    formData:IFormData;
    setFormData:Dispatch<SetStateAction<IFormData>>;
}
const FormContext = createContext<IFormContext>({
    Next:(StepNumber:number)=> {},
    Back:(StepNumber:number)=> {},
    
    step:1,
    formData:{
        prenom:"",
        email:"",
        nom:"",
        quartier:"",
        superficie:"",
        tele:"",
        radiochoice1:"",
        radiochoice2:"",
        combienparmois:"",
        rProduits:true,
        dor:true,
        chambre:true,
        electricite:true,
        clima:true,
        douche:true,
        Travailfois:"",
        partTSalPS:"",
        onDravailfois:"",
        combChaqF:"",
        Combienmange:"",
        Casaccident:true,
        ChangeHousemade:true,
    },
    setFormData:()=>{},
});
interface IProps{
    children:ReactNode;
}
export function FormProvider({children}: IProps){

    const [step,setStep]=useState(1);
    const [formData,setFormData] =useState<IFormData>({        
            prenom:"",
            email:"",
            nom:"",
            quartier:"",
            superficie:"",
            tele:"",
            radiochoice1:"",
            radiochoice2:"",
            combienparmois:"",
            rProduits:true,
            dor:true,
            chambre:true,
            electricite:true,
            clima:true,
            douche:true,
            Travailfois:"",
            partTSalPS:"",
            onDravailfois:"",
            combChaqF:"",
            Combienmange:"",
            Casaccident:true,
            ChangeHousemade:true,
        },
    );
    function Next(StepNumber:number){
        setStep((prevValue) => prevValue + StepNumber);
        
    }
    function Back(StepNumber:number){
            setStep((prevValue) => prevValue - StepNumber);
        }
    console.log({formData});
    return (
    <FormContext.Provider value={{Next,Back,step,formData,setFormData}}>
        {children}
    </FormContext.Provider>
    );
}
export function useformState(){
  return useContext(FormContext);
}
