import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
    persist(
        (set, get) => ({
            items: [],
            appliedOffer: null,

            // Add item to cart
            addItem: (product, quantity = 1) => {
                set((state) => {
                    const existingItem = state.items.find(item => item.id === product.id);

                    if (existingItem) {
                        return {
                            items: state.items.map(item =>
                                item.id === product.id
                                    ? { ...item, quantity: item.quantity + quantity }
                                    : item
                            )
                        };
                    }

                    return {
                        items: [...state.items, { ...product, quantity }]
                    };
                });
            },

            // Remove item from cart
            removeItem: (productId) => {
                set((state) => ({
                    items: state.items.filter(item => item.id !== productId)
                }));
            },

            // Update item quantity
            updateQuantity: (productId, quantity) => {
                if (quantity <= 0) {
                    get().removeItem(productId);
                    return;
                }

                set((state) => ({
                    items: state.items.map(item =>
                        item.id === productId
                            ? { ...item, quantity }
                            : item
                    )
                }));
            },

            // Increment quantity
            incrementQuantity: (productId) => {
                set((state) => ({
                    items: state.items.map(item =>
                        item.id === productId
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    )
                }));
            },

            // Decrement quantity
            decrementQuantity: (productId) => {
                set((state) => {
                    const item = state.items.find(i => i.id === productId);
                    if (item && item.quantity <= 1) {
                        return { items: state.items.filter(i => i.id !== productId) };
                    }

                    return {
                        items: state.items.map(i =>
                            i.id === productId
                                ? { ...i, quantity: i.quantity - 1 }
                                : i
                        )
                    };
                });
            },

            // Apply bank offer
            applyOffer: (offer) => {
                set({ appliedOffer: offer });
            },

            // Remove offer
            removeOffer: () => {
                set({ appliedOffer: null });
            },

            // Calculate subtotal
            getSubtotal: () => {
                const items = get().items;
                return items.reduce((total, item) => total + (item.price * item.quantity), 0);
            },

            // Calculate discount
            getDiscount: () => {
                const subtotal = get().getSubtotal();
                const offer = get().appliedOffer;

                if (!offer) return 0;

                if (offer.type === 'percentage') {
                    return (subtotal * offer.discount) / 100;
                }

                return offer.discount;
            },

            // Calculate total
            getTotal: () => {
                const subtotal = get().getSubtotal();
                const discount = get().getDiscount();
                return Math.max(0, subtotal - discount);
            },

            // Get cart count
            getItemCount: () => {
                const items = get().items;
                return items.reduce((count, item) => count + item.quantity, 0);
            },

            // Clear cart
            clearCart: () => {
                set({ items: [], appliedOffer: null });
            }
        }),
        {
            name: 'cart-storage',
            partialize: (state) => ({
                items: state.items,
                appliedOffer: state.appliedOffer
            })
        }
    )
);

