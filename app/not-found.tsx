import Button from "@/components/Button";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-5 py-24">
      <div className="text-center max-w-md">
        <p className="text-8xl font-extrabold text-[#F3811F] mb-6 leading-none">404</p>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4">
          Hopsan, här gick något fel
        </h1>
        <p className="text-[#9ca3af] mb-10 leading-relaxed">
          Vi kan inte hitta sidan du letar efter. Den kanske har flyttats eller tagits bort — eller
          så har webbadressen stavats fel.
        </p>
        <Button href="/" size="lg">
          Ta mig till startsidan
        </Button>
      </div>
    </div>
  );
}
