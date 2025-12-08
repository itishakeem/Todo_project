# Phase 1: Console Application - Task Management Logic

import json
from datetime import datetime
from typing import List, Optional, Dict, Any

class TaskManager:
    def __init__(self, storage_file='tasks.json'):
        self.storage_file = storage_file
        self.tasks = self.load_tasks()
        self.next_id = self.get_next_id()

    def load_tasks(self):
        """Load tasks from JSON file and ensure all tasks have required fields."""
        try:
            with open(self.storage_file, 'r') as f:
                loaded_tasks = json.load(f)
                # Ensure backward compatibility - add default fields to existing tasks
                for task in loaded_tasks:
                    self._ensure_task_fields(task)
                return loaded_tasks
        except FileNotFoundError:
            return []
        except json.JSONDecodeError:
            print(f"Warning: Could not decode JSON from {self.storage_file}. Starting with an empty task list.")
            return []

    def save_tasks(self):
        try:
            with open(self.storage_file, 'w') as f:
                json.dump(self.tasks, f, indent=4)
        except IOError as e:
            print(f"Error: Could not save tasks to {self.storage_file}: {e}")

    def get_next_id(self):
        if not self.tasks:
            return 1
        return max(task['id'] for task in self.tasks) + 1

    def _ensure_task_fields(self, task: Dict[str, Any]) -> Dict[str, Any]:
        """Ensure task has all required fields with defaults for backward compatibility."""
        defaults = {
            'priority': task.get('priority', 'medium'),
            'tags': task.get('tags', []),
            'due_date': task.get('due_date', None),
            'created_at': task.get('created_at', datetime.now().isoformat())
        }
        task.update(defaults)
        return task

    def add_task(self, description: str, priority: str = 'medium', tags: List[str] = None, due_date: Optional[str] = None):
        """Add a new task with optional priority, tags, and due date."""
        if not description:
            print("Error: Task description cannot be empty.")
            return
        if priority not in ['high', 'medium', 'low']:
            print("Error: Priority must be 'high', 'medium', or 'low'. Using 'medium'.")
            priority = 'medium'
        
        task = {
            'id': self.next_id,
            'description': description,
            'status': 'pending',
            'priority': priority,
            'tags': tags if tags else [],
            'due_date': due_date,
            'created_at': datetime.now().isoformat()
        }
        self.tasks.append(task)
        self.next_id += 1
        self.save_tasks()

    def list_tasks(self, tasks_to_show: Optional[List[Dict[str, Any]]] = None):
        """List tasks with enhanced formatting showing priority, tags, and due date."""
        tasks = tasks_to_show if tasks_to_show is not None else self.tasks
        if not tasks:
            print("No tasks found.")
            return
        
        print("\n" + "="*80)
        print("Current Tasks:")
        print("="*80)
        for task in tasks:
            task = self._ensure_task_fields(task)
            status_icon = "✓" if task['status'] == 'completed' else "○"
            priority_icon = {"high": "🔴", "medium": "🟡", "low": "🟢"}.get(task['priority'], "🟡")
            
            # Format tags
            tags_str = ""
            if task.get('tags'):
                tags_str = f" [{', '.join(task['tags'])}]"
            
            # Format due date
            due_date_str = ""
            if task.get('due_date'):
                try:
                    due_date = datetime.fromisoformat(task['due_date'])
                    due_date_str = f" | Due: {due_date.strftime('%Y-%m-%d')}"
                except (ValueError, TypeError):
                    due_date_str = f" | Due: {task['due_date']}"
            
            print(f"  {status_icon} {priority_icon} ID: {task['id']:3d} | {task['description']}{tags_str}{due_date_str}")
        print("="*80)

    def find_task_by_id(self, task_id):
        for task in self.tasks:
            if task['id'] == task_id:
                return task
        return None

    def update_task(self, task_id, new_description):
        task = self.find_task_by_id(task_id)
        if task:
            if not new_description:
                print("Error: New task description cannot be empty.")
                return
            task['description'] = new_description
            self.save_tasks()
            print(f"Task ID {task_id} updated.")
        else:
            print(f"Error: Task ID {task_id} not found.")

    def delete_task(self, task_id):
        task = self.find_task_by_id(task_id)
        if task:
            self.tasks.remove(task)
            self.save_tasks()
            print(f"Task ID {task_id} deleted.")
        else:
            print(f"Error: Task ID {task_id} not found.")

    def mark_task_complete(self, task_id):
        task = self.find_task_by_id(task_id)
        if task:
            task['status'] = 'completed'
            self.save_tasks()
            print(f"Task ID {task_id} marked as complete.")
        else:
            print(f"Error: Task ID {task_id} not found.")

    def update_task_priority(self, task_id: int, priority: str):
        """Update task priority."""
        if priority not in ['high', 'medium', 'low']:
            print("Error: Priority must be 'high', 'medium', or 'low'.")
            return
        task = self.find_task_by_id(task_id)
        if task:
            task['priority'] = priority
            self.save_tasks()
            print(f"Task ID {task_id} priority updated to '{priority}'.")
        else:
            print(f"Error: Task ID {task_id} not found.")

    def add_tags_to_task(self, task_id: int, tags: List[str]):
        """Add tags to a task."""
        task = self.find_task_by_id(task_id)
        if task:
            task = self._ensure_task_fields(task)
            existing_tags = set(task.get('tags', []))
            new_tags = set(tag.strip() for tag in tags if tag.strip())
            task['tags'] = list(existing_tags | new_tags)
            self.save_tasks()
            print(f"Tags added to task ID {task_id}.")
        else:
            print(f"Error: Task ID {task_id} not found.")

    def remove_tags_from_task(self, task_id: int, tags: List[str]):
        """Remove tags from a task."""
        task = self.find_task_by_id(task_id)
        if task:
            task = self._ensure_task_fields(task)
            existing_tags = set(task.get('tags', []))
            tags_to_remove = set(tag.strip() for tag in tags if tag.strip())
            task['tags'] = list(existing_tags - tags_to_remove)
            self.save_tasks()
            print(f"Tags removed from task ID {task_id}.")
        else:
            print(f"Error: Task ID {task_id} not found.")

    def set_task_due_date(self, task_id: int, due_date: str):
        """Set due date for a task."""
        task = self.find_task_by_id(task_id)
        if task:
            task['due_date'] = due_date
            self.save_tasks()
            print(f"Due date set for task ID {task_id}.")
        else:
            print(f"Error: Task ID {task_id} not found.")

    def search_tasks(self, keyword: str) -> List[Dict[str, Any]]:
        """Search tasks by keyword in description or tags."""
        keyword_lower = keyword.lower()
        results = []
        for task in self.tasks:
            task = self._ensure_task_fields(task)
            description_match = keyword_lower in task['description'].lower()
            tags_match = any(keyword_lower in tag.lower() for tag in task.get('tags', []))
            if description_match or tags_match:
                results.append(task)
        return results

    def filter_tasks(self, status: Optional[str] = None, priority: Optional[str] = None, 
                     tag: Optional[str] = None) -> List[Dict[str, Any]]:
        """Filter tasks by status, priority, or tag."""
        results = []
        for task in self.tasks:
            task = self._ensure_task_fields(task)
            match = True
            
            if status and task.get('status') != status:
                match = False
            if priority and task.get('priority') != priority:
                match = False
            if tag and tag not in task.get('tags', []):
                match = False
            
            if match:
                results.append(task)
        return results

    def sort_tasks(self, sort_by: str = 'id', reverse: bool = False) -> List[Dict[str, Any]]:
        """Sort tasks by id, description, priority, due_date, or status."""
        tasks_copy = [self._ensure_task_fields(task.copy()) for task in self.tasks]
        
        priority_order = {'high': 3, 'medium': 2, 'low': 1}
        
        def get_sort_key(task):
            if sort_by == 'priority':
                return priority_order.get(task.get('priority', 'medium'), 2)
            elif sort_by == 'due_date':
                due_date = task.get('due_date')
                if due_date:
                    try:
                        return datetime.fromisoformat(due_date)
                    except (ValueError, TypeError):
                        return datetime.max
                return datetime.max
            elif sort_by == 'description':
                return task.get('description', '').lower()
            elif sort_by == 'status':
                return task.get('status', 'pending')
            else:  # default to 'id'
                return task.get('id', 0)
        
        return sorted(tasks_copy, key=get_sort_key, reverse=reverse)
