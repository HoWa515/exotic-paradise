import supabase from "./supabase";

export async function getHotels() {
  const { data, error } = await supabase.from("hotels").select("*");

  if (error) {
    console.log(error);
    throw new Error("Can't fetch data");
  }

  return data;
}

export async function createEditHotel(newHotel, id) {
  console.log(typeof newHotel.image);
  const hasImagePath = typeof newHotel.image === "string";
  const imageName = `${Math.random()}-${newHotel.image.name}`.replaceAll(
    "/",
    ""
  ); // prevent supabase create folder based on '/'
  const image = hasImagePath
    ? newHotel.image
    : `https://ckeshpohmxrumccvqdhm.supabase.co/storage/v1/object/public/hotel-images/${imageName}`;

  let query = supabase.from("hotels");
  // 1) create hotel with image URL string
  if (!id) {
    query = query.insert([{ ...newHotel, image }]);
  }

  // 2) Edit
  if (id) {
    query = query.update({ ...newHotel, image: image }).eq("id", id);
  }

  const { data, error } = await query.select().single(); // select().single() will get the return data at this point;
  // 3) error handleing
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
