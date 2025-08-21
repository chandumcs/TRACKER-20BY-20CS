import { Request, Response } from 'express';
import { TaskService } from '../services/taskService.js';

// Create new task
export async function createTask(req: Request, res: Response) {
  try {
    const {
      title, description, product, issueType, priority,
      developer, uatPerson, productionPerson,
      reportedDate, fixedDate, closedDate,
      userEmail
    } = req.body;
    
    if (!title || !product || !issueType) {
      return res.status(400).json({ 
        success: false, 
        message: 'Title, product, and issue type are required' 
      });
    }

    // For now, we'll use a default user ID (1) since we don't have user sessions
    // In a real app, you'd get this from authentication middleware
    const userId = 1; // TODO: Get from authenticated user

    const taskData = {
      title,
      description,
      product,
      issueType,
      status: 'pending',
      priority,
      developer,
      uatPerson,
      productionPerson,
      reportedDate: reportedDate || null,
      fixedDate: fixedDate || null,
      closedDate: closedDate || null,
      taskDate: new Date().toISOString().split('T')[0],
      timeInfo: `Added at ${new Date().toLocaleTimeString()}`
    };

    const taskId = await TaskService.createTask(taskData, userId);
    
    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      taskId
    });

  } catch (error: any) {
    console.error('Create task error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
}

// Get all tasks with optional filtering
export async function getTasks(req: Request, res: Response) {
  try {
    const { dateFrom, dateTo, product, issueType, status } = req.query;
    
    const filters = {
      dateFrom: dateFrom as string,
      dateTo: dateTo as string,
      product: product as string,
      issueType: issueType as string,
      status: status as string
    };

    const tasks = await TaskService.getTasks(filters);
    
    res.status(200).json({
      success: true,
      tasks
    });

  } catch (error: any) {
    console.error('Get tasks error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
}

// Update task
export async function updateTask(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const taskId = parseInt(id);
    
    if (isNaN(taskId)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid task ID' 
      });
    }

    // Check if task exists
    const existingTask = await TaskService.getTaskById(taskId);
    if (!existingTask) {
      return res.status(404).json({ 
        success: false, 
        message: 'Task not found' 
      });
    }

    const {
      title, description, product, issueType, status, priority,
      developer, uatPerson, productionPerson,
      reportedDate, fixedDate, closedDate
    } = req.body;

    const updateData: any = {};
    
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (product !== undefined) updateData.product = product;
    if (issueType !== undefined) updateData.issueType = issueType;
    if (status !== undefined) updateData.status = status;
    if (priority !== undefined) updateData.priority = priority;
    if (developer !== undefined) updateData.developer = developer;
    if (uatPerson !== undefined) updateData.uatPerson = uatPerson;
    if (productionPerson !== undefined) updateData.productionPerson = productionPerson;
    if (reportedDate !== undefined) updateData.reportedDate = reportedDate;
    if (fixedDate !== undefined) updateData.fixedDate = fixedDate;
    if (closedDate !== undefined) updateData.closedDate = closedDate;
    
    // Add update time info
    updateData.timeInfo = `Updated at ${new Date().toLocaleTimeString()}`;

    await TaskService.updateTask(taskId, updateData);
    
    res.status(200).json({
      success: true,
      message: 'Task updated successfully'
    });

  } catch (error: any) {
    console.error('Update task error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
}

// Delete task
export async function deleteTask(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const taskId = parseInt(id);
    
    if (isNaN(taskId)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid task ID' 
      });
    }

    // Check if task exists
    const existingTask = await TaskService.getTaskById(taskId);
    if (!existingTask) {
      return res.status(404).json({ 
        success: false, 
        message: 'Task not found' 
      });
    }

    await TaskService.deleteTask(taskId);
    
    res.status(200).json({
      success: true,
      message: 'Task deleted successfully'
    });

  } catch (error: any) {
    console.error('Delete task error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
}

// Get task by ID
export async function getTaskById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const taskId = parseInt(id);
    
    if (isNaN(taskId)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid task ID' 
      });
    }

    const task = await TaskService.getTaskById(taskId);
    
    if (!task) {
      return res.status(404).json({ 
        success: false, 
        message: 'Task not found' 
      });
    }

    res.status(200).json({
      success: true,
      task
    });

  } catch (error: any) {
    console.error('Get task error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
}
