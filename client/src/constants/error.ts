export type constantType<t> = t[keyof t];

export const LOGIN_ERROR = {
  CHECK_ID: '아이디를 입력해 주세요.',
  CHECK_PASSWORD: '패스워드를 입력해 주세요.',
  UNAUTHORIZED: '회원정보를 찾을 수 없습니다.',
} as const;

export type LoginErrorType = constantType<typeof LOGIN_ERROR>;
