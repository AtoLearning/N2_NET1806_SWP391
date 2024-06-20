// import React from 'react'

// export default function Home() {
//   return (
//     <div>Home</div>
//   )
// }
import React from "react";
import {Pagination} from "@nextui-org/react";

export default function App() {
  return (
    <Pagination loop showControls color="success" total={5} initialPage={1} />
  );
}
