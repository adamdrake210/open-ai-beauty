import * as React from "react";
import { User } from "@/types/types";
import { useGetUser } from "@/hooks/useGetUser";
import { Loader } from "@/components/common/Loader";

export type UserContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export const UserContext = React.createContext<UserContextType | null>(null);

const UserProvider = ({
  children,
  userId,
}: {
  children: React.ReactNode;
  userId: string | null;
}) => {
  const [user, setUser] = React.useState<User | null>(null);

  const { data, isLoading, isError } = useGetUser(userId || null);

  React.useEffect(() => {
    if (!isLoading && !isError && data) {
      // @ts-ignore
      setUser(data);
    }
  }, [data, isLoading, isError, setUser]);

  return (
    <>
      {isLoading ? (
        <Loader loadingText="Loading..." />
      ) : (
        <UserContext.Provider value={{ user, setUser }}>
          {children}
        </UserContext.Provider>
      )}
    </>
  );
};

export default UserProvider;
