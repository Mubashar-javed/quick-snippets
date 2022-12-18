import * as vscode from "vscode";
import openSnippetForm from "./snippetForm";
import { Utils } from "./utils";
import { DefaultError } from "./utils/constants";


export function activateTextSelection(context: vscode.ExtensionContext) {
  const selectedText = Utils.getSelectedText();

  if (!selectedText) {
    vscode.window.showErrorMessage(DefaultError.NO_TEXT);
    return;
  }

  // vscode.window.showInformationMessage(`Selected Text is ${selectedText}`);
  // vscode.window.showInformationMessage(`Langeuage is ${language}`);

  // open a new tab with the selected text
  openSnippetForm(context);
}
