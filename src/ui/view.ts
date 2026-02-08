import { setIcon } from "obsidian";

// 1. Define the shape of your data to satisfy TypeScript
export interface DailyStats {
	sleep_score: number | string;
	steps: number;
}

/**
 * Renders the Garmin stats card into the provided HTMLElement
 */
export function renderGarminCard(container: HTMLElement, data: DailyStats) {
	container.empty(); // Clear "Loading..." text

	// 2. Use the CSS class 'garmin-card' instead of inline styles
	const card = container.createEl("div", { cls: "garmin-card" });

	// Helper to create metric columns
	const createMetric = (
		label: string,
		value: string | number,
		icon: string,
	) => {
		// Use 'garmin-metric' class
		const wrapper = card.createEl("div", { cls: "garmin-metric" });

		wrapper.createEl("span", { text: icon, cls: "garmin-icon" });
		wrapper.createEl("strong", { text: label, cls: "garmin-label" });

		// Use 'garmin-value' class
		wrapper.createEl("span", {
			text: `${value}`,
			cls: "garmin-value",
		});
	};

	// Render Metrics
	// Typescript now knows 'data' has 'sleep_score' and 'steps'
	createMetric("Sleep Score", data.sleep_score, "😴");
	createMetric("Steps", data.steps, "👣");
}

export function renderError(container: HTMLElement, errorMsg: string) {
	container.empty();
	// Use 'garmin-error' class
	const errorEl = container.createEl("div", { cls: "garmin-error" });
	errorEl.setText(`Error: ${errorMsg}`);
}
