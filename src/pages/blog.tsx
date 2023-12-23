import {
  Box,
  Heading,
  Image,
  Text,
  HStack,
  Tag,
  useColorModeValue,
  Container,
  VStack,
} from "@chakra-ui/react";
import Head from "next/head";


interface Props {
  marginTop?: number;
  tags: any[];
}

const BlogTags = (props: Props) => {
  const { marginTop = 0, tags } = props;

  return (
    <HStack spacing={2} marginTop={marginTop}>
      {tags.map((tag) => {
        return (
          <>
            <meta
              name="ShikshaFinder"
              content="How to find a best school for your child?"
          
            />
            <Tag size={"md"} variant="solid" colorScheme="orange" key={tag}>
              {tag}
            </Tag>
          </>
        );
      })}
    </HStack>
  );
};

interface BlogAuthorProps {
  date: Date;
  name: string;
}

const BlogAuthor = (props: BlogAuthorProps) => {
  return (
    <HStack marginTop="2" spacing="2" display="flex" alignItems="center">
      <Image
        borderRadius="full"
        boxSize="40px"
        src="https://100k-faces.glitch.me/random-image"
        alt={`Avatar of hetal jani`}
      />
      <Text fontWeight="medium">"hetal jani"</Text>
      <Text>—</Text>
      <Text>{props.date.toLocaleDateString()}</Text>
    </HStack>
  );
};

const Parent = () => {
  return (
    <>
      <Head>
        <title>How to find best school for your child?</title>
        <meta
          name="description"
          content="how to find best schools and educational Platforms
        which are the things to keep in mind while peeking up an educational platform"
        />
        <meta
          name="keywords"
          content="Schools near me ,things to consider whicle choosing a school,how to secure childs future "
        />
        <meta name="robots" content="index, follow" />
        <meta
          name="mom of a child"
          content="How to choose best schools for your child "
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Container maxW={"7xl"} p="12">
        <Heading as="h1"> How to find best school for your child?</Heading>
        <Box
          marginTop={{ base: "1", sm: "5" }}
          display="flex"
          flexDirection={{ base: "column", sm: "row" }}
          justifyContent="space-between"
        >
          <Box
            display="flex"
            flex="1"
            marginRight="3"
            position="relative"
            alignItems="center"
          >
            <Box
              width={{ base: "100%", sm: "85%" }}
              zIndex="2"
              marginLeft={{ base: "0", sm: "5%" }}
              marginTop="5%"
            >
              <Box textDecoration="none" _hover={{ textDecoration: "none" }}>
                <Image
                  borderRadius="lg"
                  src={
                    "https://images.unsplash.com/photo-1629872430082-93d8912beccf?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  }
                  alt="Student choosing a good school"
                  objectFit="contain"
                />
              </Box>
            </Box>
            <Box zIndex="1" width="100%" position="absolute" height="100%">
              <Box
                bgGradient={useColorModeValue(
                  "radial(orange.600 1px, transparent 1px)",
                  "radial(orange.300 1px, transparent 1px)"
                )}
                backgroundSize="20px 20px"
                opacity="0.4"
                height="100%"
              />
            </Box>
          </Box>
          <Box
            display="flex"
            flex="1"
            flexDirection="column"
            justifyContent="center"
            marginTop={{ base: "3", sm: "0" }}
          >
            <BlogTags tags={["Student", "Education"]} />
            <Heading marginTop="1">
              <Text textDecoration="none" _hover={{ textDecoration: "none" }}>
                As i am also a mother i can understand..
              </Text>
            </Heading>
            <Text
              as="p"
              marginTop="2"
              color={useColorModeValue("gray.700", "gray.200")}
              fontSize="lg"
            >
              I know how tricky it is to pick the perfect school for our little
              ones. It's like trying to find the best ice cream flavor—everyone
              has a favorite, but what really matters is what makes our kids
              light up. So, let's chat about why picking a school with heart &
              brain, not just fancy words, is so important.
            </Text>
            <BlogAuthor
              name="John Doe"
              date={new Date("2021-04-06T19:01:27Z")}
            />
          </Box>
        </Box>
        <Heading as="h2" marginTop="5">
          How to choose a right school
        </Heading>
        <VStack paddingTop="20px" spacing="2" alignItems="flex-start">
          <Text as="p" fontSize="lg">
            <b>
              {" "}
              Here are some key data points to examine for potential schools:
            </b>
            <br />
            <br />
            <b> Quality of education provided by schools</b> -How well the
            teachers are explaining the concept. In how much depth the teacher
            know the concepts.It is most overlooked but most important part of
            the education.because a good teacher is a person who fosters the
            growth and interest of a child.If you don't have standards like
            virat kohli and M.S Dhoni you would never have interest in cricket
            as same as that if teacher is not good in explaining the concepts
            just reads out the theories than how the hell the child is going to
            underestand & have the interest in studies. if they are unable to
            develop interest in that subject ,NO matter what! they are not going
            to succeed in that field.Either it is science maths or Arts. you can
            visit the quality of education of diffrent schools by visiting
            &nbsp;
            <Text
              as="span"
              color="blue"
              textDecoration="underline"
              cursor="pointer"
            >
              <a href="https://www.shikshafinder.com/school/">
                Shiksha Finder schools
              </a>
            </Text>
            <Text as="p" fontSize="lg">
              <b>Experience and expertise of a teacher </b> -In today's business
              world many people are opening schools and coaching classes just
              for the sake of money. They don't have any experience in the
              teaching field. They don't know how to teach a child. They don't
              know how to develop interest, so it is the second most important
              thing. to know the experience and expertise of a Teacher.
              <br />
            </Text>
            you can also visit the experience and expertise of a teacher by
            visiting{" "}
            <Text
              as="span"
              color="blue"
              textDecoration="underline"
              cursor="pointer"
            >
              <a href="https://www.shikshafinder.com/school">
                ShikshaFinder Teacher
              </a>
            </Text>
            <br /> <b>Ratings and reviwes of schools</b> -WE should have a look
            on the satisfaction of parents and students who are already learning
            form theire. you can also visit the ratings and reviews of schools
            by visiting &nbsp;
            <Text
              as="span"
              color="blue"
              textDecoration="underline"
              cursor="pointer"
            >
              <a href="https://www.shikshafinder.com/school">ShikshaFinder</a>
            </Text>
            <br /> <b>Extra curricular activities </b>- How much a school is
            focusing on extra curricular activities. & skill development of a
            child. <br />
            you can also find out more skill class names by visiting &nbsp;
            <Text
              as="span"
              color="blue"
              textDecoration="underline"
              cursor="pointer"
            >
              <a href="https://www.shikshafinder.com/skillclass">
                ShikshaFinder Skills
              </a>
            </Text>
            <br />
            <b> Class sizes</b> - How large are classes? Smaller class sizes
            allow for more individualized attention.
            <br />
            <b> Student demographics</b> - Does the student body reflect the
            diversity of the community? A diverse school provides
            social-emotional benefits. <br />
            <b> Resources and facilities</b> - Does the school offer science
            labs, computers, arts programs, and extracurriculars? Access to
            resources impacts learning.
          </Text>
         
          <Text as="p" fontSize="lg">
            So making a great future of a children doesn't always depend upon
            the parents but also schools they both are molders of the future of
            a children. So in Summary
            <i>choose right to make you and your children's future bright</i>
          </Text>
        </VStack>
      </Container>
    </>
  );
};

export default Parent;
