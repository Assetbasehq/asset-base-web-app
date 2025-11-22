export default function AssetImages() {
  const images = [
    "/assets/larl-1.jpg",
    "/assets/larl-2.jpg",
    "/assets/larl-3.jpg",
  ];

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {images.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`Asset preview ${i + 1}`}
          className="rounded-lg object-cover w-full h-40"
        />
      ))}
    </div>
  );
}
