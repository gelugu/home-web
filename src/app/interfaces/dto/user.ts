export interface User {
  id: string,
  login: string,
  name: string,
  telegram_bot_token: string,
  telegram_bot_chat_id: string,
  password: string,
  bio: string,
}

export interface UpdateUserDTO {
  login?: string,
  name?: string,
  telegram_bot_token?: string,
  telegram_bot_chat_id?: string,
  password?: string,
  bio?: string,
}
