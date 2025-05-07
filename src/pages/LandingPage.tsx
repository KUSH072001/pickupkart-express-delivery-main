
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import React from "react";
import { Package, Truck, Users } from "lucide-react";

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header/Nav */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Package className="h-6 w-6 text-accent" />
            <span className="font-bold text-xl">PickupKart</span>
          </div>
          <div className="hidden md:flex space-x-6">
            <a href="#features" className="text-muted-foreground hover:text-accent transition">Features</a>
            <a href="#how-it-works" className="text-muted-foreground hover:text-accent transition">How it Works</a>
            <a href="#pricing" className="text-muted-foreground hover:text-accent transition">Pricing</a>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <Button variant="ghost">Log In</Button>
            </Link>
            <Link to="/register">
              <Button>Register</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-background to-muted py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Fast & Reliable <span className="text-accent">Courier Service</span> at Your Fingertips
              </h1>
              <p className="text-lg text-muted-foreground md:pr-10">
                PickupKart connects you with verified delivery partners to ensure your packages reach their destination safely and on time.
              </p>
              <div className="flex space-x-4 pt-4">
                <Link to="/register">
                  <Button size="lg">Get Started</Button>
                </Link>
                <a href="#how-it-works">
                  <Button variant="outline" size="lg">Learn More</Button>
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="relative z-10 bg-white p-6 rounded-lg shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1616580168340-9435150a0230?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                  alt="Courier delivery" 
                  className="w-full h-auto rounded-md object-cover"
                />
                <div className="absolute -bottom-6 -left-6 bg-accent text-white p-4 rounded-lg shadow-lg">
                  <p className="font-bold text-2xl">₹300</p>
                  <p className="text-sm">Starting price</p>
                </div>
              </div>
              <div className="absolute top-10 -right-10 bg-primary/10 w-64 h-64 rounded-full -z-10"></div>
              <div className="absolute -bottom-10 -left-10 bg-accent/10 w-40 h-40 rounded-full -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">PickupKart offers a complete end-to-end solution for all your courier needs with features designed for customers and delivery partners.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-border hover:shadow-md transition">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Package className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Easy Booking</h3>
              <p className="text-muted-foreground">Book a courier in minutes with our simple and intuitive interface. Choose from various service options.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-border hover:shadow-md transition">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-6">
                <Truck className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Real-time Tracking</h3>
              <p className="text-muted-foreground">Track your package in real-time as it moves from pickup to delivery. Get updates at every stage of the journey.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-border hover:shadow-md transition">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Trusted Partners</h3>
              <p className="text-muted-foreground">Our delivery partners are verified and trained to ensure your packages are in safe hands from pickup to delivery.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-20 bg-muted">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Our simple 3-step process makes courier booking and delivery seamless</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center bg-white p-8 rounded-lg shadow-sm relative">
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">1</div>
              <h3 className="text-xl font-semibold mt-4 mb-3">Book a Courier</h3>
              <p className="text-muted-foreground">Sign up, enter package details, and choose the service type that best fits your needs.</p>
            </div>
            <div className="text-center bg-white p-8 rounded-lg shadow-sm relative">
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">2</div>
              <h3 className="text-xl font-semibold mt-4 mb-3">We Assign a Partner</h3>
              <p className="text-muted-foreground">Our system assigns the most suitable delivery partner based on location and package type.</p>
            </div>
            <div className="text-center bg-white p-8 rounded-lg shadow-sm relative">
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">3</div>
              <h3 className="text-xl font-semibold mt-4 mb-3">Track & Receive</h3>
              <p className="text-muted-foreground">Track your package in real-time and receive it at the destination with secure delivery confirmation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Choose the service that best matches your courier needs</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-border hover:border-accent transition">
              <h3 className="text-xl font-bold mb-4">Documents Express</h3>
              <p className="text-muted-foreground mb-6">Perfect for sending important documents and small items</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">₹300</span>
                <span className="text-muted-foreground">/package</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Up to 500g weight
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Next-day delivery
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Real-time tracking
                </li>
              </ul>
              <Link to="/register">
                <Button variant="outline" className="w-full">Get Started</Button>
              </Link>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg border-2 border-accent transform scale-105">
              <div className="bg-accent text-white text-xs font-bold px-3 py-1 rounded-full absolute -top-3 left-1/2 transform -translate-x-1/2">POPULAR</div>
              <h3 className="text-xl font-bold mb-4 mt-2">Fragile Glassware</h3>
              <p className="text-muted-foreground mb-6">Secure transportation for fragile and valuable items</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">₹600</span>
                <span className="text-muted-foreground">/package</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Up to 2kg weight
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Special handling
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Insurance included
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Priority delivery
                </li>
              </ul>
              <Link to="/register">
                <Button className="w-full">Get Started</Button>
              </Link>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm border border-border hover:border-accent transition">
              <h3 className="text-xl font-bold mb-4">Laptop Courier</h3>
              <p className="text-muted-foreground mb-6">Specialized service for electronic devices and equipment</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">₹1200</span>
                <span className="text-muted-foreground">/package</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Up to 5kg weight
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Premium packaging
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  High-value insurance
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Signature on delivery
                </li>
              </ul>
              <Link to="/register">
                <Button variant="outline" className="w-full">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-sidebar text-sidebar-foreground pt-16 pb-8">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <Package className="h-6 w-6 text-accent" />
                <span className="font-bold text-xl">PickupKart</span>
              </div>
              <p className="text-sidebar-foreground/70 mb-6">
                Reliable courier service connecting customers with verified delivery partners for safe and timely deliveries.
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-4 text-lg">Quick Links</h5>
              <ul className="space-y-3">
                <li><a href="#features" className="text-sidebar-foreground/70 hover:text-accent transition">Features</a></li>
                <li><a href="#how-it-works" className="text-sidebar-foreground/70 hover:text-accent transition">How it Works</a></li>
                <li><a href="#pricing" className="text-sidebar-foreground/70 hover:text-accent transition">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4 text-lg">Legal</h5>
              <ul className="space-y-3">
                <li><a href="#" className="text-sidebar-foreground/70 hover:text-accent transition">Privacy Policy</a></li>
                <li><a href="#" className="text-sidebar-foreground/70 hover:text-accent transition">Terms of Service</a></li>
                <li><a href="#" className="text-sidebar-foreground/70 hover:text-accent transition">Refund Policy</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4 text-lg">Contact Us</h5>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-accent mr-2 mt-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-sidebar-foreground/70">+91 98765 43210</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-accent mr-2 mt-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sidebar-foreground/70">info@pickupkart.in</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-accent mr-2 mt-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-sidebar-foreground/70">123 Courier Street, Delhi, India</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-sidebar-border mt-12 pt-6 text-center text-sidebar-foreground/60">
            <p>&copy; {new Date().getFullYear()} PickupKart. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
