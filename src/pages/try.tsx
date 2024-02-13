import type { InferGetServerSidePropsType, GetServerSideProps } from "next";

 const getServerSideProps = async () => {
  return "hihello";
};

export default function Page() {
  return (
    <main>
      <p>harsh</p>
    </main>
  );
}
