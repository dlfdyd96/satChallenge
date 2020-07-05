// global
const JOIN = "/join"
const LOGIN = "/login"
const CHALLENGES = "/";


// user
const USERS = "/users"
const USER_DETAIL = "/:id"
const USER_EDIT = "/edit-profile"
const CHANGE_PASSWORD = "change-password"

const routes = {
  join: JOIN,
  login: LOGIN,
  challenges: CHALLENGES,
  
  users: USERS,
  userDetail: USER_DETAIL,
  userEdit: USER_EDIT,
  changePassword: CHANGE_PASSWORD,
};


export default routes;