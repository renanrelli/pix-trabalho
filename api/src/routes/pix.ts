import { Router } from "express";
import { Request, Response } from "express";

let router: Router = Router();

router.get(
  "/pixusuarios",
  async (req: Request, res: Response): Promise<Response> => {
    let response = await fetch("http://177.44.248.24/pix-api/users");
    let usuarios = await response.json();

    return res.status(200).json(usuarios);
  }
);

router.get(
  "/pixrealizados",
  async (req: Request, res: Response): Promise<Response> => {
    let response = await fetch("http://177.44.248.24/pix-api/pix");
    let pixs = await response.json();

    return res.status(200).json(pixs);
  }
);

router.get(
  "/pix/:id/:type",
  async (req: Request, res: Response): Promise<Response> => {
    let { id, type } = req.params;
    let url = `http://177.44.248.24/pix-api/pix/${id}/${type}`;
    let response = await fetch(url);
    let pixs = await response.json();

    return res.status(200).json(pixs);
  }
);

router.post(
  "/realizarpix",
  async (req: Request, res: Response): Promise<Response> => {
    let body = req.body;
    let senderId = body.senderId;
    let recipientId = body.recipientId;
    let value = body.value;

    let payload = {
      senderId,
      recipientId,
      value,
    };
    let response = await fetch("http://177.44.248.24/pix-api/pix", {
      headers: {
        "Content-type": "application/json",
        Accept: "appplication/json",
      },
      method: "post",
      body: JSON.stringify(payload),
    });
    let pix = await response.json();

    return res.status(200).json(pix);
  }
);

export default router;
