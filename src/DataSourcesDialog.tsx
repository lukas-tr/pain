// import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
//import { mdiArrowRightThin } from "@mdi/js";
//import Icon from "@mdi/react";
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
//


export function DataSourcesDialog() {
  // const [personalPainText, setPersonalPainText] = useState("");
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <button>How it works?</button>
        </DialogTrigger>
        <DialogContent className="">
          <>
            <DialogHeader> <DialogTitle className="text-[2.2rem]"><strong>How it works?</strong></DialogTitle> </DialogHeader>
            <div className="flex-grow overflow-scroll">
              <p className="text-[1.6rem] mb-8">
             <img loading="lazy" src="howitworks.jpg" className="max-w-150 m-auto max-w-[100%]"/>
             Navigate the PPP Map by rotating and zooming in on the Earth’s surface. As you travel from one place to another, each point emits a sound associated with one of the five elements: wood, fire, earth, metal, and water. These elements represent the type of environmental pain that the planet is experiencing. 
              <br></br>
              Use the “Map Legend”to view how the Earth’s pain correlates with Physical Pain (red), Emotional Pain (blue), and Socioeconomic Pain (yellow).
               <br></br>
              Then click on “Share Your Pain” to share your experience, which will be matched to a location on the planet’s body. This map encourages reflection on your relationship with planetary pain. Enjoy your exploration!
             </p>
            
            </div>
          </>

          <DialogFooter className="flex justify-between">
            <DialogClose asChild>
              <button >close</button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}

export default DataSourcesDialog;
