// components/Map.tsx
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerIcon2xPng from "leaflet/dist/images/marker-icon-2x.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";
import { Button } from "../components/ui/button"; // Adjust path as needed
import { MapPin } from "lucide-react";

// Leaflet icon setup (runs only in browser)
if (typeof window !== "undefined") {
  const DefaultIcon = L.icon({
    iconUrl: markerIconPng,
    iconRetinaUrl: markerIcon2xPng,
    shadowUrl: markerShadowPng,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  L.Marker.prototype.options.icon = DefaultIcon;
}

interface MapProps {
  coordinates: { lat: number; lng: number };
  address: string | undefined;
}

export default function Map({ coordinates, address }: MapProps) {
  return (
    <div className="relative h-64 sm:h-80">
      <MapContainer
        center={[coordinates.lat, coordinates.lng]}
        zoom={15}
        style={{ height: "100%", width: "100%" }}
        className="z-10"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[coordinates.lat, coordinates.lng]}>
          <Popup>
            <div className="text-center">
              <h4 className="font-playfair font-semibold text-base text-foreground">
                The House of Pickles
              </h4>
              <p className="text-xs text-muted-foreground">{address || "Not provided"}</p>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${coordinates.lat},${coordinates.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline text-xs"
              >
                Get Directions
              </a>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-card/95 to-transparent p-4">
        <div className="flex flex-col sm:flex-row gap-2 justify-center">
          <Button
            asChild
            size="sm"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${coordinates.lat},${coordinates.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <MapPin className="w-4 h-4" />
              Google Maps
            </a>
          </Button>
          <Button
            asChild
            size="sm"
            variant="outline"
            className="border-spice-red text-spice-red hover:bg-spice-red hover:text-white bg-card/90 backdrop-blur-sm"
          >
            <a
              href={`https://maps.apple.com/?daddr=${coordinates.lat},${coordinates.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <MapPin className="w-4 h-4" />
              Apple Maps
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}