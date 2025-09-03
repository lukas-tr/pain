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
import { mdiArrowRightThin } from "@mdi/js";
import Icon from "@mdi/react";
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
            <DialogHeader> <DialogTitle className="">How it works?</DialogTitle> </DialogHeader>
            <div className="flex-grow">
              <img src="howitworks.jpg" className="max-w-300"/>
            </div>

          </>
          <DialogFooter className="flex justify-between">
            <DialogClose asChild>
              <button >close</button>
            </DialogClose>
            <button type="submit">next <Icon path={mdiArrowRightThin} size={1} /></button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}

export default DataSourcesDialog;
