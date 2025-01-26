export type AuthStateType = {
  status?: string;
  loading: boolean;
  session: string | null;
};

export type AuthContextType = {
  session: string | null;
  loading: boolean;
  authenticated: boolean;
  unauthenticated: boolean;
  logout: () => void;
};
