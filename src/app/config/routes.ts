export const routes = {
  root: "/",

  profile: "/profile",

  login: "/auth/signin",
  registration: "/auth/signup",

  tasks: "/tasks",
  tasksCreate: "/tasks/create",
};

export const apiRoutes = {
  root: "/",
  status: "/status",

  signup: "/auth/signup",
  registerBot: "/register/bot",
  registerChat: "/register/chat",

  sendCode: "/send-code",
  loginWithCode: "/signin/telegram",
  loginWithPassword: "/signin/password",

  tasks: "/tasks",
  tasksCreate: "/tasks/create",
};
