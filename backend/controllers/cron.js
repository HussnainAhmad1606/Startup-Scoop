export const cron = async () => {
    const req = await fetch("http://startup-scoop.vercel.app/fetch-news");
    const res = await req.json();
    console.log(res);

    const sendMail = await fetch("http://startup-scoop.vercel.app/send-mail");
    const mailRes = await sendMail.json();
    console.log(mailRes)


};