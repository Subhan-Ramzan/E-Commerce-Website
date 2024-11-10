import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

export default function MyPage() {
  return (
    <div className="flex h-[80vh] justify-center items-center p-4">
      <Carousel>
        <CarouselContent>
          <CarouselItem>..dasda.</CarouselItem>
          <CarouselItem>..dsa.</CarouselItem>
          <CarouselItem>...sada</CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
