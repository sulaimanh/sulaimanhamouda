import fetcher from "@/lib/fetcher";

export default async function handler(req, res) {
  const response = await fetcher(
    "https://api.buttondown.email/v1/subscribers",
    {
      headers: {
        Authorization: `Token ${process.env.BUTTONDOWN_API_KEY}`,
        "Content-Type": "application/json"
      },
      method: "GET"
    }
  );

  return res.status(200).json({ subscribers: response });
}
