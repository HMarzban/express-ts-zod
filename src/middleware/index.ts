import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError } from "zod";

const validateBody =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (error) {
      handleValidationError(error, res);
    }
  };

const validateParams =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.params);
      next();
    } catch (error) {
      handleValidationError(error, res);
    }
  };

const handleValidationError = (error: unknown, res: Response) => {
  if (error instanceof ZodError) {
    res.status(400).json({
      error: "Validation failed",
      details: error.errors,
    });
  } else {
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

export { validateBody, validateParams };
