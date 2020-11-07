import create from 'zustand';

type UserAccount = {
  profile?: {
    avatar: string;
    username: string;
  };
};

export const useUserAccount = create<UserAccount>((set) => ({
  profile: undefined,
}));
