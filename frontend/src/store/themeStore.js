import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useThemeStore = create(
    persist(
        (set) => ({
            theme: 'light',

            toggleTheme: () => {
                set((state) => {
                    const newTheme = state.theme === 'light' ? 'dark' : 'light';

                    // Update document class
                    if (newTheme === 'dark') {
                        document.documentElement.classList.add('dark');
                    } else {
                        document.documentElement.classList.remove('dark');
                    }

                    return { theme: newTheme };
                });
            },

            setTheme: (theme) => {
                set({ theme });

                // Update document class
                if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                } else {
                    document.documentElement.classList.remove('dark');
                }
            }
        }),
        {
            name: 'theme-storage',
            partialize: (state) => ({ theme: state.theme }),
            onRehydrateStorage: () => (state) => {
                // Apply theme on initial load
                if (state?.theme === 'dark') {
                    document.documentElement.classList.add('dark');
                }
            }
        }
    )
);

