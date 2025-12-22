import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createTransport } from "npm:nodemailer@6.9.7";

const smtpConfig = {
    host: Deno.env.get('SMTP_HOST'),
    port: parseInt(Deno.env.get('SMTP_PORT') ?? '587'),
    auth: {
        user: Deno.env.get('SMTP_USER'),
        pass: Deno.env.get('SMTP_PASS'),
    },
};

const transporter = createTransport(smtpConfig);

serve(async (req) => {
    try {
        // Supabase webhooks send the data in the 'record' field
        const payload = await req.json()
        const record = payload.record || payload;

        const { first_name, last_name, email, phone, message } = record;

        // Send Mail
        const info = await transporter.sendMail({
            from: Deno.env.get('SMTP_FROM_EMAIL') || 'no-reply@schematter.com',
            to: Deno.env.get('ADMIN_EMAIL'),
            subject: `New Contact: ${first_name} ${last_name}`,
            text: `Name: ${first_name} ${last_name}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\n\nMessage:\n${message}`,
            html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${first_name} ${last_name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
        <h3>Message:</h3>
        <p>${message}</p>
      `,
        });

        console.log('Email sent:', info.messageId);

        return new Response(JSON.stringify({ success: true, id: info.messageId }), {
            headers: { 'Content-Type': 'application/json' },
            status: 200,
        })

    } catch (error) {
        console.error('Error:', error);
        return new Response(JSON.stringify({ error: error.message }), {
            headers: { 'Content-Type': 'application/json' },
            status: 500,
        })
    }
})
