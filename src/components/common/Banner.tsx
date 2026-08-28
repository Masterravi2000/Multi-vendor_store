import banner from "../../assets/store_banner2.jfif"

export default function Banner() {
  return (
    <div className="w-full bg-white mb-5 overflow-hidden">
      <img
        src={banner}
        alt="Delivery Banner"
        className="w-full h-auto block object-cover"
      />
    </div>
  );
}