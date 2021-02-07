import { useMutation, useQueryClient } from "react-query";

import fetcher from "@/lib/fetcher";

export default function useMutateCommentStatus() {
  const queryClient = useQueryClient();

  return useMutation(
    async (value) => {
      fetcher("/api/comments/comments-admin", {
        body: JSON.stringify(value),
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST"
      });
    },
    {
      onSuccess: (data, variables) => {
        const previousValue = queryClient.getQueryData("comments");
        const updated = previousValue.arr.map((comment) => {
          if (comment.timestamp === variables.timestamp) {
            comment.status = variables.status;
          }
          return comment;
        });
        queryClient.setQueryData("comments", { arr: updated });
        queryClient.setQueryData("comments", { arr: updated });
      }
    }
  );
}
