import express from 'express';

const app = express();

export function postHelpSupport(req, res){
    try {
        const name = req.user.name;
        const email = req.user.email;
        const phone = req.body.phone;
        const topic = req.body.topic;
        const message = req.body.message;

        const user_message = {
            name: name,
            email: email,
            phone: phone,
            topic: topic,
            message: message
        };

        console.log(`
            The message came from support page:
            ${JSON.stringify(user_message)}
        `);

        res.send(`
            <h1>Your message has been taken in. Thanks for your attention :)</h1>
            <script>
                setTimeout(() => {
                    window.location.href = '/settings/helpsupport';
                }, 1500);
            </script>
        `);
    } 
    
    catch (err) {
        console.log(`Error occurred while having a message from support page. ${err}`);
        res.send(`
            <h1>Your message hasn't been sent. Forgive us :(</h1>
            <script>
                setTimeout(() => {
                    window.location.href = '/settings/helpsupport';
                }, 1500);
            </script>
        `);
    }
}