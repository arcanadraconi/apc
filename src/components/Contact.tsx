import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="py-16 bg-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white">Contact Us</h2>
          <p className="mt-4 text-gray-400">Get in touch with our sales team</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-zinc-800 p-8 rounded-lg">
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300">Name</label>
                <input
                  type="text"
                  id="name"
                  className="mt-1 block w-full rounded-md bg-zinc-700 border-transparent focus:border-yellow-500 focus:ring-0 text-white"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 block w-full rounded-md bg-zinc-700 border-transparent focus:border-yellow-500 focus:ring-0 text-white"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300">Message</label>
                <textarea
                  id="message"
                  rows={4}
                  className="mt-1 block w-full rounded-md bg-zinc-700 border-transparent focus:border-yellow-500 focus:ring-0 text-white"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-yellow-500 text-zinc-900 py-2 px-4 rounded-md font-semibold hover:bg-yellow-400 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>

          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <Mail className="h-6 w-6 text-yellow-500 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-medium text-white">Email Us</h3>
                <p className="mt-1 text-gray-400">sales@precisionbits.com</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Phone className="h-6 w-6 text-yellow-500 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-medium text-white">Call Us</h3>
                <p className="mt-1 text-gray-400">+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <MapPin className="h-6 w-6 text-yellow-500 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-medium text-white">Visit Us</h3>
                <p className="mt-1 text-gray-400">
                  123 Precision Drive<br />
                  Manufacturing District<br />
                  Industrial City, IC 12345
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;