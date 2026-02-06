import { App, PluginSettingTab, Setting } from "obsidian";
import MyPlugin from "./main";

export interface healthLinkSettings {
	mySetting: string;
	pythonPath: string;
	garminDbPath: string;
	lastSync: string;
}

export const DEFAULT_SETTINGS: healthLinkSettings = {
	mySetting: "default",
	pythonPath: "python3",
	garminDbPath: "",
	lastSync: "Never",
};

export class SettingTab extends PluginSettingTab {
	plugin: MyPlugin;

	constructor(app: App, plugin: MyPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;
		containerEl.empty();

		new Setting(containerEl)
			.setName("HealthLink Configuration")
			.setHeading();

		new Setting(containerEl)
			.setName("Test Connection")
			.setDesc("Sync Garmin data immediately")
			.addButton((btn) =>
				btn
					.setButtonText("Sync Now")
					.setCta()
					.onClick(() => {
						new callGarminDB(this.app, this.plugin).open();
					}),
			);

		new Setting(containerEl)
			.setName("Python Path")
			.setDesc("The path to your Python executable")
			.addText((text) =>
				text
					.setPlaceholder("Enter path...")
					.setValue(this.plugin.settings.pythonPath)
					.onChange(async (value) => {
						this.plugin.settings.pythonPath = value;
						await this.plugin.saveSettings();
					}),
			);

		new Setting(containerEl)
			.setName("GarminDB Path")
			.setDesc("Where the sqlite file and scripts are loacted")
			.addText((text) =>
				text
					.setPlaceholder("/users/erick/garmin-db")
					.setValue(this.plugin.settings.garminDbPath)
					.onChange(async (value) => {
						this.plugin.settings.garminDbPath = value;
						await this.plugin.saveSettings();
					}),
			);
	}
}
