//ecma version : 2016
//code by : alokraj68
//to find top 10 words from the document and get its occurances synonyms and parts of speechs consoled.
//please note the api is not returning syn and mean hence it will tell no synonyms found.

//all requires
const request = require('request');
const APIkey = "dict.1.1.20170610T055246Z.0f11bdc42e7b693a.eefbde961e10106a4efa7d852287caa49ecc68cf";


getFileFromURL();
//Get the data
function getFileFromURL() {
    request('http://norvig.com/big.txt', (err, res, body) => {
        if (err) {
            console.log(err);
        }
        var fileContents = body;
        getUniqueWordAndFrequency(fileContents, 10).then(function (outputJson) {
            console.log(JSON.stringify(outputJson));
        }, function (err) {
            console.error(err);
        });

    }, function (err) {
        console.error(err);
    });
}

//First api service call
function getWordDetails(wordElement) {
    return new Promise(function (resolve, reject) {
        request('https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=' + APIkey + '&lang=en-en&text=' + wordElement, (err, res, body) => {
            if (err) {
                reject(err);
            }
            resolve(body);
        });
    });
}

function getUniqueWordAndFrequency(string, cutOff) {
    return new Promise(function (resolve, reject) {
        var uniqueString = string.replace(/[.,-/#!$%^&*;:{}=\-_`~()]/g, ""),
            words = uniqueString.split(' '),
            frequencies = {},
            word, i;

          for (i = 0; i < words.length; i++) {
            word = words[i];
            frequencies[word] = frequencies[word] || 0;
            frequencies[word]++;
        }

        words = Object.keys(frequencies);

        var topWordArray = words.sort(function (a, b) {
            return frequencies[b] - frequencies[a];
        })

        var finalArray = [];
        var apisToBeCalled = topWordArray.length
                wordDetails = JSON.parse(wordDetails);
                var returnJsonObject = {
                    "count": frequencies[word]
                };
                if (wordDetails.def[0]) {
                    if ("syn" in wordDetails.def[0]) {
                        returnJsonObject.synonyms = wordDetails.def[0].syn;
                    } else {
                        if ("mean" in wordDetails.def[0]) {
                            returnJsonObject.synonyms = wordDetails.def[0].mean;
                        } else {
                            returnJsonObject.synonyms = "No Synonyms found";
                        }
                    }
                    if ("pos" in wordDetails.def[0]) {
                        returnJsonObject.pos = wordDetails.def[0].pos;
                    } else {
                        returnJsonObject.pos = "No Part of speech found";
                    }
                } else {
                    returnJsonObject.synonyms = "No Synonyms found";
                    returnJsonObject.pos = "No Part of speech found";
                }

                finalArray.push({
                    "word": word,
                    "output": returnJsonObject
                })
                if (apisToBeCalled === 0) {
                    finalArray = finalArray.sort(function (a, b) {
                        return b.output.count - a.output.count
                    })
                    var returnJson = {
                        "topwords": finalArray
                    };
                    resolve(returnJson);
                }
            }, function (err) {
                console.error(err);
                reject(err);
            });
        }