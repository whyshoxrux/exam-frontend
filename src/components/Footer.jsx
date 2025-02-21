import { Facebook, Twitter } from "lucide-react"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-[#BCDDFE] px-4 py-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-16">
          {/* Logo Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div>
                <Image src="/icon.svg" alt="E-Comm Logo" width={134} height={44} className="rounded-full" />
              </div>
            </div>
            <p className="text-sm text-gray-600">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
              industry&apos;s standard dummy text ever Since the 1500s, when an unknown printer.
            </p>
          </div>

          {/* Follow Us Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Follow Us</h3>
            <p className="text-sm text-gray-600">
              Since the 1500s, when an unknown printer took a galley of type and scrambled.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-600 hover:text-blue-500">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-500">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Contact Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>E-Comm, 4578</p>
              <p>Marmora Road,</p>
              <p>Glasgow D04 89GR</p>
            </div>
          </div>
        </div>
      </div>

      {/*Bottom footer */}
      <div className="mx-auto max-w-7xl mt-12 lg:mt-20">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Information</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>About Us</li>
              <li>Information</li>
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Service</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>About Us</li>
              <li>Information</li>
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">My Account</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>About Us</li>
              <li>Information</li>
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Our Offers</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>About Us</li>
              <li>Information</li>
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-blue-100 bg-[#BCDDFE] px-4 py-4 mt-12">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            {/* Copyright Text */}
            <p className="text-sm text-gray-500 text-center sm:text-left">© 2024 E-commerce. All rights reserved.</p>

            {/* Payment Methods */}
            <div className="flex items-center justify-center sm:justify-end">
              <Image src="/Brands.svg" alt="Payment methods" width={200} height={30} className="h-8 w-auto" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

