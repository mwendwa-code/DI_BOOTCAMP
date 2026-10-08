import { useState } from "react";

const quoteData = [
  { quote: "Genius is one percent inspiration and ninety-nine percent perspiration.", author: "Thomas Edison" },
  { quote: "You can observe a lot just by watching.", author: "Yogi Berra" },
  { quote: "A house divided against itself cannot stand.", author: "Abraham Lincoln" },
  { quote: "Difficulties increase the nearer we get to the goal.", author: "Johann Wolfgang von Goethe" },
  { quote: "Fate is in your hands and no one elses", author: "Byron Pulsifer" },
  { quote: "Be the chief but never the lord.", author: "Lao Tzu" },
  { quote: "Nothing happens unless first we dream.", author: "Carl Sandburg" },
  { quote: "Well begun is half done.", author: "Aristotle" },
  { quote: "Life is a learning experience, only if you learn.", author: "Yogi Berra" },
  { quote: "Self-complacency is fatal to progress.", author: "Margaret Sangster" },
  { quote: "Peace comes from within. Do not seek it without.", author: "Buddha" },
  { quote: "What you give is what you get.", author: "Byron Pulsifer" },
  { quote: "We can only learn to love by loving.", author: "Iris Murdoch" },
  { quote: "Life is change. Growth is optional. Choose wisely.", author: "Karen Clark" },
  { quote: "You'll see it when you believe it.", author: "Wayne Dyer" },
  { quote: "Today is the tomorrow we worried about yesterday.", author: "" },
  { quote: "It's easier to see the mistakes on someone else's paper.", author: "" },
  { quote: "Every man dies. Not every man really lives.", author: "" },
  { quote: "To lead people walk behind them.", author: "Lao Tzu" },
  { quote: "Having nothing, nothing can he lose.", author: "William Shakespeare" },
  { quote: "Trouble is only opportunity in work clothes.", author: "Henry J. Kaiser" },
  { quote: "A rolling stone gathers no moss.", author: "Publilius Syrus" },
  { quote: "Ideas are the beginning points of all fortunes.", author: "Napoleon Hill" },
  { quote: "Everything in life is luck.", author: "Donald Trump" },
  { quote: "Doing nothing is better than being busy doing nothing.", author: "Lao Tzu" },
  { quote: "Trust yourself. You know more than you think you do.", author: "Benjamin Spock" },
  { quote: "Study the past, if you would divine the future.", author: "Confucius" },
  { quote: "The day is already blessed, find peace within it.", author: "" },
  { quote: "From error to error one discovers the entire truth.", author: "Sigmund Freud" },
  { quote: "Well done is better than well said.", author: "Benjamin Franklin" },
  { quote: "Bite off more than you can chew, then chew it.", author: "Ella Williams" },
  { quote: "Work out your own salvation. Do not depend on others.", author: "Buddha" },
  { quote: "One today is worth two tomorrows.", author: "Benjamin Franklin" },
  { quote: "Once you choose hope, anythings possible.", author: "Christopher Reeve" },
  { quote: "God always takes the simplest way.", author: "Albert Einstein" },
  { quote: "One fails forward toward success.", author: "Charles Kettering" },
  { quote: "From small beginnings come great things.", author: "" },
  { quote: "Learning is a treasure that will follow its owner everywhere", author: "Chinese proverb" },
  { quote: "Be as you wish to seem.", author: "Socrates" },
  { quote: "The world is always in movement.", author: "V. Naipaul" },
  { quote: "Never mistake activity for achievement.", author: "John Wooden" },
  { quote: "What worries you masters you.", author: "Haddon Robinson" },
  { quote: "One faces the future with ones past.", author: "Pearl Buck" },
  { quote: "Goals are the fuel in the furnace of achievement.", author: "Brian Tracy" },
  { quote: "Who sows virtue reaps honour.", author: "Leonardo da Vinci" },
  { quote: "Be kind whenever possible. It is always possible.", author: "Dalai Lama" },
  { quote: "Talk doesn't cook rice.", author: "Chinese proverb" },
  { quote: "He is able who thinks he is able.", author: "Buddha" },
  { quote: "A goal without a plan is just a wish.", author: "Larry Elder" },
  { quote: "To succeed, we must first believe that we can.", author: "Michael Korda" },
  { quote: "Learn from yesterday, live for today, hope for tomorrow.", author: "Albert Einstein" },
  { quote: "A weed is no more than a flower in disguise.", author: "James Lowell" },
  { quote: "Do, or do not. There is no try.", author: "Yoda" },
  { quote: "All serious daring starts from within.", author: "Harriet Beecher Stowe" },
  { quote: "The best teacher is experience learned from failures.", author: "Byron Pulsifer" },
  { quote: "Think how hard physics would be if particles could think.", author: "Murray Gell-Mann" },
  { quote: "Love is the flower you've got to let grow.", author: "John Lennon" },
  { quote: "Don't wait. The time will never be just right.", author: "Napoleon Hill" },
  { quote: "Time is the wisest counsellor of all.", author: "Pericles" },
  { quote: "You give before you get.", author: "Napoleon Hill" },
  { quote: "Wisdom begins in wonder.", author: "Socrates" },
  { quote: "Without courage, wisdom bears no fruit.", author: "Baltasar Gracian" },
  { quote: "Change in all things is sweet.", author: "Aristotle" },
  { quote: "What you fear is that which requires action to overcome.", author: "Byron Pulsifer" },
  { quote: "When performance exceeds ambition, the overlap is called success.", author: "Cullen Hightower" },
  { quote: "When deeds speak, words are nothing.", author: "African proverb" },
  { quote: "Real magic in relationships means an absence of judgement of others.", author: "Wayne Dyer" },
  { quote: "I never think of the future. It comes soon enough.", author: "Albert Einstein" },
  { quote: "Skill to do comes of doing.", author: "Ralph Emerson" },
  { quote: "Wisdom is the supreme part of happiness.", author: "Sophocles" },
  { quote: "I believe that every person is born with talent.", author: "Maya Angelou" },
  { quote: "Important principles may, and must, be inflexible.", author: "Abraham Lincoln" },
  { quote: "The undertaking of a new action brings new strength.", author: "Richard Evans" },
  { quote: "The years teach much which the days never know.", author: "Ralph Emerson" },
  { quote: "Our distrust is very expensive.", author: "Ralph Emerson" },
  { quote: "All know the way; few actually walk it.", author: "Bodhidharma" },
  { quote: "Great talent finds happiness in execution.", author: "Johann Wolfgang von Goethe" },
  { quote: "Faith in oneself is the best and safest course.", author: "Michelangelo" },
  { quote: "Courage is going from failure to failure without losing enthusiasm.", author: "Winston Churchill" },
  { quote: "The two most powerful warriors are patience and time.", author: "Leo Tolstoy" },
  { quote: "Anticipate the difficult by managing the easy.", author: "Lao Tzu" },
  { quote: "Those who are free of resentful thoughts surely find peace.", author: "Buddha" },
  { quote: "A short saying often contains much wisdom.", author: "Sophocles" },
  { quote: "It takes both sunshine and rain to make a rainbow.", author: "" },
  { quote: "A beautiful thing is never perfect.", author: "" },
  { quote: "Only do what your heart tells you.", author: "Princess Diana" },
  { quote: "Life is movement-we breathe, we eat, we walk, we move!", author: "John Pierrakos" },
];

const quotes = [...new Map(quoteData.map((item) => [item.quote, item])).values()];

const themes = [
  { background: "#f2e8dc", quote: "#9a4f32", button: "#9a4f32" },
  { background: "#e5edf4", quote: "#315c75", button: "#315c75" },
  { background: "#e8eee2", quote: "#4b6843", button: "#4b6843" },
  { background: "#f2e5eb", quote: "#984e70", button: "#984e70" },
  { background: "#ece8f4", quote: "#61518d", button: "#61518d" },
  { background: "#f3edda", quote: "#826516", button: "#826516" },
  { background: "#e2eeeb", quote: "#337267", button: "#337267" },
];

function shuffle(items) {
  const shuffled = [...items];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }

  return shuffled;
}

const styles = `
  .quote-generator,
  .quote-generator * {
    box-sizing: border-box;
  }

  .quote-generator {
    display: grid;
    min-height: 100vh;
    min-height: 100svh;
    place-items: center;
    padding: 40px 22px;
    color: #292821;
    font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    transition: background-color 450ms ease;
  }

  .quote-content {
    width: min(100%, 760px);
    text-align: center;
  }

  .quote-kicker {
    margin: 0 0 22px;
    color: #6d6a63;
    font-size: 0.73rem;
    font-weight: 750;
    letter-spacing: 0.2em;
    text-transform: uppercase;
  }

  .quote-card {
    padding: clamp(34px, 8vw, 76px) clamp(24px, 8vw, 76px) clamp(30px, 6vw, 58px);
    border: 1px solid rgb(54 48 39 / 8%);
    border-radius: 24px;
    background: rgb(255 255 255 / 88%);
    box-shadow: 0 24px 70px rgb(55 44 31 / 12%);
  }

  .quote-mark {
    display: block;
    height: 58px;
    font-family: Georgia, serif;
    font-size: 6rem;
    font-weight: 700;
    line-height: 1;
    opacity: 0.18;
  }

  .quote-text {
    margin: 10px 0 28px;
    color: var(--quote-color);
    font-family: Georgia, "Times New Roman", serif;
    font-size: clamp(1.75rem, 5vw, 3rem);
    font-weight: 500;
    letter-spacing: -0.035em;
    line-height: 1.24;
    transition: color 450ms ease;
  }

  .quote-author {
    margin: 0;
    color: #6d6a63;
    font-size: 0.96rem;
    letter-spacing: 0.045em;
  }

  .quote-author::before {
    display: inline-block;
    width: 28px;
    height: 1px;
    margin: 0 11px 4px 0;
    background: currentColor;
    content: "";
    opacity: 0.55;
  }

  .quote-author::after {
    display: inline-block;
    width: 28px;
    height: 1px;
    margin: 0 0 4px 11px;
    background: currentColor;
    content: "";
    opacity: 0.55;
  }

  .quote-button {
    display: inline-flex;
    min-height: 52px;
    align-items: center;
    justify-content: center;
    gap: 12px;
    margin-top: 34px;
    padding: 0 25px;
    border: 0;
    border-radius: 999px;
    color: #fff;
    cursor: pointer;
    font: inherit;
    font-size: 0.94rem;
    font-weight: 700;
    transition: background-color 450ms ease, transform 160ms ease, box-shadow 160ms ease;
  }

  .quote-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgb(40 36 30 / 17%);
  }

  .quote-button:active {
    transform: translateY(0);
  }

  .quote-button:focus-visible {
    outline: 3px solid #292821;
    outline-offset: 4px;
  }

  .quote-button-arrow {
    font-size: 1.2rem;
    line-height: 1;
  }

  @media (prefers-reduced-motion: reduce) {
    .quote-generator,
    .quote-text,
    .quote-button {
      transition: none;
    }
  }
`;

export default function RandomQuoteGenerator() {
  const [quoteDeck, setQuoteDeck] = useState(() => {
    const deck = shuffle(quotes);
    return { current: deck[0], remaining: deck.slice(1) };
  });
  const [themeIndex, setThemeIndex] = useState(() =>
    Math.floor(Math.random() * themes.length),
  );

  function showNextQuote() {
    setQuoteDeck((previous) => {
      const remaining =
        previous.remaining.length > 0
          ? previous.remaining
          : shuffle(quotes.filter((item) => item.quote !== previous.current.quote));
      const [current, ...rest] = remaining;

      return { current, remaining: rest };
    });

    setThemeIndex((previous) => {
      const alternatives = themes
        .map((_, index) => index)
        .filter((index) => index !== previous);
      return alternatives[Math.floor(Math.random() * alternatives.length)];
    });
  }

  const theme = themes[themeIndex];

  return (
    <main
      className="quote-generator"
      style={{ backgroundColor: theme.background }}
    >
      <style>{styles}</style>
      <div className="quote-content">
        <p className="quote-kicker">A little inspiration</p>
        <section
          className="quote-card"
          aria-label="Random quote"
          style={{ "--quote-color": theme.quote }}
        >
          <span className="quote-mark" aria-hidden="true" style={{ color: theme.quote }}>
            “
          </span>
          <blockquote aria-live="polite" style={{ margin: 0 }}>
            <h1 className="quote-text">{quoteDeck.current.quote}</h1>
            <p className="quote-author">
              {quoteDeck.current.author || "Unknown author"}
            </p>
          </blockquote>
          <button
            className="quote-button"
            onClick={showNextQuote}
            style={{ backgroundColor: theme.button }}
            type="button"
          >
            New quote
            <span className="quote-button-arrow" aria-hidden="true">
              ↗
            </span>
          </button>
        </section>
      </div>
    </main>
  );
}