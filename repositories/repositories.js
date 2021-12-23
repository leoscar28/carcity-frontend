import User from '/repositories/user/user';
export const repository = ($axios) => ({
  user: User($axios),
})
