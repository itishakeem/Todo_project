# Phase 1: Console Application - Main Entry Point

import sys
import os

# Add parent directory to path for imports when running as module
if __name__ == "__main__":
    # When running directly, add parent directory to path
    parent_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    if parent_dir not in sys.path:
        sys.path.insert(0, parent_dir)

from src import tasks
from datetime import datetime

def get_priority_input():
    """Get priority input from user with validation."""
    while True:
        priority = input("Priority (high/medium/low) [medium]: ").strip().lower()
        if not priority:
            return 'medium'
        if priority in ['high', 'medium', 'low']:
            return priority
        print("Invalid priority. Please enter 'high', 'medium', or 'low'.")

def get_tags_input():
    """Get tags input from user."""
    tags_input = input("Tags (comma-separated, e.g., work,home) [none]: ").strip()
    if not tags_input:
        return []
    return [tag.strip() for tag in tags_input.split(',') if tag.strip()]

def get_due_date_input():
    """Get due date input from user."""
    due_date = input("Due date (YYYY-MM-DD) [none]: ").strip()
    if not due_date:
        return None
    # Basic validation
    try:
        datetime.strptime(due_date, '%Y-%m-%d')
        return due_date
    except ValueError:
        print("Invalid date format. Use YYYY-MM-DD.")
        return None

def main():
    print("="*80)
    print("Welcome to Task Manager!")
    print("="*80)
    task_manager = tasks.TaskManager()

    while True:
        print("\n" + "="*80)
        print("MAIN MENU")
        print("="*80)
        print("1. Add task")
        print("2. List all tasks")
        print("3. Update task description")
        print("4. Delete task")
        print("5. Mark task complete")
        print("6. Set task priority")
        print("7. Add tags to task")
        print("8. Remove tags from task")
        print("9. Set task due date")
        print("10. Search tasks")
        print("11. Filter tasks")
        print("12. Sort tasks")
        print("13. Exit")
        print("="*80)

        choice = input("Enter your choice: ").strip()

        if choice == '1':
            description = input("Enter task description: ").strip()
            if not description:
                print("Error: Task description cannot be empty.")
                continue
            priority = get_priority_input()
            tags = get_tags_input()
            due_date = get_due_date_input()
            task_manager.add_task(description, priority, tags, due_date)
            print("✓ Task added successfully!")
        elif choice == '2':
            task_manager.list_tasks()
        elif choice == '3':
            task_manager.list_tasks() # Show tasks to user first
            try:
                task_id = int(input("Enter task ID to update: "))
                new_description = input("Enter new task description: ")
                task_manager.update_task(task_id, new_description)
            except ValueError:
                print("Error: Invalid task ID. Please enter a number.")
        elif choice == '4':
            task_manager.list_tasks() # Show tasks to user first
            try:
                task_id = int(input("Enter task ID to delete: "))
                task_manager.delete_task(task_id)
            except ValueError:
                print("Error: Invalid task ID. Please enter a number.")
        elif choice == '5':
            task_manager.list_tasks() # Show tasks to user first
            try:
                task_id = int(input("Enter task ID to mark as complete: "))
                task_manager.mark_task_complete(task_id)
            except ValueError:
                print("Error: Invalid task ID. Please enter a number.")
        elif choice == '6':
            task_manager.list_tasks()
            try:
                task_id = int(input("Enter task ID: "))
                priority = get_priority_input()
                task_manager.update_task_priority(task_id, priority)
            except ValueError:
                print("Error: Invalid task ID. Please enter a number.")
        elif choice == '7':
            task_manager.list_tasks()
            try:
                task_id = int(input("Enter task ID: "))
                tags = get_tags_input()
                if tags:
                    task_manager.add_tags_to_task(task_id, tags)
                else:
                    print("No tags provided.")
            except ValueError:
                print("Error: Invalid task ID. Please enter a number.")
        elif choice == '8':
            task_manager.list_tasks()
            try:
                task_id = int(input("Enter task ID: "))
                tags = get_tags_input()
                if tags:
                    task_manager.remove_tags_from_task(task_id, tags)
                else:
                    print("No tags provided.")
            except ValueError:
                print("Error: Invalid task ID. Please enter a number.")
        elif choice == '9':
            task_manager.list_tasks()
            try:
                task_id = int(input("Enter task ID: "))
                due_date = get_due_date_input()
                if due_date:
                    task_manager.set_task_due_date(task_id, due_date)
            except ValueError:
                print("Error: Invalid task ID. Please enter a number.")
        elif choice == '10':
            keyword = input("Enter search keyword: ").strip()
            if keyword:
                results = task_manager.search_tasks(keyword)
                if results:
                    print(f"\nFound {len(results)} task(s) matching '{keyword}':")
                    task_manager.list_tasks(results)
                else:
                    print(f"No tasks found matching '{keyword}'.")
            else:
                print("Error: Search keyword cannot be empty.")
        elif choice == '11':
            print("\nFilter Options:")
            print("1. By status (pending/completed)")
            print("2. By priority (high/medium/low)")
            print("3. By tag")
            print("4. Combined filters")
            filter_choice = input("Enter filter choice: ").strip()
            
            status = None
            priority = None
            tag = None
            
            if filter_choice == '1':
                status = input("Enter status (pending/completed): ").strip().lower()
                if status not in ['pending', 'completed']:
                    print("Invalid status.")
                    continue
            elif filter_choice == '2':
                priority = input("Enter priority (high/medium/low): ").strip().lower()
                if priority not in ['high', 'medium', 'low']:
                    print("Invalid priority.")
                    continue
            elif filter_choice == '3':
                tag = input("Enter tag: ").strip()
            elif filter_choice == '4':
                status_input = input("Status (pending/completed) [any]: ").strip().lower()
                priority_input = input("Priority (high/medium/low) [any]: ").strip().lower()
                tag_input = input("Tag [any]: ").strip()
                status = status_input if status_input in ['pending', 'completed'] else None
                priority = priority_input if priority_input in ['high', 'medium', 'low'] else None
                tag = tag_input if tag_input else None
            else:
                print("Invalid filter choice.")
                continue
            
            results = task_manager.filter_tasks(status=status, priority=priority, tag=tag)
            if results:
                print(f"\nFound {len(results)} task(s):")
                task_manager.list_tasks(results)
            else:
                print("No tasks found matching the filter criteria.")
        elif choice == '12':
            print("\nSort Options:")
            print("1. By ID (default)")
            print("2. By description (alphabetical)")
            print("3. By priority (high to low)")
            print("4. By due date (earliest first)")
            print("5. By status")
            sort_choice = input("Enter sort choice: ").strip()
            
            sort_by = 'id'
            reverse = False
            
            if sort_choice == '1':
                sort_by = 'id'
            elif sort_choice == '2':
                sort_by = 'description'
            elif sort_choice == '3':
                sort_by = 'priority'
                reverse = True  # High priority first
            elif sort_choice == '4':
                sort_by = 'due_date'
            elif sort_choice == '5':
                sort_by = 'status'
            else:
                print("Invalid sort choice. Using default (ID).")
            
            sorted_tasks = task_manager.sort_tasks(sort_by=sort_by, reverse=reverse)
            print(f"\nTasks sorted by {sort_by}:")
            task_manager.list_tasks(sorted_tasks)
        elif choice == '13':
            print("\nThank you for using the Console Todo App! Goodbye!")
            break
        else:
            print("Invalid choice. Please enter a number between 1-13.")

if __name__ == "__main__":
    main()
