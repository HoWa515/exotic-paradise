import supabase from "./supabase";
export async function getHotels() {
  const { data, error } = await supabase.from("hotels").select("*");

  if (error) {
    console.log(error);
    throw new Error("Can't fetch data");
  }
  return data;
}
