/*
 * author:	Erick Martinez
 * project: healthLink
 * desc:	A obsidian plugin designed to integrate with Gamin DB a python library that runs
 *				scripts to call Gamin metrics into a sq-lite file for manipulation
 *
 */

import { App, Editor, MarkdownView, Modal, Notice, Plugin } from "obsidian";
import { DEFAULT_SETTINGS, healthLinkSettings, SettingTab } from "./settings";

export default class healthLink extends Plugin {
	settings: healthLinkSettings;

	async onload() {
		await this.loadSettings();

		this.addRibbonIcon("dna", "Home button", (evt: MouseEvent) => {});

		// This adds a simple command that can be triggered anywhere
		this.addCommand({
			id: "reload",
			name: "Reload garmin database",
			callback: () => {
				new callGarminDB(this.app).open();
			},
		});

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new SettingTab(this.app, this));

		// When registering intervals, this function will automatically clear the interval when the plugin is disabled.
	}

	onunload() {}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			(await this.loadData()) as Partial<healthLinkSettings>,
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class callGarminDB extends Modal {
	constructor(app: App) {
		super(app);
	}

	onOpen() {}

	onClose() {}
}
