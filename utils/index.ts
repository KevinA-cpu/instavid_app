import axios from "axios";
import jwtDecode from "jwt-decode";

export const createOrGetUser = async (
  response: any,
  addUser: any,
  dispatch: any
) => {
  try {
    const decoded: { name: string; picture: string; sub: string } = jwtDecode(
      response.credential
    );

    const { name, picture, sub } = decoded;

    const user = {
      _id: sub,
      _type: "user",
      userName: name,
      image: picture,
    };

    dispatch(addUser(user));

    await axios.post("/api/auth", user);
  } catch (error) {
    console.error(error);
  }
};
