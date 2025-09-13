import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { format } from "date-fns";
import locationIcon from "../assets/Vector-Location-PNG-Free-Image.png";
import {
  MapPin,
  Building2,
  X,
  Eye,
  Phone,
  Heart,
} from "lucide-react";

// NGO data
const ngoData = [
  {
    id: 1,
    name: "Gouravammal Old Age Home",
    address: "3/368, Madukkarai, Thirumalayampalayam, Coimbatore, Tamil Nadu 641105, India",
    latitude: 10.877252,
    longitude: 76.940467,
    type: "Old Age Home"
  },
  {
    id: 2,
    name: "No Food Waste",
    address: "Block 2, Rathinam Tech Zone, Eachanari, Coimbatore, Tamil Nadu 641021, India",
    latitude: 10.928910,
    longitude: 76.984468,
    type: "Food Relief"
  },
  {
    id: 3,
    name: "REST NGO Coimbatore",
    address: "Landmarks CARS24, 23A, Kotharinagar, Singanallur, Tamil Nadu 641005, India",
    latitude: 11.003,
    longitude: 77.033,
    type: "Social Welfare"
  },
  {
    id: 4,
    name: "Namma Kudumbam (Old Age Home)",
    address: "344/1 Site no 5, near smart homes, P&T Colony, Sundakkamuthur, Coimbatore, Tamil Nadu 641010, India",
    latitude: 10.9596,
    longitude: 76.9269,
    type: "Old Age Home"
  },
  {
    id: 5,
    name: "Free Indian Society-Coimbatore",
    address: "120, Theppakulam Street Number 1, Sukrawar Pettai, R.S. Puram, Coimbatore, Tamil Nadu 641001, India",
    latitude: 11.005,
    longitude: 76.955,
    type: "Social Welfare"
  },
  {
    id: 6,
    name: "Nishanthm Home Coimbatore",
    address: "22, NRI Gardens Annexe, Vilankurichi Post, Cheran ma Nagar, Coimbatore, Tamil Nadu 641051, India",
    latitude: 11.050,
    longitude: 77.020,
    type: "Senior Care"
  },
  {
    id: 7,
    name: "Imayam Social Welfare Association",
    address: "1E, Adithya Avenue Extension, Saravana Nagar, Koundampalayam, Coimbatore, Tamil Nadu 641030, India",
    latitude: 11.045,
    longitude: 76.948,
    type: "Social Welfare"
  },
  {
    id: 8,
    name: "BRINDAVAN SENIOR CITIZENS HOME",
    address: "Gugan Garden, Brindavan Hill View, Vadavalli, Lakshmi Nagar, Bommanampalayam, Coimbatore, Tamil Nadu 641046, India",
    latitude: 11.040,
    longitude: 76.880,
    type: "Senior Citizens Home"
  },
  {
    id: 9,
    name: "Marpu Foundation (NGO)",
    address: "A11-312, Lakshmimils juntion, 140, Amman Kulam Rd, Puliakulam, Coimbatore, Tamil Nadu 641037, India",
    latitude: 11.005,
    longitude: 76.996,
    type: "Charitable Trust"
  },
  {
    id: 10,
    name: "Pappa Mamma Old Age Home",
    address: "38, 2nd St, Ramalinga Jothi Nagar, Krishnaswamy Nagar, Layout, Ramanathapuram, Coimbatore, Tamil Nadu 641045, India",
    latitude: 11.007,
    longitude: 77.020,
    type: "Old Age Home"
  },
  {
    id: 11,
    name: "Sai Nita Foundation Charitable Trust",
    address: "No:3, New No:4, Cross Street, Old, Ragupathy Layout 2nd St, Jawahar Nagar, Saibaba Colony, Coimbatore, Tamil Nadu 641011, India",
    latitude: 11.023,
    longitude: 76.939,
    type: "Charitable Trust"
  },
  {
    id: 12,
    name: "Thatha Patti Elders Foundation",
    address: "7/126A, Castle Garden Rd, VKV Kumaraguru Nagar, Saravanampatti, Coimbatore, Tamil Nadu 641035, India",
    latitude: 11.084,
    longitude: 77.010,
    type: "Elders Foundation"
  },
  {
    id: 13,
    name: "Native Medicare Charitable Trust",
    address: "5/39 Kalappanaickenpalayam Post, Somayampalayam, Tamil Nadu 641108, India",
    latitude: 11.050,
    longitude: 76.910,
    type: "Healthcare Trust"
  },
  {
    id: 14,
    name: "JK Senior Living Center Old Age Home",
    address: "37, Bajanai Kovil St, near Bajanai Kovil, Post, Uppilipalayam, Coimbatore, Tamil Nadu 641015, India",
    latitude: 11.007,
    longitude: 77.016,
    type: "Senior Living"
  },
  {
    id: 15,
    name: "Jaihind Foundation",
    address: "No 5, Sami Thottam, Rottigoundanur Road, Pirivu, Kaliyapuram, Coimbatore, Tamil Nadu 641105, India",
    latitude: 10.880,
    longitude: 76.940,
    type: "Foundation"
  },
  {
    id: 16,
    name: "Sheela Senior Citizen Home",
    address: "Thadagam Main Rd, near Bustop, TVS Nagar, Coimbatore, Tamil Nadu 641025, India",
    latitude: 11.042,
    longitude: 76.915,
    type: "Senior Citizens Home"
  }
];

const Map = () => {
  const [ngos, setNgos] = useState([]);
  const [selected, setSelected] = useState(null);

  const customIcon = L.icon({
    iconUrl: locationIcon,
    iconSize: [38, 38],
    iconAnchor: [19, 38],
    popupAnchor: [0, -38]
  });

  const getTypeColor = (type) => {
    switch (type?.toLowerCase()) {
      case "old age home":
        return "text-blue-600 bg-blue-50 border-blue-200";
      case "food relief":
        return "text-green-600 bg-green-50 border-green-200";
      case "social welfare":
        return "text-purple-600 bg-purple-50 border-purple-200";
      case "charitable trust":
        return "text-orange-600 bg-orange-50 border-orange-200";
      case "healthcare trust":
        return "text-red-600 bg-red-50 border-red-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getTypeIcon = (type) => {
    switch (type?.toLowerCase()) {
      case "old age home":
      case "senior citizens home":
      case "senior living":
      case "senior care":
      case "elders foundation":
        return <Heart className="w-4 h-4" />;
      case "food relief":
        return <Building2 className="w-4 h-4" />;
      case "healthcare trust":
        return <Phone className="w-4 h-4" />;
      default:
        return <Building2 className="w-4 h-4" />;
    }
  };

  useEffect(() => {
    setNgos(ngoData);
  }, []);

  return (
    <div className="relative">
      {selected && (
        <div className="fixed right-0 top-0 bottom-0 w-96 bg-white shadow-2xl border-l border-gray-200 z-50 overflow-hidden">
          <div className="h-full flex flex-col">
            <div className="relative bg-gradient-to-br from-blue-600 to-purple-700 h-64">
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
              >
                <X className="w-4 h-4 text-gray-700" />
              </button>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-white font-bold text-xl font-Popin">
                      {selected.name}
                    </h2>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 p-6 overflow-y-auto">
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex-1">
                    <div
                      className={`flex items-center gap-2 p-3 rounded-lg border ${getTypeColor(
                        selected.type
                      )}`}
                    >
                      {getTypeIcon(selected.type)}
                      <div>
                        <p
                          className={`text-xs font-medium uppercase tracking-wide ${
                            getTypeColor(selected.type).split(" ")[0]
                          }`}
                        >
                          Type
                        </p>
                        <p
                          className={`font-bold font-Popin ${
                            getTypeColor(selected.type).split(" ")[0]
                          }`}
                        >
                          {selected.type}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Building2 className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-600 font-medium uppercase tracking-wide mb-1">
                        Organization
                      </p>
                      <p className="font-bold text-gray-800 font-Popin text-lg">
                        {selected.name}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-600 font-medium uppercase tracking-wide mb-1">
                        Address
                      </p>
                      <p className="font-semibold text-gray-800 font-Popin text-sm leading-relaxed">
                        {selected.address}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-600 font-medium uppercase tracking-wide mb-1">
                        Coordinates
                      </p>
                      <p className="font-semibold text-gray-800 font-Popin text-sm">
                        {selected.latitude.toFixed(6)}, {selected.longitude.toFixed(6)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <MapContainer
        center={[11.0168, 76.9558]}
        zoom={12}
        className="z-0"
        style={{ height: "100vh", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {ngos &&
          ngos.map((ngo) => (
            <Marker
              icon={customIcon}
              key={ngo.id}
              position={[ngo.latitude, ngo.longitude]}
            >
              <Popup>
                <div className="p-2 min-w-[200px]">
                  <div className="mb-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Building2 className="w-4 h-4 text-blue-600" />
                      <p className="font-bold font-Popin text-gray-800 text-sm">
                        {ngo.name}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      {getTypeIcon(ngo.type)}
                      <p className="font-semibold font-Popin text-gray-700 text-xs">
                        {ngo.type}
                      </p>
                    </div>
                  </div>
                  <button
                    className="w-full bg-primary hover:bg-primary/80 text-white py-2 px-3 rounded-md cursor-pointer font-Popin text-sm font-medium transition-all duration-200 hover:shadow-md flex items-center justify-center gap-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelected(ngo);
                    }}
                  >
                    <Eye className="w-4 h-4" />
                    View Details
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
};

export default Map;