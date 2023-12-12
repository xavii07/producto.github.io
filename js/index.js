import { onValue, ref } from "firebase/database";
import { db } from "./config";
import { createProduct, deleteProduct, updateProduct } from "./services";
import { llenarFormulario, showHideAlert } from "./builds";

const tablaBody = document.getElementById("tabla");
const contTable = document.getElementById("cont-table");
const botonGuardarCambios = document.getElementById("boton-update");
const botonGuardar = document.getElementById("boton-crear");
const formulario = document.getElementById("formulario");
const tituloUpdate = document.getElementById("titulo-update");
const tituloCreate = document.getElementById("titulo-create");
let selectedKey = null;

const productoRef = ref(db, "Gaspata_Xavier");

// Escuchar cambios en los datos
onValue(productoRef, (snapshot) => {
  tablaBody.innerHTML = "";

  if (snapshot.exists()) {
    contTable.classList.remove("d-none");
    contTable.classList.add("d-block");

    snapshot.forEach((productoSnap) => {
      const producto = productoSnap.val();
      const row = `<tr>
                    <td>${producto.nombre}</td>
                    <td>${producto.precio_venta}</td>
                    <td>${producto.categoria}</td>
                    <td>${producto.marca}</td>
                    <td>${producto.cantidad}</td>
                      <td>
                          <button class="btn-eliminar btn" onclick="eliminarProducto('${productoSnap.key}')"><i class="bi bi-trash3 text-danger"></i></button>
                          <button class="btn-modificar btn" onclick="seleccionarProducto('${productoSnap.key}')"><i class="bi bi-pencil-square text-success"></i></button>
                      </td>
                  </tr>`;
      tablaBody.innerHTML += row;
    });
  } else {
    contTable.classList.remove("d-block");
    contTable.classList.add("d-none");
  }
});

const crearRegistro = async () => {
  const nombre = document.getElementById("nombre").value;
  const precioVenta = document.getElementById("precioVenta").value;
  const precioCompra = document.getElementById("precioCompra").value;
  const categoria = document.getElementById("categoria").value;
  const marca = document.getElementById("marca").value;
  const cantidad = document.getElementById("cantidad").value;
  const fechaIngreso = document.getElementById("fechaIngreso").value;
  const descripcion = document.getElementById("descripcion").value;

  // Validar los campos
  if (
    nombre === "" ||
    precioVenta === "" ||
    precioCompra === "" ||
    categoria === "" ||
    marca === "" ||
    cantidad === "" ||
    fechaIngreso === "" ||
    descripcion === ""
  ) {
    const alertError = document.getElementById("alert-error");
    showHideAlert(alertError);
    return;
  }

  const res = createProduct({
    nombre,
    precio_venta: precioVenta,
    precio_compra: precioCompra,
    categoria,
    marca,
    cantidad,
    fecha_ingreso: fechaIngreso,
    descripcion,
  });

  if (res) {
    limpiarCampos();
    const alertSuccess = document.getElementById("alert-success");
    showHideAlert(alertSuccess);
  }
};

function limpiarCampos() {
  formulario.reset();
}

window.seleccionarProducto = function (key) {
  botonGuardarCambios.classList.add("d-block");
  botonGuardarCambios.classList.remove("d-none");
  botonGuardar.classList.add("d-none");
  botonGuardar.classList.remove("d-block");
  tituloUpdate.classList.add("d-block");
  tituloUpdate.classList.remove("d-none");
  tituloCreate.classList.add("d-none");
  tituloCreate.classList.remove("d-block");

  selectedKey = key;

  const productoRef = ref(db, `Gaspata_Xavier/${key}`);
  onValue(productoRef, (snapshot) => {
    const producto = snapshot.val();

    // Actualizar los valores del formulario
    llenarFormulario(producto);
  });
};

const actualizarRegistro = () => {
  if (selectedKey) {
    // Obtener los nuevos valores del formulario
    const nombre = document.getElementById("nombre").value;
    const precioVenta = document.getElementById("precioVenta").value;
    const precioCompra = document.getElementById("precioCompra").value;
    const categoria = document.getElementById("categoria").value;
    const marca = document.getElementById("marca").value;
    const cantidad = document.getElementById("cantidad").value;
    const fechaIngreso = document.getElementById("fechaIngreso").value;
    const descripcion = document.getElementById("descripcion").value;

    // Validar los campos
    if (
      nombre === "" ||
      precioVenta === "" ||
      precioCompra === "" ||
      categoria === "" ||
      marca === "" ||
      cantidad === "" ||
      fechaIngreso === "" ||
      descripcion === ""
    ) {
      const alertError = document.getElementById("alert-error");
      showHideAlert(alertError);
      return;
    }

    updateProduct(selectedKey, {
      nombre,
      precio_venta: precioVenta,
      precio_compra: precioCompra,
      categoria,
      marca,
      cantidad,
      fecha_ingreso: fechaIngreso,
      descripcion,
    });

    botonGuardarCambios.classList.add("d-none");
    botonGuardarCambios.classList.remove("d-block");
    botonGuardar.classList.add("d-block");
    botonGuardar.classList.remove("d-none");
    tituloUpdate.classList.add("d-none");
    tituloUpdate.classList.remove("d-block");
    tituloCreate.classList.add("d-block");
    tituloCreate.classList.remove("d-none");

    alert("Producto actualizado correctamente");
    limpiarCampos();
    selectedKey = null;
  } else {
    alert("Por favor, seleccione un producto");
  }
};

window.eliminarProducto = function (key) {
  const isDeleted = confirm(
    "¿Estás seguro de que quieres eliminar este producto?"
  );
  if (isDeleted) {
    const res = deleteProduct(key);
    if (res) {
      alert("Registro eliminado exitosamente");
      return;
    }

    alert("Error al eliminar el registro");
  }
};

botonGuardar.addEventListener("click", crearRegistro);
botonGuardarCambios.addEventListener("click", actualizarRegistro);
