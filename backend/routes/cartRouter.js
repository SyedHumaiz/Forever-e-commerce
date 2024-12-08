import express from 'express'
import db from '../util/db.js';
import AuthUser from '../middleware/Auth.js';

const router = express.Router();

// Add to Cart API
router.post("/addToCart", AuthUser, (req, res) => {
    const { userId, itemID, size } = req.body;

    // Validate the input
    if (!userId || !itemID || !size) {
        return res.status(400).json({
            success: false,
            message: "Invalid input: userId, productId, and size are required"
        });
    }

    // Check if the item already exists in the cart
    const checkQuery = `
        SELECT * FROM cart 
        WHERE user_id = ? AND product_id = ? AND size = ?
    `;
    db.query(checkQuery, [userId, itemID, size], (err, result) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Database error: " + err.message
            });
        }

        if (result.length > 0) {
            // Item exists, update the quantity
            const updateQuery = `
                UPDATE cart 
                SET quantity = quantity + 1 
                WHERE user_id = ? AND product_id = ? AND size = ?
            `;
            db.query(updateQuery, [userId, itemID, size], (err) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: "Error updating cart: " + err.message
                    });
                }
                return res.json({ success: true, message: "Cart Updated" });
            });
        } else {
            // Item does not exist, insert it with default quantity
            const insertQuery = `
                INSERT INTO cart (user_id, product_id, size, quantity) 
                VALUES (?, ?, ?, 1)
            `;
            db.query(insertQuery, [userId, itemID, size], (err) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: "Error adding to cart: " + err.message
                    });
                }
                return res.json({ success: true, message: "Item added to cart" });
            });
        }
    });
});


router.post("/updateCart", AuthUser, (req, res) => {
    const { userId, itemid, size, quantity } = req.body;

    // Validate the input
    if (!userId || !itemid || !size || quantity === undefined) {
        return res.status(400).json({
            success: false,
            message: "Invalid input: userId, productId, size, and quantity are required."
        });
    }

    // Ensure quantity is a valid positive integer
    if (!Number.isInteger(quantity) || quantity < 0) {
        return res.status(400).json({
            success: false,
            message: "Quantity must be a positive integer."
        });
    }

    // Check if the item exists in the cart
    const checkQuery = `
        SELECT * FROM cart 
        WHERE user_id = ? AND product_id = ? AND size = ?
    `;
    db.query(checkQuery, [userId, itemid, size], (err, result) => {
        if (err) {
            return res.status(500).json({ success: false, message: "Database error: " + err.message });
        }

        if (result.length > 0) {
            if (quantity === 0) {
                // If quantity is 0, remove the item
                const deleteQuery = "DELETE FROM cart WHERE user_id = ? AND product_id = ? AND size = ?";
                db.query(deleteQuery, [userId, itemid, size], (err, result) => {
                    if (err) {
                        return res.status(500).json({ success: false, message: err.message });
                    }
                    return res.json({ success: true, message: "Item removed from the cart" });
                });
            } else {
                // Update the item quantity
                const updateQuery = `
                    UPDATE cart 
                    SET quantity = ? 
                    WHERE user_id = ? AND product_id = ? AND size = ?
                `;
                db.query(updateQuery, [quantity, userId, itemid, size], (err) => {
                    if (err) {
                        return res.status(500).json({ success: false, message: "Error updating cart: " + err.message });
                    } else {
                        return res.json({ success: true, message: `Quantity for size ${size} updated to ${quantity}` });
                    }
                });
            }
        } else {
            return res.status(404).json({ success: false, message: `Item with size ${size} not found in cart` });
        }
    });
});


router.post("/cartData", AuthUser, (req, res) => {
    const { userId } = req.body;
    const q = "SELECT * FROM cart WHERE user_id = ?";
    
    db.query(q, [userId], (err, result) => {
        if (err) return res.json({ success: false, message: err.message });

        const cartItems = result.reduce((acc, row) => {
             const { product_id, quantity, size } = row;

            if (!acc[product_id]) {
                acc[product_id] = {};
            }

            acc[product_id][size] = (acc[product_id][size] || 0) + quantity;

            return acc;
        }, {}); 
        res.json({ success: true, cartItems });
    });
});


export { router as cartRouter } 