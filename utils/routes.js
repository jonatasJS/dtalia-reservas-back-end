const express = require('express');
const routes = express.Router();
const logs = require('node-color-log');

const Reserva = require('../models/Reserva');

routes.post('/reserva', async (req, res) => {
  try {
    const reserva = await Reserva.create({
      clientName: req.body.clientName,
      command: req.body.command == null ? null : req.body.command,
      amountsOfPeople: req.body.amountsOfPeople,
      squarePreference: req.body.squarePreference,
      appointment: req.body.appointment
    });

    return res.status(201).json({
      success: true,
      data: reserva
    })
  } catch (err) {
    logs
      .color('red')
      .bold()
      .log('❌ Error: ');
    logs.log(err);
    res.json(err).status(500);
  }
});

routes.get('/reservas', async (req, res) => {
  try {
    const reservas = await Reserva.find();

    res.json(reservas).status(200);
  } catch (err) {
    logs
      .color('red')
      .bold()
      .log('❌ Error: ');
    logs.log(err);
    res.json(err).status(500);
  }
});

routes.get('/reserva/:id', async (req, res) => {
  try {
    const reserva = await Reserva.find({ _id: req.params.id });

    res.json(reserva).status(201);
  } catch (err) {
    res.json(err).status(500);
    logs
      .color('red')
      .bold()
      .log('❌ Error: ');
    logs.log(err);
  }
});

routes.delete('/reserva/:id', async (req, res) => {
  try {
    // delete reserva pelo id passado na url e retorna o reserva deletado na variavel reservaDeleted
    const reservaDeleted = await Reserva.findByIdAndDelete(req.params.id);

    res.json({
      reservaDeleted
    }).status(201);
  } catch (err) {
    res.json(err).status(500);
    logs
      .color('red')
      .bold()
      .log('❌ Error: ');
    logs.log(err);
  }
});

routes.post('/reserva/:id', async (req, res) => {
  try {
    const {
      clientName,
      command,
      amountsOfPeople,
      squarePreference,
      appointment
    } = req.body;
    console.log(req.params.id)
    const reserva = await Reserva.findById(req.params.id);
    const reservaEdited = await Reserva.findOneAndUpdate(
      { _id: req.params.id },
      {
        clientName: clientName == reserva.clientName ? reserva.clientName : !clientName ? reserva.clientName : clientName,
        command: command == reserva.command ? reserva.command : !command ? reserva.command : command,
        amountsOfPeople: amountsOfPeople == reserva.amountsOfPeople ? reserva.amountsOfPeople : !amountsOfPeople ? reserva.amountsOfPeople : amountsOfPeople,
        squarePreference: squarePreference == reserva.squarePreference ? reserva.squarePreference : !squarePreference ? reserva.squarePreference : squarePreference,
        appointment: appointment == reserva.appointment ? reserva.appointment : !appointment ? reserva.appointment : appointment,
      },
      { new: true }
    );

    res.json(reservaEdited).status(201);
  } catch (err) {
    res.json(err).status(301);
    logs
      .color('red')
      .bold()
      .log('❌ Error: ');
    logs.log(err);
  }
});

module.exports = routes;