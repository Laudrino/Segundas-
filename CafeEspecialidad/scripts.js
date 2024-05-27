window.onload = function() {
    fetch('productos.json')
        .then(response => response.json())
        .then(products => {
            const container = document.getElementById('productContainer');
            products.forEach(product => {
                container.innerHTML += `
                    <div class="col-md-4">
                        <div class="card shadow-sm">
                            <img src="${product.imagen}" class="card-img-top" alt="${product.nombre}">
                            <div class="card-body">
                                <h5 class="card-title">${product.nombre}</h5>
                                <p class="card-text">${product.descripcion}</p>
                                <p class="card-text">Precio: $${product.precio}</p>
                                <a href="detalle.html?id=${product.id}" class="btn btn-primary">Ver detalles</a>
                            </div>
                        </div>
                    </div>
                `;
            });
        });
};
