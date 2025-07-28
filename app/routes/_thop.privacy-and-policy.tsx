import { motion } from "framer-motion";
import BackgroundImage from "../assets/background-1.png";
import { MdVerified, MdSecurity, MdCheckCircle, MdInfo, MdLock, MdPeople, MdAnalytics } from "react-icons/md";

export default function PrivacyPolicy() {
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
                            Privacy Policy
                        </h1>
                        <p className="text-xl max-w-3xl mx-auto opacity-90">
                            At The House of Pickles, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, store, and safeguard your personal information when you interact with our website at www.thehouseofpickles.com or purchase our artisanal pickle products. Your trust is our priority, and we strive to ensure transparency and security in all our data practices.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Policy Content */}
            <section className="relative py-20 px-4 sm:px-8 lg:px-24">
                {/* Background image */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={BackgroundImage}
                        alt="Background"
                        className="w-full h-full object-cover opacity-10 pointer-events-none select-none"
                    />
                </div>

                {/* Content wrapper */}
                <div className="relative z-10 max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 md:p-12">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-gray-800"
                    >
                        {/* Introduction */}
                        <div className="mb-12">
                            <h2 className="text-2xl font-bold font-playfair text-primary mb-4">
                                Introduction
                            </h2>
                            <p className="text-gray-700 mb-6 italic">
                                Last updated: {new Date().toLocaleDateString()}
                            </p>
                            <p className="text-gray-700 mb-6">
                                This Privacy Policy governs how The House of Pickles, accessible at www.thehouseofpickles.com, collects, uses, discloses, and protects your personal information. By using our website, creating an account, placing an order, or engaging with our services, you consent to the practices described in this policy. If you do not agree with any part of this policy, please refrain from using our website or services.
                            </p>
                            <p className="text-gray-700 mb-6">
                                The House of Pickles is an e-commerce platform dedicated to delivering artisanal pickles crafted with traditional recipes and premium ingredients. We value your privacy and are committed to complying with applicable data protection laws, including the Information Technology Act, 2000, and other relevant regulations in India. This policy outlines the types of information we collect, how we use it, who we share it with, and the measures we take to protect it. We also explain your rights regarding your personal data and how you can contact us with questions or concerns.
                            </p>
                            <p className="text-gray-700 mb-6">
                                We may update this Privacy Policy periodically to reflect changes in our practices, legal requirements, or industry standards. Updates will be posted on this page with the effective date clearly indicated. Your continued use of our website or services after such updates constitutes your acceptance of the revised policy. We encourage you to review this policy regularly to stay informed about how we handle your information.
                            </p>
                        </div>

                        {/* What Information We Collect */}
                        <div className="mb-12">
                            <h2 className="text-2xl font-bold font-playfair text-primary mb-4">
                                What Information We Collect
                            </h2>
                            <div className="flex items-center mb-4">
                                <MdInfo className="w-8 h-8 text-primary mr-4" />
                                <h3 className="text-lg font-semibold">Types of Data Collected</h3>
                            </div>
                            <p className="text-gray-700 mb-6">
                                When you interact with The House of Pickles, we collect various types of information to provide our services, enhance your experience, and ensure the smooth operation of our e-commerce platform. The information we collect falls into two main categories: personal information and non-personal information.
                            </p>
                            <p className="text-gray-700 mb-6">
                                <strong>Personal Information:</strong> This is information that can be used to identify you as an individual. We collect personal information when you voluntarily provide it, such as when you place an order, create an account, or contact our customer support team. Examples include:
                                <ul className="list-disc pl-5 space-y-2 mt-2">
                                    <li>Your full name, email address, phone number, and shipping address, which are required to process and deliver your orders.</li>
                                    <li>Billing information, such as credit card or payment details, collected through our secure payment gateways during checkout.</li>
                                    <li>Account credentials, such as your username and password, if you create an account on our website.</li>
                                    <li>Correspondence, such as emails or messages, when you contact us with questions, feedback, or support requests.</li>
                                </ul>
                            </p>
                            <p className="text-gray-700 mb-6">
                                <strong>Non-Personal Information:</strong> This is information that does not directly identify you but helps us improve our website and services. We collect non-personal information automatically as you interact with our website. Examples include:
                                <ul className="list-disc pl-5 space-y-2 mt-2">
                                    <li>Browser type, operating system, and device information (e.g., whether you’re using a desktop, tablet, or mobile device).</li>
                                    <li>IP address, which helps us understand your geographic location and prevent fraudulent activity.</li>
                                    <li>Website usage data, such as pages visited, time spent on the site, and products viewed, collected through cookies and analytics tools.</li>
                                    <li>Referral sources, such as the website or advertisement that led you to our platform.</li>
                                </ul>
                            </p>
                            <p className="text-gray-700 mb-6">
                                We collect only the information necessary to provide our services and enhance your experience. You have the option to limit the information you provide, but please note that certain details, such as your shipping address and payment information, are required to complete an order. If you choose not to provide this information, you may not be able to use certain features of our website, such as purchasing products.
                            </p>
                        </div>

                        {/* How We Use Your Data */}
                        <div className="mb-12">
                            <h2 className="text-2xl font-bold font-playfair text-primary mb-4">
                                How We Use Your Data
                            </h2>
                            <div className="flex items-center mb-4">
                                <MdAnalytics className="w-8 h-8 text-primary mr-4" />
                                <h3 className="text-lg font-semibold">Purpose of Data Use</h3>
                            </div>
                            <p className="text-gray-700 mb-6">
                                The House of Pickles uses your information to deliver a seamless shopping experience, improve our services, and maintain a secure environment. Below are the primary ways we use your data:
                            </p>
                            <ul className="space-y-4 text-gray-800">
                                <li className="flex items-start">
                                    <MdCheckCircle className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                                    <span><strong>Order Processing and Delivery:</strong> We use your personal information, such as your name, shipping address, and payment details, to process and fulfill your orders. This includes generating order confirmations, coordinating with shipping providers, and sending you updates about your order status, such as shipping notifications and tracking information.</span>
                                </li>
                                <li className="flex items-start">
                                    <MdCheckCircle className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                                    <span><strong>Improving Our Services:</strong> We analyze non-personal information, such as website usage data and customer feedback, to enhance our website, products, and customer service. For example, we may use analytics to identify popular products, optimize our website’s navigation, or tailor our offerings to better meet your preferences.</span>
                                </li>
                                <li className="flex items-start">
                                    <MdCheckCircle className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                                    <span><strong>Marketing and Promotions:</strong> If you explicitly opt in to receive promotional communications, we may use your email address or phone number to send you newsletters, special offers, or updates about new products. You can unsubscribe from these communications at any time by clicking the “unsubscribe” link in our emails or contacting us directly.</span>
                                </li>
                                <li className="flex items-start">
                                    <MdCheckCircle className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                                    <span><strong>Fraud Prevention and Security:</strong> We use your IP address, device information, and transaction details to detect and prevent fraudulent activity, such as unauthorized access to your account or suspicious payment attempts. This helps us maintain a secure shopping environment for all users.</span>
                                </li>
                                <li className="flex items-start">
                                    <MdCheckCircle className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                                    <span><strong>Customer Support:</strong> When you contact us with questions or concerns, we use your personal information to respond effectively. For example, we may reference your order history to assist with a refund request or provide personalized recommendations based on your previous purchases.</span>
                                </li>
                            </ul>
                            <p className="text-gray-700 mt-6">
                                We do not use your information for purposes unrelated to the operation of our e-commerce platform or the improvement of your experience. For example, we do not sell your personal information to third parties or use it for unrelated commercial purposes. Our use of your data is guided by the principles of necessity, transparency, and compliance with applicable laws.
                            </p>
                        </div>

                        {/* Protecting Your Data */}
                        <div className="mb-12">
                            <h2 className="text-2xl font-bold font-playfair text-primary mb-4">
                                Protecting Your Data
                            </h2>
                            <div className="bg-secondary/20 rounded-xl p-6 border border-border">
                                <div className="flex items-center mb-4">
                                    <MdSecurity className="w-8 h-8 text-primary mr-4" />
                                    <h3 className="text-lg font-semibold">
                                        Industry-Leading Security Measures
                                    </h3>
                                </div>
                                <p className="text-gray-700 mb-6">
                                    At The House of Pickles, we prioritize the security of your personal information. We implement a range of industry-standard security measures to protect your data from unauthorized access, disclosure, alteration, or destruction. These measures include:
                                </p>
                                <ul className="list-disc pl-5 space-y-2 mt-2">
                                    <li><strong>SSL Encryption:</strong> All data transmitted between your browser and our website is protected using Secure Sockets Layer (SSL) encryption, ensuring that sensitive information, such as payment details, is securely transmitted.</li>
                                    <li><strong>Secure Storage:</strong> We store sensitive information, such as account credentials, in encrypted databases accessible only to authorized personnel with strict access controls.</li>
                                    <li><strong>Regular Security Audits:</strong> We conduct periodic security assessments to identify and address potential vulnerabilities in our systems.</li>
                                    <li><strong>Employee Training:</strong> Our staff is trained in data protection best practices to ensure your information is handled responsibly.</li>
                                </ul>
                                <p className="text-gray-700 mt-6">
                                    While we take every precaution to safeguard your data, please note that no method of transmission over the internet or electronic storage is 100% secure. In the unlikely event of a data breach, we will notify affected users promptly in accordance with applicable laws and take immediate steps to mitigate any harm. We encourage you to use strong passwords, avoid sharing your account credentials, and keep your devices secure to further protect your information.
                                </p>
                            </div>
                        </div>

                        {/* Third-Party Partnerships */}
                        <div className="mb-12">
                            <h2 className="text-2xl font-bold font-playfair text-primary mb-4">
                                Third-Party Partnerships
                            </h2>
                            <div className="flex items-center mb-4">
                                <MdPeople className="w-8 h-8 text-primary mr-4" />
                                <h3 className="text-lg font-semibold">Working with Trusted Partners</h3>
                            </div>
                            <p className="text-gray-700 mb-6">
                                To deliver our services, The House of Pickles collaborates with trusted third-party partners, such as payment processors, shipping providers, and analytics services. These partners may have access to certain personal information to perform their functions, but they are contractually obligated to protect your data and use it only for the purposes we specify.
                            </p>
                            <p className="text-gray-700 mb-6">
                                Examples of third-party partners include:
                                <ul className="list-disc pl-5 space-y-2 mt-2">
                                    <li><strong>Payment Processors:</strong> Companies like Razorpay or Paytm process your credit card or UPI payments securely and comply with PCI-DSS standards.</li>
                                    <li><strong>Shipping Providers:</strong> Logistics companies, such as Delhivery or India Post, receive your shipping address to deliver your orders.</li>
                                    <li><strong>Analytics Providers:</strong> Tools like Google Analytics help us understand website usage patterns without identifying individual users.</li>
                                </ul>
                            </p>
                            <p className="text-gray-700 mb-6">
                                These third parties have their own privacy policies, which we encourage you to review, as their practices are beyond our control. The House of Pickles is not responsible for the data practices of these third parties, but we carefully select partners who demonstrate a commitment to data security and privacy. If you have concerns about how a third party handles your information, please contact us, and we will assist you to the best of our ability.
                            </p>
                        </div>

                        {/* Cookies and Tracking */}
                        <div className="mb-12">
                            <h2 className="text-2xl font-bold font-playfair text-primary mb-4">
                                Cookies and Tracking Technologies
                            </h2>
                            <div className="flex items-center mb-4">
                                <MdLock className="w-8 h-8 text-primary mr-4" />
                                <h3 className="text-lg font-semibold">Enhancing Your Experience</h3>
                            </div>
                            <p className="text-gray-700 mb-6">
                                The House of Pickles uses cookies and similar tracking technologies to enhance your browsing experience, personalize content, and analyze website performance. Cookies are small text files stored on your device that allow us to remember your preferences, track your interactions, and improve our services.
                            </p>
                            <p className="text-gray-700 mb-6">
                                We use the following types of cookies:
                                <ul className="list-disc pl-5 space-y-2 mt-2">
                                    <li><strong>Essential Cookies:</strong> These are necessary for the website to function properly, such as maintaining your shopping cart or remembering your login status.</li>
                                    <li><strong>Performance Cookies:</strong> These collect anonymous data about how you use our website, such as which pages you visit most often, to help us optimize our platform.</li>
                                    <li><strong>Marketing Cookies:</strong> If you opt in, these cookies track your browsing habits to deliver personalized advertisements or promotional offers.</li>
                                    <li><strong>Functional Cookies:</strong> These enable enhanced features, such as remembering your preferred language or currency settings.</li>
                                </ul>
                            </p>
                            <p className="text-gray-700 mb-6">
                                You can manage or disable cookies through your browser settings. Most browsers allow you to block cookies or delete existing ones, but this may impact certain website features, such as the ability to stay logged in or save items in your cart. We also use a cookie consent banner to inform you about our use of cookies and obtain your consent for non-essential cookies, in compliance with applicable regulations.
                            </p>
                            <p className="text-gray-700 mb-6">
                                In addition to cookies, we may use other tracking technologies, such as web beacons or pixel tags, to collect information about email open rates or advertisement performance. These technologies help us understand how you engage with our communications and improve our marketing efforts. If you wish to opt out of tracking, you can adjust your browser settings or contact us for assistance.
                            </p>
                        </div>

                        {/* Your Data Rights */}
                        <div className="mb-12">
                            <h2 className="text-2xl font-bold font-playfair text-primary mb-4">
                                Your Data Rights
                            </h2>
                            <p className="text-gray-700 mb-6">
                                As a user of The House of Pickles, you have certain rights regarding your personal information, subject to applicable laws. These rights include:
                                <ul className="list-disc pl-5 space-y-2 mt-2">
                                    <li><strong>Access:</strong> You can request a copy of the personal information we hold about you.</li>
                                    <li><strong>Correction:</strong> You can ask us to correct inaccurate or incomplete information in your account or order details.</li>
                                    <li><strong>Deletion:</strong> You can request the deletion of your personal information, subject to legal or contractual obligations (e.g., retaining order records for tax purposes).</li>
                                    <li><strong>Objection:</strong> You can object to certain uses of your data, such as marketing communications, by opting out or contacting us.</li>
                                    <li><strong>Portability:</strong> You can request a copy of your data in a structured, machine-readable format for transfer to another service.</li>
                                </ul>
                            </p>
                            <p className="text-gray-700 mb-6">
                                To exercise any of these rights, please contact us at privacy@thehouseofpickles.com with your request and relevant details, such as your order number or account information. We will respond to your request within 30 days, in accordance with applicable laws. Please note that we may require verification of your identity to process certain requests, such as data deletion or access, to protect your privacy.
                            </p>
                        </div>

                        {/* Data Retention */}
                        <div className="mb-12">
                            <h2 className="text-2xl font-bold font-playfair text-primary mb-4">
                                Data Retention
                            </h2>
                            <p className="text-gray-700 mb-6">
                                We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy or to comply with legal obligations. For example:
                                <ul className="list-disc pl-5 space-y-2 mt-2">
                                    <li>Order information, such as your shipping address and payment details, is retained for seven years to comply with tax and accounting regulations.</li>
                                    <li>Account information is retained until you request deletion or your account becomes inactive for an extended period (e.g., three years).</li>
                                    <li>Non-personal data, such as analytics, may be retained indefinitely in anonymized form to improve our services.</li>
                                </ul>
                            </p>
                            <p className="text-gray-700 mb-6">
                                When your personal information is no longer needed, we securely delete or anonymize it to prevent unauthorized access. If you request deletion of your data, we will comply unless we are required to retain it for legal reasons, such as tax audits or dispute resolution.
                            </p>
                        </div>

                        {/* Policy Changes */}
                        <div className="mb-12">
                            <h2 className="text-2xl font-bold font-playfair text-primary mb-4">
                                Policy Changes
                            </h2>
                            <p className="text-gray-700 mb-6">
                                The House of Pickles may update this Privacy Policy periodically to reflect changes in our practices, legal requirements, or industry standards. Updates will be posted on this page with the effective date clearly indicated. We may also notify registered users of significant changes via email or a prominent notice on our website.
                            </p>
                            <p className="text-gray-700 mb-6">
                                Your continued use of our website or services after the posting of an updated Privacy Policy constitutes your acceptance of the revised policy. If you do not agree with the changes, you may discontinue using our services or contact us to delete your account. We encourage you to review this policy regularly to stay informed about how we protect your information.
                            </p>
                        </div>

                        {/* Contact */}
                        <div className="bg-primary/5 rounded-xl p-6 border border-primary/20">
                            <div className="flex items-center">
                                <MdVerified className="w-8 h-8 text-primary mr-4" />
                                <h3 className="text-lg font-semibold text-primary">
                                    Get in Touch
                                </h3>
                            </div>
                            <p className="text-gray-700 mt-2">
                                If you have questions about this Privacy Policy, your personal information, or our data practices, please contact us at{" "}
                                <a
                                    href="mailto:privacy@thehouseofpickles.com"
                                    className="text-primary hover:underline"
                                >
                                    privacy@thehouseofpickles.com
                                </a>
                                . Our customer support team is available Monday through Friday, 9 AM to 5 PM IST, to assist you.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}