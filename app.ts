import * as path from 'path'
import * as express from 'express'
import * as staticfile from 'connect-static-file'

const PORT   = process.env.PORT || 5000;
const PUBLIC = path.resolve(__dirname, 'public');

export default function main() {
    const app = express();
    
    app.use(express.static(PUBLIC));
    app.use(staticfile(path.resolve(PUBLIC, 'index.html')));
    
    app.listen(PORT, (err: any) => {
        if (err) console.error(err);
        console.log('listening on port:', PORT);
        console.log('Press Ctrl+C to quit.');
    })
}

if (require.main === module) {
    main()
}
