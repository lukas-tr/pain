// import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { mdiArrowRightThin } from "@mdi/js";
import Icon from "@mdi/react";
import { useState } from "react";
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
//
function Legend() {
  return (
    <div className="legend">
      <div className="legend-row">
        <div style={{ backgroundImage: "linear-gradient(to top, darkgrey , white)", width: "2rem", height: "2rem", flexShrink: 0, border: "1px solid var(--fg-primary)", borderRadius: 4 }}></div>
        <p>
          <strong>Environmental Destruction</strong> (air pollution, deforestation, toxicity, rare earth mining, fires, earthquakes, floods)
        </p>
      </div>

      <div className="legend-row">
        <div style={{ backgroundColor: "#ff00ff", width: "2rem", height: "2rem", flexShrink: 0, border: "1px solid var(--fg-primary)", borderRadius: 4 }}></div>
        <p>
          <strong>Physiological and Physical Pain</strong> (human health datasets, asthma rates, chronic pain, cancers and diseases)
        </p>
      </div>

      <div className="legend-row">
        <div style={{ backgroundColor: "#00ffff", width: "2rem", height: "2rem", flexShrink: 0, border: "1px solid var(--fg-primary)", borderRadius: 4 }}></div>
        <p>
          <strong>Emotional Pain</strong> (social media posts, personal narratives, grief, solastalgia, anxiety, depression)
        </p>
      </div>

      <div className="legend-row">
        <div style={{ backgroundColor: "#ffff00", width: "2rem", height: "2rem", flexShrink: 0, border: "1px solid var(--fg-primary)", borderRadius: 4 }}></div>
        <p>
          <strong>Socio-economic Pain</strong> (social vulnerability indexes, deaths in conflicts, poverty rates, healthcare, GDP, human rights index)
        </p>
      </div>


    </div>
  )
}


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
          </div>

        </>
        <DialogFooter className="flex justify-between">
          <DialogClose asChild>
            <button variant="outline">close</button>
          </DialogClose>
          {/* <button type="submit">next <Icon path={mdiArrowRightThin} size={1} /></button> */}
        </DialogFooter>
      </DialogContent>
    </form>
    </Dialog >
  )
}

export default AboutDialog;
