## File & folder conventions

**file structure**:

```
src/
	main.ts           # Plugin entry point, lifecycle management
	settings.ts       # Settings interface and defaults
	commands/         # Command implementations
	  command1.ts
	  command2.ts
	ui/              # UI components, modals, views
	  modal.ts
	  view.ts
	utils/           # Utility functions, helpers
	  helpers.ts
	  constants.ts
```

## References

- Obsidian sample plugin: https://github.com/obsidianmd/obsidian-sample-plugin
- API documentation: https://docs.obsidian.md
- Developer policies: https://docs.obsidian.md/Developer+policies
- Plugin guidelines: https://docs.obsidian.md/Plugins/Releasing/Plugin+guidelines
- Style guide: https://help.obsidian.md/style-guide
