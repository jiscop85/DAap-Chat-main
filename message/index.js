export default async function handler(
  req,
  res,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {

    const requestBody = await req.body;
    const { message, user } = JSON.parse(requestBody);

    res?.socket?.server?.io?.emit('message', { message: message, user: user });

    return res.status(200).json({ data : message });
  } catch (error) {
    console.log("[DIRECT_MESSAGES_POST]", error);
    return res.status(500).json({ message: "Internal Error" }); 
  }
}