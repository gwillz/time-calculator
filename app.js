
const fs = require('fs');
const path = require('path');
const express = require('express');

const PORT = process.env.PORT || 5000;
const r = path.resolve.bind(null, __dirname);

function main() {
    const app = express();
    
    app.use(express.static(r('public')));
    app.use("/", (req, res, next) => {
        fs.readFile(r('public/index.html'), 'utf-8', (err, content) => {
            if (err) next(err);
            else res.send(content);
        });
    });
    
    app.listen(PORT, () => {
        console.log('listening on port:', PORT);
        console.log('Press Ctrl+C to quit.');
    });
}

if (require.main === module) {
    main();
}
