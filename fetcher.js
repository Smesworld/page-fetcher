const request = require('request');
const fs = require('fs');

const fetcher = function(url, fileName) {
  request(url, (error, response, body) => {
    if (error !== null) {
      console.log('error:', error); // Print the error if one occurred
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      return;
    }

    let writeStream = fs.createWriteStream(fileName);
    writeStream.write(body);
    
    writeStream.on('error', (err) => {
      console.log('error:', err.message);
    });

    writeStream.on('finish', (err) => {
      if (err) {
        console.log("error:", err)
      } else {
        console.log(`Downloaded and saved ${writeStream.bytesWritten} to ${fileName}`);
      }
    });

    writeStream.end();
  });
};

const args = process.argv.slice(2);
fetcher(args[0], args[1]);