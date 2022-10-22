import path from "path";
import fs from "fs";

let logDebug: boolean = true; // This boolean is true as default, Change it if you don't want to see console.log
let jmlIsDone: boolean = false;
let indexedFiles: string[] = [];

const initJMLFile = ( filePath: string ) => {
    return new Promise(function (resolve, reject) {
        if(!filePath || !filePath.endsWith(".jml")) return console.error("CFFP: Cannot find the specified file path!");
        else {
            fs.readFile(filePath, ( err, data ) => {
                if(err) return console.error(err);
                else {
                    if(logDebug) console.log("Done reading " + filePath + "!");
                    indexedFiles.push(filePath);
                    jmlIsDone = true;
                    resolve(data);
                    return data;
                }
            });
        }
    });
}

const indexJMLFile = (  ) => {
    var list: object = {
        items: []
    };

    var fieldList: string[] = [];
    var valueList: string[] = [];
    
    if(indexedFiles.length)
    {
        indexedFiles.forEach(( I: any ) => {
            const r = /\| (.*)/
            const rfsFile = fs.readFileSync(path.join(I)).toString();
    
            let splittedValue = rfsFile.split('\n').map((line: any) => line.match(r)[1]);
            let splittedField = rfsFile.split('\n').map((line: any) => line.substring(0, line.replace(" ", "").indexOf("|")));
    
            fieldList = splittedField;
            valueList = splittedValue;
        });
        
        for ( let e = 0; e < fieldList.length; e++)
        {
            list.items.push({
                [fieldList[e]]: valueList[e]
            });
        }
    
        return {
            list
        };
    }
    else
    {
        console.error("IFLINAN: Initialized files is nan, Make sure to initialize the file before using indexJMLFile() !")
    }
}

const getFromJML = (strings: string[], item: string) => {
    for (let i = 0; i < strings.length /* string.list.items.length */; i++) {
        const value = JSON.stringify(strings[i]).replaceAll("{", "").replaceAll("}", "").replaceAll(`"${item}"`, "").replaceAll("\"", "").replaceAll(":", "");
        // console.log(JSON.stringify(strings[i]).replaceAll("\"", "").replaceAll("{", "").replaceAll("}", "").replace(value, "").replaceAll(":", ""));
        if (item == JSON.stringify(strings[i]).replaceAll("\"", "").replaceAll("{", "").replaceAll("}", "").replace(value, "").replaceAll(":", "")) return value;
    }
    return -1;
}

export { 
    logDebug,
    initJMLFile,
    indexJMLFile,
    getFromJML,
};
