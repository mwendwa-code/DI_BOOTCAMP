import React, { useCallback, useState } from 'react';
import { configureStore, createSelector, createSlice, nanoid } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

const initialTasks = [
  { id: 'task-1', title: 'Plan the week', categoryId: 'category-work', progress: 100 },
  { id: 'task-2', title: 'Finish project proposal', categoryId: 'category-work', progress: 45 },
  { id: 'task-3', title: 'Go for a walk', categoryId: 'category-personal', progress: 0 },
];

const initialCategories = [
  { id: 'category-work', name: 'Work' },
  { id: 'category-personal', name: 'Personal' },
];

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: { items: initialTasks },
  reducers: {
    addTask(state, action) {
      const { id, title, categoryId = null } = action.payload;
      state.items.push({ id, title, categoryId, progress: 0 });
    },
    editTask(state, action) {
      const task = state.items.find((item) => item.id === action.payload.id);
      if (!task) return;

      const { title, categoryId } = action.payload.changes;
      if (typeof title === 'string') task.title = title;
      if (categoryId !== undefined) task.categoryId = categoryId;
    },
    deleteTask(state, action) {
      state.items = state.items.filter((task) => task.id !== action.payload);
    },
    updateTaskProgress(state, action) {
      const task = state.items.find((item) => item.id === action.payload.id);
      if (!task) return;

      const progress = Number(action.payload.progress);
      if (Number.isFinite(progress)) {
        task.progress = Math.max(0, Math.min(100, progress));
      }
    },
    clearCategoryFromTasks(state, action) {
      state.items.forEach((task) => {
        if (task.categoryId === action.payload) task.categoryId = null;
      });
    },
  },
});

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: { items: initialCategories },
  reducers: {
    addCategory(state, action) {
      state.items.push(action.payload);
    },
    editCategory(state, action) {
      const category = state.items.find((item) => item.id === action.payload.id);
      if (category && typeof action.payload.name === 'string') {
        category.name = action.payload.name;
      }
    },
    deleteCategory(state, action) {
      state.items = state.items.filter((category) => category.id !== action.payload);
    },
  },
});

export const {
  addTask,
  editTask,
  deleteTask,
  updateTaskProgress,
  clearCategoryFromTasks,
} = tasksSlice.actions;
export const { addCategory, editCategory, deleteCategory } = categoriesSlice.actions;

export const store = configureStore({
  reducer: {
    tasks: tasksSlice.reducer,
    categories: categoriesSlice.reducer,
  },
});

const selectAllTasks = (state) => state.tasks.items;
const selectAllCategories = (state) => state.categories.items;

export const selectTasksByCategory = createSelector(
  [selectAllTasks, (_, categoryId) => categoryId],
  (tasks, categoryId) =>
    categoryId === 'all' ? tasks : tasks.filter((task) => task.categoryId === categoryId),
);

export const selectCompletedTasks = createSelector(
  [selectAllTasks],
  (tasks) => tasks.filter((task) => task.progress === 100).length,
);

export const selectCategoryById = createSelector(
  [selectAllCategories, (_, categoryId) => categoryId],
  (categories, categoryId) => categories.find((category) => category.id === categoryId),
);

const pageStyle = {
  maxWidth: '820px',
  margin: '40px auto',
  padding: '0 20px',
  color: '#202938',
  fontFamily: 'Arial, sans-serif',
};

const controlStyle = {
  border: '1px solid #cbd2dc',
  borderRadius: '6px',
  padding: '9px 11px',
  font: 'inherit',
};

const buttonStyle = {
  ...controlStyle,
  background: '#fff',
  cursor: 'pointer',
};

function CategorySelector({ selectedCategoryId, onSelect }) {
  const categories = useSelector(selectAllCategories);

  return React.createElement(
    'label',
    { style: { display: 'grid', gap: '6px', maxWidth: '300px' } },
    React.createElement('span', null, 'Show tasks'),
    React.createElement(
      'select',
      {
        value: selectedCategoryId,
        onChange: (event) => onSelect(event.target.value),
        style: controlStyle,
      },
      React.createElement('option', { value: 'all' }, 'All categories'),
      ...categories.map((category) =>
        React.createElement('option', { key: category.id, value: category.id }, category.name),
      ),
    ),
  );
}

function TaskList({ selectedCategoryId }) {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => selectTasksByCategory(state, selectedCategoryId));
  const handleEdit = useCallback((task) => {
    const title = window.prompt('Edit task title', task.title);
    if (title === null || !title.trim()) return;
    dispatch(editTask({ id: task.id, changes: { title: title.trim() } }));
  }, [dispatch]);
  const handleProgress = useCallback((task) => {
    dispatch(updateTaskProgress({
      id: task.id,
      progress: task.progress === 100 ? 0 : 100,
    }));
  }, [dispatch]);

  if (tasks.length === 0) {
    return React.createElement('p', { style: { color: '#667085' } }, 'No tasks in this category yet.');
  }

  return React.createElement(
    'ul',
    { style: { listStyle: 'none', padding: 0, display: 'grid', gap: '12px' } },
    ...tasks.map((task) =>
      React.createElement(TaskItem, {
        key: task.id,
        task,
        onEdit: handleEdit,
        onToggleComplete: handleProgress,
        onDelete: (id) => dispatch(deleteTask(id)),
      }),
    ),
  );
}

function TaskItem({ task, onEdit, onToggleComplete, onDelete }) {
  const category = useSelector((state) => selectCategoryById(state, task.categoryId));
  const completed = task.progress === 100;

  return React.createElement(
    'li',
    {
      style: {
        display: 'grid',
        gridTemplateColumns: 'auto minmax(0, 1fr) auto',
        alignItems: 'center',
        gap: '12px',
        border: '1px solid #e0e4eb',
        borderRadius: '8px',
        padding: '14px',
      },
    },
    React.createElement('input', {
      type: 'checkbox',
      checked: completed,
      onChange: () => onToggleComplete(task),
      'aria-label': `${completed ? 'Mark incomplete' : 'Mark complete'}: ${task.title}`,
    }),
    React.createElement(
      'div',
      null,
      React.createElement(
        'strong',
        { style: { textDecoration: completed ? 'line-through' : 'none' } },
        task.title,
      ),
      React.createElement(
        'div',
        { style: { color: '#667085', fontSize: '13px', marginTop: '4px' } },
        `${category?.name ?? 'Uncategorized'} · ${task.progress}% complete`,
      ),
      React.createElement('progress', {
        value: task.progress,
        max: 100,
        'aria-label': `${task.title} progress`,
        style: { width: '100%', marginTop: '8px' },
      }),
    ),
    React.createElement(
      'div',
      { style: { display: 'flex', gap: '6px' } },
      React.createElement('button', { type: 'button', onClick: () => onEdit(task), style: buttonStyle }, 'Edit'),
      React.createElement('button', { type: 'button', onClick: () => onDelete(task.id), style: buttonStyle }, 'Delete'),
    ),
  );
}

export function ProductivityTracker() {
  const dispatch = useDispatch();
  const categories = useSelector(selectAllCategories);
  const completedCount = useSelector(selectCompletedTasks);
  const [selectedCategoryId, setSelectedCategoryId] = useState('all');
  const [taskTitle, setTaskTitle] = useState('');
  const [newCategoryName, setNewCategoryName] = useState('');
  const [taskCategoryId, setTaskCategoryId] = useState('');

  const handleAddTask = useCallback((event) => {
    event.preventDefault();
    const title = taskTitle.trim();
    if (!title) return;

    dispatch(addTask({
      id: `task-${nanoid()}`,
      title,
      categoryId: taskCategoryId || null,
    }));
    setTaskTitle('');
  }, [dispatch, taskTitle, taskCategoryId]);

  const handleAddCategory = useCallback((event) => {
    event.preventDefault();
    const name = newCategoryName.trim();
    if (!name) return;

    const id = `category-${nanoid()}`;
    dispatch(addCategory({ id, name }));
    setNewCategoryName('');
  }, [dispatch, newCategoryName]);

  const handleDeleteCategory = useCallback((categoryId) => {
    dispatch(clearCategoryFromTasks(categoryId));
    dispatch(deleteCategory(categoryId));
    if (selectedCategoryId === categoryId) setSelectedCategoryId('all');
    if (taskCategoryId === categoryId) setTaskCategoryId('');
  }, [dispatch, selectedCategoryId, taskCategoryId]);

  return React.createElement(
    'main',
    { style: pageStyle },
    React.createElement('h1', null, 'Productivity Tracker'),
    React.createElement(
      'p',
      { style: { color: '#667085' } },
      `${completedCount} task${completedCount === 1 ? '' : 's'} completed`,
    ),
    React.createElement(
      'form',
      { onSubmit: handleAddTask, style: { display: 'flex', flexWrap: 'wrap', gap: '8px', margin: '24px 0' } },
      React.createElement('label', { htmlFor: 'new-task', style: { position: 'absolute', left: '-10000px' } }, 'New task'),
      React.createElement('input', {
        id: 'new-task',
        value: taskTitle,
        onChange: (event) => setTaskTitle(event.target.value),
        placeholder: 'Add a task',
        style: { ...controlStyle, flex: '1 1 220px' },
        required: true,
      }),
      React.createElement(
        'select',
        {
          value: taskCategoryId,
          onChange: (event) => setTaskCategoryId(event.target.value),
          'aria-label': 'Task category',
          style: controlStyle,
        },
        React.createElement('option', { value: '' }, 'Uncategorized'),
        ...categories.map((category) =>
          React.createElement('option', { key: category.id, value: category.id }, category.name),
        ),
      ),
      React.createElement('button', { type: 'submit', style: buttonStyle }, 'Add task'),
    ),
    React.createElement(
      'section',
      { 'aria-label': 'Categories', style: { borderTop: '1px solid #e0e4eb', padding: '20px 0' } },
      React.createElement('h2', null, 'Manage categories'),
      React.createElement(
        'form',
        { onSubmit: handleAddCategory, style: { display: 'flex', gap: '8px', marginBottom: '12px' } },
        React.createElement('label', { htmlFor: 'new-category', style: { position: 'absolute', left: '-10000px' } }, 'New category'),
        React.createElement('input', {
          id: 'new-category',
          value: newCategoryName,
          onChange: (event) => setNewCategoryName(event.target.value),
          placeholder: 'Add a category',
          style: { ...controlStyle, flex: '1 1 220px' },
          required: true,
        }),
        React.createElement('button', { type: 'submit', style: buttonStyle }, 'Add category'),
      ),
      categories.length > 0
        ? React.createElement(
            'ul',
            { style: { display: 'flex', flexWrap: 'wrap', gap: '8px', listStyle: 'none', padding: 0 } },
            ...categories.map((category) =>
              React.createElement(
                'li',
                { key: category.id, style: { display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid #e0e4eb', borderRadius: '6px', padding: '6px 10px' } },
                category.name,
                React.createElement(
                  'button',
                  {
                    type: 'button',
                    onClick: () => {
                      const name = window.prompt('Edit category name', category.name);
                      if (name?.trim()) dispatch(editCategory({ id: category.id, name: name.trim() }));
                    },
                    'aria-label': `Edit ${category.name} category`,
                    style: { ...buttonStyle, padding: '3px 7px' },
                  },
                  'Edit',
                ),
                React.createElement(
                  'button',
                  {
                    type: 'button',
                    onClick: () => handleDeleteCategory(category.id),
                    'aria-label': `Delete ${category.name} category`,
                    style: { ...buttonStyle, padding: '3px 7px' },
                  },
                  'Delete',
                ),
              ),
            ),
          )
        : React.createElement('p', null, 'Add a category to organize tasks.'),
    ),
    React.createElement(
      'section',
      { 'aria-label': 'Task list', style: { borderTop: '1px solid #e0e4eb', paddingTop: '20px' } },
      React.createElement(CategorySelector, {
        selectedCategoryId,
        onSelect: setSelectedCategoryId,
      }),
      React.createElement(TaskList, { selectedCategoryId }),
    ),
  );
}

export { CategorySelector, TaskList };
export default ProductivityTracker;