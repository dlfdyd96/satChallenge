// global
const JOIN = "/join"
const LOGIN = "/login"
// const FAQ = "/faq"
// const ABOUT = "/about"

// user
const USERS = "/users"
const ME = "/me"
const USER_DETAIL = "/:id"
const USER_EDIT = "/edit-profile"
const CHANGE_PASSWORD = "/change-password"

// challenges
const CHALLENGES = "/"
const CREATE_CHALLENGE = "/create"
const READ_CHALLENGE = "/:id"
const UPDATE_CHALLENGE = "/:id/update"
const DELETE_CHALLENGE = "/:id/delete"

// quizzes
const CREATE_QUIZ = "/create"
const READ_QUIZ = "/:id"
const UPDATE_QUIZ = "/:id/update"
const DELETE_QUIZ = "/:id/delete"

const routes = {
  // global
  join: JOIN,
  login: LOGIN,
  
  // user
  users: USERS,
  me : ME,
  userDetail: id => {
    if (id)
      return `/user/${id}`
    return USER_DETAIL
  },
  userEdit: USER_EDIT,
  changePassword: CHANGE_PASSWORD,

  // challenge
  challenges: CHALLENGES,
  createChallenge: CREATE_CHALLENGE,
  readChallenge: READ_CHALLENGE,
  updateChallenge: UPDATE_CHALLENGE,
  deleteChallenge: DELETE_CHALLENGE,

  // quiz
  createQuiz : CREATE_QUIZ,
  readQuiz : READ_QUIZ,
  updateQuiz : UPDATE_QUIZ,
  deleteQuiz : DELETE_QUIZ,
};


export default routes;