import { onValue, ref } from "firebase/database";
import { db } from "./config";
import { createProduct, deleteProduct, updateProduct } from "./services";
import { llenarFormulario, mostrarDatosEnTabla, showHideAlert } from "./builds";

const tablaBody = document.getElementById("tabla");
const contTable = document.getElementById("cont-table");
const botonGuardarCambios = document.getElementById("boton-update");
const botonGuardar = document.getElementById("boton-crear");
const formulario = document.getElementById("formulario");
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
                          <button class="btn-modificar btn" onclick="seleccionarProducto('${productoSnap.key}')">Editar</button>
                          <button class="btn-eliminar btn" onclick="eliminarLibro('${productoSnap.key}')">Borrar</button>
                      </td>
                  </tr>`;
      tablaBody.innerHTML += row;
    });
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

    alert("Registro actualizado exitosamente");
    limpiarCampos();
    selectedKey = null;
  } else {
    alert("Por favor, seleccione un libro para actualizar");
  }
};

window.eliminarLibro = function (key) {
  const isDeleted = confirm(
    "¿Estás seguro de que quieres eliminar este libro?"
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
