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
            <DialogHeader> <DialogTitle className="text-[2.2rem]"><strong> ABOUT THE PPP MAP </strong></DialogTitle> </DialogHeader>
            <div className="flex-grow overflow-y-auto">
              <p className="text-[1.8rem] mb-8">
                <img loading="lazy" src="/pain.png" width={550} height={300} alt="P.A.I.N. logo" />
                <strong> PPP (Personal–Planetary–Pain) </strong>is an interactive map that explores the interconnectedness of ecological loss, socioeconomic suffering, and the human pain experience.
                When the Earth is in pain, we are in pain.
                Through the concept of "phantom scars,” the Earth’s pain is illustrated by craters on the map that are sonified by their type of destruction. Using the principles of Traditional Chinese Medicine (TCM), PPP links human and environmental pain to imbalances in the five elements—Wood, Fire, Earth, Metal, and Water.
                Users are invited to share their own narratives of pain, which become part of a growing collective memory tied to sites of ecological distress around the world.
                By weaving together the personal and the planetary, the PPP map highlights both micro and macro crises, encouraging reflection on how ecological and health challenges leave lasting, interconnected imprints.

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
              <img loading="lazy" className="max-w-[400px] m-auto" src="/traditional-chinese-medicine-types.png" alt="Wood, Fire, Earth, Metal, and Water arranged in a circle" />
              <h2 className="text-[2rem] font-[800] mb-4">Project Team</h2>
              <ul className="text-[1.8rem] mb-8 list-disc list-inside">
                <li>Dora Siafla</li>
                <li>Hollis Hui</li>
                <li>Julia Guthrie</li>
                <li>Jack Heseltine</li>
                <li>Ines Gerard-Ursin</li>
                <li>Lukas Troyer</li>
                <li>Mary Maggic</li>
                <li>Mathieu Mahve-Beydokhti</li>
                <li>Michael Artner</li>
                <li>Péter Velősy</li>
              </ul>

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
