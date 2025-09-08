import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { createUserSchema, updateUserSchema, updateWorkInfoSchema } from "@shared/schema";
import bcrypt from "bcrypt";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

// Extend the session data interface
declare module 'express-session' {
  interface SessionData {
    userId?: number;
  }
}

// Auth middleware
const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth endpoints
  
  // Get current user
  app.get('/api/auth/user', async (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ error: 'Not authenticated' });
    }
    
    try {
      const user = await storage.getUser(req.session.userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      const { password, ...userResponse } = user;
      res.json(userResponse);
    } catch (error) {
      console.error('Error fetching current user:', error);
      res.status(500).json({ error: 'Failed to fetch user' });
    }
  });
  
  // Login endpoint
  app.post('/api/auth/login', async (req, res) => {
    try {
      const validatedData = loginSchema.parse(req.body);
      
      // Find user by email
      const user = await storage.getUserByEmail(validatedData.email);
      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
      
      // Check password
      const isValidPassword = await bcrypt.compare(validatedData.password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
      
      // Create session
      req.session.userId = user.id;
      
      // Return user without password
      const { password, ...userResponse } = user;
      res.json(userResponse);
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(400).json({ error: 'Invalid login data' });
    }
  });
  
  // Logout endpoint
  app.post('/api/auth/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error('Error destroying session:', err);
        return res.status(500).json({ error: 'Failed to logout' });
      }
      res.json({ message: 'Logged out successfully' });
    });
  });

  // Create user endpoint (register)
  app.post("/api/users", async (req, res) => {
    try {
      const validatedData = createUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(validatedData.email);
      if (existingUser) {
        return res.status(400).json({ error: "User already exists with this email" });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(validatedData.password, 10);

      // Create user
      const user = await storage.createUser({
        ...validatedData,
        password: hashedPassword,
      });
      
      // Automatically log in the user after registration
      req.session.userId = user.id;

      // Return user without password
      const { password, ...userResponse } = user;
      res.status(201).json(userResponse);
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(400).json({ error: "Invalid user data" });
    }
  });

  // Update user username endpoint
  app.patch("/api/auth/username", requireAuth, async (req, res) => {
    try {
      const userId = req.session.userId!;
      const validatedData = updateUserSchema.parse(req.body);
      
      // Check if username is already taken
      if (validatedData.username) {
        const existingUser = await storage.getUserByUsername(validatedData.username);
        if (existingUser && existingUser.id !== userId) {
          return res.status(400).json({ error: "Username already taken" });
        }
      }

      // Update user
      const updatedUser = await storage.updateUser(userId, validatedData);
      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }

      // Return user without password
      const { password, ...userResponse } = updatedUser;
      res.json(userResponse);
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(400).json({ error: "Invalid user data" });
    }
  });

  // Update user work information endpoint
  app.patch("/api/auth/work-info", requireAuth, async (req, res) => {
    try {
      const userId = req.session.userId!;
      const validatedData = updateWorkInfoSchema.parse(req.body);

      // Update user work info
      const updatedUser = await storage.updateWorkInfo(userId, validatedData);
      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }

      // Return user without password
      const { password, ...userResponse } = updatedUser;
      res.json(userResponse);
    } catch (error) {
      console.error("Error updating work info:", error);
      res.status(400).json({ error: "Invalid work information" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
