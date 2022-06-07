import { IncomingMessage, ServerResponse } from "http";


export const requestHandler = (req: IncomingMessage, res: ServerResponse) => {
    const url = req.url;

    if (url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write(`
            <html>
                <body>
                    <h1>Some Greeting</h1>
                    <form
                        action="/create-user"
                        method="POST">
                        <input name="username" type="text">
                        <button>Submit</button>
                    </form>
                </body>
            </html>
        `)
        res.end();
        return;
    }

    if (url === '/users') {
        res.setHeader('Content-Type', 'text/html');
        res.write(`
            <html>
                <body>
                    <ul>
                        <li>User 1</li>
                        <li>User 2</li>
                        <li>User 3</li>
                        <li>User 4</li>
                    </ul>
                </body>
            </html>
        `)
        res.end();
        return;
    }

    if (url === '/create-user') {
        const data: Uint8Array[] = [];
        req.on('data', (chunk) => data.push(chunk))
        req.on('end', () => {
            const parsedData = Buffer.concat(data).toString();
            res.writeHead(302, { Location: '/' })
            res.end();
            console.log(parsedData);
        })
        return;
    }

}