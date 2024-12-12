// pages/index.tsx  
import { useState, useEffect } from 'react';  
import { createClient } from '@supabase/supabase-js';  
import ReactMarkdown from 'react-markdown';
import {  
  Box,  
  Heading,  
  Text,  
  List,  
  ListItem,  
  AspectRatio,  
  Container,  
  VStack,  
  Divider,  
} from '@chakra-ui/react';  
  
const SUPABASE_URL = 'https://fslbqtbaaarlceqjiwoa.supabase.co';  
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZzbGJxdGJhYWFybGNlcWppd29hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM5MjMxNDcsImV4cCI6MjA0OTQ5OTE0N30.xS2UPl7bLxv7yibB1PUce1aZLLLVyDsUDiSTSjSqwKI"; // Replace with your actual key  
  
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);  
  
interface Video {  
  videoid: string;  
  key_points: string[];  
  summary: string;  
}  
  
export default function Home() {  
  const [videos, setVideos] = useState<Video[]>([]);  
  
  useEffect(() => {  
    const fetchData = async () => {  
      const { data, error } = await supabase  
        .from('videotranscriiption')  
        .select('videoid,key_points,summary');  
  
      if (error) {  
        console.error(error);  
      } else {  
        setVideos(
          data.map((video: any) => ({
            ...video,
            key_points: video.key_points ? video.key_points.split(',') : [],
          }))
        );
      }  
    };  
  
    fetchData();  
  }, []);  
  
  return (
    <Container maxW="container.lg" py={8}>
      <Heading as="h1" mb={6}>
        Demo Lectures
      </Heading>
      <VStack spacing={12} align="stretch">
        {videos.map((video) => (
          <Box
            key={video.videoid}
            p={6}
            shadow="md"
            borderWidth="1px"
            borderRadius="md"
          >
            <Heading as="h2" size="lg" mb={4}>
              Summary
            </Heading>
            <Text mb={4}>{video.summary}</Text>
            <Heading as="h3" size="md" mb={2}>
              Key Points
            </Heading>
            <List spacing={2} mb={4} styleType="disc" pl={4}>
              {video.key_points.map((point, index) => (
                
                  <ListItem key={index}>
                    <ReactMarkdown>{point}</ReactMarkdown>
                  </ListItem>
                
              ))}
            </List>
            <Heading as="h3" size="md" mb={2}>
              Detailed Summary
            </Heading>
            <Box mb={4}>
              <ReactMarkdown>{video.summary}</ReactMarkdown>
            </Box>
            <AspectRatio ratio={16 / 9} mb={4}>
              <iframe
                src={`https://www.youtube.com/embed/${video.videoid}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </AspectRatio>
          </Box>
        ))}
      </VStack>
    </Container>
  );  
}  