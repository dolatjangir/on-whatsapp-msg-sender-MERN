// import axios from "axios";
// import config from "../config/whatsapp.config.js";

// export const sendTemplateMessage = async (phone, name, description, imageUrl) => {
//   try {
//     const payload = {
//       messaging_product: "whatsapp",
//       to: phone,
//       type: "template",
//       template: {
//         name: "your_template_name",
//         language: { code: "en_US" },
//         components: [
//           {
//             type: "header",
//             parameters: [
//               { type: "image", image: { link: imageUrl } }
//             ]
//           },
//           {
//             type: "body",
//             parameters: [
//               { type: "text", text: name },
//               { type: "text", text: description }
//             ]
//           }
//         ]
//       }
//     };

//     const url = `https://graph.facebook.com/v20.0/${config.phoneNumberId}/messages`;

//     const response = await axios.post(url, payload, {
//       headers: {
//         Authorization: `Bearer ${config.token}`,
//         "Content-Type": "application/json"
//       }
//     });

//     return response.data;
//   } catch (error) {
//     console.log("WA ERROR:", error.response?.data || error);
//     throw new Error("Failed to send WhatsApp message");
//   }
// };

// for twilio implementation
import twilio from "twilio";
import dotenv from "dotenv";
dotenv.config();

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export const sendTemplateMessage = async (phone, name, description, imageUrl) => {
  try {
    // Combine name and description into a single message
    const bodyMessage = `*${name}*\n${description}`;

    const options = {
      from: process.env.TWILIO_WHATSAPP_FROM, // whatsapp:+14155238886
      to: `whatsapp:${phone}`,
      body: bodyMessage
    };

    // Add image if provided
    if (imageUrl) {
      options.mediaUrl = [imageUrl];
    }

    const response = await client.messages.create(options);

    return {
      success: true,
      sid: response.sid,
      status: response.status,
      to: response.to
    };

  } catch (error) {
    console.log("WA ERROR:", error);
    throw new Error("Failed to send WhatsApp message");
  }
};
