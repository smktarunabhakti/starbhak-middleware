import { sendEmail } from "../../common/utils/email-service";
import { db } from "../../db";
import { users } from "../../db/schema";

async function blastAllUserWithDefaultCred() {
  let usersAll = await db.select().from(users);

  let emails = `<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Account Credentials</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; margin: auto; background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0px 0px 10px rgba(0,0,0,0.1);">
        <tr>
            <td align="center" style="padding-bottom: 20px;">
                <h2 style="color: #333;">Welcome to Star Mo</h2>
            </td>
        </tr>
        <tr>
            <td>
                <p>Dear <strong>{USER_NAME}</strong>,</p>
                <p>Your account has been successfully created. Below are your default login credentials:</p>
                <table width="100%" cellpadding="10" cellspacing="0" border="0" style="background: #f9f9f9; border-radius: 5px;">
                    <tr>
                        <td><strong>Email:</strong></td>
                        <td>{USER_EMAIL}</td>
                    </tr>
                    <tr>
                        <td><strong>Password:</strong></td>
                        <td>{USER_PASSWORD}</td>
                    </tr>
                </table>
                <p style="margin-top: 20px;">For security reasons, we highly recommend changing your password upon first login.</p>
            </td>
        </tr>
    </table>
</body>
</html>`;

  for (const item of usersAll) {
    let email = emails
      .replace("{USER_NAME}", item.name)
      .replace("{USER_EMAIL}", item.email)
      .replace("{USER_PASSWORD}", "12345678");

      console.log("Sending email to", item.email);
      await sendEmail(item.email, "Account Credentials", email);
      console.log("Email sent to", item.email);
  }
}

await blastAllUserWithDefaultCred();