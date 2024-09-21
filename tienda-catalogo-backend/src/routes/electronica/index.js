const express = require("express");
const app = express();
const connectToDatabase = require("../../lib/config");
const { ObjectId } = require("mongodb");

app.get("/productos", async (req, res) => {
  try {
    const db = await connectToDatabase(); 
    const collection = db.collection("electronicos");
    const results = await collection.find({}).limit(50).toArray();
    res.status(200).send(results);
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    res.status(500).send(
      { 
        success: false, 
        message: "Error al obtener los productos" 
      });
  }
});


app.post("/productos", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("electronicos");

    // Datos del producto enviados en el cuerpo de la solicitud
    const { nombre, precio, descripcion, imagen, categoria } = req.body;

    // Validar que se hayan enviado todos los campos requeridos
    if (!nombre || !precio || !descripcion || !imagen || !categoria) {
      return res.status(400).send({
        success: false,
        message: "Todos los campos (nombre, precio, descripcion, imagen, categoria) son requeridos."
      });
    }

    // Crear el nuevo producto con los campos recibidos
    const nuevoProducto = {
      nombre,
      precio,
      descripcion,
      imagen,
      categoria
    };

    // Insertar el nuevo producto en la base de datos
    const result = await collection.insertOne(nuevoProducto);

    // Responder con éxito si se insertó correctamente
    res.status(201).send({
      success: true,
      message: "Producto agregado exitosamente",
      data: { _id: result.insertedId, ...nuevoProducto } // Usamos `insertedId` para obtener el ID del nuevo producto
    });
  } catch (error) {
    console.error("Error al agregar el producto:", error);
    res.status(500).send({
      success: false,
      message: "Error al agregar el producto"
    });
  }
});

//Busqueda por ID

app.get("/productos/:id", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("electronicos");
    
    const productoId = req.params.id;

    // Verificar si el ID es válido
    if (!ObjectId.isValid(productoId)) {
      return res.status(400).send({
        success: false,
        message: "ID inválido"
      });
    }

    const result = await collection.findOne({ _id: new ObjectId(productoId) });

    // Si no se encuentra el producto
    if (!result) {
      return res.status(404).send({
        success: false,
        message: "Producto no encontrado"
      });
    }

    res.status(200).send(result);
  } catch (error) {
    console.error("Error al obtener el producto:", error);
    res.status(500).send({
      success: false,
      message: "Error al obtener el producto"
    });
  }
});

app.put("/productos/:id", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("electronicos");
    
    const productoId = req.params.id;
    const { nombre, precio, descripcion, imagen, categoria } = req.body;

    // Verificar si el ID es válido
    if (!ObjectId.isValid(productoId)) {
      return res.status(400).send({
        success: false,
        message: "ID inválido"
      });
    }

    // Validar que se hayan enviado al menos algunos campos a actualizar
    if (!nombre && !precio && !descripcion && !imagen && !categoria) {
      return res.status(400).send({
        success: false,
        message: "Se requiere al menos un campo para actualizar (nombre, precio, descripcion, imagen, categoria)."
      });
    }

    // Crear un objeto de actualización con los campos enviados
    const actualizacion = {};
    if (nombre) actualizacion.nombre = nombre;
    if (precio) actualizacion.precio = precio;
    if (descripcion) actualizacion.descripcion = descripcion;
    if (imagen) actualizacion.imagen = imagen;
    if (categoria) actualizacion.categoria = categoria;

    const result = await collection.updateOne(
      { _id: new ObjectId(productoId) },
      { $set: actualizacion }
    );

    // Si no se encuentra el producto
    if (result.matchedCount === 0) {
      return res.status(404).send({
        success: false,
        message: "Producto no encontrado"
      });
    }

    res.status(200).send({
      success: true,
      message: "Producto actualizado exitosamente"
    });
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    res.status(500).send({
      success: false,
      message: "Error al actualizar el producto"
    });
  }
});

// ruta para eliminar por ID
app.delete("/productos/:id", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("electronicos");

    const productoId = req.params.id;

    // Verificar si el ID es válido
    if (!ObjectId.isValid(productoId)) {
      return res.status(400).send({
        success: false,
        message: "ID inválido"
      });
    }

    const result = await collection.deleteOne({ _id: new ObjectId(productoId) });

    // Si no se encuentra el producto
    if (result.deletedCount === 0) {
      return res.status(404).send({
        success: false,
        message: "Producto no encontrado"
      });
    }

    res.status(200).send({
      success: true,
      message: "Producto eliminado exitosamente"
    });
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    res.status(500).send({
      success: false,
      message: "Error al eliminar el producto"
    });
  }
});


module.exports = app;
