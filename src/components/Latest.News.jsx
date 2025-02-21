import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export function LatestNews() {
  const news = [
    {
      date: "01 Jan 2015",
      title: "Fashion Industry",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
      logo: "/nike.png",
    },
    {
      date: "01 Jan 2015",
      title: "Best Design Tools",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
      logo: "/figma.png",
    },
    {
      date: "01 Jan 2015",
      title: "HR Community",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
      logo: "/kronos.png",
    },
  ];

  return (
    <div className="container mx-auto px-4 md:px-32 py-16 text-center">
      <h2 className="text-2xl font-bold mb-8 text-center">LATEST NEWS</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {news.map((item, index) => (
          <Card key={index} className="border-none shadow-none">
            <CardContent className="p-0 flex flex-col md:flex-row items-center text-left gap-4">
              <Image 
                src={item.logo || "/kronos.png"} 
                alt={item.title} 
                width={100} 
                height={50} 
                className="shrink-0" 
              />
              <div className="text-center md:text-left">
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm mb-2">{item.date}</p>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}