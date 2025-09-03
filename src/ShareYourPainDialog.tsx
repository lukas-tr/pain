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
import { useState } from "react";
import PointSelector from "./PointSelector";

export function ShareYourPainDialog() {
  const [personalPainText, setPersonalPainText] = useState("");
  const [section, setSection] = useState(0);
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <button >Share Your Pain</button>
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
          <DialogFooter className="flex justify-between">
            <DialogClose asChild>
              <button onClick={() => setSection(0)}>close</button>
            </DialogClose>
            {section !== 0 &&
              <button type="submit" onClick={() => setSection((prev) => prev + 1)}>next <Icon path={mdiArrowRightThin} size={1} /></button>
            }
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}

export default ShareYourPainDialog;
