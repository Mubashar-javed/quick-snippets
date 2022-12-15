import * as vscode from "vscode";
import initSnippetForm from "./snippetForm";

export function activateTextSelection() {
    const editor = vscode.window.activeTextEditor;
    const selectedText = editor?.document.getText(editor.selection);

    if (!selectedText) {
        vscode.window.showErrorMessage("No text selected");
        return;
    }

    const language = editor?.document.languageId;

    // vscode.window.showInformationMessage(`Selected Text is ${selectedText}`);
    // vscode.window.showInformationMessage(`Langeuage is ${language}`);

    // open a new tab with the selected text
    initSnippetForm(language, selectedText);
}
