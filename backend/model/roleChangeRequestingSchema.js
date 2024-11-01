
const mongoose = require('mongoose')

const roleChangeRequestSchema = new mongoose.Schema({
    userId: { type: Object, 
        ref: 'Users',
         required: true },
         status: { type: String, enum: ['new_request','pending', 'approved', 'rejected'], default: 'pending' },
    createdAt: {
        type: Date,
        default: Date.now
    }
}
    , { timestamps: true })

const RoleChangeRequest = mongoose.model('RoleChangeRequest', roleChangeRequestSchema)
module.exports = RoleChangeRequest


