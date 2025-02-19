const fs =  require("fs")

fs.readFile("reflection.txt", 'utf-8', readingFile)

function readingFile(error, data){
    console.log(error)
    console.log(data)
}

console.log("Done")