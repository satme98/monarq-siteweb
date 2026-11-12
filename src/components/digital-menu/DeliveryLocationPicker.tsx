import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Navigation,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  ExternalLink,
} from 'lucide-react';

// Coordinates for MONARQ Tanger (Boulevard Marrakech / Centre Ville, Tanger)
export const MONARQ_COORDS = {
  lat: 35.7735,
  lng: -5.8075,
  maxDeliveryRadiusKm: 12, // Standard delivery zone covering Greater Tangier
};

export interface DeliveryLocationData {
  latitude: number | null;
  longitude: number | null;
  addressText: string;
  neighborhood?: string;
  additionalDetails: string;
  distanceKm: number | null;
  isWithinZone: boolean | null;
}

interface DeliveryLocationPickerProps {
  locationData: DeliveryLocationData;
  onChange: (data: DeliveryLocationData) => void;
}

// Haversine formula to calculate distance between two coordinates in kilometers
function calculateHaversineDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export const DeliveryLocationPicker: React.FC<DeliveryLocationPickerProps> = ({
  locationData,
  onChange,
}) => {
  const [isLocating, setIsLocating] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Trigger HTML5 Geolocation
  const handleShareLocation = () => {
    if (!navigator.geolocation) {
      setErrorMessage("La géolocalisation n'est pas prise en charge par votre navigateur.");
      return;
    }

    setIsLocating(true);
    setErrorMessage(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;

        const distance = calculateHaversineDistanceKm(
          MONARQ_COORDS.lat,
          MONARQ_COORDS.lng,
          userLat,
          userLng
        );

        const inZone = distance <= MONARQ_COORDS.maxDeliveryRadiusKm;

        let detectedAddress = locationData.addressText;
        let detectedNeighborhood = locationData.neighborhood || '';

        // Reverse geocoding via OpenStreetMap Nominatim
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${userLat}&lon=${userLng}&zoom=18&addressdetails=1`,
            {
              headers: {
                'Accept-Language': 'fr, ar',
              },
            }
          );
          if (res.ok) {
            const data = await res.json();
            const addr = data.address || {};
            const road = addr.road || addr.pedestrian || '';
            const suburb = addr.suburb || addr.neighbourhood || addr.city_district || addr.quarter || '';
            const city = addr.city || addr.town || 'Tanger';
            const parts = [road, suburb, city].filter(Boolean);

            detectedAddress = parts.length > 0 ? parts.join(', ') : (data.display_name?.split(',').slice(0, 3).join(',') || 'Tanger');
            detectedNeighborhood = suburb || detectedNeighborhood;
          }
        } catch {
          if (!detectedAddress) {
            detectedAddress = `Position GPS (${userLat.toFixed(4)}, ${userLng.toFixed(4)})`;
          }
        }

        onChange({
          ...locationData,
          latitude: userLat,
          longitude: userLng,
          addressText: detectedAddress,
          neighborhood: detectedNeighborhood,
          distanceKm: parseFloat(distance.toFixed(1)),
          isWithinZone: inZone,
        });

        setIsLocating(false);
      },
      (error) => {
        setIsLocating(false);
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setErrorMessage("Autorisation GPS refusée. Saisissez votre adresse ci-dessous.");
            break;
          case error.POSITION_UNAVAILABLE:
            setErrorMessage("Signal GPS indisponible. Saisissez votre adresse manuellement.");
            break;
          case error.TIMEOUT:
            setErrorMessage("Délai de géolocalisation dépassé. Veuillez réessayer.");
            break;
          default:
            setErrorMessage("Impossible de récupérer la position GPS.");
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 30000,
      }
    );
  };

  const hasGps = locationData.latitude !== null && locationData.longitude !== null;
  const lat = locationData.latitude;
  const lng = locationData.longitude;

  // OpenStreetMap embed URL with marker
  const mapEmbedUrl = hasGps
    ? `https://www.openstreetmap.org/export/embed.html?bbox=${lng! - 0.007}%2C${lat! - 0.005}%2C${lng! + 0.007}%2C${lat! + 0.005}&layer=mapnik&marker=${lat}%2C${lng}`
    : '';

  return (
    <div className="space-y-3">
      {/* Section title */}
      <div className="flex items-center gap-1.5 font-sans text-xs uppercase tracking-[0.14em] font-bold text-monarq-ink">
        <MapPin className="w-3.5 h-3.5 text-monarq-gold" />
        <span>Adresse de livraison</span>
      </div>

      {/* GPS button */}
      <button
        type="button"
        onClick={handleShareLocation}
        disabled={isLocating}
        className={`w-full py-2.5 px-3.5 rounded-xl flex items-center justify-center gap-2 font-sans text-xs uppercase tracking-[0.14em] font-semibold transition-all shadow-sm active:scale-[0.98] ${
          hasGps
            ? 'bg-monarq-paper border border-monarq-gold text-monarq-gold-deep hover:bg-monarq-paper-dark'
            : 'bg-monarq-ink hover:bg-black text-monarq-paper'
        }`}
      >
        {isLocating ? (
          <>
            <Loader2 className="w-3.5 h-3.5 animate-spin text-monarq-gold" />
            <span>Détection en cours...</span>
          </>
        ) : (
          <>
            <Navigation className={`w-3.5 h-3.5 ${hasGps ? 'text-monarq-gold-deep' : 'text-monarq-gold'} fill-current`} />
            <span>Utiliser ma position GPS</span>
          </>
        )}
      </button>

      {/* Error notification if GPS failed */}
      {errorMessage && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 font-sans text-xs flex items-center gap-2"
        >
          <AlertTriangle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
          <span>{errorMessage}</span>
        </motion.div>
      )}

      {/* GPS Confirmation line & Compact Map Pin Preview */}
      <AnimatePresence>
        {hasGps && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-2 overflow-hidden"
          >
            {locationData.isWithinZone ? (
              <div className="flex items-center gap-2 font-sans text-xs font-medium text-emerald-800 bg-emerald-50/80 px-3 py-2 rounded-lg border border-emerald-200/60">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                <span>
                  Livraison disponible · {locationData.distanceKm !== null ? locationData.distanceKm.toString().replace('.', ',') : '0'} km
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2 font-sans text-xs font-medium text-amber-800 bg-amber-50/80 px-3 py-2 rounded-lg border border-amber-200/60">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                <span>
                  Hors zone standard · {locationData.distanceKm !== null ? locationData.distanceKm.toString().replace('.', ',') : ''} km
                </span>
              </div>
            )}

            <div className="relative rounded-xl overflow-hidden border border-monarq-line shadow-inner bg-monarq-paper-dark h-24 sm:h-28">
              <iframe
                title="Carte de livraison"
                src={mapEmbedUrl}
                className="w-full h-full border-0 pointer-events-none"
                loading="lazy"
              />
              <div className="absolute top-1.5 right-1.5">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2 py-0.5 rounded-md bg-white/90 hover:bg-white text-monarq-ink font-sans text-[10px] font-semibold flex items-center gap-1 shadow-sm backdrop-blur-sm transition-colors"
                >
                  <span>Maps</span>
                  <ExternalLink className="w-2.5 h-2.5 text-monarq-gold" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Simplified Address Inputs: Adresse + Complément (optionnel) */}
      <div className="space-y-2.5">
        <div>
          <label
            htmlFor="delivery-address"
            className="block font-sans text-xs uppercase tracking-[0.14em] font-semibold text-monarq-ink mb-1.5"
          >
            Adresse <span className="text-monarq-gold">*</span>
          </label>
          <input
            id="delivery-address"
            type="text"
            required
            placeholder="Rue, avenue, quartier..."
            value={locationData.addressText}
            onChange={(e) =>
              onChange({
                ...locationData,
                addressText: e.target.value,
              })
            }
            className="w-full px-3.5 py-2.5 rounded-xl border border-monarq-line bg-monarq-paper text-monarq-ink placeholder:text-monarq-ink-muted/50 font-sans text-xs sm:text-sm focus:outline-none focus:border-monarq-gold transition-all"
          />
        </div>

        <div>
          <label
            htmlFor="delivery-details"
            className="block font-sans text-xs uppercase tracking-[0.14em] font-semibold text-monarq-ink mb-1.5"
          >
            Complément <span className="text-monarq-ink-muted font-normal lowercase tracking-normal">(optionnel)</span>
          </label>
          <input
            id="delivery-details"
            type="text"
            placeholder="Immeuble, étage, appartement…"
            value={locationData.additionalDetails}
            onChange={(e) =>
              onChange({
                ...locationData,
                additionalDetails: e.target.value,
              })
            }
            className="w-full px-3.5 py-2.5 rounded-xl border border-monarq-line bg-monarq-paper text-monarq-ink placeholder:text-monarq-ink-muted/50 font-sans text-xs sm:text-sm focus:outline-none focus:border-monarq-gold transition-all"
          />
        </div>
      </div>
    </div>
  );
};
