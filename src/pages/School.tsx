import Card from "../components/card";
import React from "react";
import Link from 'next/link'

export default function skillclass() {
  return (
    <div>
      <Link href={"/introschool"}>
        <Card /> <Card /> <Card /> <Card /> <Card /> <Card /> <Card />
      </Link>
    </div>
  );
}
