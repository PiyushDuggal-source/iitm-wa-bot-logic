import { User, UserModel } from "../models/models";

type UserProp = {
  name: string;
  chatId: string;
  search?: boolean;
};

/**
 * Creates a new user in the system.
 *
 * @param {Object} user - The user object containing the following properties:
 *   - name (string): The name of the user.
 *   - chatId (string): The ID associated with the user's chat.
 *   - search? (boolean): Flag indicating whether to search for an existing user before creating a new one.
 *
 * @returns {Promise<Object>} - A Promise that resolves to the newly created user object.
 *
 * @description
 * If the search flag is set to `true`, the function will search for an existing user with the given chat ID.
 * If no existing user is found, a new user will be created with the provided name and chat ID.
 * If the search flag is set to `false` or not provided, the function will always create a new user.
 * The function logs the steps performed during user creation, including searching and creating the user.
 * The newly created user object is returned as a Promise.
 */
export const createUser = async ({
  name,
  chatId,
  search,
}: UserProp): Promise<User> => {
  console.log("\nEntering createUser");
  if (search) {
    console.log("\nsearching for user");
    const user = UserModel.findOne({ recipitantId: chatId });
    if (!user) {
      console.log(`\nCreating user with id ${chatId}`);
      const newUser = await UserModel.create({
        recipitantId: chatId,
        name: name,
      });
      console.log(`\nCreated user with id ${chatId}`);
      return newUser;
    }
  }
  console.log(`\nCreating user with id ${chatId}`);
  const newUser = await UserModel.create({
    recipitantId: chatId,
    name: name,
  });
  console.log(`\nCreated user with id ${chatId}`);
  console.log("Leaving createUser\n");
  return newUser;
};
