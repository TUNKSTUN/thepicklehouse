import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../../components/ui/tabs";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Camera,
  Heart,
  Package,
  User,
  MapPin,
  Calendar,
  DollarSign,
} from "lucide-react";

// Mock user data based on your interface
const mockUser = {
  _id: "64f8a1b2c3d4e5f6a7b8c9d0",
  userId: "USR001",
  name: "Yahya Khan",
  email: "yahya@example.com",
  role: "user",
  phone: "9876543210",
  address: [
    {
      street: "123 Main Street",
      city: "Hyderabad",
      state: "Telangana",
      postalCode: "500001",
      country: "India",
    },
  ],
  isActive: true,
  orderHistory: [
    {
      productId: "PROD001",
      totalPaid: "₹2,999",
      purchasedDate: "2024-01-15",
      purchaseStatus: "delivered",
      quantity: "2",
    },
    {
      productId: "PROD002",
      totalPaid: "₹1,599",
      purchasedDate: "2024-01-08",
      purchaseStatus: "shipped",
      quantity: "1",
    },
    {
      productId: "PROD003",
      totalPaid: "₹899",
      purchasedDate: "2024-01-02",
      purchaseStatus: "delivered",
      quantity: "3",
    },
  ],
  wishlist: [
    { products: { name: "Premium Headphones", price: "₹4,999" } },
    { products: { name: "Wireless Mouse", price: "₹1,299" } },
    { products: { name: "Keyboard", price: "₹2,499" } },
  ],
  createdAt: new Date("2023-06-15"),
  updatedAt: new Date("2024-01-20"),
};

export default function ProfilePage() {
  const [user, setUser] = useState(mockUser);
  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    address: user.address[0],
  });
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  const requestOtp = () => {
    const fakeOtp = "123456";
    setGeneratedOtp(fakeOtp);
    setOtpSent(true);
    setOtpVerified(false);
    alert(`OTP sent to ${form.phone || form.email}: ${fakeOtp}`);
  };

  const verifyOtp = () => {
    if (otp === generatedOtp) {
      setOtpVerified(true);
      setOtpSent(false);
      alert("OTP verified. You can now save changes.");
    } else {
      alert("Invalid OTP");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (
      (name === "email" && value !== user.email) ||
      (name === "phone" && value !== user.phone)
    ) {
      requestOtp();
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [name]: value,
      },
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setProfileImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (
      !otpVerified &&
      (user.email !== form.email || user.phone !== form.phone)
    ) {
      alert("Please verify OTP before saving changes.");
      return;
    }

    setUser((prev) => ({
      ...prev,
      name: form.name,
      email: form.email,
      phone: form.phone,
      address: [form.address],
      updatedAt: new Date(),
    }));
    setOtpVerified(false);
    alert("Profile updated successfully!");
  };

  const navigateToWishlist = () => {
    // In a real app, this would use router navigation
    alert("Navigating to wishlist...");
  };

  return (
    <section className="min-h-screen bg-background py-8 px-4 sm:px-8 lg:px-24">
      <motion.div
        className="max-w-4xl mx-auto bg-card rounded-lg border border-border"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Profile Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-6">
            {/* Profile Image */}
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User size={24} className="text-muted-foreground" />
                )}
              </div>
              <label
                htmlFor="profile-image"
                className="absolute -bottom-1 -right-1 bg-card border border-border rounded-full p-1 cursor-pointer hover:bg-muted transition-colors"
              >
                <Camera size={12} />
                <input
                  id="profile-image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* User Info */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-xl font-semibold text-foreground">
                  {user.name}
                </h1>
                <span className="px-2 py-1 rounded text-xs bg-muted text-muted-foreground">
                  {user.role}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>

            {/* Wishlist Button */}
            <Button
              onClick={navigateToWishlist}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <Heart className="w-4 h-4" />
              Wishlist ({user.wishlist.length})
            </Button>
          </div>
        </div>

        {/* Profile Content */}
        <div className="p-6">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="contact">Support</TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={form.phone}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="userId">User ID</Label>
                  <Input
                    id="userId"
                    value={user.userId}
                    disabled
                    className="bg-muted"
                  />
                </div>
              </div>

              {/* Address Section */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-foreground">Address</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <Label htmlFor="street">Street</Label>
                    <Input
                      id="street"
                      name="street"
                      value={form.address.street}
                      onChange={handleAddressChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      name="city"
                      value={form.address.city}
                      onChange={handleAddressChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      name="state"
                      value={form.address.state}
                      onChange={handleAddressChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Input
                      id="postalCode"
                      name="postalCode"
                      value={form.address.postalCode}
                      onChange={handleAddressChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      name="country"
                      value={form.address.country}
                      onChange={handleAddressChange}
                    />
                  </div>
                </div>
              </div>

              {/* OTP Verification */}
              {otpSent && !otpVerified && (
                <div className="p-4 border border-border rounded-lg bg-muted/50">
                  <Label htmlFor="otp">Enter OTP</Label>
                  <div className="flex gap-2 mt-2">
                    <Input
                      id="otp"
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="Enter OTP"
                      className="flex-1"
                    />
                    <Button onClick={verifyOtp} size="sm">
                      Verify
                    </Button>
                  </div>
                </div>
              )}

              <div className="flex justify-end">
                <Button onClick={handleSubmit}>Save Changes</Button>
              </div>
            </TabsContent>

            {/* Purchase History Tab */}
            <TabsContent value="orders" className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-foreground">
                  Purchase History
                </h3>
                <span className="text-xs text-muted-foreground">
                  {user.orderHistory.length} orders
                </span>
              </div>

              <div className="space-y-3">
                {user.orderHistory.map((order, index) => (
                  <div
                    key={index}
                    className="p-4 border border-border rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium">
                          #{order.productId}
                        </span>
                        <span className="px-2 py-1 rounded text-xs bg-muted text-muted-foreground">
                          {order.purchaseStatus}
                        </span>
                      </div>
                      <span className="text-sm font-medium">
                        {order.totalPaid}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>
                        {new Date(order.purchasedDate).toLocaleDateString()}
                      </span>
                      <span>Qty: {order.quantity}</span>
                    </div>
                  </div>
                ))}
              </div>

              {user.orderHistory.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Package size={32} className="mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No orders found</p>
                </div>
              )}
            </TabsContent>

            {/* Contact Support Tab */}
            <TabsContent value="contact" className="space-y-4">
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="Brief description" />
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  rows={5}
                  placeholder="Describe your issue..."
                />
              </div>
              <div className="flex justify-end">
                <Button>Send Message</Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </motion.div>
    </section>
  );
}
