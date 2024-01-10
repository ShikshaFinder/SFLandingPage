"use client"
import { Container } from "@chakra-ui/react";
import React from 'react'
import {
  Avatar,
  WrapItem,
  Wrap,
  Card,
  CardBody,
  Badge,
} from "@chakra-ui/react";

import { FaAlignLeft, FaCoins, FaEdit, FaHeart, FaLanguage, FaMailBulk, FaMailchimp, FaMapMarkerAlt, FaSchool } from "react-icons/fa";
import Link from "next/link";

function profile({name, email, board, medium, standard, city, state, coins}: {name: string, email: string, board: string, medium: string, standard: string, city: string, state: string, coins: number})

   


{
 
  return (
    <Container justifyContent={"center"}>
      <Card >
        <CardBody>
          <Wrap justifyContent={"center"} spacing={4} direction="column">
            <WrapItem>
              <Link href={"/formstudent"}>
                {" "}
                <Avatar size="2xl" name={name} borderRadius={"3xl"} />{" "}
                <FaEdit size={24} style={{ alignSelf: "flex-end" }} />
              </Link>
            </WrapItem>
            <WrapItem>
              <big style={{ textAlign: "center" }}>{name}</big>
            </WrapItem>
            <WrapItem>
              <Badge colorScheme="green" borderRadius={"2xl"}>
                Good Learner
              </Badge>
            </WrapItem>
            <WrapItem style={{ marginTop: "10px" }}>
              <FaMapMarkerAlt />
              <b style={{ textAlign: "center" }}>&nbsp; {city},{state} </b>
            </WrapItem>
            <WrapItem style={{ marginTop: "10px" }}>
              <FaMailBulk />
              <b style={{ textAlign: "center" }}>
                &nbsp; {email}
              </b>
            </WrapItem>
            <WrapItem style={{ marginTop: "10px" }}>
              <FaCoins />
              <b style={{ textAlign: "center" }}> {coins} </b>
            </WrapItem>
            <WrapItem style={{ marginTop: "10px" }}>
              <FaHeart />
              <b
                color="blue.400"
                style={{
                  textAlign: "center",
                  color: "blue",
                  textDecoration: "underline",
                }}
              >
                <Link href={"/liked"}> &nbsp; Your Liked Institute</Link>
              </b>
            </WrapItem>
            <WrapItem style={{ marginTop: "10px" }}>
              <FaAlignLeft />

              <b style={{ textAlign: "center" }}>&nbsp; {board}</b>
            </WrapItem>
            <WrapItem style={{ marginTop: "10px" }}>
              <FaLanguage />

              <b style={{ textAlign: "center" }}>&nbsp; {medium}</b>
            </WrapItem>
            <WrapItem style={{ marginTop: "10px" }}>
              <FaSchool />
              <b style={{ textAlign: "center" }}>&nbsp; {standard}</b>{" "}
            </WrapItem>
          </Wrap>
        </CardBody>
        {/* Add bg="gray.200" to set the background color */}
      </Card>
    </Container>
  );
}

export default profile
