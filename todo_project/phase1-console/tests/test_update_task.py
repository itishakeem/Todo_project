# Phase 1: Console Application - Test for Update Task

import unittest
from src.tasks import TaskManager
import os

class TestUpdateTask(unittest.TestCase):

    def setUp(self):
        self.storage_file = 'test_tasks_update.json'
        self.task_manager = TaskManager(storage_file=self.storage_file)
        if os.path.exists(self.storage_file):
            os.remove(self.storage_file)
        # Add a task to be updated
        self.task_manager.add_task("Original description")

    def tearDown(self):
        if os.path.exists(self.storage_file):
            os.remove(self.storage_file)

    def test_update_task_successfully(self):
        task_id_to_update = 1
        new_description = "Updated description"
        self.task_manager.update_task(task_id_to_update, new_description)
        updated_task = self.task_manager.find_task_by_id(task_id_to_update)
        self.assertIsNotNone(updated_task)
        self.assertEqual(updated_task['description'], new_description)

    def test_update_task_with_empty_description(self):
        task_id_to_update = 1
        # Attempt to update with an empty description, should fail gracefully
        self.task_manager.update_task(task_id_to_update, "")
        unchanged_task = self.task_manager.find_task_by_id(task_id_to_update)
        self.assertIsNotNone(unchanged_task)
        self.assertEqual(unchanged_task['description'], "Original description") # Description should remain unchanged

    def test_update_non_existent_task(self):
        non_existent_id = 999
        new_description = "Should not update"
        self.task_manager.update_task(non_existent_id, new_description)
        # No specific assertion needed here other than it shouldn't crash and no task should be created/modified unexpectedly.
        self.assertIsNone(self.task_manager.find_task_by_id(non_existent_id))

if __name__ == '__main__':
    unittest.main()
