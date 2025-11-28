#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { WttrInTools } from "./wttr.js";
const server = new McpServer({
    name: "wttr.in",
    version: "1.0.0",
});
const wttrInTools = new WttrInTools(server);
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("MCP server for wttr.in is running on stdio...");
}
main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
});
