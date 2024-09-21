const express = require("express");
const app = express();
const connectToDatabase = require("../../lib/config");
const { ObjectId } = require("mongodb");


app.get("/productos", async(req, res) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection("deporte");
        const result = await collection.find({}).limit(50).toArray();
        res.status(200).send(result);
    } catch (error) {
        console.log("Error al tener los resultados");
        res.status(500).send(
            {
                success: false,
                message: "Error al obtener los productos"
            }
        )
    }
})
app.post("/productos", async (req, res) => {
    try {
      const db = await connectToDatabase();
      const collection = db.collection("deporte");
      const { 
        nombre_producto, 
        deporte, 
        categoria, 
        precio, 
        stock, 
        descripcion, 
        marca, 
        tallas_disponibles, 
        colores_disponibles, 
        fecha_de_lanzamiento, 
        descuento 
      } = req.body;
  
      if (
        !nombre_producto || 
        !deporte || 
        !categoria || 
        !precio || 
        !stock || 
        !descripcion || 
        !marca || 
        !tallas_disponibles || 
        !colores_disponibles || 
        !fecha_de_lanzamiento || 
        !descuento
      ) {
        return res.status(400).send({
          success: false,
          message: "Todos los campos son requeridos."
        });
      }
  
      const nuevoProducto = {
        nombre_producto,
        deporte,
        categoria,
        precio,
        stock,
        descripcion,
        marca,
        tallas_disponibles,
        colores_disponibles,
        fecha_de_lanzamiento: new Date(fecha_de_lanzamiento),
        descuento
      };
  
      const result = await collection.insertOne(nuevoProducto);
  
      res.status(201).send({
        success: true,
        message: "Producto deportivo agregado exitosamente",
        data: { _id: result.insertedId, ...nuevoProducto }
      });
    } catch (error) {
      console.error("Error al agregar el producto deportivo:", error);
      res.status(500).send({
        success: false,
        message: "Error al agregar el producto deportivo"
      });
    }
  });



  app.get("/productos/:id", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("deporte");
    
    const productoId = req.params.id;

    if (!ObjectId.isValid(productoId)) {
      return res.status(400).send({
        success: false,
        message: "ID inválido"
      });
    }

    const result = await collection.findOne({ _id: new ObjectId(productoId) });

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
      const collection = db.collection("deporte");
      
      const productoId = req.params.id;
      const { 
        nombre_producto, 
        deporte, 
        categoria, 
        precio, 
        stock, 
        descripcion, 
        marca, 
        tallas_disponibles, 
        colores_disponibles, 
        fecha_de_lanzamiento, 
        descuento 
      } = req.body;
  
      
      if (!ObjectId.isValid(productoId)) {
        return res.status(400).send({
          success: false,
          message: "ID inválido"
        });
      }
  
      if (
        !nombre_producto && 
        !deporte && 
        !categoria && 
        !precio && 
        !stock && 
        !descripcion && 
        !marca && 
        !tallas_disponibles && 
        !colores_disponibles && 
        !fecha_de_lanzamiento && 
        !descuento
      ) {
        return res.status(400).send({
          success: false,
          message: "Se requiere al menos un campo para actualizar."
        });
      }
      const actualizacion = {};
      if (nombre_producto) actualizacion.nombre_producto = nombre_producto;
      if (deporte) actualizacion.deporte = deporte;
      if (categoria) actualizacion.categoria = categoria;
      if (precio) actualizacion.precio = precio;
      if (stock) actualizacion.stock = stock;
      if (descripcion) actualizacion.descripcion = descripcion;
      if (marca) actualizacion.marca = marca;
      if (tallas_disponibles) actualizacion.tallas_disponibles = tallas_disponibles;
      if (colores_disponibles) actualizacion.colores_disponibles = colores_disponibles;
      if (fecha_de_lanzamiento) actualizacion.fecha_de_lanzamiento = new Date(fecha_de_lanzamiento);
      if (descuento) actualizacion.descuento = descuento;
  
      const result = await collection.updateOne(
        { _id: new ObjectId(productoId) },
        { $set: actualizacion }
      );
      if (result.matchedCount === 0) {
        return res.status(404).send({
          success: false,
          message: "Producto no encontrado"
        });
      } 
      res.status(200).send({
        success: true,
        message: "Producto deportivo actualizado exitosamente"
      });
    } catch (error) {
      console.error("Error al actualizar el producto deportivo:", error);
      res.status(500).send({
        success: false,
        message: "Error al actualizar el producto deportivo"
      });
    }
  });
  
app.delete("/productos/:id", async (req, res) => {
    try {
      const db = await connectToDatabase();
      const collection = db.collection("deporte");
  
      const productoId = req.params.id;
  
      if (!ObjectId.isValid(productoId)) {
        return res.status(400).send({
          success: false,
          message: "ID inválido"
        });
      }
      const result = await collection.deleteOne({ _id: new ObjectId(productoId) });
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
