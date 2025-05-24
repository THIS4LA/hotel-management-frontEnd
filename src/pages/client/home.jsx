import { useState } from "react";

export default function Home() {
  const [num, setNum] = useState(0);

  return (
    <div className="w-full h-[100vh] bg-slate-600 flex items-center justify-center gap-10">
      <button
        className="w-10 h-10 bg-white text-black flex items-center justify-center rounded shadow"
        onClick={() => {
          const newNum = num - 1;
          setNum(newNum);
        }}
      >
        -
      </button>

      <h1 className="text-[50px] text-white">{num}</h1>

      <button
        className="w-10 h-10 bg-white text-black flex items-center justify-center rounded shadow"
        onClick={() => {
          const newNum = num + 1;
          setNum(newNum);
        }}
      >
        +
      </button>
    </div>
  );
}
