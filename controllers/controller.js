const { User, Profile, Product, OrderProduct, Order } = require("../models");
const Currency = require("../helpers/helper")
const { Op } = require("sequelize");
const bcrypt = require('bcryptjs');
const fs = require('fs')


class Controller {
    static home(req, res) {
        res.render("home")
    };

    static async formRegister(req, res) {
        res.render("formRegister")
    };
    static async addRegister(req, res) {
        let { username, email, password, role } = req.body
        console.log(req.body)
        // const salt = bcrypt.genSaltSync();
        // password = bcrypt.hashSync(password, salt);
        try {
            await User.create({ username, email, password, role })
            // console.log('User create:', req.body)
            res.redirect("/login")
        } catch (error) {
            console.log(error)
            res.send(error.message)
        };
    };
    static async formLogin(req, res) {
        res.render("formLogin")
    }

    static async login(req, res) {
        const { username, password } = req.body

        try {
            const userLogin = await User.findOne({
                where: { username: username },
            })
            let validate = bcrypt.compareSync(password, userLogin.password)
            if (!validate) {
                throw new Error("username and password is Invalid")
            }
            req.session.user = userLogin.dataValues
            res.redirect("/products")
            // if (userLogin) {
            //     console.log(userLogin)
            //     const isValidPassword = bcrypt.compareSync(password, userLogin.password);
            //     if (isValidPassword) {
            //         return res.redirect('/products');
            //     } else {
            //         const error = "Invalid username/password";
            //         return res.redirect(`/login?error=${error}`);
            //     }
            // } else {
            //     const error = "Invalid username/password";
            //     return res.redirect(`/login?error=${error}`);
            // }
        } catch (error) {
            console.log(error)
        }
    }
    static async getLogout(req, res) {
        req.session.destroy((err) => {
            if (err) res.send(err)
            else {
                res.redirect('/')
            }
        })
    }
    static async listAllProducts(req, res) {
        try {
            let { name } = req.query
            const productsData = await Product.searchProducts(name);
            res.render("listAllProducts", { productsData, Currency, currentSession: req.session.user });
        } catch (error) {
            console.log(error);
            res.send(error.message);
        }
    }

    static async formAddProduct(req, res) {
        res.render("formAddProduct")
    };

    static async addProduct(req, res) {
        if (req.session.user.role !== "seller") {
            throw new Error("forbidden action")
        }
        const { name, description, price, picture } = req.body
        try {
            await Product.create({ name, description, price, picture })
            res.redirect("/products")
        } catch (error) {
            console.log(error)
            res.send(error.message)
        };
    };

    static async formEditProduct(req, res) {
        const { productId } = req.params
        try {
            const product = await Product.findByPk(productId)
            res.render("formEditProduct", { product })
        } catch (error) {
            console.log(error)
            res.send(error.message)
        };
    };
    static async editProduct(req, res) {
        const { productId } = req.params
        const { name, description, price } = req.body
        try {
            const product = await Product.findByPk(productId)
            // product.name = name;
            // product.description = description;
            // product.price = price;
            // product.picture = picture;
            console.log(req.files)
            if (req.files && req.files.picture) {
                const picture = req.files.picture;
                console.log(picture)
                // Simpan file ke direktori yang diinginkan
                const directory = './uploads';
                if (!fs.existsSync(directory)) {
                    fs.mkdirSync(directory);
                }
                const filePath = `${directory}/${product.id}.${picture.mimetype.split('/')[1]}`;
                await picture.mv(filePath);
                const url = `http://localhost:3000/uploads/${product.id}.${picture.mimetype.split('/')[1]}`;
                // Update path foto profil di database
                await product.update({ name, description, price, picture: url });
                // await product.save()

            } else {
                await product.update({ name, description, price, picture: url });
            }
            res.redirect("/products")
        } catch (error) {
            console.log(error)
            res.send(error.message)
        };
    };
    static async deleteProduct(req, res) {
        try {
            const { productId } = req.params
            // const { id } = req.params
            let hapus = await Product.findByPk(productId)
            await Product.destroy({
                where: {
                    id: {
                        [Op.eq]: productId
                    }
                }
            })
            res.redirect(`/products`)
        } catch (error) {
            console.log(error)
            // req.send(error.message)
        }
    }
    static async listAllOrder(req, res) {
        console.log(req.session.user)
        try {
            const orders = await Order.findAll({
                where: {
                    userId: req.session.user.id
                },
                include: {
                    model: Product,
                }
            })
            res.render("orders.ejs", { orders, Currency })
            console.log(orders)
        } catch (error) {
            console.log(error)
            res.send(error.message)
        }
    }
    static async addOrder(req, res) {
        try {
            let { productId } = req.params
            await OrderProduct.create({ productId: productId, orderId: 1 })

            res.redirect('/order')
        } catch (error) {

        }
    }
}

module.exports = Controller;