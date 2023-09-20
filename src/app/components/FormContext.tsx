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
    Combienmange:number;
    Casaccident:boolean;
    ChangeHousemade:boolean;
    coutPTM:number;
    coutPTH:number;
    coutTP:number;
    coutOndemande:number;
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
        Combienmange:0,
        Casaccident:true,
        ChangeHousemade:true,
        coutPTM:0,
        coutPTH:0,
        coutTP:0,
        coutOndemande:0,
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
            Combienmange:0,
            Casaccident:true,
            ChangeHousemade:true,
            coutPTM:0,
            coutPTH:0,
            coutTP:0,
            coutOndemande:0,
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
