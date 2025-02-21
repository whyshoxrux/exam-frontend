"use client"
import { Minus, Plus, X, Check, ArrowLeft, CreditCard } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export default function Cart() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Nike Airmax 270 React",
      price: 499,
      quantity: 2,
      image: "hitler.jpg",
    },
    {
      id: 2,
      name: "Nike Airmax 270 React",
      price: 499,
      quantity: 2,
      image: "hitler.jpg",
    },
  ])

  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [showCardModal, setShowCardModal] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const updateQuantity = (id, change) => {
    setCartItems((items) =>
      items.map((item) => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.quantity + change)
          return { ...item, quantity: newQuantity }
        }
        return item
      }),
    )
  }

  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shippingFee = 20
  const total = subtotal + shippingFee

  const handleCheckout = () => {
    setShowPaymentModal(true)
  }

  const handleGoToPayment = () => {
    setShowPaymentModal(false)
    setShowCardModal(true)
  }

  const handleConfirmPayment = () => {
    setShowCardModal(false)
    setShowSuccessModal(true)
    setTimeout(() => {
      setShowSuccessModal(false)
    }, 2000)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {/* Table Header */}
          <div className="mb-4 hidden grid-cols-12 gap-4 text-sm font-semibold text-gray-600 lg:grid">
            <div className="col-span-6">PRODUCT</div>
            <div className="col-span-2">PRICE</div>
            <div className="col-span-2">QTY</div>
            <div className="col-span-2">UNIT PRICE</div>
          </div>

          {/* Cart Items */}
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="grid grid-cols-1 gap-4 rounded-lg border p-4 lg:grid-cols-12 lg:gap-6">
                <div className="col-span-6 flex items-center gap-4">
                  <button className="text-gray-400 hover:text-gray-600" onClick={() => removeItem(item.id)}>
                    <X className="h-5 w-5" />
                  </button>
                  <div className="h-20 w-20 flex-shrink-0">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                  </div>
                </div>
                <div className="col-span-2 flex items-center text-gray-900">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
                <div className="col-span-2 flex items-center gap-3">
                  <button className="rounded border p-1 hover:bg-gray-100" onClick={() => updateQuantity(item.id, -1)}>
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button className="rounded border p-1 hover:bg-gray-100" onClick={() => updateQuantity(item.id, 1)}>
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <div className="col-span-2 flex items-center text-gray-900">${item.price.toFixed(2)}</div>
              </div>
            ))}
          </div>

          {/* Voucher */}
          <div className="mt-6 flex gap-4">
            <Input type="text" placeholder="Voucher code" className="max-w-[200px]" />
            <Button className="bg-[#33A0FF] text-white hover:bg-blue-500 w-[120px]">Redeem</Button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="rounded-lg border p-6">
            <h2 className="mb-4 text-lg font-semibold">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping fee</span>
                <span className="font-medium">${shippingFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Coupon</span>
                <span className="font-medium">No</span>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between">
                  <span className="text-base font-semibold">TOTAL</span>
                  <span className="text-xl font-semibold">${total.toFixed(2)}</span>
                </div>
              </div>
              <Button className="w-full bg-[#33A0FF] hover:bg-blue-500" onClick={handleCheckout}>
                Check out
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Initial Payment Modal */}
      <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <div className="flex items-center">
              <button onClick={() => setShowPaymentModal(false)} className="text-gray-400 hover:text-gray-600">
                <ArrowLeft className="h-5 w-5" />
              </button>
              <DialogTitle className="flex-1 text-center">Make Payment</DialogTitle>
              <button onClick={() => setShowPaymentModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="h-5 w-5" />
              </button>
            </div>
          </DialogHeader>
          <div className="flex justify-center mb-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-[#33A0FF] text-white flex items-center justify-center">1</div>
              <div className="w-12 h-1 bg-gray-200" />
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">2</div>
              <div className="w-12 h-1 bg-gray-200" />
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">3</div>
            </div>
          </div>
          <form className="grid gap-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" />
              </div>
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" />
            </div>
            <div>
              <Label htmlFor="address">Address for Delivery</Label>
              <Input id="address" />
            </div>
            <Button onClick={handleGoToPayment} className="bg-[#33A0FF] hover:bg-blue-500 mt-4">
              Go to Payment
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Card Payment Modal */}
      <Dialog open={showCardModal} onOpenChange={setShowCardModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <div className="flex items-center">
              <button
                onClick={() => {
                  setShowCardModal(false)
                  setShowPaymentModal(true)
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <DialogTitle className="flex-1 text-center">Make Payment</DialogTitle>
              <button onClick={() => setShowCardModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="h-5 w-5" />
              </button>
            </div>
          </DialogHeader>
          <div className="flex justify-center mb-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-[#33A0FF] text-white flex items-center justify-center">1</div>
              <div className="w-12 h-1 bg-[#33A0FF]" />
              <div className="w-8 h-8 rounded-full bg-[#33A0FF] text-white flex items-center justify-center">2</div>
              <div className="w-12 h-1 bg-gray-200" />
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">3</div>
            </div>
          </div>
          <div className="mb-6">
            <div className="bg-gray-800 rounded-lg p-4 text-white">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-8 bg-gray-600 rounded"></div>
                <CreditCard className="h-8 w-8" />
              </div>
              <div className="font-mono text-lg mb-4">1234 5678 9123 4567</div>
              <div className="flex justify-between">
                <div>JOHN DOE</div>
                <div>09/09</div>
              </div>
            </div>
          </div>
          <form className="grid gap-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input id="cardNumber" placeholder="Card Number" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiry">Expiry</Label>
                <Input id="expiry" placeholder="MM/YY" />
              </div>
              <div>
                <Label htmlFor="cvv">CVV</Label>
                <Input id="cvv" placeholder="CVV" />
              </div>
            </div>
            <div>
              <Label htmlFor="holderName">Holder Name</Label>
              <Input id="holderName" placeholder="Holder Name" />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="saveCard" />
              <Label htmlFor="saveCard">Save this credit card</Label>
            </div>
            <Button onClick={handleConfirmPayment} className="bg-[#33A0FF] hover:bg-blue-500 mt-4">
              Confirm
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="sm:max-w-[425px]">
          <div className="flex flex-col items-center justify-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">Success!</h2>
            <p className="text-gray-600">Your payment has been processed successfully.</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

