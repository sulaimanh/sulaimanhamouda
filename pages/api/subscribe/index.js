export default async function Subscribe(req, res) {
  const { email } = req.body;
  console.log(email);
  if (!email) {
    return res.status(400).json({ error: "Please enter your email." });
  }

  try {
    const response = await fetch(
      `https://api.buttondown.email/v1/subscribers`,
      {
        body: JSON.stringify({
          email: email,
          tags: ["sulaiman hamouda"]
        }),
        headers: {
          Authorization: `Token ${process.env.BUTTONDOWN_API_KEY}`,
          "Content-Type": "application/json"
        },
        method: "POST"
      }
    );

    if (response.status >= 400) {
      const text = await response.text();

      if (text.includes("already subscribed")) {
        return res.status(400).json({
          error: `Seems like you are already a subscriber.`
        });
      }
      return res.status(400).json({
        error: text
      });
    }

    return res.status(200).json({ error: "" });
  } catch (error) {
    return res.status(500).json({ error: error.message || error.toString() });
  }
}
