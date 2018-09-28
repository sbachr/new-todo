let input = "#makan #minum#masak #masuk# ####  ##keluar"



const getHastag = function(hashtag){
    let strings = hashtag.split("#")
    let tags = strings.reduce(function(a, b){
        if(b){
            let tag = b.trim()
            if(tag){
                a.push(tag)
            }
        }
        return a
    }, [])
    return tags
}

console.log(getHastag(input))
