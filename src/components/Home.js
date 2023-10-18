import React from "react";
import Note from "./Note";

export default function Home({isLogged}) {


  return (
    <div>
      <Note isLogged={isLogged} />
    </div>
  );
}
