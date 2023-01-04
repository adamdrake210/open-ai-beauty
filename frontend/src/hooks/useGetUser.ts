import { User } from "@/types/types";
import { useQuery } from "@tanstack/react-query";

const fetchUser = async (id: any["id"]) => {
  if (!id) {
    return null;
  }
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );

  return (await response.json()) as User;
};

const useGetUser = (id: string | null) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => fetchUser(id),
  });
};

export { useGetUser, fetchUser };
