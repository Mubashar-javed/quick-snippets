import * as vscode from "vscode";
import { activateTextSelection } from "./textSelection";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	const insertSnippet = vscode.commands.registerCommand(
		"quick-snippets.createSnippet",
		() => {
			activateTextSelection();
		}
	);

	context.subscriptions.push(insertSnippet);
}

// This method is called when your extension is deactivated
export function deactivate() { }
