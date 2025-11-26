# POC MCP Server Wttr

This MCP server is a playground to understand how MCP is working. It not only includes a weather service, using wttr.in, but also covers a memory example, based on https://modelcontextprotocol.io/examples.

## Further Read

- https://www.youtube.com/watch?v=Y4bpWRLdRoA for a weather example
- https://github.com/modelcontextprotocol/servers/tree/main/src/memory
- https://modelcontextprotocol.io/examples

## Tools

### Memory Tool

#### Usage

Um die Tools aus dem Memory Beispiel anzusprechen, musst du Prompts verwenden, die sich auf Wissensmanagement, Speicherung von Informationen oder das Merken von Fakten beziehen. Die verfügbaren Tools sind:

1. Entitäten erstellen (create_entities)
   - "Speichere, dass Marcus Baer ein Entwickler ist"
   - "Merke dir, dass ich an einem Wetter-Server arbeite"
   - "Erstelle eine Entität für mein Projekt poc-mcp-server-wttr"
2. Beziehungen erstellen (create_relations)
   - "Marcus Baer arbeitet an poc-mcp-server-wttr"
   - "Verbinde Marcus Baer mit dem Projekt"
   - "Erstelle eine Beziehung: ich entwickle den Wetter-Server"
3. Beobachtungen hinzufügen (add_observations)
   - "Füge hinzu, dass Marcus TypeScript bevorzugt"
   - "Notiere, dass das Projekt wttr.in als API nutzt"
   - "Ergänze die Information, dass ich in Wuppertal wohne"
4. Graph lesen (read_graph)
   - "Was weißt du über mich?"
   - "Zeige mir alle gespeicherten Informationen"
   - "Lies den Knowledge Graph"
5. Knoten suchen (search_nodes)
   - "Suche nach Marcus"
   - "Finde alle Informationen über das Wetter-Projekt"
   - "Welche Entitäten gibt es zu TypeScript?"
6. Knoten öffnen (open_nodes)
   - "Öffne die Entität Marcus Baer"
   - "Zeige mir Details zu poc-mcp-server-wttr"
7. Löschen (delete_entities, delete_observations, delete_relations)
   - "Lösche die Entität X"
   - "Entferne die Beobachtung Y von Marcus Baer"
   - "Lösche die Beziehung zwischen X und Y"

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
