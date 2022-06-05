import fs from 'fs';
import { IncomingMessage, ServerResponse } from 'http';

export function requestHandler(req: IncomingMessage, res: ServerResponse) {
    const url = req.url;

    if (url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write(`
            <html>
                <head>
                    <title>Page</title>
                </head>
                <body>
                    <form
                        action="/message"
                        method="POST">
                        <input name="message" type="text">
                        <button>Submit</button>
                    </form>
                </body>
            </html>
        `)
        return res.end();
    }

    if (url === '/message' && req.method === 'POST') {
        const body: Uint8Array[] = [];
        req.on('data', (chunk) => body.push(chunk));
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];

            fs.writeFile('message.txt', message, (err) => {
                res.writeHead(302, { Location: '/' });
                return res.end();
            });
        });
    }
}

