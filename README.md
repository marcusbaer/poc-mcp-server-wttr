# POC MCP Server Wttr

This MCP server is a playground to understand how MCP is working, using wttr.in.

## Installation

```sh
npm install -g poc-mcp-server-wttr
```

Setup MCP Server

```json
{
  "servers": {
    "POC MCP Server Wttr": {
      "type": "stdio",
      "command": "npx",
      "args": [
         "-y",
         "poc-mcp-server-wttr"
      ]
    }
  },
  "inputs": []
}
```

## Further Read

- https://www.youtube.com/watch?v=Y4bpWRLdRoA for a weather example
- https://github.com/modelcontextprotocol/servers/tree/main/src/memory
- https://modelcontextprotocol.io/examples
- https://milvus.io/ai-quick-reference/how-is-user-context-maintained-across-model-context-protocol-mcp-sessions
- https://modelcontextprotocol.io/specification/2025-06-18/basic/transports
- https://simplescraper.io/blog/how-to-mcp
- https://modelcontextprotocol.io/docs/learn/architecture
- https://modelcontextprotocol.io/docs/sdk
- https://github.com/modelcontextprotocol/typescript-sdk
- https://github.com/modelcontextprotocol/inspector

## MCP Inspector 


```sh
docker run --rm --network host -p 6274:6274 -p 6277:6277 ghcr.io/modelcontextprotocol/inspector:latest
```

## Tools

### Weather Tool

#### Usage

Works with prompts like:

- What is the current weather in London?
- How is the humidity in London?

## Read More in Relation

- https://docs.continue.dev/customize/deep-dives/rules
