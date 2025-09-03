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
import { useEffect, useState } from "react";
import PointSelector from "./PointSelector";

interface IPainAnalysis {
  bumpmap_url: string; // should be ignored
  deterministic_seed: string; // should be ignored
  model: string; // should be ignored
  source: string; // should be ignored

  lat: number;
  lon: number;
  planetary_view: string;
}

export function ShareYourPainDialog({ onAnalysisComplete }: { onAnalysisComplete?: (analysis: IPainAnalysis) => void }) {
  const [personalPainText, setPersonalPainText] = useState("");
  const [section, setSection] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (section === 3) {
  //     curl -X POST http://localhost:8000/locate-pain \
  // -H "Content-Type: application/json" \
  // -d '{"personal_account":"I feel a tightness in my chest when thinking about wildfires."}'



      fetch('https://pain-ix0y.onrender.com/api/planetary-pain', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          personal_account: personalPainText,
        }),
      }).then(async (res) => {
        setOpen(false);
        if (!res.ok) {
          console.log(await res.text())
          alert("An error occured while submitting your pain");
          return;
        }
        const resVal: IPainAnalysis = await res.json();
        onAnalysisComplete?.(resVal);
      })
    }
  }, [section]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogTrigger asChild>
          <button onClick={() => setSection(0)} >Share Your Pain</button>
        </DialogTrigger>
        <DialogContent className="">
          {section === 0 && (
            <>
              <div className="flex-grow text-center flex flex-col justify-center items-center gap-4">
                <h2>SHARE YOUR PAIN</h2>
                <p> we will locate your pain on the planet's body</p>
                <button onClick={() => setSection(1)}>Continue</button>
              </div>
            </>
          )}
          {section === 1 && (
            <>
              <DialogHeader>
                <DialogTitle className="">What does your pain feel like? Click within the blue areas.</DialogTitle>
              </DialogHeader>
              <div className="flex-grow">
                <PointSelector
                  width={480}
                  height={320}
                  initialPoint={{ x: 0.25, y: 0.75 }}
                  onChange={p => console.log(p)}
                />
              </div>
            </>
          )}
          {section === 2 && (
            <>
              <DialogHeader>
                <DialogTitle className="">Write a personal account of your pain experience</DialogTitle>
              </DialogHeader>
              <div className="flex-grow">
                <textarea
                  value={personalPainText}
                  onChange={(e) => setPersonalPainText(e.target.value)}
                  placeholder="Type here ..."
                  className="w-full h-full"
                />
              </div>
            </>
          )}
          {section === 3 && (
              <div className="flex-grow text-center flex flex-col justify-center items-center gap-4 text-gray-400">
                <h2 className="text-[2rem] pulse-opacity">sentimental-ecological analysis ...</h2>
              </div>
          )}
          <DialogFooter className="flex justify-between">
            {section !== 3 && (

            <DialogClose asChild>
              <button onClick={() => setSection(0)}>close</button>
            </DialogClose>
            )}
            {(section !== 0 && section !== 3) &&
              <button disabled={(
                section === 2 && personalPainText.trim().length === 0
              )} type="submit" onClick={() => setSection((prev) => prev + 1)}>next <Icon path={mdiArrowRightThin} size={1} /></button>
            }
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}

export default ShareYourPainDialog;
