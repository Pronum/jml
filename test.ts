import { initJMLFile, indexJMLFile, getFromJML } from "./src/modules/JML";
import path from "path";

const main = ( ) => {
    const fpath = path.join(__dirname + "/conf.jml");

    initJMLFile(fpath);
    setTimeout(( ) => {
        const r: any = indexJMLFile();
        const string: any = r;
        console.log(getFromJML(string.list.items, "spacing is avaliable"));
        console.log(getFromJML(string.list.items, "$ymbols?"));
    }, 32);
};

main();