import React, { useEffect } from "react";
import { ActionIcon, Center } from "@mantine/core";
import { IconHeart } from "@tabler/icons-react";
import { UserContext, UserContextType } from "@/context/userContext";
import { useAddFavorite } from "@/hooks/useAddFavorite";
import { useRemoveFavorite } from "@/hooks/useRemoveFavorite";

type FavoriteProps = {
  postId: string;
};

export const Favorite = ({ postId }: FavoriteProps) => {
  const [favoritedPost, setFavoritedPost] = React.useState(false);
  const { user } = React.useContext(UserContext) as UserContextType;

  const { mutate: mutateAddFavorite } = useAddFavorite();
  const { mutate: mutateRemoveFavorite } = useRemoveFavorite();

  useEffect(() => {
    if (user) {
      const isLiked = user.favoritePosts.includes(postId);
      if (isLiked) {
        setFavoritedPost(true);
      }
    }
  }, [user, postId]);

  const handleFavoriteChoice = () => {
    if (favoritedPost) {
      mutateRemoveFavorite(postId);
      setFavoritedPost(false);
    } else {
      mutateAddFavorite(postId);
      setFavoritedPost(true);
    }
  };

  return (
    <Center>
      <ActionIcon onClick={handleFavoriteChoice}>
        <IconHeart fill={favoritedPost ? "red" : "white"} />
      </ActionIcon>
    </Center>
  );
};
