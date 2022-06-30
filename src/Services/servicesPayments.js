const axios = require("axios");

class servicesPayments {
    async createPayment() {
        const url = "https://api.mercadopago.com/checkout/preferences";

        const body = {
            payer_email: "test_user_63222635@testuser.com", //usuario comprador
            items: [
                {
                    title: "Adopt-A Title",
                    description: "Adopt-A description",
                    picture_url: "http://www.myapp.com/myimage.jpg",
                    category_id: "category123",
                    quantity: 1,
                    unit_price: 10
                }
            ],
            back_urls: {
                failure: "/failure",
                pending: "/pending",
                success: "/success"
            }
        };



        const payment = await axios.post(url, body, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
            }
        });

        return payment.data;
    }

    async createSubscription() {
        const url = "https://api.mercadopago.com/preapproval";

        const body = {
            reason: "Suscripción de ejemplo",
            auto_recurring: {
                frequency: 1,
                frequency_type: "months",
                transaction_amount: 10,
                currency_id: "ARS"
            },
            back_url: "https://google.com.ar",
            payer_email: "test_user_63222635@testuser.com" //usuario comprador
        };

        const subscription = await axios.post(url, body, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
            }
        });

        return subscription.data;
    }
}

module.exports = servicesPayments;