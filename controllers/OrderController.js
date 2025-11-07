import Order from "../models/OrderModel.js";

export const createOrder = async (req, res) => {
  try {
    const { userId, email, items, address, totalAmount, paymentMethod } = req.body;

    if (!userId || !email || !items || items.length === 0 || !totalAmount) {
      return res.status(400).json({
        ok: false,
        message: "Missing required fields"
      });
    }

    const order = new Order({
      userId,
      email,
      items,
      address,
      totalAmount,
      paymentMethod,
      status: 'confirmed'
    });

    const savedOrder = await order.save();

    res.status(201).json({
      ok: true,
      message: "Order created successfully",
      data: savedOrder
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      message: "Error creating order",
      error: err.message
    });
  }
};

export const getOrdersByUser = async (req, res) => {
  try {
    const { email } = req.params;

    const orders = await Order.find({ email }).sort({ createdAt: -1 });

    res.status(200).json({
      ok: true,
      message: "Orders fetched successfully",
      data: orders
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      message: "Error fetching orders",
      error: err.message
    });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        ok: false,
        message: "Order not found"
      });
    }

    res.status(200).json({
      ok: true,
      message: "Order fetched successfully",
      data: order
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      message: "Error fetching order",
      error: err.message
    });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const validStatuses = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        ok: false,
        message: "Invalid status"
      });
    }

    const order = await Order.findByIdAndUpdate(
      orderId,
      { status, updatedAt: Date.now() },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({
        ok: false,
        message: "Order not found"
      });
    }

    res.status(200).json({
      ok: true,
      message: "Order status updated successfully",
      data: order
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      message: "Error updating order",
      error: err.message
    });
  }
};
