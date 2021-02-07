import fetcher from "@/lib/fetcher";

export default async function handler(req, res) {
  const LIST_ID = process.env.MAILCHIMP_LIST_ID;
  const API_KEY = process.env.MAILCHIMP_API_KEY;

  const response = await fetcher(
    `https://${
      API_KEY.split("-")[1]
    }.api.mailchimp.com/3.0/lists/${LIST_ID}/members`,
    {
      headers: {
        Authorization: `apikey ${API_KEY}`,
        "Content-Type": "application/json"
      },
      method: "GET"
    }
  );

  return res.status(200).json({ subscribers: response.members.length });
}
