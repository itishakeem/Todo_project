# Claude Code - Project Instructions

This file contains project-specific instructions for Claude Code.

## Core Guarantees

- All outputs strictly follow the user intent.
- Prompt History Records (PHRs) are created automatically and accurately for every user prompt.
- Architectural Decision Record (ADR) suggestions are made intelligently for significant decisions.
- All changes are small, testable, and reference code precisely.

## Development Guidelines

- Prioritize and use MCP tools and CLI commands for all information gathering and task execution.
- Treat MCP servers as first-class tools for discovery, verification, execution, and state capture.
- Create PHR for every user input after completing requests.
- Suggest ADRs for architecturally significant decisions.

## Code Standards

- See `CONSTITUTION.md` for code quality, testing, performance, security, and architecture principles.
