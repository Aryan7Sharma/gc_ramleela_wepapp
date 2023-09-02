// const images = [
//   "https://media.istockphoto.com/id/1166547765/photo/ferris-wheel.jpg?s=2048x2048&w=is&k=20&c=uGGaDn2_Ufw7BLlnP6jcIFwoNJfE83OuW-JzZII2L4Y=",
//   "https://media.istockphoto.com/id/534577083/photo/family-on-carousel-in-amusement-park.jpg?s=2048x2048&w=is&k=20&c=I_vVxF0utY2jBX7QzaLHJAQcSoGhEJ-Y1E-ZNsAewNw=",
//   "https://plus.unsplash.com/premium_photo-1664302857771-25cec5473cfa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1977&q=80",
//   // Add more image URLs
// ];

import React, { useState, useEffect } from "react";

const images = [
  "https://imgk.timesnownews.com/story/rrrrn.png?tr=w-600,h-450,fo-auto",
  "https://media.istockphoto.com/id/1166547765/photo/ferris-wheel.jpg?s=2048x2048&w=is&k=20&c=uGGaDn2_Ufw7BLlnP6jcIFwoNJfE83OuW-JzZII2L4Y=",
  "https://media.istockphoto.com/id/534577083/photo/family-on-carousel-in-amusement-park.jpg?s=2048x2048&w=is&k=20&c=I_vVxF0utY2jBX7QzaLHJAQcSoGhEJ-Y1E-ZNsAewNw=",
  "https://media.istockphoto.com/id/1180430429/photo/ravan-mannequin-on-ocassion-of-traditional-ram-leela-festivel.jpg?s=2048x2048&w=is&k=20&c=zl6PGNvsFpgbf7arhns5OM_TYyrowB1Ni_-M9zoVzLI=",
  "https://static.langimg.com/photo/imgsize-43578,msid-91136772/navbharat-times.jpg",
  // Add more image URLs
];

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="default-carousel" className="w-full" data-carousel="slide">
      {/* Carousel wrapper */}
      <div className=" my-1 h-70 w-full relative overflow-hidden">
        <div
          className="h-56 md:h-96 flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className="w-full h-full flex-shrink-10"
              style={{ minWidth: "100%" }}
            >
              <img
                src={image}
                alt={`Image ${index}`}
                className="absolute h-full w-full width:fit-content"
              />
            </div>
          ))}
          </div>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
             {images.map((_, index) => (
           <div
            key={index}
            className={`h-2 w-8 rounded-full ${
              currentIndex === index ? "bg-blue-600" : "bg-gray-300"
            }`}
           ></div>
         ))}
         </div>
      </div>
      {/* Slider indicators */}
    </section>
  );
};

export default ImageCarousel;





// <div className="relative overflow-hidden w-full h-96">
//       <div
//         className="flex transition-transform duration-1000 ease-out"
//         style={{ transform: `translateX(-${currentIndex * 100}%)` }}
//       >
//         {images.map((image, index) => (
//           <div
//             key={index}
//             className="w-full h-full flex-shrink-0"
//             style={{ minWidth: "100%" }}
//           >
//             <img
//               src={image}
//               alt={`Image ${index}`}
//               className="object-cover max-h-full w-full"
//             />
//           </div>
//         ))}
//       </div>
//       <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
//         {images.map((_, index) => (
//           <div
//             key={index}
//             className={`h-2 w-8 rounded-full ${
//               currentIndex === index ? "bg-blue-600" : "bg-gray-300"
//             }`}
//           ></div>
//         ))}
//       </div>
//     </div>
