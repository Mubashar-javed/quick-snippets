import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import * as vscode from 'vscode';
import {ColorThemeKind} from 'vscode';
import {Snippet} from './constants';

export namespace Utils {
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

    let userSettingsPath = '';
    switch (os.platform()) {
      case 'win32':
        userSettingsPath = path.join(process.env.APPDATA || '', 'Code', 'User');
        break;
      case 'darwin':
        userSettingsPath = path.join(
          process.env.HOME || '',
          'Library',
          'Application Support',
          'Code',
          'User'
        );
        break;
      case 'linux':
        userSettingsPath = path.join(
          process.env.HOME || '',
          '.config',
          'Code',
          'User'
        );
        break;
      default:
        userSettingsPath = '';
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
    return path.join(userSettingsPath, 'snippets');
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

  /**
   * It returns the name of the current theme
   * @returns The name of the current theme.
   */
  export function getCurrentThemeName(): string {
    const settingsFile = path.join(getUserSettingsPath(), 'settings.json');

    const jsonData = fs.readFileSync(settingsFile).toString();

    // replacing all the comments in the settings.json file as
    // they are not parsed by JSON.parse
    const replaced = jsonData.replace(/\/\/.*/g, '');
    const json = JSON.parse(replaced);
    let themeName: string | undefined = json['workbench.colorTheme'];
    const themeKind = vscode.window.activeColorTheme.kind;

    if (!themeName) {
      // mean user is using the default theme
      themeName = {
        [ColorThemeKind.Light]: 'Default Light',
        [ColorThemeKind.Dark]: 'Default Dark',
        [ColorThemeKind.HighContrast]: 'Default High Contrast',
        [ColorThemeKind.HighContrastLight]: 'Default High Contrast Light',
      }[themeKind];
    }

    return themeName;
  }

  /**
   * It takes a snippet object, a webview panel, and the active language, and saves the snippet to the
   * user's snippets file
   * @param {Snippet} snippet - Snippet
   * @param panel - The webview panel that is showing the snippet form
   * @param {string} activeLanguage - The language for which the snippet is being created.
   */
  export function saveSnippet(
    snippet: Snippet,
    panel: vscode.WebviewPanel,
    activeLanguage: string
  ) {
    const userPath = Utils.getUserSnippetsPath();
    const snippetFile = path.join(userPath, `${activeLanguage}.json`);

    const {prefix, description, body} = snippet;

    if (!fs.existsSync(snippetFile)) {
      fs.writeFileSync(snippetFile, '{}');
    } else {
      if (fs.readFileSync(snippetFile, 'utf-8').length === 0) {
        fs.writeFileSync(snippetFile, '{}');
      }
      const jsonData = fs.readFileSync(snippetFile, 'utf-8');
      const json = JSON.parse(jsonData);
      json[prefix] = {prefix, description, body: [body]};

      fs.writeFileSync(snippetFile, JSON.stringify(json, null, 2));
      vscode.window.showInformationMessage('Snippet saved successfully! 😎');
      panel.dispose();
    }
  }
}
