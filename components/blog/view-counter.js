import fetcher from "@/lib/fetcher";
import { useQuery } from "react-query";

export default function ViewCount({ slug }) {
  const { data } = useQuery(["views", slug], () =>
    fetcher(`/api/views/${slug}`, {
      method: "POST"
    })
  );

  return <span>{data ? data.views : "--"} views</span>;
}
