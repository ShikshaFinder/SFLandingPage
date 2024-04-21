import React from "react";
import { useRouter } from "next/router";

function Try() {
  const router = useRouter();

  console.log(router);

  return <div>try</div>;
}

export default Try;
