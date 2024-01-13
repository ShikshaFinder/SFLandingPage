import supabase from "../../supabase";


export async function getStaticProps() {
  const { data, error } = await supabase.from("School").select("*");

  if (error) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data,
    },
  };
}

export default function Page({ data }:{data:any}) {
  // Use the fetched data here
  return (
    <div>
      {data.map(({item}:{item:any}) => (
        <p key={item.id}>{item.title}</p>
      ))}
    </div>
  );
}
