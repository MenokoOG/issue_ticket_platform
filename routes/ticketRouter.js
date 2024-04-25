// ticketRoute.js
const express = require("express");
const ticketRouter = express.Router();
const Ticket = require("../models/ticket");

ticketRouter.get("/tickets", async (req, res, next) => {
  try {
    const tickets = await Ticket.find();
    return res.status(200).send(tickets);
  } catch (error) {
    res.status(500);
    return next(err);
  }
});

ticketRouter.get("/tickets/:id", getTicket, (req, res) => {
  return res.status(200).send(ticket);
});

ticketRouter.post("/tickets", async (req, res, next) => {
  const ticket = new Ticket({
    title: req.body.title,
    description: req.body.description,
    createdBy: req.body.createdBy,
    status: "Open",
    priority: req.body.priority || "Low",
  });

  try {
    const newTicket = await ticket.save();
    return res.status(201).send(newTicket);
  } catch (error) {
    res.status(400);
    return next(err);
  }
});

ticketRouter.patch("/tickets/:id", getTicket, async (req, res, next) => {
  if (req.body.title != null) {
    res.ticket.title = req.body.title;
  }
  if (req.body.description != null) {
    res.ticket.description = req.body.description;
  }
  if (req.body.status != null) {
    res.ticket.status = req.body.status;
  }
  if (req.body.priority != null) {
    res.ticket.priority = req.body.priority;
  }

  try {
    const updatedTicket = await res.ticket.save();
    return res.status(201).send(updatedTicket);
  } catch (error) {
    res.status(400);
    return next(err);
  }
});

ticketRouter.delete("/tickets/:id", getTicket, async (req, res, next) => {
  try {
    await res.ticket.deleteOne();
    return res.status(201).send({ message: `Ticket Deleted` });
  } catch (error) {
    res.status(500);
    return next(err);
  }
});

async function getTicket(req, res, next) {
  let ticket;
  try {
    ticket = await Ticket.findById(req.params.id);
    if (ticket == null) {
      return res.status(404).send({ message: `Ticket not found` });
    }
  } catch (error) {
    res.status(500);
    return next(err);
  }
  res.ticket = ticket;
  next();
}

module.exports = ticketRouter;
