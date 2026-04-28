import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { name, email, subject, message } = await req.json();

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: "Campos obrigatórios faltando." }, { status: 400 });
  }

  const { error } = await resend.emails.send({
    from: "Portfolio VMI <onboarding@resend.dev>",
    to: "vitor.montemor.ismael@gmail.com",
    replyTo: email,
    subject: `[Portfolio] ${subject}`,
    text: `Nome: ${name}\nEmail: ${email}\n\n${message}`,
    html: `
      <div style="font-family:ui-monospace,monospace;background:#0A0F14;color:#B8C0CC;padding:32px;max-width:600px">
        <div style="border-left:2px solid #B8552E;padding-left:16px;margin-bottom:24px">
          <p style="color:#6F7784;font-size:11px;margin:0 0 4px">send_message.tsx → portfolio</p>
          <h2 style="color:#F0F2F4;margin:0;font-size:20px">${subject}</h2>
        </div>
        <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
          <tr>
            <td style="color:#6F7784;font-size:11px;padding:8px 0;border-bottom:1px solid #1C2630;width:80px">nome</td>
            <td style="color:#F0F2F4;font-size:13px;padding:8px 0;border-bottom:1px solid #1C2630">${name}</td>
          </tr>
          <tr>
            <td style="color:#6F7784;font-size:11px;padding:8px 0;border-bottom:1px solid #1C2630">email</td>
            <td style="color:#F0F2F4;font-size:13px;padding:8px 0;border-bottom:1px solid #1C2630">
              <a href="mailto:${email}" style="color:#B8552E">${email}</a>
            </td>
          </tr>
        </table>
        <div style="background:#0D131A;border:1px solid #1C2630;padding:20px;font-size:14px;line-height:1.7;white-space:pre-wrap">${message}</div>
      </div>
    `,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
