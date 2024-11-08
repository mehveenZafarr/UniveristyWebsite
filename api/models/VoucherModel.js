import mongoose from "mongoose";

const voucherSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the Student model
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  issuedDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['Unpaid', 'Paid', 'Overdue'],
    default: 'Unpaid',
  },
  paymentDate: {
    type: Date,
  },
  // Optional fields for payment tracking
  transactionId: {
    type: String,
  },
  remarks: {
    type: String,
  },
});

const Voucher = mongoose.model('Voucher', voucherSchema);

export default Voucher;
