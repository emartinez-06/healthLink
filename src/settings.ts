import {App, PluginSettingTab, Setting} from "obsidian";
import healthLink from "./main";

export interface healthLinkSettings {
	mySetting: string;
}

export const DEFAULT_SETTINGS: healthLinkSettings = {
	mySetting: 'default'
}

export class healthLinkSettingTab extends PluginSettingTab {
	plugin: healthLink;

	constructor(app: App, plugin: healthLink) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('Default Folder for GarminDB')
			.addText(text => text
				.setPlaceholder('i.e. /GarminDB')
				.setValue(this.plugin.settings.mySetting)
				.onChange(async (value) => {
					this.plugin.settings.mySetting = value;
					await this.plugin.saveSettings();
				}));
	}
}
