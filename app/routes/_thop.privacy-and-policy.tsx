import { motion } from "framer-motion";
import BackgroundImage from "../assets/background-1.png";
import { MdVerified, MdSecurity, MdCheckCircle } from "react-icons/md";

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
                            At Thop Pickles, we value your trust. This Privacy Policy outlines
                            how we collect, use, and safeguard your information to ensure
                            transparency and security.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Policy Content */}
            <section className="relative py-20 px-4 sm:px-8 lg:px-24 bg-blue-500">
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
                        viewport={{ once: true, amount: 0.8 }}
                        className="text-gray-800"
                    >
                        {/* Section 1 */}
                        <div className="mb-12">
                            <h2 className="text-2xl font-bold font-playfair text-primary mb-4">
                                What Information We Collect
                            </h2>
                            <p>
                                When you interact with Thop Pickles, we may collect:
                            </p>
                            <ul className="list-disc pl-5 space-y-2 mt-2">
                                <li>
                                    Personal details like your name, email, phone number, and
                                    shipping address when you order or create an account.
                                </li>
                                <li>
                                    Non-personal data, such as browser type, device information,
                                    and IP address, to enhance our site’s performance and
                                    analytics.
                                </li>
                            </ul>
                        </div>

                        {/* Section 2 */}
                        <div className="mb-12">
                            <h2 className="text-2xl font-bold font-playfair text-primary mb-4">
                                How We Use Your Data
                            </h2>
                            <ul className="space-y-4 text-gray-800">
                                <li className="flex items-start">
                                    <MdCheckCircle className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                                    <span>
                                        Process and deliver your orders while keeping you informed
                                        about their status.
                                    </span>
                                </li>
                                <li className="flex items-start">
                                    <MdCheckCircle className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                                    <span>
                                        Enhance our website, products, and customer service based on
                                        your feedback and usage patterns.
                                    </span>
                                </li>
                                <li className="flex items-start">
                                    <MdCheckCircle className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                                    <span>
                                        Send you promotional offers and updates, but only if you’ve
                                        explicitly opted in.
                                    </span>
                                </li>
                                <li className="flex items-start">
                                    <MdCheckCircle className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                                    <span>
                                        Protect against fraud and maintain a secure shopping
                                        environment.
                                    </span>
                                </li>
                            </ul>
                        </div>

                        {/* Section 3 */}
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
                                <p className="text-gray-700">
                                    We use SSL encryption for all data transfers and securely
                                    store sensitive information. While we take every precaution,
                                    please note that no online transmission method is completely
                                    risk-free.
                                </p>
                            </div>
                        </div>

                        {/* Section 4 */}
                        <div className="mb-12">
                            <h2 className="text-2xl font-bold font-playfair text-primary mb-4">
                                Third-Party Partnerships
                            </h2>
                            <p className="text-gray-700 mb-6">
                                We collaborate with trusted third parties, such as payment
                                processors and shipping providers, to deliver our services.
                                These partners have their own privacy policies, which we
                                encourage you to review, as their practices are beyond our
                                control.
                            </p>
                        </div>

                        {/* Section 5 */}
                        <div className="mb-12">
                            <h2 className="text-2xl font-bold font-playfair text-primary mb-4">
                                Cookies and Tracking
                            </h2>
                            <p className="text-gray-700 mb-6">
                                We use cookies to improve your browsing experience and
                                personalize content. You can manage or disable cookies through
                                your browser settings, but this may impact certain website
                                features.
                            </p>
                        </div>

                        {/* Section 6 */}
                        <div className="mb-12">
                            <h2 className="text-2xl font-bold font-playfair text-primary mb-4">
                                Policy Changes
                            </h2>
                            <p className="text-gray-700 mb-6">
                                We may periodically update this Privacy Policy to reflect
                                changes in our practices or regulations. Updates will be posted
                                on this page with the effective date. By continuing to use our
                                services, you agree to the revised policy.
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
                                Questions about your data or this policy? Reach out to us at{" "}
                                <a
                                    href="mailto:privacy@thoppickles.com"
                                    className="text-primary hover:underline"
                                >
                                    privacy@thoppickles.com
                                </a>
                                .
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
