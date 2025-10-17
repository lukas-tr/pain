
const ALL_WORDS = [
    "corporate greed",
    "poverty",
    "disease",
    "tsunami",
    "grief",
    "depression",
    "anger",
    "injustice",
    "smog",
    "hunger",
    "anxiety",
    "panic",
    "war",
    "suicide",
    "floods",
    "racism",
    "forest fire",
    "toxicity",
    "eruption",
    "deforestation",
    "earthquake",
    "solastalgia",
]

export default function WordCloud({ selectedWords, onSetSelectedWords }: { selectedWords: string[], onSetSelectedWords: (words: string[]) => void }) {
  return (
      <div className="w-full h-full flex flex-wrap gap-2 items-center justify-center p-4 overflow-y-auto">
          {ALL_WORDS.map((word) => (
              <button
                  key={word}
                  className={`mx-5 md:mx-15 lg:mx-20 py-1 ${selectedWords.includes(word) ? 'active' : ''}`}
                  onClick={() => {
                      if (selectedWords.includes(word)) {
                          onSetSelectedWords(selectedWords.filter(w => w !== word));
                      } else {
                          onSetSelectedWords([...selectedWords, word]);
                      }
                  }}
              >
                  {word}
              </button>
          ))}
      </div>
  );
}
