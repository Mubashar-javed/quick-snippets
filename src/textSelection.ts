import * as vscode from "vscode";
import openSnippetForm from "./snippetForm";
import { utils } from "./utils";
import { DefaultError } from "./utils/constants";


export function activateTextSelection() {
  const selectedText = utils.getSelectedText();

  if (!selectedText) {
    vscode.window.showErrorMessage(DefaultError.NO_TEXT);
    return;
  }

  // vscode.window.showInformationMessage(`Selected Text is ${selectedText}`);
  // vscode.window.showInformationMessage(`Langeuage is ${language}`);

  // open a new tab with the selected text
  openSnippetForm();
}
