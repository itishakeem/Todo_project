# Phase 1: Console Application - Test for Mark Complete

import unittest
from src.tasks import TaskManager
import os

class TestMarkComplete(unittest.TestCase):

    def setUp(self):
        self.storage_file = 'test_tasks_complete.json'
        self.task_manager = TaskManager(storage_file=self.storage_file)
        if os.path.exists(self.storage_file):
            os.remove(self.storage_file)
        # Add a task to be marked complete
        self.task_manager.add_task("Task to complete")

    def tearDown(self):
        if os.path.exists(self.storage_file):
            os.remove(self.storage_file)

    def test_mark_task_complete_successfully(self):
        task_id_to_complete = 1
        self.task_manager.mark_task_complete(task_id_to_complete)
        completed_task = self.task_manager.find_task_by_id(task_id_to_complete)
        self.assertIsNotNone(completed_task)
        self.assertEqual(completed_task['status'], 'completed')

    def test_mark_non_existent_task_complete(self):
        non_existent_id = 999
        # Marking a non-existent task should not raise an error and should not change state
        self.task_manager.mark_task_complete(non_existent_id)
        self.assertIsNone(self.task_manager.find_task_by_id(non_existent_id))

    def test_mark_already_completed_task(self):
        task_id = 1
        self.task_manager.mark_task_complete(task_id)
        # Mark it again, status should remain 'completed'
        self.task_manager.mark_task_complete(task_id)
        marked_task = self.task_manager.find_task_by_id(task_id)
        self.assertIsNotNone(marked_task)
        self.assertEqual(marked_task['status'], 'completed')

if __name__ == '__main__':
    unittest.main()
