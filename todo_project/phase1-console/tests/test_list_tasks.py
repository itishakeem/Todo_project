# Phase 1: Console Application - Test for List Tasks

import unittest
from src.tasks import TaskManager
import os
from io import StringIO
import sys

class TestListTasks(unittest.TestCase):

    def setUp(self):
        self.storage_file = 'test_tasks_list.json'
        self.task_manager = TaskManager(storage_file=self.storage_file)
        if os.path.exists(self.storage_file):
            os.remove(self.storage_file)
        # Add some tasks for testing list_tasks
        self.task_manager.add_task("Task 1 description")
        self.task_manager.add_task("Task 2 description")

    def tearDown(self):
        if os.path.exists(self.storage_file):
            os.remove(self.storage_file)

    def test_list_tasks_with_tasks(self):
        # Capture standard output to verify the printed list
        old_stdout = sys.stdout
        sys.stdout = captured_output = StringIO()

        self.task_manager.list_tasks()

        sys.stdout = old_stdout # Restore standard output
        output = captured_output.getvalue()

        self.assertIn("Current Tasks:", output)
        self.assertIn("Task 1 description", output)
        self.assertIn("Task 2 description", output)
        self.assertIn("[pending] ID: 1", output)
        self.assertIn("[pending] ID: 2", output)

    def test_list_tasks_when_empty(self):
        # Clear all tasks to test the empty case
        self.task_manager.tasks = []
        self.task_manager.save_tasks() # Ensure file reflects empty state

        old_stdout = sys.stdout
        sys.stdout = captured_output = StringIO()

        self.task_manager.list_tasks()

        sys.stdout = old_stdout # Restore standard output
        output = captured_output.getvalue()

        self.assertIn("No tasks found.", output)

if __name__ == '__main__':
    unittest.main()
