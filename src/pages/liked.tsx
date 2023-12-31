import React from "react";
import Card from "../components/card";
import Link from "next/link";
function likedinstitute() {
  return (
    <>
      <Link href={"/school/1/school"}>
        <Card imgsrc={"./sfv1.png"} name="name of institute" rating={"3.0"} />
        <Card imgsrc={"./sfv1.png"} name="name of institute" rating={"3.0"} />
      </Link>
    </>
  );
}

export default likedinstitute;
