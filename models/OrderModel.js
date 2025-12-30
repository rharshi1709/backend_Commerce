import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    name: String,
    price: Number,
    image: String,
    quantity: {
      type: Number,
      required: true,
      default: 1
    }
  }],
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0.0
  },
  paymentResult: {
    id: String,
    status: String,
    update_time: String,
    email_address: String
  },
  isPaid: {
    type: Boolean,
    required: true,
    default: false
  },
  paidAt: {
    type: Date
  },
  status: {
    type: String,
    required: true,
    default: 'Processing'
  }
}, {
  timestamps: true
});

const Order = mongoose.model('Order', OrderSchema);
export default Order;
