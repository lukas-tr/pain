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

export function MapLegendDialog() {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <button>Map Legend</button>
        </DialogTrigger>
        <DialogContent className="">
          <>
            <DialogHeader> <DialogTitle className="text-[2.2rem]"> <strong>Map Legend</strong></DialogTitle> </DialogHeader>
            <div className="flex-grow overflow-scroll">
                <p className="text-[1.6rem] mb-8">
               <img loading="lazy" src="PPP-legend.png" className="max-w-150 m-auto max-w-[100%]"/>
               The PPP Map is a research investigatory project exploring the Earth's pain and its ripple effects.
              This map legend provides a holistic perspective on pain through personal, physical, emotional, ecological, socioeconomic, 
              political, collective, and interconnected aspects.
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

export default MapLegendDialog;
