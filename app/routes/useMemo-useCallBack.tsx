import { MetaFunction } from "@remix-run/node";
import { useCallback, useEffect, useMemo, useState } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "useMemo" },
    { name: "description", content: "useMemo learnings..." },
  ];
};


  const getArray = () => {
    for (let i = 0; i < 100000000; i++) {
      // expensive for loop
    }

    return ['me', 'mine'];
  }


export default function Fib() {
  const [userNumber, setUserNumber] = useState<string>('');
  const [randomInput, setRandomInput] = useState<string>('');

  const fib = useCallback((n: string | number): number => {
    const d = Number(n);
    return (d <= 1) ? d : fib(d - 1) + fib(d - 2);
  }, [])
  
  const fibNumber = useMemo(() => fib(userNumber), [userNumber, fib]);
  
  const myArray = useMemo(()=>getArray(),[])

  useEffect(() => {
    console.log('new array');
  }, [myArray]);

  return (
    <div>
      <div>
        <label htmlFor="fib_n">Fibonacci series</label>
        <input name='fib_n' value={userNumber} type="number" onChange={(e) => setUserNumber(e.target.value)} />
        <p>Number: {fibNumber || '--'}</p>
      </div>

      <div>
        <label htmlFor="fib_n">Random input</label>
        <input name='fib_n' value={randomInput} onChange={(e) => setRandomInput(e.target.value)} />
      </div>

    </div>
  )
}