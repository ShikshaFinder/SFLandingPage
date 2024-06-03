import React from 'react'
import { NextSeo } from "next-seo";
import Head from "next/head";
import { Box, Heading, Text } from "@chakra-ui/react";


function Choose() {
  return (
    <>
      <NextSeo
        title="Balancing school fees and quality, a guide to choosing the perfect educational institute"
        description="Discover how to balance educational fees and quality with our comprehensive guide. Learn about key factors, practical steps, and a detailed formula to help you choose the perfect educational institute for your child based on your income, financial obligations, and priorities."
      />
      <Head>
        <meta
          name="google-site-verification"
          content="x0ic1dcDO30kWVKAfCEqPcWGbjb6ZCvg75NpHKI_Ci0"
        />
        <meta
          name="Choosing educational institute"
          content="Choosing educational institute,
Balancing school fees and quality,
Affordability of education,
Financial planning for school fees,
Educational costs calculation,
Best schools for children,
Financial considerations for education,
Household income and education,
School fees budget,
Education expenses formula,
"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Box maxW="800px" mx="auto" p={8}>
        <Heading as="h1" mb={4} textAlign="center">
          Balancing Fees and Quality: A Guide to Choosing the Perfect
          Educational Institute
        </Heading>
        <Text fontSize="lg" mb={4}>
          Choosing the right educational institute for your child is one of the
          most significant decisions a parent can make. This decision involves
          balancing several factors, including the quality of education and the
          cost of fees. Here's a detailed guide to help you navigate this
          process, complete with a formula to assist in making an informed
          decision.
        </Text>
        <Box bg="blue.50" p={4} borderRadius="md" my={4}>
          <Text fontSize="xl" fontWeight="bold" color="blue.800">
            Understanding the Key Factors
          </Text>
          <Text>
            <Text as="span" fontWeight="bold">
              1. Quality of Education:
            </Text>{" "}
            Look into the curriculum offered and the school's academic track
            record.
          </Text>
        </Box>
        <Box bg="green.50" p={4} borderRadius="md" my={4}>
          <Text fontSize="xl" fontWeight="bold" color="green.800">
            The Formula
          </Text>
          <Text>
            To help quantify the decision, consider the following formula:{" "}
            <Text as="strong" color="green.800">
              Affordability Index (AI) = (Household Income - Total Financial
              Obligations) / Total Educational Cost per Child
            </Text>
          </Text>
      
        </Box>{" "}
      </Box>
    </>
  );
}

export default Choose