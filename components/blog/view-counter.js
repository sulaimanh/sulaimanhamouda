import fetcher from "@/lib/fetcher";
import { useAuth } from "@/lib/hooks/useAuth";
import { useQuery } from "react-query";

export default function ViewCount({ slug }) {
  const { user, loading } = useAuth();
  const { data } = useQuery(
    ["views", slug],
    () =>
      fetcher(`/api/views/${slug}`, {
        method: user ? "GET" : "POST"
      }),
    {
      // - enabled is a boolean, so we are putting a double not to say true
      // - we wont run this query until we have a user logged in
      enabled: !loading
    }
  );

  return <span>{data ? data.views : "--"} views</span>;
}
