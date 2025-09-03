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

export function ShareYourPainDialog() {
  const [personalPainText, setPersonalPainText] = useState("");
  const [section, setSection] = useState(0);
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <button variant="outline">Share Your Pain</button>
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
              <button variant="outline" onClick={() => setSection(0)}>close</button>
            </DialogClose>
            {section !== 0 &&
            <button type="submit">next <Icon path={mdiArrowRightThin} size={1} /></button>
            }
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}

export default ShareYourPainDialog;
