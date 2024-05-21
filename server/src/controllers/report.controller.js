const Category = require("../models/category.model");
const Product = require("../models/product.model");
const ExcelJS = require("exceljs");
const fs = require('fs');
const reportController = {
  findProductStock: async (req, res) => {
    try {
      let { limit, page } = req.query;
      limit = limit || 15;
      page = page || 1;
      const skip = limit * (page - 1);
      const findProductStock = await Product.find()
        .select("")
        .limit(limit)
        .skip(skip);
      if (findProductStock.length == 0)
        return res.json({ msg: "products is empty!" });
      return res.json({ status: 1, code: 200, data: findProductStock });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  exportExcell: async (req, res) => {
    try {
      const { dataExport } = req.body;

      //tạo bảng
      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet("Danh sach");
      sheet.columns = [
        {
          header: "ID",
          key: "id",
          width: 25,
        },
        {
          header: "Mã sản phẩm",
          key: "product_id",
          width: 30,
        },
        {
          header: "Tên sản phẩm",
          key: "product_name",
          width: 30,
        },
        {
          header: "Đơn vị tính",
          key: "mesure",
          width: 30,
        },
        {
          header: "Số lượng tồn",
          key: "quanlity_stock",
          width: 30,
        },
        {
          header: "Số lượng đã bán",
          key: "quanlity_sold",
          width: 30,
        },
        {
          header: "Ghi chú",
          key: "note",
          width: 30,
        },
      ];

      sheet.getRow(1).eachCell((cell, colNumber) => {
        cell.font = { bold: true, size: 16 };
      });

      dataExport.forEach((element, index) => {
        const row = {
          id: index,
          product_id: element._id,
          product_name: element.name,
          mesure: "chiếc",
          quanlity_stock: element.quanlity_stock,
          quanlity_sold: element.quanlity_sold,
          note: "",
        };
        sheet.addRow(row);
      });

      const currentDirectory = process.cwd();
console.log('Thư mục làm việc hiện tại:', currentDirectory);
      // export file excel
      const filePath =
      currentDirectory + "/src/public/excels/" + "product" + ".xlsx";
      await workbook.xlsx.writeFile(filePath);
      return res.json({ url: process.env.STATIC_FILE + "/product" + ".xlsx" });
    } catch (error) {
      console.log(error);
    }
  },

  exportExcellProfit: async (req, res) => {
    try {
      const { dataExport } = req.body;
      //tạo bảng
      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet("Danh sach doanh thu");
      sheet.columns = [
        {
          header: "ID",
          key: "id",
          width: 15,
        },
        {
          header: "Mã sản phẩm",
          key: "product_id",
          width: 30,
        },
        {
          header: "Tên sản phẩm",
          key: "product_name",
          width: 35,
        },
        {
          header: "Đơn vị tính",
          key: "mesure",
          width: 30,
        },
        {
          header: "Số lượng tồn",
          key: "quanlity_stock",
          width: 20,
        },
        {
          header: "Số lượng đã bán",
          key: "quanlity_sold",
          width: 20,
        },
        {
          header: "Tổng tiền",
          key: "total",
          width: 40,
        },
      ];

      sheet.getRow(1).eachCell((cell, colNumber) => {
        cell.font = { bold: true, size: 16 };
      });

      dataExport.forEach((element, index) => {
        const row = {
          id: index,
          product_id: element._id,
          product_name: element.name,
          mesure: "chiếc",
          quanlity_stock: element.quanlity_stock,
          quanlity_sold: element.quanlity_sold,
          total: parseInt(element.quanlity_sold * element.price).toLocaleString(
            "vi-VN",
            {
              style: "currency",
              currency: "VND",
            }
          ),
        };
        sheet.addRow(row);
      });
      // //export file excel
      const filePath =
        process.env.STATIC_PATH + "/src/public/excels/" + "product" + ".xlsx";
      await workbook.xlsx.writeFile(filePath);
      return res.json({ url: process.env.STATIC_FILE + "/product" + ".xlsx" });
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = reportController;
