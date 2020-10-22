const captureWebsite = require('capture-website');

(async () => {
    await captureWebsite.file('http://localhost:4507/index.html', 'screenshot.png');
    
    await captureWebsite.file('http://localhost:4507/exampleHtml.html', 'screenshot-html.png');
    await captureWebsite.file('http://localhost:4507/example/build/index.html', 'screenshot-example.png');
    
})();