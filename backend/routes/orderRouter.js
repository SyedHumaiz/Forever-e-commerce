import express from 'express'
import AuthUser from '../middleware/Auth.js';
import adminAuth from '../middleware/AdminAuth.js';
import db from '../util/db.js'

const router = express.Router();

// place Order with COD

router.post("/placeOrder", AuthUser, (req, res) => {
    const { userId, orderItems, amount, address, paymentMethod , email , name , phone } = req.body;

    // Validate input data
    if (!userId || !orderItems || !Array.isArray(orderItems) || !amount || !address || !paymentMethod || !email || !name || !phone) {
        return res.status(400).json({ success: false, message: "Invalid input data" });
    }

    const formattedDate = new Date().toISOString().slice(0, 10);

    // Insert into the orders table (the main order)
    const q = `
        INSERT INTO orders (user_id, amount, address, paymentMethod, date  , user_name , email, phone)
        VALUES (?, ?, ?, ?, ? ,? ,? ,?)
    `;
    db.query(q, [userId, amount, address, paymentMethod, formattedDate , name , email , phone], (err, result) => {
        if (err) {
            return res.status(500).json({ success: false, message: err.message });
        }

        const orderId = result.insertId;  // Get the inserted order ID

        const promises = [];

        // Iterate through each product in the order and insert into order_items table
        orderItems.forEach(orderItem => {
            const { product_id, sizes } = orderItem;

            if (!product_id || !sizes || !Array.isArray(sizes)) {
                return res.status(400).json({ success: false, message: "Each order item must include productId and an array of sizes" });
            }

            sizes.forEach(sizeEntry => {
                const { size, quantity } = sizeEntry;

                if (!size || !quantity || quantity <= 0) {
                    return res.status(400).json({ success: false, message: "Each size must include a valid size and quantity" });
                }

                // Insert into order_items table
                const q2 = `
                    INSERT INTO order_items (order_id, product_id, size, quantity)
                    VALUES (?, ?, ?, ?)
                `;

                promises.push(new Promise((resolve, reject) => {
                    db.query(
                        q2,
                        [orderId, product_id, size, quantity],
                        (err, result) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve();
                            }
                        }
                    );
                }));
            });
        });

        // Execute all promises
        Promise.all(promises)
            .then(() => {
                const q3 = "DELETE FROM cart where user_id = ?"
                db.query(q3, [userId], (err) => {
                    if (err) {
                        return err => res.status(500).json({ success: false, message: err.message })
                    }
                })
                res.json({ success: true, message: "Order created successfully" })
            })
            .catch(err => res.status(500).json({ success: false, message: err.message }));
    });
});


// get USER ORDERS

router.post("/userOrders", AuthUser, (req, res) => {
    const { userId } = req.body;
    const q = "SELECT O.id as order_id ,O.user_id , O.amount , O.address , O.paymentMethod , O.payment , O.date , O.status,  OI.size , OI.quantity , PM.name , PM.price , PI.image_url FROM orders as O JOIN order_items as OI ON O.id = OI.order_id JOIN productModel as PM ON OI.product_id = PM.id  JOIN product_images as PI ON PI.product_id = OI.product_id where user_id = ?";
    
    db.query(q, [userId], (err, result) => {
        if (err) {
            return res.json({ success: false, message: err.message });
        }

        const Orders = result.reduce((acc, row) => {
            const { order_id, amount, address, paymentMethod, payment, date, size, quantity, name, price, image_url ,status} = row;
            
            const formattedDate = new Date(date).toISOString().slice(0, 10);
            // Grouping orders and items logic (same as before)
            let order = acc.find(o => o.orderId === order_id);
            if (!order) {
                order = {
                    orderId: order_id,
                    items: []
                };
                acc.push(order);
            }

            let item = order.items.find(i => i.name === name && i.size === size);
            if (!item) {
                item = {
                    status,
                    amount,
                    address,
                    paymentMethod,
                    payment,
                    size,
                    quantity,
                    name,
                    price,
                    formattedDate,
                    images: image_url ? [image_url] : []
                };
                order.items.push(item);
            } else if (image_url && !item.images.includes(image_url)) {
                item.images.push(image_url);
            }

            return acc;
        }, []);

        return res.json({ success: true, Orders });
    });
});

// List orders for admin

router.post("/list", adminAuth, (req, res) => {

    const q = "SELECT O.id as order_id ,O.user_id , O.user_name , O.email , O.phone , O.amount , O.address , O.paymentMethod , O.payment , O.date , O.status,  OI.size , OI.quantity , PM.name , PM.price , PI.image_url FROM orders as O JOIN order_items as OI ON O.id = OI.order_id JOIN productModel as PM ON OI.product_id = PM.id  JOIN product_images as PI ON PI.product_id = OI.product_id";
    
    db.query(q, (err, result) => {
        if (err) {
            return res.json({ success: false, message: err.message });
        }

        const Orders = result.reduce((acc, row) => {
            const { order_id, amount, address, paymentMethod, payment, date, size, quantity, name, price, image_url ,status ,user_name ,email ,phone} = row;
            
            const formattedDate = new Date(date).toISOString().slice(0, 10);
            // Grouping orders and items logic (same as before)
            let order = acc.find(o => o.order_id === order_id);
            if (!order) {
                order = {
                    // orderId :order_id,
                    user_name ,
                    paymentMethod,
                    status,
                    order_id,
                    price,
                    formattedDate,
                    email ,
                    phone,
                    amount,
                    address,
                    payment,
                    items: []
                };
                acc.push(order);
            }

            let item = order.items.find(i => i.name === name && i.size === size);
            if (!item) {
                item = {
                    size,
                    quantity,
                    name,
                    images: image_url ? [image_url] : []
                };
                order.items.push(item);
            } else if (image_url && !item.images.includes(image_url)) {
                item.images.push(image_url);
            }

            return acc;
        }, []);

        return res.json({ success: true, Orders });
    });
});


router.post("/update" , adminAuth , (req , res) => {
    const {id , status} = req.body;
    const payment = status === "Delivered" ? 1 : 0;
    const q = "UPDATE orders Set status = ? , payment = ? where id = ?;";
    db.query(q , [status , payment , id] , (err , result) => {
        if (err) {
            res.json({success : false , message : err.message})
        }
        else{
            res.json({success : true , message : "status updated"})
        }
    })
})


export { router as orderRouter }