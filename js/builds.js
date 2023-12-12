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

export const mostrarDatosEnTabla = (datos) => {
  const contTable = document.getElementById("cont-table");
  const miTabla = document.getElementById("tabla");
  if (datos.length > 0) {
    contTable.classList.remove("d-none");
    contTable.classList.add("d-block");
    miTabla.innerHTML = "";

    datos.forEach((dato, i) => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
         <td>${i + 1}</td>
         <td>${dato.nombre}</td>
        <td>${dato.precioVenta}</td>
        <td>${dato.categoria}</td>
        <td>${dato.marca}</td>
        <td>${dato.cantidad}</td>
        <td>
          <button class="btn eliminar" data-key="${
            dato.key
          }"><i class="bi bi-trash3 text-danger eliminar" data-key='${
        dato.key
      }'></i></button>
          <button class="btn modificar" data-key="${
            dato.key
          }"><i class="bi bi-pencil-square text-success modificar" data-key='${
        dato.key
      }'></i></button>
        </td>
      `;
      miTabla.appendChild(fila);
    });
  } else {
    contTable.classList.remove("d-block");
    contTable.classList.add("d-none");
  }
};
