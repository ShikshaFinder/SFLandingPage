import { Button, Stack } from "@chakra-ui/react";
import Link from 'next/link'
import React from 'react'

function whichuser() {
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <Stack spacing={4} direction="column" align="center">
                <Button colorScheme="teal" size="lg">
                    <a href="https://platform.shikshafinder.com/login">
                        {" "}
                        I am a Teacher 👩🏻‍🏫
                    </a>
                </Button>
                <Link href={"/Onbording"}>
                    {" "}
                    <Button colorScheme="teal" size="lg">
                        I am a Student 👩🏻‍🎓
                    </Button>
                </Link>
            </Stack>
        </div>
    );
}

export default whichuser