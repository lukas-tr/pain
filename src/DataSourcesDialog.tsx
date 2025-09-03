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
          <button>Data Resources</button>
        </DialogTrigger>
        <DialogContent className="">
          <>
            <DialogHeader> <DialogTitle className="">WHERE DOES OUR DATA COME FROM?</DialogTitle> </DialogHeader>
            <div className="flex-grow">
              TODO
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
