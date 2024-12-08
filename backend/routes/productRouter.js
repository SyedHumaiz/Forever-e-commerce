import express from 'express'
import db from '../util/db.js'
import multer from 'multer'
import path from 'path'
import adminAuth from '../middleware/AdminAuth.js';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../../admin/public/upload"));
    },
    filename: function (req, file, cb) {
        const uniqueName =
            file.fieldname + "_" + Date.now() + path.extname(file.originalname);
        req.uploadedFileName = uniqueName; // Save the filename to the request object
        cb(null, uniqueName);
    },
});

const upload = multer({ storage });

// add post


router.post('/add', adminAuth, upload.array('images', 4), (req, res) => { 
    try {
        const { name, description, price, category, subcategory, bestseller, sizes } = req.body;

        const parsedPrice = Number(price);
        if (isNaN(parsedPrice)) {
            return res.status(400).json({ success: false, message: 'Invalid price format' });
        }

        const isBestseller = bestseller === 'true' ? true : false;
        const now = new Date();
        const formattedDate = now.toISOString().slice(0, 10); // Get only the 'YYYY-MM-DD' part
        const sizesArray = typeof sizes === 'string' ? JSON.parse(sizes) : sizes;


        const q = "INSERT INTO productModel (name, description, price, category, subcategory, bestseller, dateofpublish) VALUES (?, ?, ?, ?, ?, ?, ?)";

        db.query(q, [name, description, parsedPrice, category, subcategory, isBestseller, formattedDate], (err, data) => {
            if (err) return res.status(500).json({ success: false, message: err.message });  // **Early exit on error**

            const productId = data.insertId;

            // Handle sizes (insert into product_sizes table) only if sizes exist
            if (sizesArray && sizesArray.length > 0) {
                const Q = "SELECT id FROM sizes WHERE size IN (?)";
                db.query(Q, [sizesArray], (err, sizerow) => {
                    if (err) {
                        return res.status(500).json({ success: false, message: err.message });  // **Early exit on error**
                    }

                    const sizeIDs = sizerow.map(row => row.id);
                    const sizeInserts = sizeIDs.map(sizeid => [productId, sizeid]);

                    const qq = "INSERT INTO product_sizes (product_id, size_id) VALUES ?";
                    db.query(qq, [sizeInserts], (err1, data1) => {
                        if (err1) {
                            return res.status(500).json({ success: false, message: err1.message });  // **Early exit on error**
                        }

                        // After sizes are inserted, handle image uploads
                        handleImages(productId, req, res); // **Call image insertion function**
                    });
                });
            } else {
                // If no sizes, just handle images
                handleImages(productId, req, res); // **Call image insertion function**
            }
        });
    } catch (error) {
        console.error(error);
        if (!res.headersSent) {  // **Check to avoid sending multiple responses**
            return res.status(500).json({ success: false, message: error.message });
        }
    }
});

// Helper function to handle image uploads
function handleImages(productId, req, res) {
    // Check if files are provided
    if (!req.files || req.files.length === 0) {
        return res.json({
            success: true,
            message: 'Product added successfully (no images)',
            productId: productId,
            images: [],  // No images uploaded
            sizes: req.body.sizes || []  // Sizes, if any
        });
    }

    // Map file paths
    const imagePaths = req.files.map(file => `/upload/${file.filename}`);
    const imageInserts = imagePaths.map(image => [productId, image]);

    // Bulk insert images
    const imageQ = "INSERT INTO `product_images` (`product_id`, `image_url`) VALUES ?";
    db.query(imageQ, [imageInserts], (err, result) => {
        if (err) {
            console.error("Image Insert Error:", err);  // Debugging
            return res.status(500).json({ success: false, message: err.message });
        }

        // Send success response after image insertion
        return res.json({
            success: true,
            message: 'Product added successfully',
            productId: productId,
            images: imagePaths,
            sizes: req.body.sizes || []
        });
    });
}


// get all products

router.get("/listproducts", (req, res) => {
    const q = "SELECT productModel.* , product_images.image_url , sizes.size FROM productModel JOIN product_images ON productModel.id = product_images.product_id join product_sizes on product_sizes.product_id = productModel.id join sizes on product_sizes.size_id = sizes.id ;"
    db.query(q, (err, result) => {
        if (err) return res.json({ success: false, message: err.message })
        const products = result.reduce((acc, row) => {
        const {id , name , description , category , subcategory , price , image_url , bestseller ,size} = row;
        const product = acc.find(p => p.id === id);

        if(!product){
            acc.push({
                id,
                name,
                description,
                category,
                subcategory,
                price,
                bestseller,
                images: image_url ? [image_url] :[],
                sizes : size ? [size] : []
            })
        }else{
            if(image_url && !product.images.includes(image_url)){
                product.images.push(image_url);
            } if(size && !product.sizes.includes(size)){
                product.sizes.push(size)
            }
        }
        return acc;
        } , [])

        return res.json({ success: true, Products: products })
    })
})

// removing a product

router.post("/remove", adminAuth, (req, res) => {
    const { id } = req.body;
    const q = "DELETE FROM productModel where id = ?"
    db.query(q, [id], (err, result) => {
        if (err) return res.json({ success: false, message: err.message })
        return res.json({ success: true, message : "Product removed" })
    })

})

// single product

router.get('/single/:id', (req, res) => {
    const id = parseInt(req.params.id, 10); // Ensure `id` is an integer
    console.log("Fetching product with ID:", id); // Log the ID for debugging
    const q = "SELECT * FROM productModel where id = ?"
    db.query(q, [id], (err, result) => {
        if (err) return res.json({ success: false, message: err.message })
        return res.json({ success: true, Result: result })
    })

})


export { router as productRouter };