import React from "react";
import { useRouter } from "next/router";
import Standard from "@/components/Standard";

function Try() {
  const router = useRouter();

  console.log(router);

  return <div>try</div>;
}

export default Try;
