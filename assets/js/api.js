export async function getData(url, query) {
  try {
    const response = await fetch(`${url}/${query}`);

    if (!response.ok) {
      throw new Error("User not found, please try again...");
    }
    const data = await response.json();
    return data;
  } catch (err) {
    return err;
  }
}
