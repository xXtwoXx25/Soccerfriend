import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Filters from '../components/MatchSearch/FIlters';
import ResultCard from '../components/MatchSearch/ResultCard';
import Pagination from '../components/Pagination';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

export default function MatchSearchPage() {
  const matches = [{
    id: 1,
    title: "Bangkok United vs Port FC",
    description: "Casual Match - 7:00 PM",
    image: "https://via.placeholder.com/300x200",
    date: "2024-03-20",
    location: "Thammasat Stadium"
  },
  {
    id: 2,
    title: "Buriram United vs Chonburi FC",
    description: "Friendly Game - 6:00 PM",
    image: "https://via.placeholder.com/300x200",
    date: "2024-03-21",
    location: "Chang Arena"
  },
  {
    id: 3,
    title: "SCG Muangthong United vs Ratchaburi FC",
    description: "After School Match - 7:30 PM",
    image: "https://via.placeholder.com/300x200",
    date: "2024-03-22",
    location: "SCG Stadium"
  },
  {
    id: 4,
    title: "True Bangkok United vs Nongbua Pitchaya",
    description: "Weekend Game - 6:00 PM",
    image: "https://via.placeholder.com/300x200",
    date: "2024-03-23",
    location: "True Stadium"
  }];

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  const query = useQuery();
  const searchQuery = query.get('q') || 'All Matches';

  return (
    <div className="bg-green-50 min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-green-800">ผลการค้นหา: {searchQuery}</h1>
        </div>

        <div className="flex gap-8">
          <Filters />
          
          <div className="bg-white rounded-lg shadow-lg p-6 flex-1">
            <div className="flex-1">
              <ResultTabs />

              <div className="mt-6 space-y-4">
                {matches.map(match => (
                  <ResultCard
                    key={match.id}
                    matches={match}
                  />
                ))}
              </div>
            </div>
            <Pagination />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
