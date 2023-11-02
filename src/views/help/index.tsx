import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

const Help = () => {
  return (
    <div className="grid grid-cols-3 gap-6 2xl:grid-cols-4">
      {Array.from({ length: 20 }, () => null).map((_, _index) => (
        <iframe
          allowFullScreen={true}
          // webkitallowfullscreen={true}
          // mozallowfullscreen={true}
          className="w-full h-full"
          src="https://www.youtube.com/embed/YWA-xbsJrVg?si=ZacnUDvwk6VpB1mT"
        ></iframe>
      ))}
    </div>
  );
};

export default Help;
