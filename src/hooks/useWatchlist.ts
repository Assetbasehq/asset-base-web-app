import { useMutation, useQueryClient } from "@tanstack/react-query";
import { watchlistService } from "@/api/watchlist";

import { useQuery } from "@tanstack/react-query";
import type { IWatchlist } from "@/interfaces/watchlist.interface";

export const useUserWatchlist = () => {
  return useQuery<IWatchlist[], Error>({
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

export const useRemoveFromWatchlist = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: { asset_id: string }) =>
      watchlistService.removeFromUserWatchlist(payload),
    onSuccess: () => {
      // Invalidate and refetch the user watchlist
      queryClient.invalidateQueries({ queryKey: ["user-watchlist"] });
    },
  });
};
