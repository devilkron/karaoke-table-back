const error = require("../middlewares/error");
const db = require("../models/db");

exports.getBookingUser = async (req, res, next) => {
  try {
    const BookingUser = await db.booking.findMany({
      include: {
        table: {
          include: {
            type_table: true,
          },
        },
        user: true,
      },
    });
    res.json({ BookingUser });
    next();
  } catch (err) {
    next(err);
  }
};

exports.createBookings = async (req, res, next) => {
  const { booking_datatime, table_id, user_id, note_booking } = req.body;
  try {
    const dateTime = new Date(booking_datatime);

    if (isNaN(dateTime.getTime())) {
      return res.status(400).json({ error: "Invalid date format." });
    }

    const ckdbooking = await db.booking.findFirst({
      where: {
        tableId: +table_id,
        status_booking: "WAIT" || "APPROVE",
      },
    });
    if (ckdbooking) {
      return res.status(500).json({ error: "มีการจองโต๊ะนี้ไว้แล้ว" });
    }

    const booking = await db.booking.create({
      data: {
        booking_datatime: dateTime,
        table: {
          connect: {
            table_id: +table_id,
          },
        },
        user: {
          connect: {
            user_id,
          },
        },
        note_booking: note_booking || "",
      },
    });
    res.json({ booking });
  } catch (err) {
    next(err);
    console.log(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getTBYID = async (req, res, next) => {
  try {
    const { id } = req.params;
    const tables = await db.table.findFirst({
      where: {
        table_id: Number(id),
      },
      include: {
        type_table: true,
      },
    });
    res.json({ tables });
  } catch (err) {
    next(err);
  }
};

exports.TypeTableUser = async (req, res, next) => {
  try {
    const { type } = req.query;
    const dTpye = await db.table.findMany({
      where: {
        type_table: {
          type_name: type,
        },
      },
      include: {
        type_table: true,
      },
    });
    res.json({ dTpye, type });
  } catch (err) {
    next(err);
  }
};

exports.getTypesUser = async (req, res, next) => {
  try {
    const types = await db.type_Table.findMany({});
    console.log(types);
    res.json({ types });
    // next();
  } catch (err) {
    next(err);
  }
};

exports.getTableByID = async (req, res, next) => {
  try {
    const tables = await db.table.findMany({
      include: {
        type_table: true,
      },
    });
    res.json({ tables });
  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  const { user_id } = req.params;
  const data = req.body;
  try {
    const rs = await db.user.update({
      data: { ...data },
      where: { user_id: +user_id },
    });
    res.json({ msg: "Update ok", result: rs });
  } catch (err) {
    next(err);
  }
};
