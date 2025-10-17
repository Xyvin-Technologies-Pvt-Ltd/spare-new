import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { rewardHistory as initialHistory } from '../data/rewards';

export const useRewardsStore = create(
    persist(
        (set, get) => ({
            points: 1245,
            history: initialHistory,
            redeemedOffers: [],

            // Earn points
            earnPoints: (points, description, descriptionAr) => {
                set((state) => ({
                    points: state.points + points,
                    history: [
                        {
                            id: Date.now(),
                            type: 'earned',
                            points,
                            description,
                            descriptionAr,
                            date: new Date().toISOString()
                        },
                        ...state.history
                    ]
                }));
            },

            // Redeem points for offer
            redeemOffer: (offer) => {
                const currentPoints = get().points;

                if (currentPoints < offer.pointsRequired) {
                    return { success: false, message: 'Insufficient points' };
                }

                set((state) => ({
                    points: state.points - offer.pointsRequired,
                    redeemedOffers: [...state.redeemedOffers, { ...offer, redeemedAt: new Date().toISOString() }],
                    history: [
                        {
                            id: Date.now(),
                            type: 'redeemed',
                            points: -offer.pointsRequired,
                            description: `Redeemed: ${offer.offer}`,
                            descriptionAr: `تم الاستبدال: ${offer.offerAr}`,
                            date: new Date().toISOString()
                        },
                        ...state.history
                    ]
                }));

                return { success: true, message: 'Offer redeemed successfully!' };
            },

            // Get current tier
            getCurrentTier: () => {
                const points = get().points;

                if (points >= 3000) return { name: 'Platinum', nameAr: 'بلاتيني', color: '#E5E4E2' };
                if (points >= 1500) return { name: 'Gold', nameAr: 'ذهبي', color: '#FFD700' };
                if (points >= 500) return { name: 'Silver', nameAr: 'فضي', color: '#C0C0C0' };
                return { name: 'Bronze', nameAr: 'برونزي', color: '#CD7F32' };
            },

            // Get points to next tier
            getPointsToNextTier: () => {
                const points = get().points;

                if (points >= 3000) return 0;
                if (points >= 1500) return 3000 - points;
                if (points >= 500) return 1500 - points;
                return 500 - points;
            }
        }),
        {
            name: 'rewards-storage',
            partialize: (state) => ({
                points: state.points,
                history: state.history,
                redeemedOffers: state.redeemedOffers
            })
        }
    )
);

