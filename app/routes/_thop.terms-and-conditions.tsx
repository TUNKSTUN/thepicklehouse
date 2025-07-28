import { motion } from "framer-motion";
import BackgroundImage from "../assets/background-1.png";
import { MdVerified, MdLocalShipping, MdCheckCircle, MdGavel, MdInfo, MdLock, MdShoppingCart, MdWarning } from "react-icons/md";

export default function TermsAndConditions() {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-primary to-masala-brown py-20 px-4 sm:px-8 lg:px-24 text-white">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true, amount: 0.8 }}
                        className="text-center"
                    >
                        <h1 className="text-4xl lg:text-5xl font-bold font-playfair mb-6">
                            Terms & Conditions
                        </h1>
                        <p className="text-xl max-w-3xl mx-auto opacity-90">
                            Welcome to The House of Pickles. By accessing our website at www.thehouseofpickles.com or purchasing our artisanal pickle products, you agree to abide by these Terms and Conditions. Please review them carefully to understand your rights and obligations.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Terms Content */}
            <motion.section
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="relative py-20 px-4 sm:px-8 lg:px-24"
            >
                {/* Background image */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={BackgroundImage}
                        alt="Background"
                        className="w-full h-full object-cover opacity-10 pointer-events-none select-none"
                    />
                </div>

                <div className="relative z-10 max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 md:p-12">
                    <div className="text-gray-800">
                        <div className="mb-12">
                            <h2 className="text-2xl font-bold font-playfair text-primary mb-4">
                                Introduction
                            </h2>
                            <p className="text-gray-700 mb-6 italic">
                                Last updated: {new Date().toLocaleDateString()}
                            </p>
                            <p className="text-gray-700 mb-6">
                                These Terms and Conditions (“Terms”) govern your use of The House of Pickles website, located at www.thehouseofpickles.com, and the purchase of our artisanal pickle products. By accessing our website, placing an order, creating an account, or engaging with any of our services, you agree to be legally bound by these Terms and all applicable laws and regulations. If you do not agree with any part of these Terms, you must not use our website or services.
                            </p>
                            <p className="text-gray-700 mb-6">
                                The House of Pickles is an e-commerce platform dedicated to delivering high-quality, handcrafted pickles made with traditional recipes and premium ingredients. Our mission is to provide a delightful culinary experience while ensuring transparency, security, and customer satisfaction. These Terms apply to all users, including visitors, registered customers, and account holders. We encourage you to read this document thoroughly and contact us with any questions before proceeding with your purchase or use of our services.
                            </p>
                            <p className="text-gray-700 mb-6">
                                By using our website, you represent that you are at least 18 years old or have the consent of a parent or guardian to engage with our services. These Terms form a legally binding agreement between you and The House of Pickles, and your continued use of our website or services constitutes your acceptance of these Terms, including any updates posted on our website.
                            </p>
                        </div>

                        {/* Ordering & Payment */}
                        <div className="mb-12">
                            <h2 className="text-2xl font-bold font-playfair text-primary mb-4">
                                Ordering & Payment
                            </h2>
                            <div className="flex items-center mb-4">
                                <MdShoppingCart className="w-8 h-8 text-primary mr-4" />
                                <h3 className="text-lg font-semibold">How to Place an Order</h3>
                            </div>
                            <p className="text-gray-700 mb-6">
                                Ordering from The House of Pickles is designed to be intuitive and secure. To place an order, browse our extensive range of artisanal pickles, select your desired products, and add them to your cart. At checkout, you will be prompted to provide essential information, such as your shipping address, billing details, and preferred payment method. All orders are subject to product availability, and we reserve the right to limit quantities to ensure fair access for all customers, particularly during high-demand periods or for limited-edition products.
                            </p>
                            <p className="text-gray-700 mb-6">
                                Prices for our products are displayed in Indian Rupees (INR) and include applicable taxes unless otherwise specified. We strive to maintain transparent pricing, but prices may change without prior notice due to factors such as ingredient cost fluctuations, production expenses, or market conditions. The final cost, including shipping and any applicable fees, will be clearly displayed at checkout before you confirm your order. We do not charge hidden fees, and any promotional discounts or codes will be applied at this stage.
                            </p>
                            <ul className="space-y-4 text-gray-700">
                                <li className="flex items-start">
                                    <MdCheckCircle className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                                    <span>All orders are subject to product availability. We may limit quantities during high-demand periods to ensure equitable distribution.</span>
                                </li>
                                <li className="flex items-start">
                                    <MdCheckCircle className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                                    <span>Prices are listed in INR and may change without prior notice due to market conditions or production costs.</span>
                                </li>
                                <li className="flex items-start">
                                    <MdCheckCircle className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                                    <span>We accept major credit cards, debit cards, UPI, net banking, and other payment methods as displayed at checkout.</span>
                                </li>
                                <li className="flex items-start">
                                    <MdCheckCircle className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                                    <span>Payment must be completed in full before an order is processed. We use secure payment gateways to protect your financial information.</span>
                                </li>
                            </ul>
                            <p className="text-gray-700 mt-6">
                                We partner with trusted third-party payment processors to ensure secure transactions. All payments must be completed in full before we process your order. If a payment fails or is declined, we will notify you via email, providing an opportunity to provide an alternative payment method. The House of Pickles does not store your payment information directly; instead, it is handled by our secure payment gateways, which comply with Payment Card Industry Data Security Standards (PCI-DSS) to protect your financial data.
                            </p>
                            <p className="text-gray-700 mb-6">
                                In the event of an order cancellation before processing, we will issue a full refund to the original payment method within 5-7 business days, depending on your bank or payment provider’s policies. If an order is canceled after processing but before shipment, we will issue a refund minus any applicable processing fees. Please note that orders cannot be modified once they have been confirmed, but you may place a new order if you wish to make changes.
                            </p>
                        </div>

                        {/* Shipping & Delivery */}
                        <div className="mb-12">
                            <h2 className="text-2xl font-bold font-playfair text-primary mb-4">
                                Shipping & Delivery
                            </h2>
                            <div className="bg-secondary/20 rounded-xl p-6 border border-border mb-6">
                                <div className="flex items-center mb-4">
                                    <MdLocalShipping className="w-8 h-8 text-primary mr-4" />
                                    <h3 className="text-lg font-semibold">Delivery Information</h3>
                                </div>
                                <p className="text-gray-700 mb-6">
                                    The House of Pickles is committed to delivering your orders promptly and safely. We ship throughout India, partnering with reputable logistics providers to ensure your pickles arrive in perfect condition. Delivery times vary depending on your location, with metropolitan areas typically receiving orders within 3-5 business days and remote areas within 7-10 business days. Please note that delivery timelines are estimates and may be affected by factors such as weather, holidays, or unforeseen logistical challenges.
                                </p>
                                <ul className="space-y-3 text-gray-700">
                                    <li className="flex items-start">
                                        <MdCheckCircle className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                                        <span>We ship throughout India, with delivery times varying by location and logistics provider.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <MdCheckCircle className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                                        <span>Shipping costs are calculated at checkout based on the weight of your order and delivery destination.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <MdCheckCircle className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                                        <span>Risk of loss or damage passes to you upon delivery to the carrier. We recommend inspecting your package upon receipt.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <MdCheckCircle className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                                        <span>Tracking information will be provided via email once your order has shipped.</span>
                                    </li>
                                </ul>
                            </div>
                            <p className="text-gray-700 mb-6">
                                Shipping costs are calculated at checkout based on the weight of your order and the delivery destination. We offer flat-rate and express shipping options, which you can select during the checkout process. Once your order is shipped, you will receive a confirmation email with tracking information, allowing you to monitor your package’s progress. If you do not receive your order within the estimated delivery window, please contact us at info@thehouseofpickles.com, and we will work with our logistics partners to resolve the issue promptly.
                            </p>
                            <p className="text-gray-700 mb-6">
                                To ensure the quality of our perishable products, we package our pickles with care, using insulated materials when necessary to maintain freshness during transit. However, once the package is handed over to the carrier, the risk of loss or damage passes to you. We strongly recommend inspecting your package upon receipt and reporting any issues within 48 hours to qualify for our refund or replacement policy (see Returns & Refunds section below).
                            </p>
                        </div>

                        {/* Returns & Refunds */}
                        <div className="mb-12">
                            <h2 className="text-2xl font-bold font-playfair text-primary mb-4">
                                Returns & Refunds
                            </h2>
                            <div className="flex items-center mb-4">
                                <MdWarning className="w-8 h-8 text-primary mr-4" />
                                <h3 className="text-lg font-semibold">Our Return Policy</h3>
                            </div>
                            <p className="text-gray-700 mb-6">
                                Due to the perishable nature of our artisanal pickles, The House of Pickles generally does not accept returns unless the product arrives damaged, spoiled, or incorrect. If you receive a defective or unsatisfactory product, please contact us within 48 hours of delivery at info@thehouseofpickles.com, providing your order number, a description of the issue, and clear photos of the product and packaging. We will review your request and, if approved, offer a full refund or replacement at no additional cost.
                            </p>
                            <p className="text-gray-700 mb-6">
                                To initiate a return or refund request, follow these steps:
                                <ul className="list-disc pl-5 space-y-2 mt-2">
                                    <li>Contact our customer support team within 48 hours of receiving your order.</li>
                                    <li>Provide detailed information about the issue, including photos of the product and packaging.</li>
                                    <li>Wait for our team to review your request and provide instructions for next steps.</li>
                                </ul>
                            </p>
                            <p className="text-gray-700 mb-6">
                                Refunds, if approved, will be processed to the original payment method within 5-7 business days, depending on your bank or payment provider’s policies. Replacements will be shipped at no additional cost, subject to product availability. Please note that we cannot accept returns for products that have been opened or partially consumed unless they are defective. If you have concerns about the quality or safety of our products, we encourage you to reach out promptly so we can address your needs.
                            </p>
                        </div>

                        {/* Product Information */}
                        <div className="mb-12">
                            <h2 className="text-2xl font-bold font-playfair text-primary mb-4">
                                Product Information
                            </h2>
                            <div className="flex items-center mb-4">
                                <MdInfo className="w-8 h-8 text-primary mr-4" />
                                <h3 className="text-lg font-semibold">About Our Products</h3>
                            </div>
                            <p className="text-gray-700 mb-6">
                                At The House of Pickles, we take pride in crafting artisanal pickles using time-honored recipes and high-quality ingredients. We make every effort to display our products accurately on our website, including detailed descriptions, ingredient lists, and images. However, please note that product colors, textures, and packaging may vary slightly due to natural variations in ingredients, production processes, or display settings on your device.
                            </p>
                            <p className="text-gray-700 mb-6">
                                Product weights listed on our website are approximate and may vary slightly due to the handmade nature of our pickles. For customers with food allergies or dietary restrictions, we provide allergen information on each product page. Please review this information carefully before placing an order, as some of our products may contain common allergens such as mustard, nuts, or spices processed in facilities that handle other allergens. If you have specific concerns about allergens or ingredients, contact us at info@thehouseofpickles.com before ordering.
                            </p>
                            <p className="text-gray-700 mb-6">
                                Our pickles are crafted to deliver exceptional flavor and quality, but they are perishable and have a limited shelf life. We include storage instructions and expiration dates on all product packaging to help you enjoy our pickles at their best. Improper storage, such as exposure to heat or direct sunlight, may affect product quality, and we are not responsible for spoilage due to improper handling after delivery.
                            </p>
                        </div>

                        {/* Intellectual Property */}
                        <div className="mb-12">
                            <h2 className="text-2xl font-bold font-playfair text-primary mb-4">
                                Intellectual Property
                            </h2>
                            <div className="flex items-center mb-4">
                                <MdLock className="w-8 h-8 text-primary mr-4" />
                                <h3 className="text-lg font-semibold">Protecting Our Content</h3>
                            </div>
                            <p className="text-gray-700 mb-6">
                                All content on The House of Pickles website, including but not limited to text, graphics, logos, images, product descriptions, and recipes, is the property of The House of Pickles or our licensors and is protected by Indian and international copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, modify, or create derivative works from any content on our website without our prior written consent.
                            </p>
                            <p className="text-gray-700 mb-6">
                                The House of Pickles name, logo, and product branding are registered trademarks owned by our company. Unauthorized use of our trademarks or content may result in legal action. If you wish to use our content for non-commercial purposes, such as sharing a recipe or product image on social media, please contact us for permission. We encourage our customers to engage with our brand responsibly and respect our intellectual property rights.
                            </p>
                        </div>

                        {/* Limitation of Liability */}
                        <div className="mb-12">
                            <h2 className="text-2xl font-bold font-playfair text-primary mb-4">
                                Limitation of Liability
                            </h2>
                            <p className="text-gray-700 mb-6">
                                To the fullest extent permitted by applicable law, The House of Pickles shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our website, products, or services. This includes, but is not limited to, damages for loss of profits, data, or other intangible losses, even if we have been advised of the possibility of such damages.
                            </p>
                            <p className="text-gray-700 mb-6">
                                Our liability is limited to the amount paid for the products or services in question. For example, if you purchase a jar of pickles and experience an issue covered by these Terms, our liability will not exceed the purchase price of that jar. We are not responsible for damages caused by improper use, storage, or handling of our products after delivery, nor for issues arising from third-party services, such as delivery delays caused by logistics providers.
                            </p>
                        </div>

                        {/* Governing Law */}
                        <div className="mb-12">
                            <h2 className="text-2xl font-bold font-playfair text-primary mb-4">
                                Governing Law
                            </h2>
                            <div className="flex items-center mb-4">
                                <MdGavel className="w-8 h-8 text-primary mr-4" />
                                <h3 className="text-lg font-semibold">Jurisdiction</h3>
                            </div>
                            <p className="text-gray-700 mb-6">
                                These Terms and Conditions shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions. Any disputes arising under or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts located in Hyderabad, Telangana, India.
                            </p>
                            <p className="text-gray-700 mb-6">
                                If any provision of these Terms is found to be invalid or unenforceable by a court of competent jurisdiction, such provision shall be severed, and the remaining provisions shall remain in full force and effect. We encourage customers to resolve disputes amicably by contacting our customer support team before pursuing legal action.
                            </p>
                        </div>

                        {/* Changes to Terms */}
                        <div className="mb-12">
                            <h2 className="text-2xl font-bold font-playfair text-primary mb-4">
                                Changes to Terms
                            </h2>
                            <p className="text-gray-700 mb-6">
                                The House of Pickles reserves the right to modify these Terms at any time to reflect changes in our business practices, legal requirements, or industry standards. Any updates will be posted on this page with the effective date clearly indicated. We encourage you to review this page periodically to stay informed of any changes.
                            </p>
                            <p className="text-gray-700 mb-6">
                                Your continued use of our website or services after the posting of updated Terms constitutes your acceptance of the revised Terms. If you do not agree with the updated Terms, you must discontinue using our website and services. We may, at our discretion, notify registered users of significant changes via email or a prominent notice on our website.
                            </p>
                        </div>

                        {/* Account Management */}
                        <div className="mb-12">
                            <h2 className="text-2xl font-bold font-playfair text-primary mb-4">
                                Account Management
                            </h2>
                            <p className="text-gray-700 mb-6">
                                Creating an account with The House of Pickles allows you to save your shipping and payment information, track orders, and access exclusive promotions. When you create an account, you agree to provide accurate and complete information and to keep your account credentials secure. You are responsible for all activities that occur under your account, including any unauthorized use.
                            </p>
                            <p className="text-gray-700 mb-6">
                                If you suspect unauthorized access to your account, please contact us immediately at info@thehouseofpickles.com. We reserve the right to suspend or terminate accounts that violate these Terms, engage in fraudulent activity, or misuse our services. You may delete your account at any time by contacting our customer support team.
                            </p>
                        </div>

                        {/* Customer Conduct */}
                        <div className="mb-12">
                            <h2 className="text-2xl font-bold font-playfair text-primary mb-4">
                                Customer Conduct
                            </h2>
                            <p className="text-gray-700 mb-6">
                                We expect all users of The House of Pickles website to engage with our platform respectfully and lawfully. You agree not to use our website for any unlawful purpose, including but not limited to attempting to hack our systems, distributing malware, or engaging in fraudulent transactions. Any attempt to misuse our website may result in account termination and legal action.
                            </p>
                            <p className="text-gray-700 mb-6">
                                When leaving reviews or feedback on our website, please provide honest and constructive comments. We reserve the right to remove reviews that are offensive, misleading, or violate our policies. By submitting content to our website, such as reviews or comments, you grant The House of Pickles a non-exclusive, royalty-free license to use, display, and distribute that content for promotional or operational purposes.
                            </p>
                        </div>

                        {/* Contact */}
                        <div className="bg-primary/5 rounded-xl p-6 border border-primary/20">
                            <div className="flex items-center">
                                <MdVerified className="w-8 h-8 text-primary mr-4" />
                                <h3 className="text-lg font-semibold text-primary">
                                    Contact Information
                                </h3>
                            </div>
                            <p className="text-gray-700 mt-2">
                                If you have any questions about these Terms and Conditions or need assistance with your order, please contact us at{" "}
                                <a
                                    href="mailto:info@thehouseofpickles.com"
                                    className="text-primary hover:underline"
                                >
                                    info@thehouseofpickles.com
                                </a>
                                . Our customer support team is available to assist you Monday through Friday, 9 AM to 5 PM IST.
                            </p>
                        </div>
                    </div>
                </div>
            </motion.section>
        </div>
    );
}