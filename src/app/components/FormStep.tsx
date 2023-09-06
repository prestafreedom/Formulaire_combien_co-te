
import Page2 from "./Page2";
import { useformState } from "./FormContext"; 
import Page3 from "./Page3";
import Page1 from "./Page1";
import PTP from "./PTP";
import PTP_combienM from "./PTP_combienM";
import PTP_combienH from "./PTP_combienH";
import RProduit from "./RProduit";
import Dorchvous from "./Dorchvous";
import Chambre from "./Chambre";
import Electricite from "./Electricite";
import Clima from "./Clima";
import Douche from "./Douche";
import ComfoistravPS from "./PartT_ComfoistravPS";
import PartT_combienparS from "./PartT_combienparS";
import OndemandFoiPM from "./OndemandFoiPM";
import PartT_combienchaquefois from "./PartT_combienchaquefois";
import PartT_ComfoistravPS from "./PartT_ComfoistravPS";
import Combienmange from "./Combienmange";
import Casaccident from "./Casaccident";
import ChangeHousemade from "./ChangeHousemade";
export function FormStep(){
  const {step}=useformState();
  switch(step){
    case 1:
        return <Page1/>;
    case 2:
        return <Page2 />;
    case 3:
        return <Page3/>;
    case 4:
        return <PTP/>;
    case 5:
        return <PTP_combienM/>;
    case 6:
        return <PTP_combienH/>;
    case 7:
            return <Dorchvous/>;
    case 8:
            return <Chambre/>;
    case 9:
            return <Electricite/>;
    case 10:
            return <Clima/>;
    case 11:
            return <Douche/>;
    case 12:
            return <ComfoistravPS/>;
    case 13:
            return <PartT_ComfoistravPS/>;
    case 14:
        return <PartT_combienparS/>;
    case 15:
        return <OndemandFoiPM/>;
    case 16:
        return <PartT_combienchaquefois/>;
    case 17:
            return <RProduit/>;
    case 18:
            return <Combienmange/>;
    case 19:
            return <Casaccident/>;
    case 20:
            return <ChangeHousemade/>;
    default:
        return null;
  }
}