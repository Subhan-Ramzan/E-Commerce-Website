{/* <div className="md:w-1/2 flex flex-col items-center md:items-start p-0 md:px-10 relative mb-6 md:mb-0">
  <Carousel>
    <CarouselContent>
      {product.productImage?.length > 0 ? (
        product.productImage.map((image, index) => (
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
        ))
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
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>

  {/* Thumbnail Navigation 
  <div className="flex mt-3 space-x-2 overflow-x-auto">
    {product.productImage.map((image, index) => (
      <div
        key={index}
        className={`w-12 h-12 cursor-pointer ${
          index === currentImageIndex ? "border-2 border-gray-500" : ""
        }`}
        onClick={() => handleThumbnailClick(index)}
      >
        <CldImage
          src={image.public_id}
          alt={`Thumbnail ${index}`}
          width={48}
          height={48}
          className="object-cover rounded-md border border-gray-300"
        />
      </div>
    ))}
  </div>
</div>; */}











<div className="md:w-1/2 flex flex-col items-center md:items-start p-0 md:px-10 relative mb-6 md:mb-0">
          <Carousel>
            <CarouselContent>
              {product.productImage?.length > 0 ? (
                product.productImage.map((image, index) => (
                  <CarouselItem
                    key={index}
                    active={index === currentImageIndex}
                  >
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
                ))
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











export default function WarrantyIcon() {
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="blue"
          width="40px"
          height="40px"
        >
          <path d="M12 2L4 5v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V5l-8-3zm0 18c-3.74-1.17-6-5.22-6-10V6.26L12 4.34l6 1.92V10c0 4.78-2.26 8.83-6 10z" />
        </svg>
        <span
          style={{
            position: "absolute",
            top: "0",
            right: "0",
            backgroundColor: "blue",
            color: "white",
            borderRadius: "50%",
            padding: "2px 6px",
            fontSize: "0.7rem",
          }}
        >
          7
        </span>
      </div>
      <span style={{ color: "#4A4A4A", fontSize: "0.9rem" }}>
        7-Day Warranty
      </span>
    </div>
  );
}
