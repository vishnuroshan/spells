import { MetaFunction } from "@remix-run/node";
import { useState } from "react"
export const meta: MetaFunction = () => {
  return [
    { title: "Referential Equality" },
    { name: "description", content: "Referential Equality learnings..." },
  ];
};
export default function Ref() {
  const init = { name: 'vishnu', age: 30 }
  const [person, setPerson] = useState(init);

  const setAge = (age: number) => {
    console.log(age)
    const p = { ...person }
    p.age = age;
    setPerson(p);
  }
  const setName = (name: string) => {
    
    person.name = name;
    setPerson(person);
  }
  return (<>
    <p>my name is: {person.name}</p>
    <p>and my age: {person.age}</p>
    <button onClick={()=>setAge(80)}>change age</button>
    <button title="not creating new obj - referential equality = as both array are referring to same memory location" onClick={()=>setName('David')}>change name</button>
    <button onClick={() => { setPerson(init)}}>reset</button>
  </>)
}