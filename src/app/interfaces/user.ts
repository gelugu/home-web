export interface UserProfile {
  login: string;
  name: string;
  telegram_bot_token: string;
  telegram_bot_chat_id: string;
  bio: string;
}

export const emptyProfile: UserProfile = {
  login: "",
  name: "",
  telegram_bot_token: "",
  telegram_bot_chat_id: "",
  bio: "",
};
