
import { db, rtdb } from "@/firebase/config";
import { Wallpaper, Genre, WallpaperFilters } from "@/types/wallpaper";
import { collection, getDocs, query, where, orderBy, limit } from "firebase/firestore";
import { ref, get } from "firebase/database";
import { mockGenres, mockWallpapers, getMockTrending, getMockWallpapersByGenre } from "@/mock/mockData";

// Use mock data flag for development
const USE_MOCK_DATA = true;

// Fetch all available genres
export const getGenres = async (): Promise<Genre[]> => {
  if (USE_MOCK_DATA) {
    return new Promise(resolve => {
      // Simulate network delay
      setTimeout(() => resolve(mockGenres), 800);
    });
  }

  try {
    // You can use either Firestore or Realtime Database depending on your preference
    // Firestore example:
    const genresCollection = collection(db, "genres");
    const genreSnapshot = await getDocs(genresCollection);
    return genreSnapshot.docs.map(doc => ({ 
      id: doc.id,
      ...doc.data() 
    } as Genre));

    // Realtime Database alternative:
    // const genreRef = ref(rtdb, 'genres');
    // const snapshot = await get(genreRef);
    // return snapshot.exists() ? Object.values(snapshot.val()) : [];
  } catch (error) {
    console.error("Error fetching genres:", error);
    return [];
  }
};

// Fetch wallpapers with optional filters
export const getWallpapers = async (filters?: WallpaperFilters, pageSize: number = 20): Promise<Wallpaper[]> => {
  if (USE_MOCK_DATA) {
    return new Promise(resolve => {
      // Simulate network delay
      setTimeout(() => {
        let filteredWallpapers = getMockWallpapersByGenre(filters?.genre);
        
        // Apply search filter if provided
        if (filters?.search) {
          const searchTerm = filters.search.toLowerCase();
          filteredWallpapers = filteredWallpapers.filter(
            w => w.title.toLowerCase().includes(searchTerm) || 
                 w.genre.some(g => g.toLowerCase().includes(searchTerm))
          );
        }
        
        // Apply sort if provided
        if (filters?.sort) {
          switch (filters.sort) {
            case 'trending':
              filteredWallpapers.sort((a, b) => (b.views || 0) - (a.views || 0));
              break;
            case 'newest':
              filteredWallpapers.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
              break;
            case 'popular':
              filteredWallpapers.sort((a, b) => (b.likes || 0) - (a.likes || 0));
              break;
            case 'random':
              filteredWallpapers.sort(() => Math.random() - 0.5);
              break;
          }
        }
        
        resolve(filteredWallpapers.slice(0, pageSize));
      }, 1000);
    });
  }

  try {
    // This implementation uses Firestore
    let wallpapersQuery = collection(db, "wallpapers");
    let constraints = [];

    // Apply genre filter if provided
    if (filters?.genre) {
      constraints.push(where("genre", "array-contains", filters.genre));
    }

    // Apply sorting
    if (filters?.sort) {
      switch (filters.sort) {
        case 'trending':
          constraints.push(orderBy("views", "desc"));
          break;
        case 'newest':
          constraints.push(orderBy("createdAt", "desc"));
          break;
        case 'popular':
          constraints.push(orderBy("likes", "desc"));
          break;
        case 'random':
          // Note: Firestore doesn't support random queries natively
          break;
      }
    } else {
      // Default sorting
      constraints.push(orderBy("createdAt", "desc"));
    }

    // Apply page size limit
    constraints.push(limit(pageSize));

    // Execute the query with all constraints
    const q = query(wallpapersQuery, ...constraints);
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Wallpaper));
  } catch (error) {
    console.error("Error fetching wallpapers:", error);
    return [];
  }
};

// Fetch trending/featured wallpapers
export const getTrendingWallpapers = async (count: number = 8): Promise<Wallpaper[]> => {
  if (USE_MOCK_DATA) {
    return new Promise(resolve => {
      // Simulate network delay
      setTimeout(() => resolve(getMockTrending()), 800);
    });
  }

  try {
    const q = query(
      collection(db, "wallpapers"),
      where("featured", "==", true),
      orderBy("views", "desc"),
      limit(count)
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Wallpaper));
  } catch (error) {
    console.error("Error fetching trending wallpapers:", error);
    return [];
  }
};

// Fetch wallpapers by specific genre
export const getWallpapersByGenre = async (genre: string, count: number = 20): Promise<Wallpaper[]> => {
  if (USE_MOCK_DATA) {
    return new Promise(resolve => {
      // Simulate network delay
      setTimeout(() => {
        const filtered = getMockWallpapersByGenre(genre);
        resolve(filtered.slice(0, count));
      }, 800);
    });
  }

  try {
    const q = query(
      collection(db, "wallpapers"),
      where("genre", "array-contains", genre),
      orderBy("createdAt", "desc"),
      limit(count)
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Wallpaper));
  } catch (error) {
    console.error(`Error fetching wallpapers for genre ${genre}:`, error);
    return [];
  }
};
