import { MetaFunction } from "@remix-run/node";
import { useState } from "react";
import '~/styles/globals.css';

export const meta: MetaFunction = () => {
  return [
    { title: "Game" },
    { name: "description", content: "Game" },

  ];
};


const initVal = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
export default function Game() {
  const [matrix, setMatrix] = useState(initVal);

  const isGameOver = (temp: number[][]) => {
    
    // i === j
    if (temp[0][0] && temp[1][1] && temp[2][2]) {
      return true
    }

    if (temp[0][2] && temp[1][1] && temp[2][0]) {
      return true
    }

    if (temp[0][0] && temp[0][1] && temp[0][2]) {
      return true
    }

    if (temp[1][0] && temp[1][1] && temp[1][2]) {
      return true
    }
    if (temp[2][0] && temp[2][1] && temp[2][2]) {
      return true
    }

    if (temp[0][0] && temp[1][0] && temp[2][0]) {
      return true
    }

    if (temp[0][1] && temp[1][1] && temp[2][1]) {
      return true
    }

    if (temp[0][2] && temp[1][2] && temp[0][2]) {
      return true
    }
    return false
  }

  const changeValue = (i: number, j: number) => {
    const temp = structuredClone(matrix);
    if (temp[i][j]) {
      temp[i][j] = 0
    } else {
      temp[i][j] = 1
    }

    setMatrix(temp);

    if (isGameOver(temp)) {
      

      setTimeout(() => { alert('game over'); setMatrix(initVal) }, 500)
    }

  }
  return <div className="container">
    <div className="game">
      {matrix.map((e, i) => (

        <div key={i.toString()} className="row">
          {e.map((k, j) => (
            <div aria-hidden="true" title={`(${i},${j})`} onClick={() => changeValue(i, j)} key={`${i}${j}`} className="box">
              {k === 0 ? '' : 'X'}
            </div>
          ))}
        </div>))}

    </div>

  </div>

}