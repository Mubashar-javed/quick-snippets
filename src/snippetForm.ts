import * as vscode from "vscode";

export default function initSnippetForm(
    language: string | undefined,
    selectedText: string
) {
    vscode.workspace
        .openTextDocument({ language: language, content: selectedText })
        .then((doc) => {
            vscode.window.showTextDocument(doc);
        });
}
