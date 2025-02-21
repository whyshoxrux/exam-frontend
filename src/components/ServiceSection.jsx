import { Truck, DollarSign, Headphones } from "lucide-react"

export function ServicesSection() {
  const services = [
    {
      icon: <Truck className="w-12 h-12 text-[#FF6B6B]" />,
      title: "FREE SHIPPING",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    },
    {
      icon: <DollarSign className="w-12 h-12 text-[#FF6B6B]" />,
      title: "100% REFUND",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    },
    {
      icon: <Headphones className="w-12 h-12 text-[#FF6B6B]" />,
      title: "SUPPORT 24/7",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    },
  ]

  return (
    <div className="container mx-auto px-32 py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            {service.icon}
            <h3 className="mt-4 mb-2 font-bold">{service.title}</h3>
            <p className="text-gray-600 text-sm">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

