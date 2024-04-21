import React from "react";
import { useRouter } from "next/router";

function Try() {
  const router = useRouter();

  console.log(router);
console.log("back", router.asPath.split("/")[2]);
  return <div>try</div>;
}

export default Try;
