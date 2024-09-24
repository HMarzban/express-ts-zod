import { Router, Request, Response } from "express";
import { validateBody, validateParams } from "@middleware";
import { SUserBody, SUserParams, TUserParams, IUserBodyInput } from "@types";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

// GET /users/:id
router.get(
  "/users/:id",
  validateParams(SUserParams),
  (req: Request<TUserParams>, res: Response) => {
    const { id } = req.params;

    res.json({
      message: "User fetched successfully",
      data: { id },
    });
  }
);

// POST /users
router.post(
  "/users",
  validateBody(SUserBody),
  (req: Request<{}, {}, IUserBodyInput>, res: Response) => {
    res.json({
      message: "Data received successfully",
      data: req.body,
    });
  }
);

export default router;
