import * as fs from "fs";
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

//read html content from a file
  let html = fs.readFileSync(
    path.join(__dirname, "..", "assets", "public", "form.html"),
    "utf-8"
  );
  
// put selected text, style path, as well as main path in the html file
//TODO: use a template string approach to do this

  html = html.replace("__selectedText", selectedText);
  html = html.replace("__stylePath", stylePath.toString());
  html = html.replace("__mainPath", mainPath.toString());
  return html;
}
