import React from 'react';
import { Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';

interface MapPopupProps {
  title: string;
  description?: string;
  imageUrl?: string;
  linkTo?: string;
  type: 'comercio' | 'evento' | 'estacionamento';
}

export function MapPopup({ title, description, imageUrl, linkTo, type }: MapPopupProps) {
  return (
    <Popup className="rounded-lg overflow-hidden">
      <div className="w-48">
        {imageUrl && (
          <img src={imageUrl} alt={title} className="w-full h-24 object-cover rounded-t-md mb-2" />
        )}
        <div className="p-1">
          <h3 className="font-bold text-sm mb-1">{title}</h3>
          {description && <p className="text-xs text-gray-600 mb-2 line-clamp-2">{description}</p>}
          <div className="flex gap-2 items-center mt-2">
            <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
              {type}
            </span>
            {linkTo && (
              <Link to={linkTo} className="ml-auto">
                <Button size="sm" className="h-6 text-xs px-2">Ver mais</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </Popup>
  );
}