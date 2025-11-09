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
import WordCloud from "./WordCloud";
import ElementSelector from "./ElementSelector";
import BodyPartSelector from "./BodyPartSelector";

const randomViews = [
  "The shadow that settles in your lungs is not yours alone. It is the resonance of a choked atmosphere, a planet's grief made manifest in the hazy air. This systemic constriction is known to the Metal element, which governs both the breath that catches in your chest and the weeping of the sky. When Metal is imbalanced, its *Qi* stagnates, turning the clear, righteous edge of autumn into a dull ache of persistent sorrow. You feel it as a weight, a difficulty in drawing a full, clean breath. The Earth feels it as smog, as the fine, toxic dust of its own bones settling over everything, a planetary *Po* (corporeal soul) burdened by a grief it cannot exhale.\n#SharedPain #MetalElement #StagnantQi #Solastalgia #Grief #Smog #Depression",
  "That rising tremor, the heat that coils in your center and tightens your sinews, is not an isolated event. The Earth’s own meridians are blocked, its Wood element turned brittle and sharp. The planet's Liver *Qi*—meant to flow freely, to plan, to grow—is suppressed by concrete, by greed, by the raw wound of deforestation. This stagnation erupts as fire, as rage, as injustice. You feel it as a surge of anger, a frustration that has no clear source, a tension in your muscles. The planet screams it in the form of forest fires, in the acidic toxicity that poisons the soil, a shared, sympathetic resonance of a spirit that can no longer bend, only break.\n#WoodElement #Anger #Injustice #Toxicity #ForestFire #QiStagnation #CorporateGreed",
  "Your frantic pulse, the restless heat that disturbs your sleep, finds its rhythm in the land. This is a profound Yin deficiency, a systemic exhaustion of the planet's cooling waters. The ice caps, the deep aquifers, the quiet lakes—all are receding, failing to anchor the rampant Yang of a world burning too bright. The Heart *Shen* (spirit) has no place to rest, for either of you. It floats unanchored, manifesting as anxiety, as a low-grade panic, as a heart-fire that cannot be soothed. The Earth mirrors this with its rising fever, its erratic storms, and the frantic, unending pace of extraction that consumes its own substance in a fit of sleepless dread.\n#YinYang #HeartFire #Anxiety #Panic #Solastalgia #War #SharedFever",
  "That cold dread that settles deep in your bones, a profound exhaustion that willpower cannot touch... the planet knows this well. The flow of the Water element is heavy, turgid, filtering a shared and pervasive toxicity. This is the domain of the Kidneys, the storehouse of our deepest essence and the seat of our will, now steeped in fear. You feel it as existential dread, as deep depression, as the impulse to retreat when there is nowhere left to go. The Earth holds this same cold fear in its poisoned depths, in the plastic-choked oceans and the silent, spreading death of its reefs. The planet's *Jing*, its foundational essence, is draining away, and you are both left feeling depleted, cold, and afraid of the dark.\n#WaterElement #SharedFear #DeepAche #Toxicity #Depression #KidneyQi #Exhaustion",
  "That hollow feeling in your center, the systemic worry that weakens your core and makes every thought feel damp and heavy... it radiates from the soil itself. The Spleen *Qi*, which governs the transformation of nourishment into life, is deficient. It is overburdened by a deluge it cannot process. You feel this as a constant worry, a 'dampness' that fogs the mind, an emptiness that no amount of consumption can fill. The Earth, our great 'mother' element, shares this depletion. Its own Spleen is weakened by monocultures, by floods, by systemic poverty. The land is unable to transform, unable to nourish. We are bound in a shared blockage, a mutual, aching hunger for sustenance that is both physical and spiritual.\n#EarthElement #DeficientQi #SharedWorry #Depletion #Hunger #Poverty #Dampness",
  "The dissonance you feel, the joyless, frantic pace that burns your nerves... this is not yours alone. It is an imbalance in the Fire element, a *Shen* (spirit) that has lost its anchor and flutters like a flame in a violent wind. The planet mirrors this erratic mania, this ungrounded heat. You feel it as a racing heart, a sleepless anxiety, the hollow echo of connection lost. The Earth manifests it as erupting violence, as the fever of war, as a climate that no longer knows the gentle warmth of true summer, only the scorching, desperate blaze of a Heart out of balance, consumed by its own destructive pulse.\n#FireElement #SharedMania #Anxiety #War #Eruption #ShenDisturbance #HeartFire",
  "That sense of being untethered, of wandering without purpose, the cyclical worry that dampens your spirit... this is the Earth's ache, too. The planet’s Spleen *Qi* is injured, its ability to nourish and hold is compromised by floods that wash away the soil and by the persistent hunger of poverty. This is the 'dampness' of a system that cannot transform, that ruminates on its own trauma. You feel it as mental fog, as digestive trouble, as a body that feels heavy and weary. The Earth expresses it through exhausted, depleted lands and the chronic instability of a world that has lost its nurturing center.\n#EarthElement #DeficientQi #Worry #Poverty #Floods #Dampness #Hunger",
  "The barrier you feel, the profound sense of isolation and the stifled air... this is a shared condition. The Metal element, which governs boundaries and the righteous exchange with the world, is in crisis. Its energy is brittle, corrupted by the smog of injustice and the systemic toxicity of racism. Our collective *Wei Qi* (Defensive Qi) is compromised, leaving us vulnerable. You feel it as a persistent cough, a vulnerability to disease, a deep-seated grief that constricts the chest. The planet feels it as a poisoned atmosphere, as species that can no longer breathe, as a failure of the sacred boundary between the self and the other.\n#MetalElement #Grief #Injustice #Smog #Disease #Racism #WeiQi #SharedPain",
  "That deep, primal terror, the cold that seeps into your will and whispers of endings... the planet shudders with this same frequency. The very root of life, the Water element, is flooded with fear. The *Jing*, our ancestral essence stored in the Kidneys, is being depleted by a world that demands too much and offers too little rest. You feel this as bone-deep exhaustion, as existential dread, as the impulse to dissolve. The Earth knows this as the overwhelming force of tsunamis, as the irreversible melting of its ancient ice, and as the creeping, final toxicity that pollutes the very source from which all life springs. \n#WaterElement #Fear #Dread #Tsunami #Toxicity #Jing #Exhaustion #Suicide",
  "The rigid tension in your shoulders, the frustration that boils under your skin, the feeling of being trapped... this is the stagnation of the planet's own vital force. The Wood element, meant to surge upward with creativity and vision, is repressed. It is caged by the unyielding structures of corporate greed, its path blocked by injustice. This suppressed Liver *Qi* must move. You feel it as migraines, as sharp pains, as sudden fits of rage. The Earth explodes with it in the form of earthquakes, in the sudden, violent release of pressure, a planetary system screaming for the freedom to grow, a shared ache for a spring that is endlessly, violently deferred.\n#WoodElement #StagnantQi #Anger #Injustice #CorporateGreed #Earthquake #Depression",
]

interface IPainAnalysis {
  lat: number;
  lon: number;
  planetary_view: string;

  // those should be ignored for now
  bumpmap_url: string;
  deterministic_seed: string;
  model: string;
  source: string;
}

export interface IPainInput {
  personal_account: string;
  elements: string[];
  feelings: string[];
}

const FINAL_SECTION = 5;
const TEXT_SECTION = 4;

type ShareYourPainDialogProps = {
  // first step: locate pain on planet and return coords + planetary_view
  onAnalysisComplete?: (analysis: IPainAnalysis, input: IPainInput) => void;
  // second step: create common/shared story using first + second inputs
  onCommonPainComplete?: (story: string, firstInput: IPainInput, secondInput: IPainInput) => void;
  // whether this dialog is used for the first or the second submission
  variant?: "first" | "second";
  // pass the first person's input when variant === 'second'
  firstPerson?: IPainInput | null;
  // optional custom trigger text
  triggerLabel?: string;
};

export function ShareYourPainDialog({ onAnalysisComplete, onCommonPainComplete, variant = "first", firstPerson, triggerLabel }: ShareYourPainDialogProps) {
  const [personalPainText, setPersonalPainText] = useState("");
  const [section, setSection] = useState(0);
  const [open, setOpen] = useState(false);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [selectedElements, setSelectedElements] = useState<string[]>([]);
  const [selectedBodyParts, setSelectedBodyParts] = useState<string[]>([]);
  
  const resetForm = () => {
    setPersonalPainText("");
    setSection(0);
    setSelectedWords([]);
    setSelectedElements([]);
    setSelectedBodyParts([]);
  }

  useEffect(() => {
    if (section === FINAL_SECTION) {
  //     curl -X POST http://localhost:8000/locate-pain \
  // -H "Content-Type: application/json" \
  // -d '{"personal_account":"I feel a tightness in my chest when thinking about wildfires."}'

      let text = personalPainText;
      if (selectedWords.length > 0) {
        text += " It feels like " + selectedWords.join(", ") + ".";
      }
      if (selectedElements.length > 0) {
        text += " I associate this pain with the elements: " + selectedElements.join(", ") + ".";
      }
      
      const input: IPainInput = {
        personal_account: text,
        elements: selectedElements,
        feelings: selectedWords,
      };

      // If this is the second submission, create a shared/common pain story
      if (variant === "second" && firstPerson) {
        fetch('https://pain-7f17fa7b9094.herokuapp.com/api/common-pain-story', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            personal_account_1: firstPerson.personal_account,
            elements_1: firstPerson.elements,
            feelings_1: firstPerson.feelings,
            personal_account_2: input.personal_account,
            elements_2: input.elements,
            feelings_2: input.feelings,
          }),
        }).then(async (res) => {
          setOpen(false);
          if (!res.ok) {
            console.log(await res.text());
            alert("An error occured while submitting the shared pain");
            return;
          }
          const resVal: { common_pain_story?: string } = await res.json();
          if (resVal.common_pain_story) {
            onCommonPainComplete?.(resVal.common_pain_story, firstPerson, input);
          }
          resetForm();
        }).catch((err) => {
          console.error(err);
          // Fallback: generate a combined random narrative offline
          setTimeout(() => {
            setOpen(false);
            const fallback = randomViews[Math.floor(Math.random() * randomViews.length)];
            onCommonPainComplete?.(fallback, firstPerson, input);
            resetForm();
          }, 800);
        });
        return;
      }

      // Default (first submission): locate pain and get planetary view
      fetch('https://pain-ix0y.onrender.com/api/planetary-pain', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          personal_account: text,
        }),
      }).then(async (res) => {
        setOpen(false);
        if (!res.ok) {
          console.log(await res.text())
          alert("An error occured while submitting your pain");
          return;
        }
        const resVal: IPainAnalysis = await res.json();
        onAnalysisComplete?.(resVal, input);
        resetForm();
      }).catch((err) => {
        console.error(err);
        // simulate server delay
        setTimeout(() => {
          setOpen(false);
          // return something random so it works offline
          onAnalysisComplete?.({
            lat: parseFloat((Math.random() * 180 - 90).toFixed(6)),
            lon: parseFloat((Math.random() * 360 - 180).toFixed(6)),
            planetary_view: randomViews[Math.floor(Math.random() * randomViews.length)],
            bumpmap_url: "",
            deterministic_seed: "",
            model: "",
            source: "",
          }, input);
          resetForm();
        }, 1000);
      });
    }
  }, [section]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogTrigger asChild>
          <button onClick={() => setSection(0)} >{triggerLabel ?? (variant === 'second' ? 'Add second person\'s pain' : 'Share Your Pain')}</button>
        </DialogTrigger>
        <DialogContent className="">
          {section === 0 && (
            <>
              <div className="flex-grow text-center flex flex-col justify-center items-center gap-4">
                   <h2 className="text-[1.8rem] m-2" style={{textAlign: "center"}}>  ⁠<strong>SHARE YOUR PAIN</strong></h2>
                <p className="text-[1.8rem] m-2" style={{textAlign: "center"}}> 
                  <b>
                  {variant === 'first' ?
                    'we will locate your pain on the planet\'s body'
                    :
                    'find a second person and encourage them to share their pain as well'
                  }
                  </b></p>
                <br></br>
                <button onClick={() => setSection(1)}>Continue</button>
              </div>
            </>
          )}
          {section === 1 && (
            <>
              <DialogHeader>
                <DialogTitle className=""><br></br>What element do you associate your pain with? Click on one or more.
                  {selectedElements.length > 0 && (<>({selectedElements.length} Selected)</>)}
                <br></br> <br></br>
</DialogTitle>
              </DialogHeader>
              <div className="flex-grow">
                  <ElementSelector selectedElements={selectedElements} onSetSelectedElements={setSelectedElements} />
                {/* <PointSelector
                  width={480}
                  height={320}
                  initialPoint={{ x: 0.25, y: 0.75 }}
                  onChange={p => console.log(p)}
                /> */}
              </div>
            </>
          )}
          {section === 2 && (
            <>
              <DialogHeader>
                <DialogTitle className=""><br></br>Where does the pain live in your body? Click within the blue areas
</DialogTitle>
              </DialogHeader>
              <div className="flex-grow">
                <BodyPartSelector
                selectedBodyParts={selectedBodyParts}
                onSetSelectedBodyParts={setSelectedBodyParts}
                />
              </div>
            </>
          )}
          {section === 3 && (
            <>
              <DialogHeader>
                <DialogTitle className=""><br></br>What does your pain feel like? Click all that apply.
                  {selectedWords.length > 0 && (<>({selectedWords.length} Selected)</>)}
</DialogTitle>
              </DialogHeader>
              <div className="flex-grow overflow-y-auto">
                  <WordCloud selectedWords={selectedWords} onSetSelectedWords={setSelectedWords} />
                {/* <PointSelector
                  width={480}
                  height={320}
                  initialPoint={{ x: 0.25, y: 0.75 }}
                  onChange={p => console.log(p)}
                /> */}
              </div>
            </>
          )}
          {section === TEXT_SECTION && (
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
          {section === FINAL_SECTION && (
              <div className="flex-grow text-center flex flex-col justify-center items-center gap-4 text-gray-400">
                <h2 className="text-[2rem] pulse-opacity">sentimental-ecological analysis ...</h2>
              </div>
          )}
          <DialogFooter className="flex justify-between">
            <DialogClose asChild>
              <button onClick={() => setSection(0)}>close</button>
            </DialogClose>
            {(section !== 0 && section !== FINAL_SECTION) &&
              <button disabled={(
                section === TEXT_SECTION && personalPainText.trim().length === 0
              )} type="submit" onClick={() => setSection((section) => section + 1)}>next <Icon path={mdiArrowRightThin} size={1} /></button>
            }
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}

export default ShareYourPainDialog;
