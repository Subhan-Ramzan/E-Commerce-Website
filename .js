
// <div className="md:w-1/2 flex flex-col items-center md:items-start p-0 md:px-10 relative mb-6 md:mb-0">
//   <motion.div
//     className="transition-transform transform hover:scale-105 duration-500 ease-in-out"
//     whileHover={{ rotateY: 15 }}
//     whileTap={{ scale: 0.95 }}
//     onTouchStart={handleTouchStart}
//     onTouchMove={handleTouchMove}
//     onTouchEnd={handleTouchEnd}
//   >
//     {product.productImage?.length > 0 ? (
//       <CldImage
//         src={product.productImage[currentImageIndex].public_id}
//         alt={product.name}
//         width={400}
//         height={300}
//         className="object-fill w-[100vw] md:w-[30vw] h-[50vh] md:h-[40vh] rounded-lg"
//       />
//     ) : (
//       <Image
//         src="/placeholder.png"
//         alt="Placeholder Image"
//         width={300}
//         height={300}
//         className="object-cover w-full h-full rounded-lg"
//       />
//     )}
//   </motion.div>

//   {/* Thumbnail Images */}
//   <div className="flex mt-3 space-x-2 overflow-x-auto">
//     {product.productImage.map((image, index) => (
//       <div
//         key={index}
//         className="w-12 h-12 cursor-pointer"
//         onClick={() => handleThumbnailClick(index)}
//         onMouseEnter={() => handleThumbnailClick(index)}
//       >
//         <CldImage
//           src={image.public_id}
//           alt={`Thumbnail ${index}`}
//           width={48}
//           height={48}
//           className="object-cover rounded-md border border-gray-300"
//         />
//       </div>
//     ))}
//   </div>

//   {/* Image Navigation Arrows */}
//   <div
//     className="absolute top-1/2 left-4 transform -translate-y-1/2 cursor-pointer"
//     onClick={goToPreviousImage}
//   >
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       className="h-8 w-8 text-gray-500 hover:text-gray-700 transition-colors"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth={2}
//     >
//       <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
//     </svg>
//   </div>
//   <div
//     className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
//     onClick={goToNextImage}
//   >
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       className="h-8 w-8 text-gray-500 hover:text-gray-700 transition-colors"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth={2}
//     >
//       <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
//     </svg>
//   </div>
// </div>;







<div className="md:w-1/2 flex flex-col items-center md:items-start p-0 md:px-10 relative mb-6 md:mb-0">
{/* Carousel that displays the current image */}
<Carousel>
  <CarouselContent>
    {product.productImage?.length > 0 ? (
      product.productImage.map((image, index) =>
        index === currentImageIndex ? (
          <CarouselItem key={index}>
            <motion.div
              className="transition-transform transform hover:scale-105 duration-500 ease-in-out"
              whileHover={{ rotateY: 15 }}
              whileTap={{ scale: 0.95 }}
            >
              <CldImage
                src={image.public_id}
                alt={product.name}
                width={400}
                height={300}
                className="object-fill w-[100vw] md:w-[30vw] h-[50vh] md:h-[40vh] rounded-lg"
              />
            </motion.div>
          </CarouselItem>
        ) : null
      )
    ) : (
      <CarouselItem>
        <Image
          src="/placeholder.png"
          alt="Placeholder Image"
          width={300}
          height={300}
          className="object-cover w-full h-full rounded-lg"
        />
      </CarouselItem>
    )}
  </CarouselContent>

  {/* Carousel Navigation Controls */}
  <CarouselPrevious onClick={handlePrevious} />
  <CarouselNext onClick={handleNext} />
</Carousel>

{/* Thumbnail Navigation */}
<div className="flex mt-3 p-1 space-x-2">
  {product.productImage.map((image, index) => (
    <div
      key={index}
      className={`w-12 h-12 cursor-pointer ${
        index === currentImageIndex ? "border-2 border-gray-500" : ""
      }`}
      onClick={() => handleThumbnailClick(index)}
      onMouseEnter={() => handleThumbnailClick(index)}
    >
      <CldImage
        src={image.public_id}
        alt={`Thumbnail ${index}`}
        width={48}
        height={48}
        className="object-fill h-12 w-12 rounded-md"
      />
    </div>
  ))}
</div>
</div>

