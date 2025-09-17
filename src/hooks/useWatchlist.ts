import { useMutation, useQueryClient } from "@tanstack/react-query";
import { watchlistService } from "@/api/watchlist";

import { useQuery } from "@tanstack/react-query";

export const useUserWatchlist = () => {
  return useQuery({
    queryKey: ["user-watchlist"],
    queryFn: watchlistService.getUserWatchlist,
  });
};

export const useAddToWatchlist = (payload: { asset_id: string }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => watchlistService.addToUserWatchlist(payload),
    onSuccess: () => {
      // Invalidate and refetch the user watchlist
      queryClient.invalidateQueries({ queryKey: ["user-watchlist"] });
    },
  });
};

export const useRemoveFromWatchlist = (payload: { asset_id: string }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => watchlistService.removeFromUserWatchlist(payload),
    onSuccess: () => {
      // Invalidate and refetch the user watchlist
      queryClient.invalidateQueries({ queryKey: ["user-watchlist"] });
    },
  });
};
