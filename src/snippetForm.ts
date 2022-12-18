import * as path from "path";
import * as vscode from "vscode";
import { Uri } from "vscode";
import { Utils } from "./utils";
import { DefaultError } from "./utils/constants";

export default function openSnippetForm(context: vscode.ExtensionContext) {
  const editor = vscode.window.activeTextEditor;
  const activeLanguage = Utils.editorActiveLanguage();

  if (!activeLanguage) {
    vscode.window.showErrorMessage(DefaultError.UNKNOWN_LANGUAGE);
    return;
  }

  const userPath = Utils.getUserSnippetsPath();
  const snippetFile = path.join(userPath, `${activeLanguage}.json`);

  // TODO: add this in Utils namespace
  // if (!fs.existsSync(snippetFile)) {
  //   fs.writeFileSync(snippetFile, "{}");
  // } else {
  //   const jsonData = fs.readFileSync(snippetFile, "utf-8");
  //   const json = JSON.parse(jsonData);
  //   json["testing-snippet"] = {
  //     prefix: "testing-snippet",
  //     description: "",
  //     body: [
  //       "const files = fs.readdirSync(snippetPath);",
  //       "files.forEach(file => {",
  //       "    console.log(file);",
  //       "});",
  //       "vscode.window.showInformationMessage(snippetPath);",
  //     ],
  //   };

  //   fs.writeFileSync(snippetFile, JSON.stringify(json, null, 2));
  //   vscode.window.showInformationMessage("Snippet created!");
  // }

  const panel = vscode.window.createWebviewPanel(
    "snippetForm",
    "Snippet Form",
    vscode.ViewColumn.One,
    { enableScripts: true }
  );

  const selectedText = Utils.getSelectedText();
  if (!selectedText) {
    vscode.window.showErrorMessage(DefaultError.NO_TEXT);
    return;
  }

  panel.webview.html = getWebviewContent(context, panel.webview, selectedText);
  panel.onDidDispose(() => {
    // Clean up our resources
  });
}

function getWebviewContent(
  context: vscode.ExtensionContext,
  webview: vscode.Webview,
  selectedText: string
) {
  const stylePath = webview.asWebviewUri(
    Uri.joinPath(context.extensionUri, "assets", "public", "styles.css")
  );
  const mainPath = webview.asWebviewUri(
    Uri.joinPath(context.extensionUri, "assets", "public", "main.js")
  );

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script>
          window.vscode = acquireVsCodeApi();
        </script>
        <link href="${stylePath}" rel="stylesheet" />
        <title>Snippet Form</title>
    </head>
    <body>
        <h1>Snippet Form</h1>
        <img src="https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif" width="300" />
        <textarea id="snippet" name="snippet" rows="10" cols="30">${selectedText}</textarea>

        <script src="${mainPath}"></script>
    </body>
    </html>
    `;
}
