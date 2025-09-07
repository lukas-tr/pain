# Personal And In Nature

## Reimagining Pain from the Personal to the Planetary

PPP (Personal–Planetary–Pain) is an interactive map that explores the interconnectedness of ecological loss, socioeconomic suffering, and the human pain experience. When the Earth is in pain, we are in pain. Through the concept of "phantom scars,” the Earth’s pain is illustrated by craters on the map that are sonified by their type of destruction. Using the principles of Traditional Chinese Medicine (TCM), PPP links human and environmental pain to imbalances in the five elements—Wood, Fire, Earth, Metal, and Water. Users are invited to share their own narratives of pain, which become part of a growing collective memory tied to sites of ecological distress around the world. By weaving together the personal and the planetary, the PPP map highlights both micro and macro crises, encouraging reflection on how ecological and health challenges leave lasting, interconnected imprints.

## Project Team

- Dora Siafla 
- Hollis Hui
- Julia Guthrie 
- Jack Heseltine
- Ines Gerard-Ursin
- Lukas Troyer
- Mary Maggic
- Mathieu Mahve-Beydokhti
- Michael Artner
- Péter Velősy

## Related Repositories

- https://github.com/heseltime/first-pain (backend)
- https://github.com/7Magic7Mike7/pain (static maps and data)

## Changes

The original version (commit [6bef2b9](https://github.com/lukas-tr/pain/commit/6bef2b9de02b868b0c3e2c11b3d724a75cfe19f5)) was created during the hackathon.

The following changes were made afterwards
- replace `wav` audio with `ogg` because of the huge file size
- replace 8k clouds with 2k clouds texture because of file size
- reduce earth polygon count
- offset the pain layers
- load textures in parallel
- lazy load images
- add project team
- move result card
- color scrollbars
