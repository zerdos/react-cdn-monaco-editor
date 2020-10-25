import { diff } from "./diff.js";

const importScript = async (src: string) => new Promise(function (resolve, reject) {
  ///@ts-ignore
  const s = document.createElement("script");
  s.src = src;
  s.onload = resolve;
  s.onerror = reject;
  ///@ts-ignore
  document.head.appendChild(s);
});

//@ts-ignore
export const run = async (startMonaco) => {

  await importScript("https://unpkg.com/@babel/standalone@7.12.4/babel.min.js")
  await importScript("https://unpkg.com/react@17.0.1/umd/react.production.min.js")
  await importScript("https://unpkg.com/react-dom@17.0.1/umd/react-dom.production.min.js")
  await importScript("https://unpkg.com/interactjs@1.10.0/dist/interact.min.js")

  const searchRegExp = /import/gi;
  const replaceWith = "///";

  setTimeout(()=>makeDragabble(), 100);

  let latestGoodCode = "";
 

  const transpileCode = (code: string) =>
///@ts-ignore
    window["Babel"].transform(code, {
      plugins: [],
      presets: ["react", ["typescript", { isTSX: true, allExtensions: true }]],
    }).code.replace(searchRegExp, replaceWith);

  const restartCode = async (transpileCode: string) => {


    const restart = new Function(
      "transpileCode",
      `return function(){ ${transpileCode} }`,
    )();
  
   const body = {
      codeTranspiled: transpileCode,
      code: latestGoodCode
     };

     const stringBody = JSON.stringify(body);
     const request = new Request(
       "https://my-ts-project.zed-vision.workers.dev",
       {
         body: stringBody,
         method: "POST",
         headers: { "content-type": "application/json;charset=UTF-8" },
       },
     );
    
     const response = await fetch(request);
     restart()
  };



  let keystrokeTillNoError = 0;
  let latestCode = "";
  let errorReported = "";
  let busy = 0;
  let latestBadCode = "";

  (async () => {
    const example = getExampleCode();
    latestGoodCode = example;
    latestBadCode = example;
    const editor = await startMonaco({
      language: "typescript",
      code: example,
      onChange: (code: string) => {
        latestCode = code;
        console.log(code);

        const runner = async (cd: string) => {
          if (busy === 1) return;

          busy = 1;
          const err = await getErrors(editor);
          ///@ts-ignore
          const errorDiv = document.getElementById("error");
          try {
            busy = 0;

            if (cd !== latestCode) return;
            if (err && err.length) {
              if (latestCode != cd) return;
              if (errorReported === cd) return;
      ///@ts-ignore
                
              document.getElementById("root").classList.add("almosthidden")
              const slices = diff(latestGoodCode, cd);
              console.log(slices);

              if (slices.length <= 3) {
                latestBadCode = cd;
                ///@ts-ignore
                window["monaco"].editor.setTheme("hc-black") 
                  return;
              }

              // const oldSlices = diff(latestBadCode, cd);

              // const unMerge = oldSlices.filter((o) => o[0] !== 0);

              // let filtered = slices.filter((t) =>
              //   t[0] === 0 || t[1] === unMerge[0][1]
              // );

              // if (filtered.length > 4) {
              //   filtered = filtered.filter((t) => t[0] === 0);
              // }

              // diff_cleanupMerge(filtered, false);

              // let newStr = "";
              // let offset = 0;
              // filtered.map((t) => {
              //   newStr = newStr + t[1];
              //   if (t[0] !== 0) {
              //     offset = newStr.length;
              //   }
              // });

              // busy = 0;

              // if (newStr !== cd) {
              //   editor.setValue(newStr);
              //   const model = editor.getModel("file:///Main.tsx");

              //   const position = model.getPositionAt(offset);
              //   //  mosel.getC

              //   const validPos = model.validatePosition(position);
              //   editor.setPosition(validPos);

              //   // model.modifyPosition(position)
              //   return;
              // }
              // const errors = err..map((x) => x.messageText)

              //@ts-ignore
              errorDiv.innerHTML = errors[0].messageText;
                 ///@ts-ignore
                
                 document.getElementById("root").style.setProperty("dispay","none")

              errorDiv.style.display = "block";
              errorReported = cd;

              //@ts-ignore
              window["monaco"].editor.setTheme("vs-light");
              setTimeout(() => {
                //@ts-ignore
                window["monaco"].editor.setTheme("hc-black");
              }, keystrokeTillNoError++);

              return;
            }
            latestGoodCode = cd;

            errorDiv!.style!.display = "none";
            //@ts-ignore
   
            window["monaco"].editor.setTheme("vs-dark")
            
            //@ts-ignore
            document.getElementById("root").classList.remove("almosthidden")
            keystrokeTillNoError = 0;

            busy = 0;
            restartCode(transpileCode(cd));
          } catch (err) {
            busy = 0;
            if (cd !== latestCode) return;

            ///@ts-ignore
            window["monaco"].editor.setTheme("vs-light");
            setTimeout(() => {
              ///@ts-ignore
              window["monaco"].editor.setTheme("hc-black");
            }, 10);
            console.error(err);
          }
        };
        if (!busy) runner(latestCode);
        else {
          const myCode = code;
          const cl = setInterval(() => {
            if (myCode !== latestCode || !busy) {
              clearInterval(cl);
            }

            if (!busy) runner(latestCode);
          }, 100);
        }
      },
    });
    //
  })();

  restartCode(transpileCode(getExampleCode()));
  //@ts-ignore
  document.getElementById("root").setAttribute("style","display:block");
  // dragElement(document.getElementById("root"));

  async function getErrors(editor: any) {
    const model = editor.getModel("file:///main.tsx");

    //@ts-ignore
    const tsWorker = await window["monaco"].languages.typescript
      .getTypeScriptWorker();
    const modelUri = model?.uri;
    if (!modelUri) return;

    const diag = await (await tsWorker(modelUri)).getSemanticDiagnostics(
      "file:///main.tsx",
    );
    const comp = await (await tsWorker(modelUri))
      .getCompilerOptionsDiagnostics("file:///main.tsx");
    const syntax = await (await tsWorker(modelUri)).getSyntacticDiagnostics(
      "file:///main.tsx",
    );

    return [...diag, ...comp, ...syntax];
  }


  const makeDragabble = () => {
    ///@ts-ignore
    window.interact('.draggable')
        .draggable({
          // enable inertial throwing
          inertia: true,
          // keep the element within the area of it's parent
          modifiers: [
                ///@ts-ignore
            interact.modifiers.restrictRect({
              restriction: 'parent',
              endOnly: true
              })
          ],
          // enable autoScroll
          autoScroll: false,
          listeners: {
            // call this function on every dragmove event
            move: dragMoveListener,
  
            // call this function on every dragend event
          }
        })
      }
  
      ///@ts-ignore
      function dragMoveListener(event: any) {
        var target = event.target
        // keep the dragged position in the data-x/data-y attributes
        var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
        var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy
  
        // translate the element
        target.style.webkitTransform =
          target.style.transform =
          'translate(' + x + 'px, ' + y + 'px)'
  
        // update the posiion attributes
        target.setAttribute('data-x', x)
        target.setAttribute('data-y', y)
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


};


export const css = `html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,embed,figure,figcaption,footer,header,hgroup,menu,nav,output,ruby,section,summary,time,mark,audio,video{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}body{line-height:1}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote:before,blockquote:after,q:before,q:after{content:'';content:none}table{border-collapse:collapse;border-spacing:0}
#container {
  background-color: #1E1E1E;
  width: 100vw;
  height: 100vh;
  animation-duration: 1s;
  animation-name: opening;
}
body{
  overflow: hidden;
  width: 100%;
  height: 100vh;
}

@keyframes opening {
  from {
    width: 10%;
    height: 20vh;
  }

  66% {
    width: 100%;
    height: 20vh;
  }

  to {
    width: 100%;
    height: 100vh;
  }
}


#error {
  display: none;
  background-color: red;
  opacity: 0.7;
}

#root {
  display: none;
}

.draggable {
  margin: 24px;
  padding: 32px;
  position: absolute;
  touch-action: none;
  overflow: hidden;
  z-index: 2;
  word-wrap: break-word;
  right: 24px;
  /* float: right; */
  /* top: 24px; */
  /* right: 24px ; */
  -webkit-transform: translate(0px, 0px);
  transform: translate(0px, 0px);
  font-size: 32px;
  background-color: #ddd;
  border-radius: 16px;
  width: fit-content;
  max-width: 40vw;
  background: #ddd;
  box-shadow:
    0 2.8px 2.2px rgba(0, 0, 0, 0.034),
    0 6.7px 5.3px rgba(0, 0, 0, 0.048),
    0 12.5px 10px rgba(0, 0, 0, 0.06),
    0 22.3px 17.9px rgba(0, 0, 0, 0.072),
    0 41.8px 33.4px rgba(0, 0, 0, 0.086),
    0 100px 80px rgba(0, 0, 0, 0.12);
}
.almosthidden {
  opacity: 0.5;
}

button {
  font-size: large;
}
`;
    ///@ts-ignore
const style=document.createElement('style');
    ///@ts-ignore
    style.appendChild(document.createTextNode(css));
    ///@ts-ignore
document.getElementsByTagName('head')[0].appendChild(style);