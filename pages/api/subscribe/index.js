export default async function Subscribe(req, res) {
  const { email } = req.body;

  try {
    const LIST_ID = process.env.MAILCHIMP_LIST_ID;
    const API_KEY = process.env.MAILCHIMP_API_KEY;

    const response = await fetch(
      `https://${
        API_KEY.split("-")[1]
      }.api.mailchimp.com/3.0/lists/${LIST_ID}/members`,
      {
        body: JSON.stringify({ email_address: email, status: "subscribed" }),
        headers: {
          Authorization: `apikey ${API_KEY}`,
          "Content-Type": "application/json"
        },
        method: "POST"
      }
    );

    if (response.status >= 400) {
      const text = await response.text();

      if (text.includes("Member Exists")) {
        return res.status(400).json({
          error: `Seems like you are already a subscriber.`
        });
      }
      return res.status(400).json({
        error:
          "Hmmm... something went wrong. Please contact me at sulaiman@sulaimanhamouda.com"
      });
    }

    return res.status(200).json({ error: "" });
  } catch (error) {
    return res.status(500).json({ error: error.message || error.toString() });
  }
}
