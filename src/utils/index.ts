import * as os from "os";
import * as path from "path";
import * as vscode from "vscode";

export namespace utils {
    /**
     * It gets the currently selected text in the active editor
     * @returns The selected text in the active editor.
     */
    export function getSelectedText() {
        const editor = vscode.window.activeTextEditor;
        const selectedText = editor?.document.getText(editor.selection);
        return selectedText;
    }

    /**
     * It returns the path to the user settings folder for Visual Studio Code
     * @returns The path to the user settings file.
     */
    export function getUserSettingsPath(): string {
        // TODO: Check for the VSCode Insiders version of the app

        let userSettingsPath = "";
        switch (os.platform()) {
            case "win32":
                userSettingsPath = path.join(process.env.APPDATA || "", "Code", "User");
                break;
            case "darwin":
                userSettingsPath = path.join(
                    process.env.HOME || "",
                    "Library",
                    "Application Support",
                    "Code",
                    "User"
                );
                break;
            case "linux":
                userSettingsPath = path.join(
                    process.env.HOME || "",
                    ".config",
                    "Code",
                    "User"
                );
                break;
            default:
                userSettingsPath = "";
        }
        return userSettingsPath;
    }

    /**
     * "Get the path to the user's snippets folder."
     *
     * @returns The path to the user's snippets folder.
     */
    export function getUserSnippetsPath() {
        const userSettingsPath = getUserSettingsPath();
        return path.join(userSettingsPath, "snippets");
    }

    /**
     * It returns the language of the currently active editor
     * @returns The language of the active editor.
     */
    export function editorActiveLanguage() {
        const editor = vscode.window.activeTextEditor;
        const language = editor?.document.languageId;
        return language;
    }

}