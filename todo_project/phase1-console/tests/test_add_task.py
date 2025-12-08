# Phase 1: Console Application - Test for Add Task

import unittest
from src.tasks import TaskManager
import os

class TestAddTask(unittest.TestCase):

    def setUp(self):
        # Use a temporary file for testing storage
        self.storage_file = 'test_tasks_add.json'
        self.task_manager = TaskManager(storage_file=self.storage_file)
        # Ensure the file is empty before each test
        if os.path.exists(self.storage_file):
            os.remove(self.storage_file)

    def tearDown(self):
        # Clean up the temporary file after each test
        if os.path.exists(self.storage_file):
            os.remove(self.storage_file)

    def test_add_task_successfully(self):
        initial_task_count = len(self.task_manager.tasks)
        self.task_manager.add_task("Buy groceries")
        self.assertEqual(len(self.task_manager.tasks), initial_task_count + 1)
        new_task = self.task_manager.find_task_by_id(1) # Assuming ID starts from 1
        self.assertIsNotNone(new_task)
        self.assertEqual(new_task['description'], "Buy groceries")
        self.assertEqual(new_task['status'], 'pending')

    def test_add_task_with_empty_description(self):
        initial_task_count = len(self.task_manager.tasks)
        self.task_manager.add_task("") # Should not add an empty task
        self.assertEqual(len(self.task_manager.tasks), initial_task_count)

    def test_add_multiple_tasks(self):
        self.task_manager.add_task("Task 1")
        self.task_manager.add_task("Task 2")
        self.assertEqual(len(self.task_manager.tasks), 2)
        self.assertEqual(self.task_manager.tasks[0]['description'], "Task 1")
        self.assertEqual(self.task_manager.tasks[1]['description'], "Task 2")

if __name__ == '__main__':
    unittest.main()
