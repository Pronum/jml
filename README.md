# Author(s)/Creator(s)
<center><img src="https://discord.c99.nl/widget/theme-3/730699395967877160.png"/></center>

# jml
JML is a custom file format like json, bson or yaml.

# To get started :
- At first, JML works with spaces, symbols & you don't need to put double quotes!
- Aswell as always this is just the beta of jml file format, more updates is comming soon!
### Example code for .jml file :
```yml
spacing is avaliable | this is spacing
$ymbols? | $ymb0ls & numb3r$ 4r3 w0rk1ng
```

### Example code in typescript :
```typescript
import { initJMLFile, indexJMLFile, getFromJML } from "jml-format";
import path from "path";

const fpath = path.join(__dirname + "/conf.jml");

(async () => {
    var s: any;

    // 👇 Await here is necessary, Or it wont initialize the JML File,
    // 👇 Await is required to skip using "setTimeout()".
    await initJMLFile(fpath).then( ( ) => s = indexJMLFile() );

    console.log(getFromJML(s.list.items, "spacing is avaliable"));
    console.log(getFromJML(s.list.items, "$ymbols?"));
})();
```

### Output:
-     this is spacing
-     $ymb0ls & numb3r$ 4r3 w0rk1ng

## Pros & cons :
### jml works with :
-   spacing
-   numbers
-   symbols

### jml can not work with :
-   more than space after you finished the field or value, Like :
-     GOOD 👇:
-      this is a test | yep!
-     BAD 👇:
-      this is a test     |     yep!

-   no ability to put comments (Working on it)