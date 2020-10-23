import { diff, diff_cleanupMerge } from "../diff.js";
import { startMonaco } from "./editor.js";
import interact from "@interactjs/interactjs/index.js";
const searchRegExp = /import/gi;
const replaceWith = '///';
const transpileCode = (code) => window["Babel"].transform(code, {
    plugins: [],
    presets: ["react", ["typescript", { isTSX: true, allExtensions: true }]],
}).code.replace(searchRegExp, replaceWith);
const restartCode = (transpileCode) => {
    const restart = new Function("transpileCode", `return function(){ ${transpileCode} }`)();
    restart();
};
let keystrokeTillNoError = 0;
let latestCode = "";
let errorReported = "";
let busy = 0;
let latestGoodCode = "";
let latestBadCode = "";
(async () => {
    const example = getExampleCode();
    latestGoodCode = example;
    latestBadCode = example;
    const editor = await startMonaco({
        language: "typescript", code: example, onChange: (code) => {
            latestCode = code;
            console.log(code);
            const runner = async (cd) => {
                if (busy === 1)
                    return;
                busy = 1;
                const err = await getErrors(editor);
                const errorDiv = document.getElementById("error");
                try {
                    busy = 0;
                    if (cd !== latestCode)
                        return;
                    if (err.length) {
                        if (latestCode != cd)
                            return;
                        if (errorReported === cd)
                            return;
                        const slices = diff(latestGoodCode, cd);
                        console.log(slices);
                        if (slices.length <= 3) {
                            latestBadCode = cd;
                            editor.setTheme("hc-black");
                            return;
                        }
                        const oldSlices = diff(latestBadCode, cd);
                        const unMerge = oldSlices.filter(o => o[0] !== 0);
                        let filtered = slices.filter(t => t[0] === 0 || t[1] === unMerge[0][1]);
                        if (filtered.length > 4)
                            filtered = filtered.filter(t => t[0] === 0);
                        diff_cleanupMerge(filtered, false);
                        let newStr = "";
                        let offset = 0;
                        filtered.map(t => {
                            newStr = newStr + t[1];
                            if (t[0] !== 0) {
                                offset = newStr.length;
                            }
                        });
                        busy = 0;
                        if (newStr !== cd) {
                            editor.setValue(newStr);
                            const model = editor.getModel("file:///Main.tsx");
                            const position = model.getPositionAt(offset);
                            //  mosel.getC 
                            const validPos = model.validatePosition(position);
                            editor.setPosition(validPos);
                            // model.modifyPosition(position)
                            return;
                        }
                        const errors = err.map(x => x.messageText).join("<br />");
                        errorDiv.innerHTML = errors;
                        errorDiv.style.display = "block";
                        errorReported = cd;
                        editor.setTheme("vs-light");
                        setTimeout(() => {
                            editor.setTheme("hc-black");
                        }, keystrokeTillNoError++);
                        return;
                    }
                    latestGoodCode = cd;
                    errorDiv.style.display = "none";
                    editor.setTheme("vs-dark");
                    keystrokeTillNoError = 0;
                    busy = 0;
                    restartCode(transpileCode(cd));
                }
                catch (err) {
                    busy = 0;
                    if (cd !== latestCode)
                        return;
                    editor.setTheme("vs-light");
                    setTimeout(() => {
                        editor.setTheme("hc-black");
                    }, 10);
                    console.error(err);
                }
            };
            if (!busy) {
                runner(latestCode);
            }
            else {
                const myCode = code;
                const cl = setInterval(() => {
                    if (myCode !== latestCode || !busy) {
                        clearInterval(cl);
                    }
                    if (!busy)
                        runner(latestCode);
                }, 100);
            }
        }
    });
    //
})();
const mageDraggable = async () => {
    // target elements with the "draggable" class
    interact('#root')
        .draggable({
        // enable inertial throwing
        inertia: true,
        // keep the element within the area of it's parent
        modifiers: [
            interact.modifiers.restrictRect({
                restriction: 'parent',
                endOnly: true
            })
        ],
        // enable autoScroll
        autoScroll: true,
        listeners: {
            // call this function on every dragmove event
            move: dragMoveListener
        }
    });
    mageDraggable();
    function dragMoveListener(event) {
        var target = event.target;
        // keep the dragged position in the data-x/data-y attributes
        var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
        var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
        // translate the element
        target.style.webkitTransform =
            target.style.transform =
                'translate(' + x + 'px, ' + y + 'px)';
        // update the posiion attributes
        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
    }
    // this function is used later in the resizing and gesture demos
    //   window.dragMoveListener = dragMoveListener
};
restartCode(transpileCode(getExampleCode()));
// dragElement(document.getElementById("root"));
async function getErrors(editor) {
    const model = editor.getModel("file:///main.tsx");
    const tsWorker = await window["monaco"].languages.typescript
        .getTypeScriptWorker();
    const modelUri = model === null || model === void 0 ? void 0 : model.uri;
    if (!modelUri)
        return;
    const diag = await (await tsWorker(modelUri)).getSemanticDiagnostics("file:///main.tsx");
    const comp = await (await tsWorker(modelUri))
        .getCompilerOptionsDiagnostics("file:///main.tsx");
    const syntax = await (await tsWorker(modelUri)).getSyntacticDiagnostics("file:///main.tsx");
    return [...diag, ...comp, ...syntax];
}
function getExampleCode() {
    return `import * as React from "react";
import ReactDOM from "react-dom";

const Counter = (
{ initial = 0 }
) => {
const [clicks, setClicks] = React.useState(initial);

return <div>
    <p>Clicks: <strong>{clicks}</strong></p>
    <button onClick={() => setClicks(clicks + 1)}>+</button>
    <button onClick={() => setClicks(clicks - 1)}>-</button>
</div>;
};

ReactDOM.render(
<Counter initial={0} />,
document.getElementById("root")
);
`;
}
//# sourceMappingURL=example.js.map