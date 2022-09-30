import path from "path";
import fs from "fs";

var logDebug: boolean = true; // This boolean is true as default, Change it if you don't want to see console.log
var indexedFiles: any = [];

const initJMLFile = ( filePath: string ) => {
    if(!filePath) return console.error("CFFP: Cannot find the specified file path!");
    else {
        fs.readFile(filePath, ( err, data ) => {
            if(err) return console.error(err);
            else {
                if(logDebug) console.log("Done reading " + filePath + " !");
                indexedFiles.push(filePath);
                return data;
            }
        });
    }
}

const indexJMLFile = (  ) => {
    let timer = 0.1;
    var valueContent: any;
    var fieldContent: any;
    timer += 0.1;
    var list: any = {
        items: []
    };
    var fieldList: any = [];
    var valueList: any = [];
    timer += 0.1;
    indexedFiles.forEach(( I: any ) => {
        const r = /\| (.*)/
        const rfsFile = fs.readFileSync(path.join(I)).toString();
        timer += 1;
        let splittedValue = rfsFile.split('\n').map((line: any) => line.match(r)[1]);
        let splittedField = rfsFile.split('\n').map((line: any) => line.substring(0, line.replace(" ", "").indexOf("|")));
        timer += 1;
        fieldContent = splittedField;
        valueContent = splittedValue;
    });
    fieldContent.forEach(( e: any ) => {
        timer += 1;
        fieldList.push(e);
    });
    valueContent.forEach(( f: any ) => {
        timer += 1;
        valueList.push(f);
    });
    var lengthed = fieldList.length;
    for ( let e = 0; e < lengthed; e++)
    {
        timer += 1;
        list.items.push({
            [fieldList[e]]: valueList[e]
        });
    }
    return {
        list
    };
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