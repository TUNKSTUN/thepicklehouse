import React, { useState } from "react";
import {
  CreditCard,
  Smartphone,
  Building2,
  ArrowLeft,
  Shield,
  Clock,
  CheckCircle,
  ArrowRight,
  Wallet,
  Info,
  Lock,
  AlertCircle,
} from "lucide-react";
import { useNavigate } from "@remix-run/react";

// Sample order data
const orderSummary = {
  items: [
    { name: "Traditional Mango Pickle", quantity: 2, price: 598 },
    { name: "Fiery Red Chilli Pickle", quantity: 1, price: 249 },
    { name: "Lemon Pickle", quantity: 3, price: 537 },
  ],
  subtotal: 1384,
  discount: 138,
  promoDiscount: 124,
  shipping: 0,
  total: 1122,
};

const PaymentMethod = ({
  id,
  title,
  subtitle,
  icon: Icon,
  isSelected,
  onSelect,
  isPopular = false,
  discount = null,
}) => (
  <div
    className={`relative cursor-pointer transition-all duration-300 ${
      isSelected
        ? "ring-2 ring-primary shadow-lg transform scale-[1.02]"
        : "hover:shadow-md hover:transform hover:scale-[1.01]"
    }`}
    onClick={onSelect}
  >
    <div
      className={`bg-card border-2 rounded-lg p-4 ${
        isSelected ? "border-primary" : "border-border"
      }`}
    >
      <div className="flex items-center gap-4">
        <div
          className={`p-3 rounded-full ${
            isSelected ? "bg-primary text-primary-foreground" : "bg-muted"
          }`}
        >
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-foreground">{title}</h3>
            {isPopular && (
              <span className="bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full font-medium">
                Most Popular
              </span>
            )}
            {discount && (
              <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full font-medium">
                {discount}% OFF
              </span>
            )}
          </div>
          <p className="text-muted-foreground text-sm">{subtitle}</p>
        </div>
        <div
          className={`w-5 h-5 rounded-full border-2 ${
            isSelected ? "border-primary bg-primary" : "border-muted-foreground"
          }`}
        >
          {isSelected && (
            <div className="w-full h-full rounded-full bg-primary-foreground transform scale-50"></div>
          )}
        </div>
      </div>
    </div>
  </div>
);

const BankDetailsForm = ({ onSubmit }) => {
  const [bankDetails, setBankDetails] = useState({
    accountNumber: "",
    ifscCode: "",
    accountHolderName: "",
  });

  return (
    <div className="bg-card border border-border rounded-lg p-6 animate-fade-up">
      <div className="flex items-center gap-3 mb-6">
        <Building2 className="w-5 h-5 text-primary" />
        <h3 className="font-playfair font-semibold text-lg">Bank Details</h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Account Holder Name
          </label>
          <input
            type="text"
            value={bankDetails.accountHolderName}
            onChange={(e) =>
              setBankDetails({
                ...bankDetails,
                accountHolderName: e.target.value,
              })
            }
            className="w-full bg-background border border-border rounded px-3 py-2 focus:ring-2 focus:ring-primary focus:rounded focus:border-transparent"
            placeholder="Enter full name as per bank records"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Account Number
          </label>
          <input
            type="text"
            value={bankDetails.accountNumber}
            onChange={(e) =>
              setBankDetails({ ...bankDetails, accountNumber: e.target.value })
            }
            className="w-full bg-background border border-border rounded px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Enter your account number"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            IFSC Code
          </label>
          <input
            type="text"
            value={bankDetails.ifscCode}
            onChange={(e) =>
              setBankDetails({
                ...bankDetails,
                ifscCode: e.target.value.toUpperCase(),
              })
            }
            className="w-full bg-background border border-border rounded px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Enter IFSC code"
          />
        </div>

        <div className="bg-muted/30 p-4 rounded-lg">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 mt-0.5" />
            <div className="text-sm text-muted-foreground">
              <p className="font-medium text-foreground mb-1">
                Net Banking Information
              </p>
              <p>
                You'll be redirected to your bank's secure portal to complete
                the payment. Please ensure you have your net banking credentials
                ready.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const UPIDetailsForm = ({ onSubmit }) => {
  const [upiDetails, setUpiDetails] = useState({
    upiId: "",
    selectedApp: "",
  });

  const upiApps = [
    { id: "gpay", name: "Google Pay", popular: true },
    { id: "paytm", name: "Paytm" },
    { id: "phonepe", name: "PhonePe", popular: true },
    { id: "amazonpay", name: "Amazon Pay" },
    { id: "bhim", name: "BHIM UPI" },
    { id: "other", name: "Other UPI App" },
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 animate-fade-up">
      <div className="flex items-center gap-3 mb-6">
        <Smartphone className="w-5 h-5 text-primary" />
        <h3 className="font-playfair font-semibold text-lg">UPI Details</h3>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            UPI ID
          </label>
          <input
            type="text"
            value={upiDetails.upiId}
            onChange={(e) =>
              setUpiDetails({ ...upiDetails, upiId: e.target.value })
            }
            className="w-full bg-background border border-border rounded px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="yourname@upi"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Enter your UPI ID (e.g., yourname@paytm, yourname@oksbi)
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            Select UPI App
          </label>
          <div className="grid grid-cols-2 gap-3">
            {upiApps.map((app) => (
              <button
                key={app.id}
                type="button"
                onClick={() =>
                  setUpiDetails({ ...upiDetails, selectedApp: app.id })
                }
                className={`p-3 border rounded-lg text-left transition-all ${
                  upiDetails.selectedApp === app.id
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{app.name}</span>
                  {app.popular && (
                    <span className="text-xs bg-primary text-primary-foreground px-1.5 py-0.5 rounded">
                      Popular
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-muted/30 p-4 rounded-lg">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
            <div className="text-sm text-muted-foreground">
              <p className="font-medium text-foreground mb-1">Quick & Secure</p>
              <p>
                UPI payments are instant and secured with your mobile PIN. No
                need to enter card details.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PaymentConfirmation = () => {
  const [selectedPayment, setSelectedPayment] = useState("upi");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate();

  const paymentMethods = [
    {
      id: "upi",
      title: "UPI Payment",
      subtitle: "Pay using Google Pay, PhonePe, Paytm & more",
      icon: Smartphone,
      isPopular: true,
    },
    {
      id: "card",
      title: "Credit/Debit Card",
      subtitle: "Visa, Mastercard, RuPay cards accepted",
      icon: CreditCard,
    },
    {
      id: "netbanking",
      title: "Net Banking",
      subtitle: "All major banks supported",
      icon: Building2,
    },
    {
      id: "wallet",
      title: "Digital Wallet",
      subtitle: "Paytm, Amazon Pay, MobiKwik",
      icon: Wallet,
    },
    {
      id: "cod",
      title: "Cash on Delivery",
      subtitle: "Pay when your order arrives",
      icon: Wallet,
      discount: 5,
    },
  ];

  const handleContinue = () => {
    if (selectedPayment === "upi" || selectedPayment === "netbanking") {
      setShowDetails(true);
    } else {
      proceedToPayment();
    }
  };

  const proceedToPayment = () => {
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      alert(
        `Redirecting to ${
          selectedPayment === "upi"
            ? "UPI"
            : selectedPayment === "card"
            ? "Card Payment"
            : selectedPayment === "netbanking"
            ? "Net Banking"
            : selectedPayment === "wallet"
            ? "Digital Wallet"
            : "Cash on Delivery confirmation"
        } gateway...`
      );
      setIsProcessing(false);
    }, 2000);
  };

  const goBack = () => {
    if (showDetails) {
      setShowDetails(false);
    } else {
      navigate("/store/cart");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={goBack}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-xl font-playfair font-bold text-foreground">
                {showDetails ? "Payment Details" : "Choose Payment Method"}
              </h1>
              <p className="text-sm text-muted-foreground">
                {showDetails
                  ? "Enter your payment details"
                  : "Secure checkout powered by Razorpay"}
              </p>
            </div>
            <div className="ml-auto flex items-center gap-2 text-sm text-green-600">
              <Shield className="w-4 h-4" />
              <span>Secure</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Methods / Details Form */}
          <div className="lg:col-span-2">
            {!showDetails ? (
              <div className="space-y-6">
                <div>
                  <h2 className="font-playfair font-semibold text-xl text-foreground mb-6">
                    Select Payment Method
                  </h2>

                  <div className="space-y-4">
                    {paymentMethods.map((method) => (
                      <PaymentMethod
                        key={method.id}
                        {...method}
                        isSelected={selectedPayment === method.id}
                        onSelect={() => setSelectedPayment(method.id)}
                      />
                    ))}
                  </div>
                </div>

                {/* Security Features */}
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="font-playfair font-semibold text-lg text-foreground mb-4">
                    Why choose our secure checkout?
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-foreground">
                          SSL Encrypted
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          256-bit security
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Lock className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-foreground">
                          PCI Compliant
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Industry standard
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <h4 className="font-medium text-foreground">
                          Trusted Gateway
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Powered by Razorpay
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                {selectedPayment === "upi" && (
                  <UPIDetailsForm onSubmit={proceedToPayment} />
                )}
                {selectedPayment === "netbanking" && (
                  <BankDetailsForm onSubmit={proceedToPayment} />
                )}
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-6">
              {/* Order Summary */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-playfair font-semibold text-xl text-foreground mb-4">
                  Order Summary
                </h3>

                <div className="space-y-3 mb-4">
                  {orderSummary.items.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {item.name} × {item.quantity}
                      </span>
                      <span className="text-foreground">₹{item.price}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 py-4 border-t border-border">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground">
                      ₹{orderSummary.subtotal}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Product Discounts</span>
                    <span>-₹{orderSummary.discount}</span>
                  </div>
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Promo Discount</span>
                    <span>-₹{orderSummary.promoDiscount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-foreground">FREE</span>
                  </div>
                </div>

                <div className="flex justify-between items-center text-lg font-bold text-foreground pt-4 border-t border-border">
                  <span>Total</span>
                  <span>₹{orderSummary.total}</span>
                </div>
              </div>

              {/* Delivery Info */}
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center gap-3 text-sm">
                  <Clock className="w-4 h-4 text-orange-600" />
                  <div>
                    <p className="font-medium text-foreground">
                      Delivery in 2-3 days
                    </p>
                    <p className="text-muted-foreground">
                      To Hyderabad, Telangana
                    </p>
                  </div>
                </div>
              </div>

              {/* Continue Button */}
              <button
                onClick={showDetails ? proceedToPayment : handleContinue}
                disabled={isProcessing}
                className="w-full btn-hero flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    {showDetails ? "Proceed to Payment" : "Continue"}
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* Security Notice */}
              <div className="text-center text-xs text-muted-foreground">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Shield className="w-3 h-3" />
                  <span>Your payment information is secure</span>
                </div>
                <p>Protected by 256-bit SSL encryption</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentConfirmation;
