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
            <DialogHeader> <DialogTitle className="">Map Legend</DialogTitle> </DialogHeader>
            <div className="flex-grow overflow-scroll">
              <img loading="lazy" src="howitworks.jpg" className="max-w-150 m-auto max-w-[100%]"/>
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
