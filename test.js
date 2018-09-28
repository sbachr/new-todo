let a = ["makan"]

let newTag = a.reduce(function(result,tag){
    let tags =  result+"#" + tag
    return tags
}, '')

console.log(newTag)