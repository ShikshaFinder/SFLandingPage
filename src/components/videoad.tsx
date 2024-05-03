import React from "react";
import { AspectRatio, Stack,Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import supabase from "../../supabase";

function video({ src,link }: { src: string ,link:string}) {
    const router = useRouter();

      const school_id = "school";
  const [useView, setUseView] = React.useState<any[] | null>(null);

   async function updateView() {
     try {
       if (typeof school_id === "string") {
         let { data, error } = await supabase
           .from("banneradview")
           .select("view")
           .eq("user_id", school_id);

         setUseView(data);
         if (error) throw error;

         console.log("view", data);

         if (data && data[0].view !== null) {
           // Increment the 'view' column value
           const newViewValue = data[0].view + 1;
           // console.log("newViewValue", newViewValue);

           // Update the 'view' column with the new value
           const { error: updateError } = await supabase
             .from("banneradview")
             .update({ view: newViewValue })
             .eq("user_id", school_id);

           console.log("view incremented bdvkb");
           // console.log("updateError", updateError);

           if (updateError) {
             throw updateError;
           }
         }
       } else {
         console.log("string error");
       }
     } catch (error) {
       console.log("Caught Error:", error);
     }
   }
useEffect(() => {
  updateView();
}, []);


  return (
    <>
      <Stack
        spacing={2}
        mx={"auto"}
        maxW={"lg"}
        py={{
          base: 12,
          md: 12,
          small: 2,
        }}
        px={{
          base: 6,
          md: 6,
          small: 2,
        }}
      >
        <AspectRatio maxW="560px" ratio={1.75}>
          <iframe
            title="hello"
            src={`https://www.youtube.com/embed/${src}?autoplay=1`}
            allowFullScreen
          />
        </AspectRatio>
        <Button onClick={()=>{router.push(link);}}>
          visit site
        </Button>
      </Stack>
    </>
  );
}

export default video;
