export const routes = {
  root: "/",

  profile: "/profile",

  signin: "/auth/signin",
  signup: "/auth/signup",

  tasks: "/tasks",
  tasksCreate: "/tasks/create",
};

export const apiRoutes = {
  root: "/",
  loginPattern: "/regex/login",
  passwordPattern: "/regex/password",

  authStatus: "/auth/status",
  signup: "/auth/signup",
  signinPassword: "/auth/signin/password",
  signinTelegram: "/auth/signin/telegram",

  sendCode: "/send-code",

  tasks: "/tasks",
};
