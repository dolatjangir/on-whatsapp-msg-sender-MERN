import { sendTemplateMessage } from "../service/whatsapp.service.js";

export const sendTemplate = async (req, res) => {
  try {
    const { phone, name, description } = req.body;
    const imageUrl = req.file
      ? `${process.env.BASE_URL}/uploads/${req.file.filename}`
      : null;

    const result = await sendTemplateMessage(phone, name, description, imageUrl);

    res.json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
