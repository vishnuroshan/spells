/* eslint-disable jsx-a11y/media-has-caption */
import type { MetaFunction, TypedResponse } from "@remix-run/node";
import { useState, useEffect, createContext } from "react";
import '~/styles/globals.css';
import { json, useLoaderData } from "@remix-run/react";

const ThemeContext = createContext("light");

interface Spell {
  id: string;
  type: string;

  attributes: {
    incantation: string;
    effect: string;
    hand: string;

  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const transformData = (data: any[]) : Spell[] => {
  return data.filter((e: Spell) => e.type === "spell"
      && e.attributes.incantation && e.attributes.incantation !== 'None').map((e: Spell) => {
        return {...e};
      })
}

export async function loader(): Promise<TypedResponse<SpellResp>> {
  console.log("calling spell API from backend");
  const res = await fetch(`https://api.potterdb.com/v1/spells`)
  const spells = await res.json();
  const data = transformData(spells.data);
  return json({
    data
  })
}

interface SpellResp { data: Spell[] }

export const meta: MetaFunction = () => {
  return [
    { title: "Spells" },
    { name: "description", content: "harry potter spells" },
  ];
};

export default function Index() {
  const [spells, setSpells] = useState<Spell[]>([]);
  const [theme, setTheme] = useState("light");
  const [q, setQ] = useState('');
  const initSpells = useLoaderData<typeof loader>()
  useEffect(() => {
    setSpells(initSpells.data);
  }, []);

  useEffect(() => {
    if (q && q.length) {
      const s = setTimeout(() => {
        fetch(`https://api.potterdb.com/v1/spells${q ? `?filter[incantation_cont]=${q}` : ''}`).then(stream => {
          return stream.json();
        }).then((spells: SpellResp) => {

          if (spells.data?.length > 0) {
            setSpells(transformData(spells.data));
          } else {
            setSpells([]);
          }
        })
      }, !q || q?.length > 2 ? 300 : 1000)
      return () => clearTimeout(s);
    } else { setSpells(initSpells.data) }
  }, [q])

  return (
    <ThemeContext.Provider value={theme}>
      <div className={`content-${theme}`}>
        <nav>
          <div className='nav-left' title="initial data from server loader function">
            Spells 🎩 🪄 🐇
          </div>
          <div className='nav-right' title="using context to switch between themes">
            <input type='radio' checked={theme === "light"} onChange={() => { setTheme('light'); document.body.style.backgroundColor = "white" }} title='light' />
            <label htmlFor="html">Light</label>
            <input type='radio' checked={theme === "dark"} onChange={() => { setTheme('dark'); document.body.style.backgroundColor = "black" }} title='dark' />
            <label htmlFor="html">Dark</label>
          </div>
        </nav>

        <div className={`bg-${theme}`}>
          <section>
            <div className={`search-box-${theme}`}>
              <input placeholder='search spells by name' onChange={(event) => setQ(event.target.value)} value={q} className={`search-input-${theme}`} />
            </div>
          </section>
          <section>
            <div className={`list-${theme}`}>
              {spells.map((spell) => (
                <div key={spell.id}>
                  <p className={`item-${theme}`}>{spell.attributes.incantation} - {spell.attributes.effect}</p>
                </div>

              ))}
            </div>
          </section>
        </div>
        <div className="footer">
          made with ❤️ in <a style={{color: 'white'}} href="https://remix.run/" target="_blank" rel="noreferrer">remix</a>
        </div>
      </div>


    </ThemeContext.Provider>
  );
}
