import * as vscode from "vscode";

export default function initSnippetForm(
    language: string | undefined,
    selectedText: string
) {
    const panel = vscode.window.createWebviewPanel(
        "snippetForm",
        "Snippet Form",
        vscode.ViewColumn.One,
        {
            enableScripts: true,
        }
    );

    panel.webview.html = getWebviewContent(selectedText);

    panel.onDidDispose(() => {
        // Clean up our resources
    });
}

function getWebviewContent(selectedText: string) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Snippet Form</title>
    </head>
    <body>
        <h1>Snippet Form</h1>
        <img src="https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif" width="300" />
        <textarea id="snippet" name="snippet" rows="10" cols="30">${selectedText}</textarea>

    </body>
    </html>
    `;
}
