import { Badge, User } from '../types';
import { badges } from '../data/mockData';

export const getBadgeForPoints = (points: number): Badge => {
  if (points >= 151) return badges[2]; // Gold
  if (points >= 51) return badges[1]; // Silver
  return badges[0]; // Bronze
};

export const getAllEarnedBadges = (user: User): Badge[] => {
  const earnedBadges: Badge[] = [];
  
  // Points-based badges
  const pointBadge = getBadgeForPoints(user.points);
  earnedBadges.push(pointBadge);
  
  // Add other badges based on activities (simplified for demo)
  if (user.role === 'alumni' && user.points > 100) {
    earnedBadges.push(badges[4]); // Resource Contributor
  }
  
  return earnedBadges;
};