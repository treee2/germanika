import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

import ApartmentCard from "../components/apartments/ApartmentCard";
import ApartmentFilters from "../components/apartments/ApartmentFilters";

export default function Apartments() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    maxPrice: 15000,
    bedrooms: "all"
  });

  const { data: apartments, isLoading } = useQuery({
    queryKey: ['apartments'],
    queryFn: () => base44.entities.Apartment.list('-created_date'),
    initialData: [],
  });

  const filteredApartments = apartments.filter(apt => {
    const matchesSearch = apt.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         apt.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = apt.price_per_night <= (filters.maxPrice || Infinity);
    const matchesBedrooms = filters.bedrooms === "all" || 
                           (filters.bedrooms === "4" ? apt.bedrooms >= 4 : apt.bedrooms === parseInt(filters.bedrooms));
    
    return matchesSearch && matchesPrice && matchesBedrooms;
  });

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-3">
            Премиум квартиры
          </h1>
          <p className="text-slate-600 text-lg">
            Найдите идеальное жильё для вашего отдыха
          </p>
        </div>

        <div className="mb-8">
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input
              placeholder="Поиск по названию или описанию..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 bg-white/90 backdrop-blur-sm border-0 shadow-lg text-base"
            />
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <div className="lg:w-80 flex-shrink-0">
            <div className="sticky top-4">
              <ApartmentFilters filters={filters} onFilterChange={setFilters} />
            </div>
          </div>

          <div className="flex-1">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Array(6).fill(0).map((_, i) => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="h-64 w-full rounded-xl" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                ))}
              </div>
            ) : filteredApartments.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-12 h-12 text-slate-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  Квартиры не найдены
                </h3>
                <p className="text-slate-600">
                  Попробуйте изменить параметры поиска
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AnimatePresence>
                  {filteredApartments.map((apartment, index) => (
                    <motion.div
                      key={apartment.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <ApartmentCard apartment={apartment} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}