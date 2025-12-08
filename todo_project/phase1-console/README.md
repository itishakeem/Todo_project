# Phase 1: Console Todo Application

A simple command-line todo application built with Python 3.13+ that demonstrates core task management functionality.

## Features

### Core Functionality
- ✅ Add new tasks with descriptions
- ✅ List all tasks with enhanced formatting
- ✅ Update task descriptions
- ✅ Delete tasks
- ✅ Mark tasks as complete
- ✅ Persistent storage using JSON files

### Enhanced Features
- 🎯 **Priorities** - Assign high/medium/low priority to tasks
- 🏷️ **Tags/Categories** - Organize tasks with tags (e.g., work, home, personal)
- 📅 **Due Dates** - Set due dates for tasks (YYYY-MM-DD format)
- 🔍 **Search** - Search tasks by keyword in description or tags
- 🔎 **Filter** - Filter tasks by status, priority, or tag
- 📊 **Sort** - Sort tasks by ID, description, priority, due date, or status

## Requirements

- Python 3.13 or higher
- No external dependencies (uses Python standard library only)

## Installation

1. Navigate to the project directory:
   ```bash
   cd phase1-console
   ```

2. (Optional) Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. (Optional) Install testing dependencies:
   ```bash
   pip install -r requirements.txt
   ```

## Usage

Run the application:
```bash
python src/main.py
```

Or from the project root:
```bash
cd phase1-console
python -m src.main
```

### Menu Options

1. **Add task** - Create a new task with description, priority, tags, and due date
2. **List all tasks** - Display all tasks with enhanced formatting (status, priority, tags, due date)
3. **Update task description** - Modify an existing task's description
4. **Delete task** - Remove a task from the list
5. **Mark task complete** - Change a task's status to completed
6. **Set task priority** - Update task priority (high/medium/low)
7. **Add tags to task** - Add one or more tags to a task
8. **Remove tags from task** - Remove tags from a task
9. **Set task due date** - Set or update a task's due date
10. **Search tasks** - Search tasks by keyword (searches description and tags)
11. **Filter tasks** - Filter by status, priority, or tag
12. **Sort tasks** - Sort by ID, description, priority, due date, or status
13. **Exit** - Quit the application

### Example Session

```
================================================================================
Welcome to the Enhanced Console Todo App!
================================================================================

================================================================================
MAIN MENU
================================================================================
1. Add task
2. List all tasks
3. Update task description
4. Delete task
5. Mark task complete
6. Set task priority
7. Add tags to task
8. Remove tags from task
9. Set task due date
10. Search tasks
11. Filter tasks
12. Sort tasks
13. Exit
================================================================================
Enter your choice: 1
Enter task description: Buy groceries
Priority (high/medium/low) [medium]: high
Tags (comma-separated, e.g., work,home) [none]: home,shopping
Due date (YYYY-MM-DD) [none]: 2024-12-25
✓ Task added successfully!

Enter your choice: 2

================================================================================
Current Tasks:
================================================================================
  ○ 🔴 ID:   1 | Buy groceries [home, shopping] | Due: 2024-12-25
================================================================================

Enter your choice: 10
Enter search keyword: shopping
Found 1 task(s) matching 'shopping':
[Enhanced task list display]

Enter your choice: 12
Sort Options:
1. By ID (default)
2. By description (alphabetical)
3. By priority (high to low)
4. By due date (earliest first)
5. By status
Enter sort choice: 3
Tasks sorted by priority:
[Tasks displayed sorted by priority]
```

## Data Storage

Tasks are stored in a JSON file (`tasks.json` by default) in the same directory as the application. The file is automatically created on first use and persists between application sessions.

## Running Tests

Run all tests:
```bash
pytest tests/
```

Run tests with coverage:
```bash
pytest tests/ --cov=src --cov-report=html
```

## Project Structure

```
phase1-console/
├── src/
│   ├── __init__.py
│   ├── main.py          # Main entry point
│   ├── tasks.py         # TaskManager class with business logic
│   └── storage.py       # Storage abstraction (placeholder)
├── tests/
│   ├── test_add_task.py
│   ├── test_delete_task.py
│   ├── test_list_tasks.py
│   ├── test_mark_complete.py
│   └── test_update_task.py
├── requirements.txt     # Optional testing dependencies
├── README.md           # This file
└── CLAUDE.md           # Project-specific instructions
```

## Error Handling

The application includes error handling for:
- Invalid task IDs (non-numeric input)
- Empty task descriptions
- Missing or corrupted JSON files
- File I/O errors

## Next Steps

This console application serves as the foundation for Phase 2, which will add:
- Web interface (Next.js)
- REST API (FastAPI)
- User authentication
- PostgreSQL database

