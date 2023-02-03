import React from "react";
import { SimpleGrid, Text } from "@mantine/core";

import { UserContext, UserContextType } from "@/context/userContext";
import { FavoritePost } from "./FavoritePost";

export const FavoritesContainer = () => {
  const { user } = React.useContext(UserContext) as UserContextType;

  return (
    <SimpleGrid
      cols={3}
      spacing="xl"
      breakpoints={[
        { maxWidth: 980, cols: 3, spacing: "md" },
        { maxWidth: 755, cols: 2, spacing: "sm" },
        { maxWidth: 600, cols: 1, spacing: "sm" },
      ]}
    >
      {user?.favoritePosts?.length && user?.favoritePosts.length > 0 ? (
        user?.favoritePosts?.map((postSlug) => {
          return <FavoritePost key={postSlug} slug={postSlug} />;
        })
      ) : (
        <Text>Currently you have no favorite posts.</Text>
      )}
    </SimpleGrid>
  );
};
