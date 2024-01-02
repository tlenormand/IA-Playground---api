export default {
	"presets": [
		["@babel/env", {
			"targets": { "node": "18" },
			"shippedProposals": true
		}]
	],
	"plugins": [
		["module-resolver", {
			"root": ["./src"],
			"extensions": [".mjs", ".json"],
		}],
		'@babel/plugin-syntax-dynamic-import',
		'dynamic-import-node',
		'@babel/plugin-proposal-class-properties'
	]
}
