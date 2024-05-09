import { Request, Response } from "express";
import { saveData } from "../helpers/helper.js";

export const register = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const result = await saveData(body);
    const temp = { ...result, ...body };
    res.status(200).send(temp);
  } catch (error) {
    // If there is an error, we will log it and send a 500 status code
    res.status(500).send("Error creating data");
  }
};
