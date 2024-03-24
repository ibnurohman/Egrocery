// const { Model } = require("sequelize")

function Currency(num) {
    return num.toLocaleString("id-ID", {style:"currency", currency:"IDR"})
}

module.exports = Currency