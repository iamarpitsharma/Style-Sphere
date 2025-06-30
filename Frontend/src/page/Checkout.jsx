import { useState } from "react"
import { CreditCard, Shield, MapPin } from "lucide-react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { useAppContext } from "../store/CartContext"
import axios from "../axios";



export default function CheckoutPage() {
  const { cartItems } = useAppContext()
  const [selectedAddress, setSelectedAddress] = useState(0)
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [showAddAddress, setShowAddAddress] = useState(false)

  const addresses = [
    {
      id: 1,
      name: "Arpit Sharma",
      phone: "+91 9876543210",
      address: "123 Main Street, Apartment 4B",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001",
      type: "Home",
    },
    {
      id: 2,
      name: "Shivangi Singh",
      phone: "+91 9876543210",
      address: "456 Business Park, Office 201",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400002",
      type: "Office",
    },
  ]

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 1999 ? 0 : 99
  const total = subtotal + shipping

const handlePayment = async () => {
  const token = localStorage.getItem("token"); // if you’re using auth

  try {
    const res = await axios.post("/api/payment/create-order", { amount: total }, {
      headers: { Authorization: `Bearer ${token}` }
    });

    const { orderId, amount, currency } = res.data;

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: amount,
      currency: currency,
      name: "Style Sphere",
      description: "Order Payment",
      order_id: orderId,
      handler: function (response) {
        alert("Payment successful!");
        console.log("Razorpay Response:", response);
        // You can verify payment and create order in DB here
      },
      prefill: {
        name: "arpit",
        email: "rj@gmail.com", // get from user data
        contact: "987654321",
      },
      theme: {
        color: "#ec4899",
      },
    };

    const rzp = new Razorpay(options);
    rzp.open();
  } catch (error) {
    console.error("Payment initiation failed", error);
    alert("Payment initiation failed. Please try again.");
  }
};


  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Address & Payment */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Address */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center mb-4">
                <MapPin className="h-5 w-5 text-pink-600 mr-2" />
                <h3 className="text-lg font-semibold">Delivery Address</h3>
              </div>

              <div className="space-y-4">
                {addresses.map((address, index) => (
                  <div
                    key={address.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${selectedAddress === index ? "border-pink-600 bg-pink-50" : "border-gray-200"
                      }`}
                    onClick={() => setSelectedAddress(index)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <input
                            type="radio"
                            checked={selectedAddress === index}
                            onChange={() => setSelectedAddress(index)}
                            className="mr-3 text-pink-600 focus:ring-pink-500"
                          />
                          <span className="font-medium">{address.name}</span>
                          <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded ml-2">
                            {address.type}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm ml-6">
                          {address.address}
                          <br />
                          {address.city}, {address.state} - {address.pincode}
                          <br />
                          Phone: {address.phone}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  onClick={() => setShowAddAddress(true)}
                  className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-gray-600 hover:border-pink-600 hover:text-pink-600 transition-colors"
                >
                  + Add New Address
                </button>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center mb-4">
                <CreditCard className="h-5 w-5 text-pink-600 mr-2" />
                <h3 className="text-lg font-semibold">Payment Method</h3>
              </div>

              <div className="space-y-4">
                {[
                  { id: "card", label: "Credit/Debit Card" },
                  { id: "upi", label: "UPI Payment" },
                  { id: "cod", label: "Cash on Delivery" },
                ].map(({ id, label }) => (
                  <div key={id} className="flex items-center">
                    <input
                      type="radio"
                      id={id}
                      name="payment"
                      value={id}
                      checked={paymentMethod === id}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-3 text-pink-600 focus:ring-pink-500"
                    />
                    <label htmlFor={id} className="flex-1 cursor-pointer">
                      <div className="flex items-center">
                        {id === "card" && <CreditCard className="h-5 w-5 text-gray-400 mr-2" />}
                        <span>{label}</span>
                      </div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>

              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-16 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="text-sm text-gray-500">{item.brand}</p>
                      <h4 className="font-medium text-sm">{item.name}</h4>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-sm text-gray-600">Qty: {item.quantity}</span>
                        <span className="font-medium">₹{item.price}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 mb-4 border-t border-gray-200 pt-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium text-green-600">
                    {shipping === 0 ? "FREE" : `₹${shipping}`}
                  </span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
              </div>

              <button
                onClick={handlePayment}
                className="w-full bg-pink-600 text-white py-3 rounded-lg font-medium hover:bg-pink-700 transition-colors mb-4"
              >
                Pay ₹{total} with Razorpay
              </button>

              <div className="flex items-center justify-center text-sm text-gray-500">
                <Shield className="h-4 w-4 mr-1" />
                <span>Secure checkout powered by SSL</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
