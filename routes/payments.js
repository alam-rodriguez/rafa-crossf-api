import express from "express";

export const routerPayments = express.Router();

import { addPayment, deletePayment, getPayments, getPaymentsByUser } from "../controllers/paymentControllers.js";

routerPayments.post("/add-payment", addPayment);
routerPayments.get("/get-payments", getPayments);
routerPayments.get("/get-payments/:user_id", getPaymentsByUser);
routerPayments.delete("/delete-payment/:id", deletePayment);
