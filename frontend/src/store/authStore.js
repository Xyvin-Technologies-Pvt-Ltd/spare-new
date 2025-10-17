import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
    persist(
        (set, get) => ({
            user: null,
            isAuthenticated: false,
            language: 'en',

            // Dummy login
            login: (email, password) => {
                // Dummy user data
                const dummyUser = {
                    id: 1,
                    name: 'Ahmed Al-Said',
                    nameAr: 'أحمد السعيد',
                    email: email || 'ahmed@example.com',
                    phone: '+968 9123 4567',
                    avatar: 'https://ui-avatars.com/api/?name=Ahmed+Al-Said&background=00853F&color=fff',
                    addresses: [
                        {
                            id: 1,
                            name: 'Home',
                            nameAr: 'المنزل',
                            street: 'Al Khuwair Street, Building 123',
                            streetAr: 'شارع الخوير، مبنى 123',
                            city: 'Muscat',
                            cityAr: 'مسقط',
                            phone: '+968 9123 4567',
                            isDefault: true
                        },
                        {
                            id: 2,
                            name: 'Office',
                            nameAr: 'المكتب',
                            street: 'Al Qurum, Business District',
                            streetAr: 'القرم، منطقة الأعمال',
                            city: 'Muscat',
                            cityAr: 'مسقط',
                            phone: '+968 9123 4567',
                            isDefault: false
                        }
                    ]
                };

                set({ user: dummyUser, isAuthenticated: true });
                return true;
            },

            logout: () => {
                set({ user: null, isAuthenticated: false });
            },

            updateProfile: (updates) => {
                set((state) => ({
                    user: state.user ? { ...state.user, ...updates } : null
                }));
            },

            setLanguage: (lang) => {
                set({ language: lang });
                localStorage.setItem('language', lang);
            }
        }),
        {
            name: 'auth-storage',
            partialize: (state) => ({
                user: state.user,
                isAuthenticated: state.isAuthenticated,
                language: state.language
            })
        }
    )
);

