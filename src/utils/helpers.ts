import { exec } from "child_process";
import { Notice } from "obsidian";
import { healthLinkSettings } from "settings";

export class GarminClient {
	settings: healthLinkSettings;

	constructor(settings: healthLinkSettings) {
		this.settings = settings;
	}

	updateSettings(newSettings: healthLinkSettings) {
		this.settings = newSettings;
	}

	// Executes the 'garmin extract' command using the user's python path
	async syncData(): Promise<string> {
		const cmd = `"${this.settings.pythonPath}" -m garmin_health_data.cli extract --db-path "${this.settings.garminDbPath}"`;

		return new Promise((resolve, reject) => {
			exec(cmd, (error, stdout, stderr) => {
				if (error) {
					console.error("Garming Sync Error:", stderr);
					reject(stderr || error.message);
					return;
				}
				resolve(stdout);
			});
		});
	}

	/**
	 * Uses a lightweight Python one-liner to fetch specific daily stats as JSON.
	 * This avoids needing native Node SQLite modules.
	 */
	async getDailyStats(dateStr: string): Promise<unknown> {
		// Query: Get sleep score (example)
		// We construct a python script on the fly to query the DB and print JSON
		const pythonScript = `
import sqlite3, json
try:
    conn = sqlite3.connect('${this.settings.garminDbPath}')
    cursor = conn.cursor()
    
    # Example: Fetch Sleep Score (adjust table/column names based on actual schema)
    # This is a placeholder query based on the schema you provided
    cursor.execute("SELECT score FROM sleep WHERE day = ?", ('${dateStr}',))
    sleep_row = cursor.fetchone()
    
    # Example: Fetch Steps
    cursor.execute("SELECT total_steps FROM steps WHERE day = ?", ('${dateStr}',))
    steps_row = cursor.fetchone()

    result = {
        "sleep_score": sleep_row[0] if sleep_row else "N/A",
        "steps": steps_row[0] if steps_row else 0
    }
    print(json.dumps(result))
except Exception as e:
    print(json.dumps({"error": str(e)}))
finally:
    if 'conn' in locals(): conn.close()
`;

		const cmd = `"${this.settings.pythonPath}" -c "${pythonScript.replace(/"/g, '\\"').replace(/\n/g, "; ")}"`;

		return new Promise((resolve, reject) => {
			exec(cmd, (error, stdout, stderr) => {
				if (error) {
					reject(error);
					return;
				}
				try {
					const data = JSON.parse(stdout.trim());
					resolve(data);
				} catch (e) {
					reject("Failed to parse Python output: " + stdout);
				}
			});
		});
	}
}
