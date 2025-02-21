"use client";

import { useState } from "react";
import { Phone, Mail, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function ContactPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12 ">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
            <div className="bg-[#33A0FF] text-white p-6 sm:p-8 rounded-lg flex items-center">
              <div className="flex flex-col sm:flex-row lg:flex-row xl:flex-row items-center gap-6 sm:gap-8">
                <div className="w-full sm:w-1/2 lg:w-1/2 xl:w-1/2">
                  <img
                    src="/azizbek.svg"
                    alt="Contact Support"
                    className="object-contain w-full h-auto max-h-[300px] sm:max-h-none"
                  />
                </div>

                <div className="space-y-6 w-full sm:w-1/2 lg:w-1/2 xl:w-1/2">
                  <h1 className="text-3xl sm:text-4xl font-bold">
                    Get in touch
                  </h1>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 flex-shrink-0" />
                      <span className="text-sm sm:text-base">
                        contact@e-comm.ng
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 flex-shrink-0" />
                      <span className="text-sm sm:text-base">
                        +234 4556 6665 34
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-5 w-5 flex-shrink-0" />
                      <span className="text-sm sm:text-base">
                        20 Prince Hakerem Lekki
                        <br />
                        Phase 1, Lagos
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-sm">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="fullname" className="text-sm sm:text-base">
                    Fullname
                  </Label>
                  <Input
                    id="fullname"
                    placeholder="James Doe"
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-sm sm:text-base">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="jamesdoe@gmail.com"
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="message" className="text-sm sm:text-base">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Type your message"
                    className="mt-1.5 h-32 sm:h-40"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-[#33A0FF] hover:bg-blue-600 text-sm sm:text-base py-5"
                >
                  Send Message
                </Button>
              </form>
            </div>
          </div>

          <div className="mt-8 sm:mt-12 max-w-2xl mx-auto px-4 sm:px-0">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Input
                type="text"
                placeholder="Search query..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-grow text-sm sm:text-base"
              />
              <Button className="bg-[#33A0FF] hover:bg-blue-600 w-full sm:w-24 text-sm sm:text-base py-5 sm:py-2">
                Search
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
