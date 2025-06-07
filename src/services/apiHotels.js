import supabase from "./supabase";

export async function getHotels() {
  const { data, error } = await supabase.from("hotels").select("*");

  if (error) {
    console.log(error);
    throw new Error("Can't fetch data");
  }

  return data;
}

export async function createHotel(newHotel) {
  const { data, error } = await supabase.from("hotels").insert([newHotel]);

  if (error) {
    console.log(error);
    throw new Error("Hotel can't be created");
  }

  return data;
}

export async function deleteHotel(id) {
  const { data, error } = await supabase.from("hotels").delete().eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("Hotel can't be deleted");
  }

  return data;
}
