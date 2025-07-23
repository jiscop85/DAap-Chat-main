import Pusher from "pusher";

export const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: "eu",
  useTLS: true,
});

export default async function handler(req, res) {
  const { message, user } = req.body;
  const response = await pusher.trigger("chat-private", "chat-event-private", {
    message,
    user,
  });

  res.json({ message: "completed" });
}