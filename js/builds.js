export const showHideAlert = (alert) => {
  alert.classList.add("d-block");
  alert.classList.remove("d-none");

  setTimeout(() => {
    alert.classList.add("d-none");
    alert.classList.remove("d-block");
  }, 2000);
};

export const llenarFormulario = (producto) => {
  document.getElementById("nombre").value = producto.nombre;
  document.getElementById("precioVenta").value = producto.precio_venta;
  document.getElementById("precioCompra").value = producto.precio_compra;
  document.getElementById("categoria").value = producto.categoria;
  document.getElementById("marca").value = producto.marca;
  document.getElementById("cantidad").value = producto.cantidad;
  document.getElementById("fechaIngreso").value = producto.fecha_ingreso;
  document.getElementById("descripcion").value = producto.descripcion;
};
