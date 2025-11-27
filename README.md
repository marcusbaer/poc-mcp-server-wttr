# POC MCP Server Wttr

This MCP server is a playground to understand how MCP is working. It not only includes a weather service, using wttr.in, but also covers a memory example, based on https://modelcontextprotocol.io/examples.

## Further Read

- https://www.youtube.com/watch?v=Y4bpWRLdRoA for a weather example
- https://github.com/modelcontextprotocol/servers/tree/main/src/memory
- https://modelcontextprotocol.io/examples

## Tools

### Weather Tool

#### Usage

Works with prompts like:

- What is the current weather in London?
- How is the humidity in London?

### Memory Tool

#### Usage

To use the Memory example tools, you need to use prompts that refer to knowledge management, storing information, or remembering facts. The available tools are:

1. Create entities (create_entities)
   - "Store that Marcus Baer is a developer"
   - "Remember that I am working on a weather server"
   - "Create an entity for my project poc-mcp-server-wttr"
2. Create relations (create_relations)
   - "Marcus Baer works on poc-mcp-server-wttr"
   - "Connect Marcus Baer with the project"
   - "Create a relation: I develop the weather server"
3. Add observations (add_observations)
   - "Add that Marcus prefers TypeScript"
   - "Note that the project uses wttr.in as API"
   - "Add the information that I eat cookies"
4. Read graph (read_graph)
   - "What do you know about me?"
   - "Show me all stored information"
   - "Read the Knowledge Graph"
5. Search nodes (search_nodes)
   - "Search for Marcus"
   - "Find all information about the weather project"
   - "Which entities exist for TypeScript?"
6. Open nodes (open_nodes)
   - "Open the entity Marcus Baer"
   - "Show me details about poc-mcp-server-wttr"
7. Delete (delete_entities, delete_observations, delete_relations)
   - "Delete the entity X"
   - "Remove the observation Y from Marcus Baer"
   - "Delete the relation between X and Y"

#### System Prompt

The prompt for utilizing memory depends on the use case. Changing the prompt will help the model determine the frequency and types of memories created.

Here is an example prompt for chat personalization. You could use this prompt in the "Custom Instructions" field of a Claude.ai Project.

```
Follow these steps for each interaction:

1. User Identification:
   - You should assume that you are interacting with default_user
   - If you have not identified default_user, proactively try to do so.

2. Memory Retrieval:
   - Always begin your chat by saying only "Remembering..." and retrieve all relevant information from your knowledge graph
   - Always refer to your knowledge graph as your "memory"

3. Memory
   - While conversing with the user, be attentive to any new information that falls into these categories:
     a) Basic Identity (age, gender, location, job title, education level, etc.)
     b) Behaviors (interests, habits, etc.)
     c) Preferences (communication style, preferred language, etc.)
     d) Goals (goals, targets, aspirations, etc.)
     e) Relationships (personal and professional relationships up to 3 degrees of separation)

4. Memory Update:
   - If any new information was gathered during the interaction, update your memory as follows:
     a) Create entities for recurring organizations, people, and significant events
     b) Connect them to the current entities using relations
     c) Store facts about them as observations
```

## Read More in Relation

- https://docs.continue.dev/customize/deep-dives/rules
