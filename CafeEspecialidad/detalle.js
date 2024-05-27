window.onload = function() {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');

    fetch('productos.json')
        .then(response => response.json())
        .then(products => {
            const product = products.find(p => p.id === productId);
            const container = document.getElementById('productDetail');
            container.innerHTML = `
                <div class="col-md-6">
                    <img src="${product.imagen}" class="img-fluid" alt="${product.nombre}">
                </div>
                <div class="col-md-6">
                    <h3>${product.nombre}</h3>
                    <p>${product.descripcion}</p>
                    <p>Precio: $${product.precio}</p>
                </div>
            `;

            paypal.Buttons({
                createOrder: function(data, actions) {
                    return actions.order.create({
                        purchase_units: [{
                            amount: {
                                value: product.precio
                            }
                        }]
                    });
                },
                onApprove: function(data, actions) {
                    return actions.order.capture().then(function(details) {
                        alert('Pago completado por ' + details.payer.name.given_name);
                    });
                }
            }).render('#paypal-button-container');
        });
};
