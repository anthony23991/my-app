import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { User } from "../../types";

type userContextType = {
  userState: User | undefined;
  setUserState: (user: User | undefined) => void;
  keyword: string;
  setKeyword: Dispatch<SetStateAction<string>>;
};

const userContextDefaultValues: userContextType = {
  userState: undefined,
  setUserState: () => {},
  keyword: "",
  setKeyword: () => {},
};

const UserContext = createContext<userContextType>(userContextDefaultValues);

export function useUserContext() {
  return useContext(UserContext);
}

type Props = {
  children: ReactNode;
};

export function UserProvider({ children }: Props) {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [keyword, setKeyword] = useState("yaw");

  const handleSetUserState = (user: User | undefined) => {
    setUser(user);
  };
  const value: userContextType = {
    userState: user,
    setUserState: handleSetUserState,
    keyword: keyword,
    setKeyword: setKeyword,
  };
  return (
    <>
      <UserContext.Provider value={value}>{children}</UserContext.Provider>
    </>
  );
}
