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
  const imageName = `${Math.random()}-${newHotel.image.name}`.replaceAll(
    "/",
    ""
  ); // prevent supabase create folder based on '/'
  const image = `https://ckeshpohmxrumccvqdhm.supabase.co/storage/v1/object/public/hotel-images/${imageName}`;

  // 1) create hotel with image URL string
  const { data, error } = await supabase
    .from("hotels")
    .insert([{ ...newHotel, image }]);

  if (error) {
    console.log(error);
    throw new Error("Hotel can't be created");
  }

  // 2. upload image
  const { error: storageError } = await supabase.storage
    .from("hotel-images")
    .upload(imageName, newHotel.image);

  // 3. delete a hotel if error in uploading
  if (storageError) {
    await supabase.from("hotels").delete().eq("id", data.id);
    throw new Error("Sth wrong with image uploading");
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
