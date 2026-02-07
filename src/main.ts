/*
 * author:	Erick Martinez
 * project: healthLink
 * desc:	A obsidian plugin designed to integrate with Gamin DB a python library that runs
 *				scripts to call Gamin metrics into a sq-lite file for manipulation
 *
 */

import { App, Editor, MarkdownView, Modal, Notice, Plugin } from "obsidian";
import { DEFAULT_SETTINGS, healthLinkSettings, SettingTab } from "./settings";
import { GarminClient } from "utils/helpers";

export default class healthLink extends Plugin {
	settings: healthLinkSettings;
	client: GarminClient;

	async onload() {
		await this.loadSettings();

		// init helper client
		this.client = new GarminClient(this.settings);

		this.addRibbonIcon(
			"dna",
			"Sync garmin data",
			async (evt: MouseEvent) => {
				new Notice("Starting garmin sync...");
				try {
					await this.client.syncData();
					new Notice("Garmin sync complete!");
					await this.saveSettings();
				} catch (err) {
					new Notice("Sync failed");
					console.error(err);
				}
			},
		);

		// This adds a simple command that can be triggered anywhere
		this.addCommand({
			id: "setting",
			name: "Setting",
			callback: () => {
				new SettingTab(this.app, this);
			},
		});

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new SettingTab(this.app, this));
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
