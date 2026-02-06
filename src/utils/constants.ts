import { App, Editor, MarkdownView, Modal, Notice, Plugin } from "obsidian";
import { DEFAULT_SETTINGS, healthLinkSettings, SettingTab } from "./settings";

// This adds a simple command that can be triggered anywhere
this.addCommand({
	id: "reload",
	name: "Reload garmin database",
	callback: () => {
		new callGarminDB(this.app).open();
	},
});
