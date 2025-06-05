import { useState } from "react";
import Header from "../../components/header";

export default function Home() {
  const [num, setNum] = useState(0);

  return (
    <div className="w-full h-[100vh] bg-slate-600 flex justify-center gap-10">
      <Header />
    </div>
  );
}
