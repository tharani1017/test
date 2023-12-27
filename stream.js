const fs=require('fs');

//  const read=fs.ReadStream('stream.txt');
//  read.on('data', (chunk) => {

//      console.log(chunk.toString());
//   });


//  const writes=fs.WriteStream('streams.txt');
//  writes.write('hi ms.Tharani');
//  writes.end();
//  writes.on('finish',()=>{
//      console.log("write stream finished");
//  })
  
const { Transform } = require('stream');

const upperCaseTransform = new Transform({
  transform(chunk, encoding, callback) {
    this.push(chunk.toString().toUpperCase());
    callback();
  }
});
process.stdin.pipe(upperCaseTransform).pipe(process.stdout);