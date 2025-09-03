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
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
//

export function AboutDialog() {
  // const [personalPainText, setPersonalPainText] = useState("");
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <button>About PPP</button>
        </DialogTrigger>
        <DialogContent className="">
          <>
            <DialogHeader> <DialogTitle className="text-[2.2rem]">ABOUT THE PPP MAP </DialogTitle> </DialogHeader>
            <div className="flex-grow overflow-scroll">
              <p className="text-[1.8rem] mb-8">
                PPP (Personal-Planetary-Pain) is an interactive map that visualizes the interconnectedness of ecological loss and human health through the concept of "phantom scars."
              </p>
              <p className="text-[1.8rem] mb-8">
                Users share their personal narratives of pain, adding depth to the collective and lingering pain corresponding to environmental distress in different countries.
              </p>
              <p className="text-[1.8rem] mb-8">
                Drawing from the principles of Traditional Chinese Medicine (TCM), the map highlights how human pain is interconnected with environmental pain through the five elements—Wood, Fire, Earth, Metal, and Water.
              </p>
              <p className="text-[1.8rem] mb-8">
                Focusing on micro and macro issues, the PPP map encourages reflection on the ongoing impact of ecological and health crises, illustrating the holistic relationship between personal and planetary pain.
              </p>
          <img className="max-w-[400px] m-auto" src="/traditional-chinese-medicine-types.png" alt="Wood, Fire, Earth, Metal, and Water arranged in a circle" />
          </div>

        </>
        <DialogFooter className="flex justify-between">
          <DialogClose asChild>
            <button >close</button>
          </DialogClose>
          {/* <button type="submit">next <Icon path={mdiArrowRightThin} size={1} /></button> */}
        </DialogFooter>
      </DialogContent>
    </form>
    </Dialog >
  )
}

export default AboutDialog;
