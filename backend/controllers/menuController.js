import Menu from "../models/menuModel.js";
import { v2 as cloudinary } from "cloudinary";

export const addMenuItem = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    if (!name || !description || !price || !category || !req.file) {
      return res.status(400).json({ message: "All fields are required", success: false });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "menu",
    });

    const newMenuItem = await Menu.create({
      name,
      description,
      price,
      category,
      image: result.secure_url,
    });

    res.status(201).json({ message: "Menu item added successfully", success: true, menuItem: newMenuItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding menu item", success: false });
  }
};

export const getAllMenuItems = async (req, res) => {
  try {
    const menuItems = await Menu.find().populate("category", "name").sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: menuItems });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving menu items", success: false });
  }
};

export const updateMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    // Fixed: Destructured isAvailable from req.body
    const { name, description, price, category, isAvailable } = req.body;

    const menuItem = await Menu.findById(id);
    if (!menuItem) {
      return res.status(404).json({ message: "Menu item not found", success: false });
    }

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "menu",
      });
      menuItem.image = result.secure_url;
    }

    if (name) menuItem.name = name;
    if (description) menuItem.description = description;
    if (price) menuItem.price = price;
    if (category) menuItem.category = category;
    if (isAvailable !== undefined) menuItem.isAvailable = isAvailable;

    await menuItem.save();

    res.status(200).json({ message: "Menu item updated successfully", success: true, menuItem });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating menu item", success: false });
  }
};

export const deleteMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const menuItem = await Menu.findByIdAndDelete(id);

    if (!menuItem) {
      return res.status(404).json({ message: "Menu item not found", success: false });
    }
    res.status(200).json({ message: "Menu item deleted successfully", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting menu item", success: false });
  }
};