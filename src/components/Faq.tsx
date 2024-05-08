import React, { useState } from "react";
import {
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const [accordionIndex, setAccordionIndex] = useState<number | null>(null);

  const handleAccordionClick = (index: number) => {
    setAccordionIndex(index === accordionIndex ? null : index);
  };

  const faqData: FAQItem[] = [
    {
      question: "Is it true that shiksha finder is and will be free forever?",
      answer:
        "Yes! Shiksha Finder is and will always be free to use for finding best educational platform. We believe that quality education should be accessible to all.There is no listing fees for educational platforms also.Our revenue model is simple,marketing and advertisement.",
    },
    {
      question: "What i can find on shiksha finder?",
      answer:
        "You can find schools,coaching centers,home tutors,online tutors,educational platforms,skill classes and many more on shiksha finder.",
    },
    {
      question:
        "If i get any problem using shiksha finder,how can i contact you?",
      answer:
        "We are open to solve your queries and problems, you can contact us on contact us page or you can mail us at founder@shikshafinder.in",
    },
  ];

  return (
    <Box maxW="600px" mx="auto" mt={8}>
      <Accordion allowMultiple>
        {faqData.map((faq, index) => (
          <AccordionItem key={index}>
            <h2>
              <AccordionButton onClick={() => handleAccordionClick(index)}>
                <Box flex="1" textAlign="left">
                  {faq.question}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel
              pb={4}
              display={accordionIndex === index ? "block" : "none"}
            >
              {faq.answer}
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Box>
  );
};

export default FAQ;
