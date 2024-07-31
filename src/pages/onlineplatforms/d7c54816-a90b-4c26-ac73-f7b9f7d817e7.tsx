import { useRouter } from "next/router";
import { useEffect } from "react";

const Signup = () => {
  const router = useRouter();

  useEffect(() => {
    // Example of using the router to navigate
    router.push(
      "https://shikshafinder/onlineform/d7c54816-a90b-4c26-ac73-f7b9f7d817e7"
    );
  }, [router]);

  return (
    <div>
      <h1>Loading....</h1>
      {/* Your signup form and other components */}
    </div>
  );
};

export default Signup;
