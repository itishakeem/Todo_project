# Phase 1: Console Application - Test for Delete Task

import unittest
from src.tasks import TaskManager
import os

class TestDeleteTask(unittest.TestCase):

    def setUp(self):
        self.storage_file = 'test_tasks_delete.json'
        self.task_manager = TaskManager(storage_file=self.storage_file)
        if os.path.exists(self.storage_file):
            os.remove(self.storage_file)
        # Add some initial tasks for testing deletion
        self.task_manager.add_task("Task to delete")
        self.task_manager.add_task("Another task")

    def tearDown(self):
        if os.path.exists(self.storage_file):
            os.remove(self.storage_file)

    def test_delete_task_successfully(self):
        initial_task_count = len(self.task_manager.tasks)
        task_id_to_delete = 1 # Assuming the first task added has ID 1
        self.task_manager.delete_task(task_id_to_delete)
        self.assertEqual(len(self.task_manager.tasks), initial_task_count - 1)
        self.assertIsNone(self.task_manager.find_task_by_id(task_id_to_delete))

    def test_delete_non_existent_task(self):
        initial_task_count = len(self.task_manager.tasks)
        non_existent_id = 999
        self.task_manager.delete_task(non_existent_id)
        self.assertEqual(len(self.task_manager.tasks), initial_task_count) # Count should remain the same

if __name__ == '__main__':
    unittest.main()
