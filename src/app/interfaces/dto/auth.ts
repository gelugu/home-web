export interface SignUpDto {
  login: string;
  password: string;
  name?: string;
  telegram_bot_token?: string;
  telegram_bot_chat_id?: string;
}

export interface LoginCodeDto {
  login: string;
  code: string;
}

export interface LoginPasswordDto {
  login: string;
  password: string;
}

export interface LoginResponseDto {
  token: string;
}
